import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Play, 
    BarChart3, 
    Camera, 
    Maximize2,
    SkipBack,
    Volume2,
    ChevronRight,
    Search
} from 'lucide-react';
import { cn } from '../lib/utils';

export const LivePulseDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'replays' | 'stats' | 'view'>('stats');
    const [lionsScore, setLionsScore] = useState(34);
    const [hawksScore, setHawksScore] = useState(28);

    // Simulate live score tracking
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setLionsScore(prev => prev + 3);
            } else if (Math.random() > 0.9) {
                setHawksScore(prev => prev + 2);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 lg:p-10 space-y-8 lg:space-y-12 max-w-7xl mx-auto bg-stadium-black min-h-screen">
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stadium-border pb-8">
                <div>
                    <h2 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">LivePulse<span className="text-electric-green"> Hub</span></h2>
                    <p className="text-xs lg:text-sm text-text-secondary font-bold uppercase tracking-[0.3em] mt-2 italic">Global Performance Telemetry • Match Ready Protocol</p>
                </div>
                <div className="hidden lg:flex items-center gap-10">
                    <div className="text-right">
                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-none mb-1">Elapsed Time</p>
                        <p className="text-2xl font-black text-white italic font-mono uppercase">Q4 • 05:24</p>
                    </div>
                    <div className="h-10 w-[1px] bg-stadium-border" />
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-electric-green/10 rounded-2xl flex items-center justify-center text-electric-green shadow-inner border border-electric-green/20">
                            <Activity size={24} />
                        </div>
                        <div>
                             <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-none mb-1">System Health</p>
                             <p className="text-sm font-black text-white italic uppercase">Optimized</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Expansive Scoreboard Container */}
            <div className="bg-stadium-card border border-stadium-border p-10 lg:p-16 rounded-[48px] overflow-hidden relative shadow-2xl group min-h-[400px] flex items-center justify-center glass-card">
                 <div className="absolute inset-0 bg-gradient-to-b from-electric-green/5 via-transparent to-transparent pointer-events-none" />
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 lg:gap-24 relative z-10 w-full">
                    {/* Lions Section */}
                    <div className="flex flex-col items-center lg:items-end order-2 md:order-1">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full p-2 border-2 border-stadium-border bg-black/50 shadow-2xl mb-6 relative overflow-hidden group-hover:border-electric-green/30 transition-all">
                             <img 
                                 src="https://picsum.photos/seed/lions/300/300" 
                                 alt="Lions" className="w-full h-full rounded-full object-cover grayscale-[0.2]" 
                                 referrerPolicy="no-referrer"
                            />
                        </div>
                        <h4 className="text-2xl lg:text-4xl font-black text-zinc-500 tracking-tighter uppercase italic leading-none mb-4">Lions FC</h4>
                        <div className="flex gap-2">
                            {[1,1,0,1,1].map((w, i) => (
                                <div key={i} className={cn("w-1.5 h-6 rounded-full transition-all", w ? "bg-electric-green shadow-[0_0_10px_#22c55e]" : "bg-zinc-800")} />
                            ))}
                        </div>
                    </div>

                    {/* Score Center Section */}
                    <div className="flex flex-col items-center justify-center order-1 md:order-2 self-stretch bg-white/[0.02] border border-white/5 p-8 rounded-[40px] backdrop-blur-sm">
                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                            <div className="h-[1px] w-6 bg-zinc-800" /> VS <div className="h-[1px] w-6 bg-zinc-800" />
                        </div>
                        
                        <motion.div 
                            key={lionsScore + hawksScore}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-6 lg:gap-10"
                        >
                            <span className="text-8xl lg:text-[180px] font-black tracking-tighter text-white italic leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">{lionsScore}</span>
                            <span className="text-4xl lg:text-8xl font-black text-zinc-800 not-italic leading-none">:</span>
                            <span className="text-8xl lg:text-[180px] font-black tracking-tighter text-white italic leading-none">{hawksScore}</span>
                        </motion.div>

                        <div className="mt-12 flex items-center gap-4 bg-black/60 px-6 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                            <span className="w-2 h-2 bg-electric-green rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                            <span className="text-[10px] font-black text-white italic uppercase tracking-[0.2em]">Match Analytics Live</span>
                        </div>
                    </div>

                    {/* Hawks Section */}
                    <div className="flex flex-col items-center lg:items-start order-3">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full p-2 border-2 border-stadium-border bg-black/50 shadow-2xl mb-6 relative overflow-hidden group-hover:border-electric-green/30 transition-all">
                             <img 
                                 src="https://picsum.photos/seed/hawks/300/300" 
                                 alt="Hawks" className="w-full h-full rounded-full object-cover grayscale-[0.2]" 
                                 referrerPolicy="no-referrer"
                            />
                        </div>
                        <h4 className="text-2xl lg:text-4xl font-black text-zinc-500 tracking-tighter uppercase italic leading-none mb-4">Hawks United</h4>
                        <div className="flex gap-2">
                             {[0,1,1,0,1].map((w, i) => (
                                <div key={i} className={cn("w-1.5 h-6 rounded-full transition-all", w ? "bg-electric-green shadow-[0_0_10px_#22c55e]" : "bg-zinc-800")} />
                            ))}
                        </div>
                    </div>
                 </div>
            </div>

            {/* Multi-Column Feature Section */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                {/* Navigation Sidebar */}
                <div className="xl:col-span-1 space-y-4">
                     <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 px-2 lg:mb-6 leading-none">Telemetry Nodes</h3>
                    {[
                        { id: 'stats', icon: BarChart3, label: 'Analytics Core', sub: 'Deep Match Insights' },
                        { id: 'replays', icon: Play, label: 'Instant Feeds', sub: 'Multi-Perspective Review' },
                        { id: 'view', icon: Camera, label: 'Spatial AR', sub: 'Field Overlay Link' }
                    ].map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "w-full flex items-center gap-6 p-6 rounded-[32px] border transition-all duration-300 relative group text-left glass-card",
                                    isActive 
                                        ? "bg-white text-black border-white shadow-2xl shadow-white/5" 
                                        : "bg-stadium-card border-stadium-border text-zinc-500 hover:border-zinc-700 hover:text-white"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                                    isActive ? "bg-zinc-100 text-black" : "bg-zinc-900 text-zinc-600 group-hover:text-electric-green"
                                )}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-sm uppercase italic tracking-tight">{tab.label}</p>
                                    <p className={cn("text-[10px] font-bold mt-1 uppercase tracking-widest", isActive ? "text-zinc-500" : "text-zinc-700")}>{tab.sub}</p>
                                </div>
                                {isActive && (
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
                                        <ChevronRight size={18} />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Dynamic Content Display Area */}
                <div className="xl:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeTab === 'replays' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                 <div className="aspect-video bg-zinc-950 rounded-[48px] overflow-hidden relative group border border-white/5 shadow-3xl">
                                    <img src="https://picsum.photos/seed/stadium-action/1280/720" alt="Replay" className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/100 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="w-24 h-24 bg-electric-green text-black rounded-full shadow-[0_0_50px_rgba(34,197,94,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline outline-offset-8 outline-white/5">
                                            <Play size={40} fill="currentColor" className="ml-1.5" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-10 left-10 right-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-black/60 backdrop-blur-2xl p-8 rounded-[32px] border border-white/10 shadow-3xl overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-electric-green opacity-50" />
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]" /> 
                                                <span className="text-[10px] font-black text-red-500 tracking-widest uppercase italic">Live Replay Protocol • Q4 12:45</span>
                                            </div>
                                            <p className="text-2xl font-black text-white italic tracking-tighter leading-none uppercase">Touchdown Execution Sequence</p>
                                        </div>
                                        <div className="flex items-center gap-6 text-white/40">
                                            <div className="flex items-center gap-2 pr-6 border-r border-white/5">
                                                {[1,2,3].map(i => <div key={i} className="w-1.5 h-6 bg-white/10 rounded-full" />)}
                                            </div>
                                            <SkipBack size={24} className="cursor-pointer hover:text-white transition-colors" />
                                            <Volume2 size={24} className="cursor-pointer hover:text-white transition-colors" />
                                            <Maximize2 size={24} className="cursor-pointer hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                 </div>
                                 <div className="space-y-6">
                                     <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 pl-2 flex items-center gap-4">Historic Match Sequence <div className="h-[1px] bg-zinc-900 flex-1" /></h3>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { time: "10:25", event: "Incredible Interception", type: "Defensive Matrix", cam: "CAM 07" },
                                            { time: "08:12", event: "Field Goal Hawkeyes", type: "Score Event", cam: "CAM 02" }
                                        ].map((h, i) => (
                                            <div key={i} className="bg-stadium-card border border-stadium-border p-8 rounded-[32px] flex items-center justify-between group cursor-pointer hover:border-electric-green/30 transition-all shadow-xl glass-card">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-[20px] bg-zinc-950 flex items-center justify-center text-electric-green border border-stadium-border shadow-inner group-hover:bg-electric-green group-hover:text-black transition-colors">
                                                        <Play size={24} fill="currentColor" className="ml-1" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-xl text-white tracking-tighter italic uppercase leading-none mb-2">{h.event}</p>
                                                        <p className="text-[11px] text-text-secondary font-black tracking-[0.15em] uppercase">{h.time} • {h.type} • <span className="text-electric-green">{h.cam}</span></p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={24} className="text-zinc-800 group-hover:text-electric-green transition-colors" />
                                            </div>
                                        ))}
                                     </div>
                                 </div>
                            </motion.div>
                        )}

                        {activeTab === 'stats' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="space-y-8"
                            >
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     {[
                                         { label: 'Offensive Yards', v1: '342', v2: '289', p: 0.6, unit: 'YD' },
                                         { label: 'Time of Possession', v1: '32:14', v2: '22:46', p: 0.7, unit: '' },
                                         { label: 'Timeout Availability', v1: '2', v2: '1', p: 0.66, unit: '' },
                                         { label: 'Penalty Violations', v1: '4', v2: '7', p: 0.3, unit: '' },
                                     ].map((s, i) => (
                                        <div key={i} className="bg-stadium-card border border-stadium-border p-8 rounded-[40px] shadow-2xl group transition-all hover:translate-y-[-4px] glass-card">
                                            <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.25em] mb-8 leading-none">{s.label}</p>
                                            <div className="flex justify-between items-end mb-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-zinc-700 font-black uppercase mb-1">Home</span>
                                                    <span className="text-4xl font-black text-white italic tracking-tighter leading-none">{s.v1}<span className="text-[10px] not-italic ml-1 text-zinc-600">{s.unit}</span></span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] text-zinc-700 font-black uppercase mb-1">Away</span>
                                                    <span className="text-2xl font-black text-zinc-800 italic tracking-tighter leading-none">{s.v2}<span className="text-[10px] not-italic ml-1 text-zinc-900">{s.unit}</span></span>
                                                </div>
                                            </div>
                                            <div className="h-2 bg-zinc-900/50 rounded-full relative overflow-hidden p-[2px]">
                                                <div className="absolute inset-y-[2px] left-[2px] bg-electric-green rounded-full shadow-[0_0_15px_#22c55e] transition-all duration-1000" style={{ width: `calc(${s.p * 100}% - 4px)` }} />
                                            </div>
                                        </div>
                                     ))}
                                 </div>
                                 <div className="bg-stadium-card border border-stadium-border p-12 lg:p-16 rounded-[48px] shadow-3xl relative overflow-hidden glass-card">
                                      <div className="absolute top-0 right-0 w-96 h-96 bg-electric-green/[0.03] blur-[120px] rounded-full" />
                                      <div className="flex items-center gap-6 mb-12">
                                          <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-electric-green border border-stadium-border shadow-inner">
                                              <TrendingUp size={24} />
                                          </div>
                                          <div>
                                              <h4 className="text-2xl lg:text-3xl font-black text-white italic tracking-tighter leading-none uppercase">Segment Momentum Analysis</h4>
                                              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Live Progression • Multi-Sector Telemetry</p>
                                          </div>
                                      </div>
                                      <div className="space-y-8">
                                          {[
                                              { q: 'QUARTER 01', lions: '14', hawks: '7', homeFav: true, ratio: 0.7 },
                                              { q: 'QUARTER 02', lions: '7', hawks: '14', homeFav: false, ratio: 0.4 },
                                              { q: 'QUARTER 03', lions: '3', hawks: '0', homeFav: true, ratio: 0.8 },
                                              { q: 'QUARTER 04', lions: '10', hawks: '7', homeFav: true, ratio: 0.6 },
                                          ].map((q, i) => (
                                            <div key={i} className="group border-b border-white/[0.03] pb-8 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-center mb-6">
                                                    <span className="text-xs font-black text-zinc-600 w-32 uppercase tracking-[0.2em]">{q.q}</span>
                                                    <div className="flex items-center gap-10">
                                                        <span className={cn("text-3xl font-black italic tracking-tighter leading-none w-16 text-center transition-all", q.lions > q.hawks ? "text-white scale-110" : "text-zinc-800")}>{q.lions}</span>
                                                        <div className="h-6 w-[1px] bg-zinc-900" />
                                                        <span className={cn("text-3xl font-black italic tracking-tighter leading-none w-16 text-center transition-all", q.hawks > q.lions ? "text-white scale-110" : "text-zinc-800")}>{q.hawks}</span>
                                                    </div>
                                                </div>
                                                <div className="h-1 bg-zinc-900/30 rounded-full flex overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${q.ratio * 100}%` }}
                                                        className={cn("h-full transition-all duration-1000", q.homeFav ? "bg-electric-green shadow-[0_0_10px_#22c55e]" : "bg-zinc-700")} 
                                                    />
                                                </div>
                                            </div>
                                          ))}
                                      </div>
                                 </div>
                            </motion.div>
                        )}

                        {activeTab === 'view' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                            >
                                 <div className="aspect-[4/5] bg-zinc-950 rounded-[64px] overflow-hidden relative border border-white/5 shadow-3xl group">
                                     <img src="https://picsum.photos/seed/stadium-view/800/1000" alt="AR Seat View" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[40s] ease-linear" referrerPolicy="no-referrer" />
                                     <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/20 to-black/80" />
                                     
                                     <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full px-16">
                                        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[48px] flex flex-col items-center shadow-3xl outline outline-offset-8 outline-white/5">
                                            <div className="w-4 h-4 bg-electric-green rounded-full mb-6 shadow-[0_0_30px_#22c55e] animate-pulse" />
                                            <span className="text-[10px] font-black text-black bg-electric-green px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase italic">Operational Target Lock</span>
                                            <p className="text-4xl lg:text-5xl font-black text-white tracking-[0.1em] italic leading-none mb-3">SEC 104 • ROW G</p>
                                            <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Distance Optimized: 42.5m</p>
                                        </div>
                                     </div>

                                     <div className="absolute bottom-12 left-10 right-10">
                                        <div className="bg-[#09090b]/90 backdrop-blur-3xl p-10 lg:p-12 rounded-[56px] border border-white/10 shadow-3xl relative overflow-hidden">
                                            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-electric-green/40 to-transparent" />
                                            <div className="flex justify-between items-center mb-10">
                                                <div>
                                                    <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-2 leading-none">Premium Experience Upgrade</p>
                                                    <h4 className="text-3xl lg:text-4xl font-black text-white tracking-tighter italic uppercase leading-none">Diamond Skybox Access</h4>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-4xl lg:text-5xl font-black text-electric-green leading-none italic tracking-tighter underline underline-offset-8 decoration-electric-green/30">$45</p>
                                                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-4 leading-none">Single Event Auth</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-6">
                                                <button className="flex-1 bg-white text-black py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all outline outline-black/5">Confirm Temporal Auth</button>
                                                <button className="w-20 h-20 bg-zinc-900 rounded-3xl border border-white/5 flex items-center justify-center text-white active:scale-95 transition-all shadow-xl hover:bg-zinc-800"><Maximize2 size={24} /></button>
                                            </div>
                                        </div>
                                     </div>
                                 </div>

                                 <div className="flex flex-col justify-center space-y-12 pr-6">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 text-electric-green">
                                            <Camera size={32} />
                                            <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white">Spatial Telemetry Core</h3>
                                        </div>
                                        <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                                            Experience the match from any perspective. Our Diamond-Grade Spatial Link allows for seamless temporal jumps between seats and skyboxes.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            { label: 'Latency', val: '0.2ms', sub: 'Optimized Real-time' },
                                            { label: 'Dynamic Range', val: 'ULTRA-HD', sub: 'Multi-Cam Aggregate' },
                                            { label: 'Spatial Sync', val: 'ACTIVE', sub: 'Precise field mapping' },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-stadium-card border border-stadium-border p-8 rounded-[32px] flex items-center justify-between group hover:border-white/10 transition-all glass-card">
                                                <div>
                                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{item.label}</p>
                                                    <h5 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{item.val}</h5>
                                                </div>
                                                <p className="text-[10px] text-electric-green font-black uppercase italic tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{item.sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full lg:w-fit bg-zinc-950 border border-stadium-border text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                                        Purchase Global View Pass
                                    </button>
                                 </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
import { TrendingUp, Activity as ActivityIcon } from 'lucide-react';
const TrendingUpIcon = TrendingUp;
const Activity = ActivityIcon;
