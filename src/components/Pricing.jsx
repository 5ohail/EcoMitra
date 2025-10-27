// EcoMitraPremium.jsx - GLSL Enabled, Lenis Enabled, GSAP Removed
import React, { useState, useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import Lenis from 'lenis';
import { Vector2 } from 'three';
import { FiCpu, FiUsers, FiShield, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// --- GLSL Shaders ---

const vertexShader = `
  uniform float u_time;
  uniform float u_intensity;
  varying vec3 v_normal;
  varying vec3 v_position;

  void main() {
    v_normal = normal;
    v_position = position;

    // Add a subtle wave distortion based on time and vertex position
    float distortion = sin(position.y * 5.0 + u_time * 1.5) * 0.07 * u_intensity;
    vec3 newPosition = position + normal * distortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  varying vec3 v_normal;
  varying vec3 v_position;

  void main() {
    // Base colors that shift over time
    vec3 colorA = vec3(0.06, 0.73, 0.51); // ~Emerald-500
    vec3 colorB = vec3(0.05, 0.89, 0.48); // ~Emerald-400
    vec3 baseColor = mix(colorA, colorB, sin(u_time * 0.5) * 0.5 + 0.5);

    // Fresnel effect for a glow on the edges
    float fresnel = 1.0 - dot(normalize(v_normal), vec3(0.0, 0.0, 1.0));
    fresnel = pow(fresnel, 2.5);
    vec3 fresnelColor = vec3(0.8, 1.0, 0.9);

    // Mouse interactivity for a hotspot glow
    float mouseDist = distance(v_position.xy, u_mouse * 1.5); // Multiply mouse uniform to increase its effective range
    float mouseGlow = smoothstep(0.7, 0.0, mouseDist);
    vec3 mouseColor = vec3(1.0, 1.0, 1.0) * mouseGlow;

    // Combine all effects
    vec3 finalColor = baseColor + fresnelColor * fresnel * 0.5 + mouseColor;
    float alpha = clamp(fresnel + mouseGlow, 0.3, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// --- 3D Components ---
const Crystal = React.forwardRef((props, ref) => {
  const shaderRef = useRef();

  // Define the uniforms that will be passed to the shaders
  const uniforms = {
    u_time: { value: 0 },
    u_intensity: { value: 0.6 },
    u_mouse: { value: new Vector2(0, 0) },
  };

  useFrame((state) => {
    // Update uniforms on every frame
    if (shaderRef.current) {
      shaderRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      shaderRef.current.uniforms.u_mouse.value.lerp(state.pointer, 0.05); // Smoothly interpolate mouse position
    }
  });

  return (
    <mesh ref={ref} scale={[1.25, 1.25, 1.25]}>
      <icosahedronGeometry args={[1.3, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
});

const ThreeScene = React.forwardRef(({ className = '' }, ref) => {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} style={{ position: 'absolute', inset: 0 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Crystal ref={ref} />
        <Environment preset="city" />
      </Suspense>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    </Canvas>
  );
});

// --- UI Subcomponents (No Changes) ---
const GlassCard = ({ children, className = '' }) => (<div className={`rounded-2xl p-6 backdrop-blur-lg bg-white/60 border border-white/20 shadow-2xl ${className}`}>{children}</div>);
const FeaturePillar = ({ icon, title, description }) => (<div className="feature-pillar"><div className="inline-block p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-white/30 mb-4">{icon}</div><h3 className="text-2xl font-semibold mb-2">{title}</h3><p className="text-slate-600">{description}</p></div>);
const PricingCard = ({ plan, billingCycle }) => (<div className={`pricing-card relative rounded-3xl p-8 ${plan.popular ? 'border-emerald-500 bg-gradient-to-br from-white/80 to-emerald-50 shadow-lg' : 'bg-white/80 border border-slate-200'}`}>{plan.popular && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow">MOST POPULAR</div>}<h3 className="text-2xl font-bold mb-2">{plan.name}</h3><p className="text-slate-600 mb-6">{plan.description}</p><div className="mb-6">{plan.price === null ? (<span className="text-4xl font-extrabold">Let's Talk</span>) : (<div className="flex items-baseline gap-3"><span className="text-5xl font-extrabold">${plan.price[billingCycle]}</span><span className="text-slate-500">/ user / month</span></div>)}</div><button className={`w-full py-3 rounded-xl font-semibold ${plan.popular ? 'bg-emerald-600 text-white' : 'bg-white/70 border border-slate-200'}`}>{plan.cta}</button><ul className="space-y-3 mt-6 text-left">{plan.features.map((feature, i) => (<li key={i} className="flex items-start gap-3"><FiCheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" /><span className="text-slate-600">{feature}</span></li>))}</ul></div>);
const FaqItem = ({ faq, isOpen, onToggle }) => (<div className="border-b border-slate-200 pb-4"><button onClick={onToggle} className="w-full flex justify-between items-center text-left py-3"><span className="text-lg font-medium text-slate-800">{faq.question}</span><span className="text-slate-500">{isOpen ? <FiChevronUp className="h-6 w-6" /> : <FiChevronDown className="h-6 w-6" />}</span></button><div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen pt-3' : 'max-h-0'}`}><p className="text-slate-600">{faq.answer}</p></div></div>);

