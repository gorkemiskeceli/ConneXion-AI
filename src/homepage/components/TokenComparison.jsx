import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { TrendingDown, Zap, DollarSign } from 'lucide-react';

// Custom CountUp Component that counts up when it enters the viewport
function CountUp({ to, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, to, duration]);

  return <span ref={ref} className="font-mono font-bold">%{count}</span>;
}

export default function TokenComparison() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
  
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Smooth scroll growth animation
  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const duration = 1500;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - currentProgress, 4);
      setProgress(eased);
      if (currentProgress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  const benchmarkData = [
    {
      name: 'ConneXion-AI',
      percentage: 30,
      maxHeight: 70, // pixels at 100% progress
      baseX: 170,
      baseY: 380,
      isPrimary: true,
      colorTop: '#6ee7b7',
      colorLeft: 'url(#emerald-left)',
      colorRight: 'url(#emerald-right)',
      avgTokens: '3.120 / sorgu',
      avgCost: '$0.0047 / sorgu',
      avgLatency: '210 ms',
      savings: 'Optimal (Referans)'
    },
    {
      name: 'Competitor A',
      percentage: 76,
      maxHeight: 165,
      baseX: 290,
      baseY: 330,
      isPrimary: false,
      colorTop: '#94a3b8',
      colorLeft: 'url(#gray-left)',
      colorRight: 'url(#gray-right)',
      avgTokens: '7.904 / sorgu',
      avgCost: '$0.0118 / sorgu',
      avgLatency: '580 ms',
      savings: '2.5 kat daha pahalı'
    },
    {
      name: 'Competitor B',
      percentage: 89,
      maxHeight: 195,
      baseX: 410,
      baseY: 280,
      isPrimary: false,
      colorTop: '#94a3b8',
      colorLeft: 'url(#gray-left)',
      colorRight: 'url(#gray-right)',
      avgTokens: '9.256 / sorgu',
      avgCost: '$0.0139 / sorgu',
      avgLatency: '690 ms',
      savings: '3.0 kat daha pahalı'
    },
    {
      name: 'Competitor C',
      percentage: 100,
      maxHeight: 220,
      baseX: 530,
      baseY: 230,
      isPrimary: false,
      colorTop: '#94a3b8',
      colorLeft: 'url(#gray-left)',
      colorRight: 'url(#gray-right)',
      avgTokens: '10.400 / sorgu',
      avgCost: '$0.0156 / sorgu',
      avgLatency: '840 ms',
      savings: '3.3 kat daha pahalı'
    }
  ];

  const kpis = [
    {
      icon: <TrendingDown className="h-5 w-5 text-emerald-400" />,
      text: "%70'e Varan Daha Düşük Token Kullanımı",
      subText: 'Akıllı anlamsal arama, bağlam penceresini gereksiz doldurmak yerine yalnızca sorguya özel bağlamı iletir.'
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-400" />,
      text: 'Daha Hızlı Yapay Zeka Yanıtları',
      subText: 'Token miktarını en aza indirmek, işlem gecikmesini azaltarak ışık hızında yanıt süreleri sağlar.'
    },
    {
      icon: <DollarSign className="h-5 w-5 text-sky-400" />,
      text: 'Daha Düşük Yapay Zeka Altyapı Maliyetleri',
      subText: 'Gereksiz veri aktarımını önleyerek büyük dil modellerinin işletimsel maliyet yükünü doğrudan düşürür.'
    }
  ];

  // Particle configurations near ConneXion-AI column
  const particles = [
    { x: 155, y: 350, r: 2.2, color: '#10b981', filter: 'url(#neon-glow-emerald)', delay: 0, minOpacity: 0.2, maxOpacity: 0.8 },
    { x: 185, y: 320, r: 2.6, color: '#34d399', filter: 'url(#neon-glow-emerald)', delay: 0.7, minOpacity: 0.1, maxOpacity: 0.9 },
    { x: 145, y: 300, r: 1.8, color: '#06b6d4', filter: 'url(#neon-glow-cyan)', delay: 1.4, minOpacity: 0.3, maxOpacity: 0.7 },
    { x: 200, y: 360, r: 1.5, color: '#10b981', filter: 'url(#neon-glow-emerald)', delay: 0.4, minOpacity: 0.2, maxOpacity: 0.8 },
    { x: 170, y: 280, r: 2.2, color: '#06b6d4', filter: 'url(#neon-glow-cyan)', delay: 2.1, minOpacity: 0.1, maxOpacity: 0.9 },
  ];

  // Compute animated height of each bar
  const getAnimatedHeight = (item) => {
    return progress * item.maxHeight;
  };

  // Trend line generator based on dynamic heights
  const h0 = getAnimatedHeight(benchmarkData[0]);
  const h1 = getAnimatedHeight(benchmarkData[1]);
  const h2 = getAnimatedHeight(benchmarkData[2]);
  const h3 = getAnimatedHeight(benchmarkData[3]);

  const trendLineD = `M 170 ${380 - h0} L 290 ${330 - h1} L 410 ${280 - h2} L 530 ${230 - h3}`;

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-[#08111F] text-white border-y border-slate-900 relative overflow-hidden" 
      id="token-comparison-section"
    >
      {/* CSS Keyframe Animations Block */}
      <style>{`
        @keyframes pan-grid {
          0% { background-position: 0px 0px; }
          100% { background-position: 32px 32px; }
        }
        @keyframes circuit-flow {
          to { stroke-dashoffset: -32; }
        }
        @keyframes pulse-climb {
          0% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(-70px); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .animate-grid {
          animation: pan-grid 24s linear infinite;
        }
        .animate-circuit-flow {
          animation: circuit-flow 2.5s linear infinite;
        }
        .animate-pulse-climb {
          animation: pulse-climb 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
      `}</style>

      {/* Futuristic Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none animate-grid"
        style={{
          backgroundImage: `linear-gradient(to right, #00f2fe 1px, transparent 1px),
                            linear-gradient(to bottom, #00f2fe 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Backdrop Glow Layers */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN - Turkish Copy and Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI MOTORU BENCHMARK</span>
              </span>
              
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                ConneXion-AI Neden <br />
                Daha Az Token Kullanır?
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-4 max-w-xl">
                ConneXion-AI, LLM'e gereksiz bağlam göndermek yerine yalnızca en alakalı bilgileri akıllı arama ile getirir. Bu sayede bağlam şişmesini önler, model doğruluğunu artırır ve maliyetlerde yüksek tasarruf sağlar.
              </p>
            </div>

            {/* Glowing KPI Cards */}
            <div className="space-y-4">
              {kpis.map((kpi, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.015, x: 4 }}
                  className="flex items-start space-x-4 border border-slate-800/80 bg-slate-900/10 backdrop-blur-xs rounded-xl p-5 hover:border-emerald-500/25 hover:bg-slate-900/30 transition-all group duration-300 relative overflow-hidden"
                >
                  {/* Subtle hover glow gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
                  
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950/70 border border-slate-800 group-hover:border-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300">
                    {kpi.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {kpi.text}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {kpi.subText}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Original Isometric Platform Base */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            
            {/* Visual Board Container */}
            <div className="w-full max-w-[620px] aspect-[720/560] relative bg-slate-950/20 border border-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden p-6">
              
              {/* Grid overlay */}
              <div 
                className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(30, 41, 59, 0.5) 1.5px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* FLOATING STATUS BADGES (Turkish) */}
              
              {/* 1. AI Motoru Aktif */}
              <div className="absolute top-[8%] left-[6%] z-20 bg-slate-950/80 border border-slate-800 text-[9px] sm:text-[10px] font-mono text-slate-300 rounded-full px-2.5 py-1 backdrop-blur-xs flex items-center gap-1.5 shadow-lg select-none hover:border-emerald-500/30 transition-all duration-300">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>MOTOR // AKTİF</span>
              </div>

              {/* 2. Bağlam Optimize */}
              <div className="absolute bottom-[10%] left-[5%] z-20 bg-slate-950/80 border border-slate-800 text-[9px] sm:text-[10px] font-mono text-slate-300 rounded-full px-2.5 py-1 backdrop-blur-xs flex items-center gap-1.5 shadow-lg select-none hover:border-emerald-500/30 transition-all duration-300">
                <span>BAĞLAM // OPTİMİZE</span>
              </div>

              {/* 3. Arama Tamamlandı */}
              <div className="absolute top-[8%] right-[6%] z-20 bg-slate-950/80 border border-slate-800 text-[9px] sm:text-[10px] font-mono text-slate-300 rounded-full px-2.5 py-1 backdrop-blur-xs flex items-center gap-1.5 shadow-lg select-none hover:border-cyan-500/30 transition-all duration-300">
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>ARAMA // TAMAMLANDI</span>
              </div>

              {/* 4. Gecikme < 250ms */}
              <div className="absolute bottom-[10%] right-[5%] z-20 bg-slate-950/80 border border-slate-800 text-[9px] sm:text-[10px] font-mono text-slate-300 rounded-full px-2.5 py-1 backdrop-blur-xs flex items-center gap-1.5 shadow-lg select-none hover:border-emerald-500/30 transition-all duration-300">
                <span>GECİKME // &lt;250ms</span>
              </div>

              {/* 5. Verimlilik %70 Daha Düşük */}
              <div className="absolute top-[20%] left-[6%] z-20 bg-emerald-950/80 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono text-emerald-300 rounded-full px-2.5 py-1 backdrop-blur-xs flex items-center gap-1.5 shadow-lg select-none shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span>VERİMLİLİK // %70 DAHA YÜKSEK</span>
              </div>

              {/* ISOMETRIC BENCHMARK SVG GRAPHICS */}
              <svg 
                viewBox="0 0 720 540" 
                width="100%" 
                height="100%" 
                className="relative z-10"
              >
                {/* SVG DEF GRADIENTS AND FILTERS */}
                <defs>
                  {/* Emerald Gradients for ConneXion-AI */}
                  <linearGradient id="emerald-left" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#34d399" />
                    <stop offset="100%" stop-color="#059669" />
                  </linearGradient>
                  <linearGradient id="emerald-right" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#059669" />
                    <stop offset="100%" stop-color="#047857" />
                  </linearGradient>
                  <linearGradient id="emerald-top" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#a7f3d0" />
                    <stop offset="100%" stop-color="#34d399" />
                  </linearGradient>

                  {/* Gray-Blue Gradients for Competitors */}
                  <linearGradient id="gray-left" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#475569" />
                    <stop offset="100%" stop-color="#1e293b" />
                  </linearGradient>
                  <linearGradient id="gray-right" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#334155" />
                    <stop offset="100%" stop-color="#0f172a" />
                  </linearGradient>
                  <linearGradient id="gray-top" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#94a3b8" />
                    <stop offset="100%" stop-color="#64748b" />
                  </linearGradient>

                  {/* Board edge light gradient */}
                  <linearGradient id="board-edge-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#1e293b" />
                    <stop offset="50%" stop-color="#0891b2" stop-opacity="0.6" />
                    <stop offset="100%" stop-color="#1e293b" />
                  </linearGradient>

                  {/* Glowing neon filter effects */}
                  <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="neon-glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. ORIGINAL 3D PLATFORM SLAB */}
                <g id="board-platform" transform="translate(0, 10)">
                  
                  {/* Bottom thickness sides */}
                  {/* Left Side thickness */}
                  <polygon 
                    points="60,340 360,465 360,481 60,356" 
                    fill="#050a14" 
                  />
                  {/* Right Side thickness */}
                  <polygon 
                    points="360,465 660,340 660,356 360,481" 
                    fill="#070f1e" 
                  />

                  {/* Top Surface of the board */}
                  <polygon 
                    points="360,215 660,340 360,465 60,340" 
                    fill="#081020" 
                    stroke="url(#board-edge-grad)"
                    strokeWidth="1.5"
                  />

                  {/* Subtle Grid on Board top surface */}
                  <polygon 
                    points="360,215 660,340 360,465 60,340" 
                    fill="none" 
                    stroke="#1e293b"
                    strokeWidth="0.5"
                    strokeDasharray="2,6"
                  />

                  {/* Circular Node pads on slab */}
                  <circle cx="110" cy="360" r="3.5" fill="#0f172a" stroke="#0891b2" strokeWidth="1.5" />
                  <circle cx="250" cy="250" r="3" fill="#0f172a" stroke="#0891b2" strokeWidth="1" />
                  <circle cx="350" cy="420" r="3" fill="#0f172a" stroke="#0891b2" strokeWidth="1" />
                  <circle cx="470" cy="200" r="3" fill="#0f172a" stroke="#0891b2" strokeWidth="1" />
                  <circle cx="610" cy="265" r="3.5" fill="#0f172a" stroke="#0891b2" strokeWidth="1.5" />

                  {/* Moving Circuit Data Lines */}
                  {/* Path 1 */}
                  <path d="M 110 360 L 170 385 L 170 380" fill="none" stroke="#334155" strokeWidth="1" />
                  <path d="M 110 360 L 170 385 L 170 380" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="5,15" className="animate-circuit-flow" />
                  
                  {/* Path 2 */}
                  <path d="M 170 380 L 290 330" fill="none" stroke="#334155" strokeWidth="1" />
                  <path d="M 170 380 L 290 330" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="8,20" className="animate-circuit-flow" />

                  {/* Path 3 */}
                  <path d="M 290 330 L 410 280" fill="none" stroke="#334155" strokeWidth="1" />
                  <path d="M 290 330 L 410 280" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="5,25" className="animate-circuit-flow" />

                  {/* Path 4 */}
                  <path d="M 410 280 L 530 230" fill="none" stroke="#334155" strokeWidth="1" />
                  <path d="M 410 280 L 530 230" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="5,15" className="animate-circuit-flow" />

                  {/* Path 5 */}
                  <path d="M 530 230 L 610 265" fill="none" stroke="#334155" strokeWidth="1" />
                  <path d="M 530 230 L 610 265" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="5,15" className="animate-circuit-flow" />
                </g>

                {/* 2. Rising Energy Particles around ConneXion-AI column */}
                <g>
                  {particles.map((p, idx) => (
                    <g 
                      key={idx}
                      className="animate-pulse-climb"
                      style={{
                        animationDelay: `${p.delay}s`,
                        transformOrigin: `${p.x}px ${p.y}px`
                      }}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={p.r}
                        fill={p.color}
                        filter={p.filter}
                        style={{
                          opacity: p.minOpacity
                        }}
                      />
                    </g>
                  ))}
                </g>

                {/* 3. Isometric Columns (Benchmark Bars) */}
                <g id="bars">
                  {benchmarkData.map((item, index) => {
                    const h = getAnimatedHeight(item);
                    const bx = item.baseX;
                    const by = item.baseY;
                    const isHovered = hoveredIndex === index;

                    // vertex coordinates for 3D boxes
                    // Base points
                    const pLeft = `${bx - 24},${by}`;
                    const pBottom = `${bx},${by + 10}`;
                    const pRight = `${bx + 24},${by}`;
                    
                    // Top points
                    const pTopLeft = `${bx - 24},${by - h}`;
                    const pTopBottom = `${bx},${by + 10 - h}`;
                    const pTopRight = `${bx + 24},${by - h}`;
                    const pTopBack = `${bx},${by - 10 - h}`;

                    return (
                      <g 
                        key={item.name}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="cursor-pointer"
                      >
                        {/* Left Face */}
                        <polygon
                          points={`${pLeft} ${pBottom} ${pTopBottom} ${pTopLeft}`}
                          fill={item.colorLeft}
                          className="transition-all duration-300"
                          style={{
                            filter: isHovered ? 'brightness(1.15) saturate(1.1)' : 'none',
                          }}
                        />
                        {/* Right Face */}
                        <polygon
                          points={`${pBottom} ${pRight} ${pTopRight} ${pTopBottom}`}
                          fill={item.colorRight}
                          className="transition-all duration-300"
                          style={{
                            filter: isHovered ? 'brightness(1.15) saturate(1.1)' : 'none',
                          }}
                        />
                        {/* Top Face */}
                        <polygon
                          points={`${pTopLeft} ${pTopBottom} ${pTopRight} ${pTopBack}`}
                          fill={item.colorTop}
                          className="transition-all duration-300"
                          style={{
                            filter: isHovered ? 'brightness(1.25) saturate(1.1)' : 'none',
                          }}
                        />

                        {/* Pulsing base ring for ConneXion-AI (Primary) */}
                        {item.isPrimary && (
                          <ellipse 
                            cx={bx} 
                            cy={by + 5} 
                            rx="32" 
                            ry="14" 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="1.5" 
                            className="animate-pulse-ring" 
                            style={{ pointerEvents: 'none' }}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* 4. Trend Line representing cost/token growth */}
                <g id="trendline" style={{ pointerEvents: 'none' }}>
                  <path 
                    d={trendLineD}
                    fill="none" 
                    stroke="#f43f5e" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="opacity-90"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.75))' }}
                  />

                  {/* Trend line nodes */}
                  {benchmarkData.map((item, index) => {
                    const h = getAnimatedHeight(item);
                    return (
                      <circle
                        key={`node-${index}`}
                        cx={item.baseX}
                        cy={item.baseY - h}
                        r="5.5"
                        fill="#ffffff"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        className="transition-all duration-300"
                        style={{
                          transform: hoveredIndex === index ? 'scale(1.3)' : 'scale(1)',
                          transformOrigin: `${item.baseX}px ${item.baseY - h}px`
                        }}
                      />
                    );
                  })}
                </g>

              </svg>

              {/* Dynamic Tooltip / Stats HUD overlay */}
              <div className="absolute bottom-[0.75%] left-[2%] right-[2%] bg-slate-950/85 border border-slate-800 rounded-xl py-2.5 px-4 backdrop-blur-md z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
                {(() => {
                  const activeItem = hoveredIndex !== null ? benchmarkData[hoveredIndex] : benchmarkData[0];
                  return (
                    <>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${activeItem.isPrimary ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                          <h4 className="text-sm font-bold text-white tracking-wide">{activeItem.name}</h4>
                          <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                            {activeItem.savings}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {activeItem.isPrimary 
                            ? "ConneXion-AI akıllı motoru sayesinde minimum token kullanımı."
                            : "Yüksek hacimli genel veri gönderimi ve gereksiz bağlam şişmesi."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 font-mono text-[10px] w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                        <div className="text-right">
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Token Tüketimi</span>
                          <span className={`text-xs font-bold ${activeItem.isPrimary ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {activeItem.avgTokens}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Tahmini Maliyet</span>
                          <span className={`text-xs font-bold ${activeItem.isPrimary ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {activeItem.avgCost}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Gecikme Süresi</span>
                          <span className={`text-xs font-bold ${activeItem.isPrimary ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {activeItem.avgLatency}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}