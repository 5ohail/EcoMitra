import React, { useEffect, useState, useRef } from "react";
import { rtdb, db } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

/* ================= CONSTANTS ================= */
const CONVERSION_FACTOR = 0.12;
const AUDIT_ID = "EM-SEC-2X4121K5U";

export default function CertifiedAuditHub() {
  const [chartData, setChartData] = useState([]);
  const [industryName, setIndustryName] = useState(
    "EcoMitra Manufacturing Hub"
  );
  const lastSavedValue = useRef(null);

  /* ================= REALTIME SENSOR INGEST ================= */
  useEffect(() => {
    const sensorRef = ref(rtdb, "sensor");
    return onValue(sensorRef, (snap) => {
      const data = snap.val();
      if (!data) return;

      const gas = Number(data.gasValue || 0);
      if (gas > 0 && gas !== lastSavedValue.current) {
        addDoc(collection(db, "reports"), {
          avgGas: gas,
          timestamp: Timestamp.now(),
        });
        lastSavedValue.current = gas;
      }
    });
  }, []);

  /* ================= FIRESTORE STREAM ================= */
  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      orderBy("timestamp", "desc"),
      limit(1000)
    );

    return onSnapshot(q, (snap) => {
      const rows = snap.docs
        .map((d) => {
          const t = d.data().timestamp?.toDate() || new Date();
          return {
            gas: d.data().avgGas || 0,
            timestamp: t,
            time: t.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            dateStr: t.toLocaleDateString("en-GB"),
            hour: t.getHours(),
          };
        })
        .reverse();

      setChartData(rows);
    });
  }, []);

  /* ================= DERIVED ANALYTICS ================= */

  // Hourly Average
  const hourlyAvg = Object.values(
    chartData.reduce((acc, d) => {
      acc[d.hour] ??= { hour: d.hour, sum: 0, count: 0 };
      acc[d.hour].sum += d.gas;
      acc[d.hour].count++;
      return acc;
    }, {})
  ).map((h) => ({
    hour: `${h.hour.toString().padStart(2, "0")}:00`,
    avgGas: +(h.sum / h.count).toFixed(2),
  }));

  // Daily Average
  const dailyAvg = Object.values(
    chartData.reduce((acc, d) => {
      acc[d.dateStr] ??= { date: d.dateStr, sum: 0, count: 0 };
      acc[d.dateStr].sum += d.gas;
      acc[d.dateStr].count++;
      return acc;
    }, {})
  ).map((d) => ({
    date: d.date,
    avgGas: +(d.sum / d.count).toFixed(2),
  }));

  // Threshold Breaches
  const thresholdBreaches = chartData.map((d) => ({
    time: d.time,
    breach: d.gas > 700 ? d.gas : null,
  }));

  /* ================= PDF ENGINE (UNCHANGED CORE) ================= */
  const generateAudit = async (type) => {
    const doc = new jsPDF();
    const qr = await QRCode.toDataURL(
      JSON.stringify({ audit: AUDIT_ID, entity: industryName })
    );

    doc.setFillColor(6, 95, 70);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255);
    doc.setFontSize(18);
    doc.text("Certified Emission Audit", 14, 20);

    doc.addImage(qr, "PNG", 165, 5, 30, 20);

    autoTable(doc, {
      startY: 40,
      head: [["Timestamp", "PPM", "kg CO₂e"]],
      body: chartData.slice(-30).map((d) => [
        d.time,
        d.gas,
        (d.gas * CONVERSION_FACTOR).toFixed(2),
      ]),
      headStyles: { fillColor: [6, 95, 70] },
    });

    doc.save(`${industryName}_${type}_Audit.pdf`);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F4F7F5] font-sans text-slate-900">
      {/* HEADER */}
      <header className="bg-white border-b px-8 py-6 flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Certified Environmental Audit
          </p>
          <input
            value={industryName}
            onChange={(e) => setIndustryName(e.target.value)}
            className="text-3xl font-extrabold text-emerald-900 outline-none bg-transparent"
          />
        </div>
        <div className="text-sm font-mono text-neutral-500">
          ID: {AUDIT_ID}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-12">
        {/* LIVE MONITOR */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Live Emissions Monitoring
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis />
              <Tooltip />
              <Area
                dataKey="gas"
                stroke="#065f46"
                fill="#D1FAE5"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl p-8 shadow">
            <h3 className="font-bold mb-3">Hourly Average Emissions</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={hourlyAvg}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area
                  dataKey="avgGas"
                  stroke="#047857"
                  fill="#A7F3D0"
                />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow">
            <h3 className="font-bold mb-3">Daily Average Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={dailyAvg}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  dataKey="avgGas"
                  stroke="#065f46"
                  fill="#D1FAE5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* THRESHOLD */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="font-bold mb-3 text-red-700">
            Emission Threshold Breaches
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={thresholdBreaches}>
              <XAxis dataKey="time" hide />
              <YAxis />
              <Tooltip />
              <Area
                dataKey="breach"
                stroke="#991B1B"
                fill="#FEE2E2"
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* ACTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["daily", "weekly", "monthly"].map((t) => (
            <button
              key={t}
              onClick={() => generateAudit(t)}
              className="py-6 bg-emerald-900 text-white font-extrabold rounded-xl shadow-lg hover:bg-black transition"
            >
              Generate {t} Audit
            </button>
          ))}
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Eco Mitra · Certified Sustainability
        Intelligence
      </footer>
    </div>
  );
}
