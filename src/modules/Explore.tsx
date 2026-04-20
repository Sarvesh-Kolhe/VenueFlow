import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  MapPin, 
  Award,
  Bell,
  Search,
  User,
  ArrowRight,
  BrainCircuit,
  Sparkles
} from 'lucide-react';

const INSIGHTS = [
  "North Gate flow is currently at 85% efficiency. Optimal entry detected.",
  "Halftime surge predicted in 12 mins. Concessions in Section 104 have low wait times.",
  "Your sustainability rank has reached top 5%. Keep using SmartFlow routes.",
  "Traffic on the M1 highway is clearing. Expect a 15-minute reduction in travel time.",
  "The Lions currently hold 68% possession. Tactical replay available in Module 2."
];

export const Dashboard: React.FC = () => {
  const [insightIndex, setInsightIndex] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const rotateInsight = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setInsightIndex((prev) => (prev + 1) % INSIGHTS.length);
      setIsAiLoading(false);
    }, 400);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 lg:space-y-12 max-w-7xl mx-auto bg-stadium-black min-h-screen">
      {/* Header - Mobile only (Desktop has top header in App.tsx) */}
      <header className="flex lg:hidden justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-[#fafafa] italic">
            STADIUM<span className="text-electric-green">IQ</span>
          </h1>
          <p className="text-[9px] text-text-secondary font-bold uppercase tracking-[0.2em] -mt-1">Premier Experience</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-electric-green/10 border border-electric-green/20 px-2.5 py-1.5 rounded-xl">
             <span className="text-[10px] font-black text-electric-green">12,450 PTS</span>
          </div>
          <div className="w-9 h-9 rounded-full border border-stadium-border overflow-hidden shadow-inner">
            <img 
              src="https://picsum.photos/seed/user123/100/100" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale-[0.2]" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* AI Insights Bar */}
      <div 
        className="bg-zinc-950 border border-stadium-border rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group"
        role="status"
        aria-live="polite"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-electric-green" />
        <div className="w-10 h-10 rounded-xl bg-electric-green/10 flex items-center justify-center text-electric-green shrink-0">
          <BrainCircuit size={20} className={isAiLoading ? "animate-pulse" : ""} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-1">
            <Sparkles size={10} /> VenueFlow Intelligence • Active
          </p>
          <p className="text-sm font-bold text-white italic truncate lg:whitespace-normal">
            {INSIGHTS[insightIndex]}
          </p>
        </div>
        <button 
           onClick={rotateInsight}
           className="hidden md:block text-[10px] font-black text-electric-green uppercase tracking-widest hover:bg-electric-green/10 px-4 py-2 rounded-lg border border-electric-green/20 transition-all"
           aria-label="Refresh Insight"
        >
          Refine
        </button>
      </div>

      {/* Hero Section - Responsive Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Hero Card */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="xl:col-span-2 bg-stadium-card border border-stadium-border p-8 lg:p-10 rounded-[32px] relative overflow-hidden shadow-2xl group flex flex-col justify-between min-h-[320px] lg:min-h-[400px] glass-card"
        >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-electric-green/5 blur-[120px] rounded-full group-hover:bg-electric-green/10 transition-all duration-700" />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <span className="bg-electric-green/10 border border-electric-green/20 text-electric-green text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Live Optimization</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-black mb-4 text-white tracking-tighter max-w-xl leading-[0.9] lg:leading-[0.85] italic uppercase">
                    Gate 7: <br/>Optimal Entrance <span className="text-electric-green">Detected</span>
                </h3>
                <p className="text-sm lg:text-base text-zinc-400 font-medium max-w-md">
                    Skip the 24-minute queue at the main entrance. SmartFlow has calculated a faster route via the North-West connector.
                </p>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-10">
                <div className="flex-1 max-w-xs">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Flow Efficiency</span>
                        <span className="text-sm font-black text-electric-green leading-none italic uppercase">80% CLEAR</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800/50 rounded-full w-full overflow-hidden p-[1px]">
                        <div className="h-full bg-electric-green w-4/5 shadow-[0_0_15px_#22c55e]" />
                    </div>
                </div>
                <button className="bg-electric-green text-black px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest italic flex items-center gap-3 hover:scale-[1.02] transition-transform">
                    Start Rerouting <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>

        {/* Side Notification/Alerts Stack */}
        <div className="space-y-6">
            <motion.div 
                whileHover={{ y: -4 }}
                className="bg-electric-green text-black p-8 rounded-[32px] shadow-xl shadow-electric-green/5 group relative overflow-hidden h-full flex flex-col justify-between"
            >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <Zap size={120} />
                </div>
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-2xl shadow-inner mb-6">⚡</div>
                <div>
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-2">Smart Alert</span>
                     <p className="text-xl lg:text-2xl font-black leading-[1.1] tracking-tight mb-4 italic uppercase">
                        Halftime in 12 min. <br/>Your Draft IPA is ready at Section 104.
                    </p>
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                        COLLECT NOW <ArrowRight size={14} />
                    </button>
                </div>
            </motion.div>
        </div>
      </div>

      {/* Grid Modules - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
         {[
           { label: 'ZeroWait', val: 'Signature Nachos', sub: 'Ready in 2m', icon: '🌯' },
           { label: 'LivePulse', val: 'Lions Highlight', sub: 'Q3 - 12:44', icon: '📽️' },
           { label: 'VenueCompass', val: 'Parking Zone D', sub: '12 Slots Available', icon: '🚗' },
           { label: 'Live Score', val: '2 - 1', sub: 'Match Time: 78:42', icon: '⚽' },
         ].map((item, idx) => (
           <motion.div 
             key={idx}
             whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
             className="bg-stadium-card border border-stadium-border p-6 rounded-[28px] transition-all shadow-lg group flex flex-col justify-between hover:shadow-electric-green/5 glass-card"
           >
             <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">{item.label}</span>
                <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">{item.icon}</span>
             </div>
             <div>
                <p className="text-xl font-black leading-tight text-white mb-2 tracking-tight italic uppercase">{item.val}</p>
                <p className="text-[10px] text-electric-green font-black uppercase tracking-[0.15em] opacity-80">{item.sub}</p>
             </div>
           </motion.div>
         ))}
      </div>

      {/* Sustainability & Rewards Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-stadium-card border border-stadium-border p-8 lg:p-10 rounded-[32px] shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center gap-8 glass-card">
           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-electric-green/5 to-transparent pointer-events-none" />
           
           <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-zinc-900 border border-stadium-border rounded-2xl flex items-center justify-center shadow-inner">
                      <Award className="text-electric-green" size={28} />
                  </div>
                  <div>
                       <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter tracking-tight">XP Progression</h4>
                       <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Earned through eco-disposal & low-flow nav</p>
                  </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-black text-text-secondary tracking-[0.2em]">Current Engagement Level</span>
                  <span className="text-xs font-black text-electric-green tracking-tight uppercase italic">LEGENDARY (85%)</span>
              </div>
              <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden p-[2px]">
                  <div className="h-full bg-electric-green w-[85%] rounded-full shadow-[0_0_15px_#22c55e]" />
              </div>
           </div>
        </div>

        <div className="bg-stadium-card border border-stadium-border p-8 rounded-[32px] glass-card flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                     <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">Fan Carbon Offset</p>
                     <p className="text-2xl font-black text-white italic uppercase">2.4kg <span className="text-electric-green text-sm not-italic uppercase">CO2 SAVED</span></p>
                </div>
                <div className="bg-electric-green/10 p-3 rounded-xl text-electric-green">
                    <TrendingUp size={20} />
                </div>
            </div>
            <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                By choosing SmartFlow routes and participating in the stadium circular economy, you've achieved a top 5% fan sustainability rank.
            </p>
        </div>
      </div>
    </div>
  );
};