// --- Main Page Component ---
const EcoMitraPremium = () => {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const crystalRef = useRef();
  
  const plans = [ { name: 'Essential', price: { monthly: 29, annual: 24 }, description: 'For individuals and small teams tracking their initial impact.', features: ['Core Analytics Engine', '5 Project Zones', 'Standard Integrations', 'Community Support', '30-day Data History'], cta: 'Get Started'}, { name: 'Growth', price: { monthly: 59, annual: 49 }, description: 'For growing teams scaling their sustainability efforts.', features: ['Everything in Essential', 'AI-Powered Impact Forecasting', 'Unlimited Project Zones', 'Advanced Integrations', 'Priority Support', 'Unlimited Data History'], cta: 'Start Free Trial', popular: true }, { name: 'Enterprise', price: null, description: 'For organizations leading the change with maximum power and support.', features: ['Bespoke AI Model Training', 'Private Cloud', 'Dedicated Infrastructure', '24/7 Success Manager', 'Enterprise-Grade Security'], cta: 'Contact Sales'}, ];
  const features = [ { icon: <FiCpu className="h-8 w-8 text-emerald-500" />, title: "Impact Intelligence", description: "Predictive engine that forecasts your environmental footprint and surfaces high-impact actions." }, { icon: <FiUsers className="h-8 w-8 text-emerald-500" />, title: "Collaborative Action", description: "Centralize projects, workflows, and approvals so teams can reduce emissions together." }, { icon: <FiShield className="h-8 w-8 text-emerald-500" />, title: "Verified & Secure", description: "SOC-grade security, verification, and compliance for sensitive sustainability reporting." } ];
  const faqs = [ { question: 'Can I change my plan later?', answer: 'Absolutely. Upgrade, downgrade, or switch billing cycles anytime — prorated charges apply.'}, { question: 'What happens after the trial?', answer: 'We notify you and pause your account if you don\'t pick a plan.'}, { question: 'Payment methods?', answer: 'Credit cards; invoicing/wire for Enterprise.'}, { question: 'Is my data secure?', answer: 'Yes — encryption, SSO, SCIM, and SOC/ISO controls available.'} ];

  // Hook to initialize Lenis for smooth scrolling
  useLayoutEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  const handleFaqToggle = (i) => setOpenFaqIndex(openFaqIndex === i ? null : i);

  return (
    <div className="font-inter text-slate-900 antialiased bg-gradient-to-b from-emerald-50 via-white to-slate-50 min-h-screen">
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene ref={crystalRef} />
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6">
          <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">Clarity for a Greener Planet</h1>
          <p className="hero-sub mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">Measure, predict, and reduce your environmental impact with enterprise-grade tools and delightful UX.</p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="cta-button bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-102 transition-transform">Start Free Trial</button>
            <button className="px-6 py-3 rounded-full bg-white/90 border border-slate-200 hover:bg-slate-50 transition-colors">Contact Sales</button>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent to-white/60" />
      </section>

      <section className="features-grid py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (<div key={index} className="p-2 rounded-3xl"><GlassCard><FeaturePillar icon={feature.icon} title={feature.title} description={feature.description} /></GlassCard></div>))}
        </div>
      </section>

      <section className="pricing-section py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Find Your Fit</h2>
          <p className="text-slate-600 mb-8">Simple pricing for teams and enterprises. Transparent, predictable, fair.</p>
          <div className="flex justify-center items-center gap-4 mb-10">
            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={billingCycle === 'annual'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')} className="sr-only peer" /><div className="w-14 h-8 bg-slate-200 rounded-full peer-checked:bg-emerald-500 relative transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-6 after:h-6 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div></label>
            <span className={`text-lg ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>Annual <span className="text-emerald-500 font-semibold">(Save 20%)</span></span>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">{plans.map((plan) => (<PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />))}</div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-slate-500 mb-8">Trusted by leaders in sustainability</p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-8 opacity-60 grayscale">
            <div className="text-lg font-semibold">TerraCycle</div>
            <div className="text-lg font-semibold">Patagonia</div>
            <div className="text-lg font-semibold">GreenTech</div>
            <div className="text-lg font-semibold">BioInnovate</div>
          </div>
          <div className="bg-slate-50 p-10 rounded-2xl shadow-lg">
            <p className="text-xl md:text-2xl italic text-slate-700">"EcoMitra helped us reduce carbon intensity by 30%—fast, measurable, actionable."</p>
            <p className="mt-6 font-bold">Anya Sharma</p>
            <p className="text-slate-500">Chief Sustainability Officer, GreenTech</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (<FaqItem key={idx} faq={faq} isOpen={openFaqIndex === idx} onToggle={() => handleFaqToggle(idx)} />))}
          </div>
        </div>
      </section>

      <section className="final-cta py-24 relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Measure Your Impact?</h2>
          <p className="max-w-xl mx-auto mb-8">Join the community of businesses making measurable, verifiable environmental gains.</p>
          <button className="cta-button bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold shadow-lg">Start Your 14-Day Trial</button>
          <p className="mt-4 text-sm opacity-90">No credit card required.</p>
        </div>
      </section>
    </div>
  );
};

export default EcoMitraPremium;