import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sample static data
const dailyEmissions = [
  { day: 'Mon', kg: 3.2 },
  { day: 'Tue', kg: 2.9 },
  { day: 'Wed', kg: 3.6 },
  { day: 'Thu', kg: 3.1 },
  { day: 'Fri', kg: 2.7 },
  { day: 'Sat', kg: 2.3 },
  { day: 'Sun', kg: 2.8 },
];

const weeklyEnergy = [
  { week: 'W1', kwh: 42 },
  { week: 'W2', kwh: 37 },
  { week: 'W3', kwh: 44 },
  { week: 'W4', kwh: 39 },
];

const deviceUsage = [
  { name: 'Device A', sessions: 156 },
  { name: 'Device B', sessions: 98 },
  { name: 'Device C', sessions: 67 },
];

const co2Saved = [
  { name: 'Driving -> Public Transport', value: 42 },
  { name: 'LED bulbs', value: 28 },
  { name: 'Solar', value: 30 },
];

const history = [
  { month: 'Jan', emission: 120 },
  { month: 'Feb', emission: 110 },
  { month: 'Mar', emission: 95 },
  { month: 'Apr', emission: 102 },
  { month: 'May', emission: 88 },
  { month: 'Jun', emission: 80 },
];

const COLORS = ['#00A86B', '#007D4C', '#00C37A'];

export default function Report() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stat-card');
      gsap.from(cards, {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
        },
      });

      const charts = gsap.utils.toArray('.chart');
      gsap.from(charts, {
        scale: 0.96,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const totalWeeklyEnergy = weeklyEnergy.reduce((s, r) => s + r.kwh, 0);
  const avgDaily = (dailyEmissions.reduce((s, r) => s + r.kg, 0) / dailyEmissions.length).toFixed(2);
  const devices = deviceUsage.length;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-[#F3FBF4] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Eco Mitra — Reports</h1>
            <p className="text-base text-gray-500 mt-1">Static sample metrics & charts for demo and presentation.</p>
          </div>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="stat-card saas-card rounded-saas p-6 transition-all duration-300 hover:shadow-lg">
            <div className="text-sm font-medium text-gray-500">Avg Daily Emission</div>
            <div className="text-2xl font-semibold text-[#00694F]">{avgDaily} kg CO₂</div>
          </div>

          <div className="stat-card saas-card rounded-saas p-6 transition-all duration-300 hover:shadow-lg">
            <div className="text-sm font-medium text-gray-500">Weekly Energy</div>
            <div className="text-2xl font-semibold text-[#00694F]">{totalWeeklyEnergy} kWh</div>
          </div>

          <div className="stat-card saas-card rounded-saas p-6 transition-all duration-300 hover:shadow-lg  ">
            <div className="text-sm font-medium text-gray-500">Active Devices</div>
            <div className="text-2xl font-semibold text-[#00694F]">{devices}</div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="chart bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-[#004D39] mb-2">Daily Emissions (kg CO₂)</h3>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={dailyEmissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="kg" stroke="#00A86B" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-[#004D39] mb-2">Weekly Energy Consumption</h3>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={weeklyEnergy}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="kwh" fill="#007D4C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-[#004D39] mb-2">CO₂ Saved (Top Actions)</h3>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={co2Saved} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {co2Saved.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-[#004D39] mb-2">Device Usage</h3>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <BarChart data={deviceUsage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#00A86B" radius={[6, 6, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Historical table */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-[#004D39] mb-4">Monthly History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500">
                  <th className="py-2">Month</th>
                  <th className="py-2">Emissions (kg CO₂)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.month} className="border-t">
                    <td className="py-3">{row.month}</td>
                    <td className="py-3">{row.emission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer small note */}
        <div className="mt-6 text-xs text-gray-500">This page uses static sample data for demo purposes. Replace with live data for production.</div>
      </div>
    </div>
  );
}
