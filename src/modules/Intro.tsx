import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Activity, Cpu, Lock, ChevronRight, Navigation, Utensils, Compass, ShieldAlert } from 'lucide-react';

interface IntroPageProps {
  onComplete: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Core');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const statuses = [
      'Synchronizing Mesh',
      'Verifying VIP Biometrics',
      'Optimizing Flow Logic',
      'Priming SOS Uplinks',
      'System Ready'
    ];

    let currentStatusIdx = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        
        const next = prev + Math.random() * 15;
        
        if (next > (currentStatusIdx + 1) * 20 && currentStatusIdx < statuses.length - 1) {
          currentStatusIdx++;
          setStatus(statuses[currentStatusIdx]);
        }
        
        return next > 100 ? 100 : next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex flex-col items-center overflow-y-auto overflow-x-hidden font-sans no-scrollbar py-10 lg:py-20 animate-in fade-in duration-1000">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-electric-green/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] grayscale" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-10 flex flex-col items-center text-center">
        {/* Core Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="w-24 h-24 rounded-3xl bg-stadium-card border-2 border-electric-green/20 flex items-center justify-center mb-10 mx-auto shadow-[0_0_40px_rgba(34,211,238,0.1)] relative group">
             <div className="absolute -inset-2 border border-electric-green/10 rounded-[36px] animate-[ping_4s_infinite]" />
             <Shield size={48} className="text-electric-green" />
          </div>
          
          <h1 className="text-6xl lg:text-[120px] font-black italic tracking-tighter uppercase leading-[0.85] mb-6 text-white">
            Venue<span className="text-electric-green">Flow</span>
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] lg:text-xs italic">
            <span>Core v4.2.0</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span>Stadium Intelligence</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span>VIP Secure Node</span>
          </div>
        </motion.div>

        {/* Loading Display */}
        <AnimatePresence mode="wait">
          {!isReady ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md space-y-6"
            >
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
                <span className="flex items-center gap-2">
                   <Activity size={12} className="text-electric-green animate-pulse" />
                   {status}
                </span>
                <span>{Math.floor(progress)}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 p-[1px]">
                 <motion.div 
                  className="h-full bg-electric-green rounded-full shadow-[0_0_15px_#22d3ee]"
                  style={{ width: `${progress}%` }}
                 />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                 {[
                  { label: 'Uplink', icon: Zap },
                  { label: 'Compute', icon: Cpu },
                  { label: 'Auth', icon: Lock }
                 ].map((mod, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                      progress > (i + 1) * 30 ? "bg-electric-green/10 border-electric-green/40 text-electric-green" : "bg-zinc-950 border-white/5 text-zinc-700"
                    )}>
                       <mod.icon size={16} />
                    </div>
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{mod.label}</span>
                  </div>
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center space-y-10"
            >
              <div className="space-y-4">
                <p className="text-zinc-400 font-medium italic text-lg max-w-xl">
                    Terminal synchronization complete. All sensory meshes are active. Welcome to the next generation of stadium situational awareness.
                </p>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                    {[
                        { label: 'Flow', icon: Navigation, desc: 'Real-time crowd routing' },
                        { label: 'Eats', icon: Utensils, desc: 'Zero-wait concessions' },
                        { label: 'Stats', icon: Activity, desc: 'Live tactical metrics' },
                        { label: 'SOS', icon: ShieldAlert, desc: 'Instant support uplink' }
                    ].map((feat, i) => (
                        <div key={i} className="bg-stadium-card/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center gap-2 group hover:border-electric-green/30 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-electric-green transition-colors">
                                <feat.icon size={18} />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black text-white italic uppercase tracking-widest">{feat.label}</p>
                                <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-tight leading-none">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
              
              <button 
                onClick={onComplete}
                className="group relative flex items-center gap-6 bg-white text-black px-12 py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-xl hover:bg-electric-green transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 z-20"
              >
                Initialize VenueFlow
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                <div className="absolute -inset-4 border border-white/10 rounded-[32px] group-hover:border-electric-green/40 transition-colors" />
              </button>

              {/* Extra Scrollable Content: Technical Manifesto */}
              <div className="max-w-3xl pt-24 space-y-16 text-left border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Security-First Mesh</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        VenueFlow utilizes a proprietary tactical mesh network, ensuring zero-latency communication even in peak crowd density. Every node is quantum-encrypted, providing a secure perimeter for all VIP interactions.
                      </p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Predictive Intelligence</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        Our core logic processing engine analyzes live stadium telemetry to anticipate flow bottlenecks before they happen. Experience a truly frictionless environment where the OS adapts to your path.
                      </p>
                   </div>
                </div>

                <div className="bg-stadium-card/20 border border-white/5 p-10 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6">
                        <Cpu size={32} className="text-electric-green opacity-20" />
                    </div>
                    <h4 className="text-2xl font-black text-white italic uppercase tracking-tight mb-4">Enterprise Edition 4.2</h4>
                    <p className="text-zinc-500 text-sm italic font-medium leading-loose">
                      "The stadium is no longer just a physical space; it is a software-defined ecosystem. VenueFlow is the interface through which you command your environment."
                    </p>
                    <div className="mt-8 flex gap-6">
                        <div className="px-4 py-2 bg-zinc-950 border border-white/5 rounded-lg">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Uptime 99.998%</span>
                        </div>
                        <div className="px-4 py-2 bg-zinc-950 border border-white/5 rounded-lg">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Nodes: 14,000+</span>
                        </div>
                    </div>
                </div>
              </div>

              <div className="pt-10 flex flex-wrap justify-center gap-12 pb-20">
                 <div className="text-center">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1 italic">Network</p>
                    <p className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">STADIUM_G_58</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1 italic">Location</p>
                    <p className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">Sector North-04</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1 italic">Encryption</p>
                    <p className="text-sm font-black text-electric-green italic tracking-tighter uppercase leading-none">Quantum Solid</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end opacity-30">
        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] font-mono">
           SYS_INIT_SEQUENCE_BYPASS_NULL
        </div>
        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] italic">
           © 2026 STADIUM IQ CORP • NEURAL INTERFACE READY
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
