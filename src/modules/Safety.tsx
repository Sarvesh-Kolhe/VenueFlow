import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    AlertTriangle, 
    Users, 
    Phone, 
    MapPin, 
    ShieldCheck, 
    UserPlus,
    X,
    Radio,
    Loader2,
    Zap,
    Signal,
    Smartphone,
    Wifi
} from 'lucide-react';
import { cn } from '../lib/utils';

export const SafetyNetCoordination: React.FC = () => {
    const [panicActive, setPanicActive] = useState(false);
    const [status, setStatus] = useState<'safe' | 'warning' | 'emergency'>('safe');
    const [sosCountdown, setSosCountdown] = useState<number | null>(null);
    const [pingedUser, setPingedUser] = useState<string | null>(null);

    const handlePanicClick = () => {
        if (sosCountdown !== null) {
            setSosCountdown(null);
            return;
        }
        setSosCountdown(5);
    };

    useEffect(() => {
        if (sosCountdown === null) return;
        if (sosCountdown === 0) {
            setPanicActive(true);
            setStatus('emergency');
            setSosCountdown(null);
            return;
        }
        const timer = setTimeout(() => setSosCountdown(sosCountdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [sosCountdown]);

    const handlePing = (name: string) => {
        setPingedUser(name);
        setTimeout(() => setPingedUser(null), 3000);
    };

    return (
        <div className="p-6 lg:p-10 space-y-12 max-w-7xl mx-auto bg-stadium-black min-h-screen">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stadium-border pb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl lg:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Safety<span className="text-electric-green">Net</span></h2>
                    <div className="flex items-center gap-3 text-[10px] lg:text-xs text-text-secondary font-bold uppercase tracking-[0.3em] italic">
                        <span>Ops Coordination</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <span>Tactical Mesh</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                        <span>Instant Support</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "px-6 py-4 rounded-[28px] border flex items-center gap-4 transition-all shadow-3xl",
                        status === 'safe' 
                            ? "bg-stadium-card border-stadium-border" 
                            : "bg-red-950/20 border-danger-sos"
                    )}>
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shadow-inner",
                            status === 'safe' ? "bg-electric-green/10 text-electric-green" : "bg-red-600 text-white"
                        )}>
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest leading-none mb-1">Grid Integrity</p>
                            <p className="text-base font-black text-white italic leading-none uppercase">{status === 'safe' ? 'Verified Safe' : 'Alert Active'}</p>
                        </div>
                        {status !== 'safe' && (
                            <button 
                                onClick={() => {
                                    setStatus('safe');
                                    setPanicActive(false);
                                }}
                                className="ml-2 bg-white text-black px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-col gap-16 items-center">
                {/* Tactical SOS Center */}
                <div className="w-full max-w-2xl">
                    <section className="bg-stadium-card border border-stadium-border rounded-[32px] p-6 text-center space-y-6 shadow-3xl relative overflow-hidden group glass-card">
                        <div className="absolute inset-0 bg-danger-sos/[0.01] hover:bg-danger-sos/[0.03] transition-colors" />
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-danger-sos/30 to-transparent" />
                        
                        <div className="space-y-2 relative z-10">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 italic leading-none">Emergency Uplink</h3>
                            <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest leading-relaxed">Secured Line • 5s Delay Guard</p>
                        </div>

                        <div className="relative flex items-center justify-center py-2">
                            <motion.button 
                                whileTap={{ scale: 0.94 }}
                                onClick={handlePanicClick}
                                className={cn(
                                    "w-36 h-36 rounded-full border-[3px] flex flex-col items-center justify-center relative transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)]",
                                    sosCountdown !== null 
                                        ? "bg-danger-sos border-white shadow-[0_0_80px_#ef4444]" 
                                        : "bg-[#09090b] border-danger-sos/20 hover:border-danger-sos/60"
                                )}
                            >
                                {sosCountdown !== null ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-black text-white italic tracking-tighter leading-none">{sosCountdown}</span>
                                        <span className="text-[8px] font-black text-white/60 tracking-[0.3em] uppercase mt-2 italic">Abort</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute top-8 flex gap-1">
                                            <div className="w-1 h-1 rounded-full bg-danger-sos/40 animate-pulse" />
                                            <div className="w-1 h-1 rounded-full bg-danger-sos/20" />
                                        </div>
                                        <AlertTriangle size={48} className="text-danger-sos mb-1.5 transition-transform group-hover:scale-105" fill="currentColor" />
                                        <span className="text-lg font-black text-white italic tracking-tighter leading-none uppercase">Trigger</span>
                                        <span className="text-[8px] font-black text-danger-sos tracking-[0.4em] uppercase">SOS</span>
                                    </>
                                )}
                                <div className="absolute -inset-6 border border-danger-sos/5 rounded-full animate-[ping_4s_infinite]" />
                            </motion.button>
                        </div>

                        <div className="space-y-4 relative z-10 pt-2">
                            <a 
                                href="tel:100"
                                className="flex items-center justify-center gap-4 w-full bg-danger-sos/5 border border-danger-sos/10 text-danger-sos py-5 rounded-[32px] group hover:bg-danger-sos hover:text-white transition-all shadow-xl"
                            >
                                <div className="w-10 h-10 bg-danger-sos/10 text-danger-sos rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-danger-sos transition-colors">
                                    <Phone size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 opacity-60 italic">Emergency Dispatch</p>
                                    <p className="text-2xl font-black italic tracking-tighter leading-none uppercase">Line: 100</p>
                                </div>
                            </a>
                        </div>
                    </section>
                </div>                {/* Intelligence Feed & Alerts */}
                <div className="w-full max-w-3xl space-y-12">
                    <div className="flex flex-col gap-12">
                        {/* Live Radio Log */}
                        <section className="space-y-5 h-full flex flex-col">
                             <div className="flex items-center justify-between px-2 flex-shrink-0">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 italic flex items-center gap-3">
                                    <Radio size={14} className="text-electric-green" /> Command Feed
                                </h3>
                                <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-full border border-stadium-border shadow-xl">
                                    <div className="w-1.5 h-1.5 rounded-full bg-electric-green animate-pulse" />
                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Live Log</span>
                                </div>
                             </div>

                             <div className="flex-1 min-h-0">
                                <div className="bg-stadium-card border border-stadium-border rounded-[40px] overflow-hidden shadow-2xl h-full flex flex-col glass-card">
                                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-px bg-white/[0.02]">
                                        {[
                                            { time: '2M AGO', type: 'ADMIN', content: 'Post-game fireworks starting in 15m. All exit nodes primed.', color: 'border-electric-green/20', icon: Zap },
                                            { time: '12M AGO', type: 'SECURITY', content: 'Heavy congestion detected at Gate 4. Rerouting Level 2 guests.', color: 'border-white/5', icon: ShieldCheck },
                                            { time: '45M AGO', type: 'WEATHER', content: 'Zero precipitation expected. Thermal stability maintained.', color: 'border-white/5', icon: Radio }
                                        ].map((alert, i) => (
                                            <div key={i} className="bg-stadium-card p-6 relative overflow-hidden transition-all group hover:bg-white/[0.01] glass-card">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors" />
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <alert.icon size={12} className={alert.type === 'ADMIN' ? 'text-electric-green' : 'text-zinc-600'} />
                                                        <span className="text-[9px] text-zinc-500 font-black tracking-[0.2em] italic uppercase">{alert.type} status</span>
                                                    </div>
                                                    <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{alert.time}</span>
                                                </div>
                                                <p className="text-base font-black text-zinc-300 italic leading-tight uppercase tracking-tight">{alert.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-zinc-950/20 border-t border-white/[0.02]">
                                        <div className="flex items-center justify-between text-[8px] font-black text-zinc-600 uppercase tracking-widest italic">
                                            <span>Relay Node: Stadium Mesh A</span>
                                            <span>Transmission Stable</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </section>

                        {/* Group Coordination Sidebar */}
                        <section className="space-y-5 h-full flex flex-col">
                            <div className="flex items-center justify-between px-2 flex-shrink-0">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 italic flex items-center gap-3">
                                    <Users size={14} className="text-purple-400" /> Bio-Sync Mesh
                                </h3>
                                <button className="text-purple-400 text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-purple-400/10 transition-all border border-purple-400/20 px-4 py-2 rounded-full bg-purple-400/5 shadow-xl">
                                    <UserPlus size={12} /> Invite
                                </button>
                            </div>

                            <div className="flex-1 min-h-0">
                                <div className="bg-stadium-card border border-stadium-border rounded-[40px] overflow-hidden shadow-2xl h-full flex flex-col glass-card">
                                    <div className="divide-y divide-white/[0.03] overflow-y-auto no-scrollbar">
                                        {[
                                            { name: "Sarah (Lead)", pos: "SEC 104, ROW G", status: "STATIONARY", battery: 84, color: 'text-electric-green' },
                                            { name: "Jake", pos: "NORTH CONCOURSE", status: "TRANSIT", battery: 22, color: 'text-orange-400' },
                                            { name: "Emma", pos: "VIP LOUNGE 3", status: "SECURE", battery: 98, color: 'text-purple-400' }
                                        ].map((user, i) => (
                                            <div key={i} className="p-5 lg:p-6 flex items-center justify-between hover:bg-white/[0.01] transition-all group glass-card">
                                                <div className="flex items-center gap-4 lg:gap-6">
                                                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-stadium-black border border-stadium-border p-1 shadow-inner relative flex-shrink-0 group-hover:border-zinc-700 transition-colors">
                                                        <img src={`https://picsum.photos/seed/${user.name}/160/160`} alt={user.name} className="w-full h-full rounded-lg lg:rounded-xl object-cover grayscale-[0.3]" referrerPolicy="no-referrer" />
                                                        <AnimatePresence>
                                                            {pingedUser === user.name && (
                                                                <motion.div 
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    exit={{ opacity: 0 }}
                                                                    className="absolute inset-0 bg-electric-green/40 backdrop-blur-[2px] flex items-center justify-center rounded-lg lg:rounded-xl"
                                                                >
                                                                    <Loader2 size={16} className="text-white animate-spin" />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-base lg:text-lg font-black text-white italic tracking-tighter uppercase leading-none mb-1 truncate">{user.name}</h4>
                                                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1.5">
                                                            <MapPin size={8} />
                                                            <p className="text-[8px] font-black tracking-widest uppercase truncate">{user.pos}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={cn("w-1 h-1 rounded-full animate-pulse", user.color.replace('text-', 'bg-'))} />
                                                            <span className={cn("text-[7px] font-black uppercase tracking-widest italic", user.color)}>
                                                                {user.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                                    <div className="flex items-center gap-2 bg-zinc-950/50 px-2.5 py-1 rounded-lg border border-white/5">
                                                        <div className="w-6 h-3 bg-zinc-900 rounded-[2px] border border-white/5 p-0.5 overflow-hidden">
                                                            <div className={cn("h-full rounded-[1px] transition-all duration-1000", user.battery < 30 ? "bg-red-600" : "bg-electric-green")} style={{ width: `${user.battery}%` }} />
                                                        </div>
                                                        <span className="text-[8px] font-black text-zinc-500 italic leading-none">{user.battery}%</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => handlePing(user.name)}
                                                        className={cn(
                                                            "px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-1.5",
                                                            pingedUser === user.name 
                                                                ? "bg-electric-green text-black animate-pulse" 
                                                                : "bg-zinc-900 border border-stadium-border text-zinc-400 hover:text-white hover:border-zinc-600"
                                                        )}
                                                    >
                                                        {pingedUser === user.name ? 'PINGING' : <><Signal size={10} /> Ping</>}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-zinc-950/20 border-t border-white/[0.02]">
                                        <div className="flex items-center justify-between text-[8px] font-black text-zinc-600 uppercase tracking-widest italic">
                                            <span>Active Cluster: North Sector</span>
                                            <span>3 Nodes Online</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </section>
                    </div>

                        {/* Operational Support Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-stadium-border">
                        {[
                            { label: 'Map Mesh', icon: MapPin, desc: 'Live Coordinate Sync', color: 'text-electric-green' },
                            { label: 'Medical ID', icon: Smartphone, desc: 'Adaptive Bio Data', color: 'text-purple-400' },
                            { label: 'Access Log', icon: Wifi, desc: 'Secure Auth History', color: 'text-orange-400' }
                        ].map((node, i) => (
                            <div key={i} className="bg-stadium-card border border-stadium-border p-6 rounded-[32px] flex items-center gap-4 group hover:border-zinc-700 transition-all shadow-xl glass-card">
                                <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-600 border border-white/[0.03] group-hover:text-white transition-colors shadow-inner">
                                    <node.icon size={20} className={node.color} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-white italic uppercase tracking-tight leading-none mb-1">{node.label}</p>
                                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{node.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Emergency Modal Overlay */}
            <AnimatePresence>
                {panicActive && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#060606]/98 z-[200] p-6 lg:p-16 flex flex-col items-center overflow-y-auto text-center backdrop-blur-3xl no-scrollbar py-20 lg:py-32"
                        role="dialog"
                        aria-modal="true"
                    >
                         <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-danger-sos/10 rounded-full blur-[200px] animate-pulse" />
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-danger-sos shadow-[0_0_120px_#ef4444]" />
                            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-danger-sos shadow-[0_0_120px_#ef4444]" />
                        </div>

                        <button 
                            onClick={() => {
                                setPanicActive(false);
                                setStatus('safe');
                            }}
                            className="absolute top-12 right-12 p-6 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-90 group z-50 shadow-2xl"
                        >
                            <X size={36} className="text-zinc-500 group-hover:text-white" />
                        </button>

                        <div className="w-56 h-56 rounded-full border-[6px] border-danger-sos flex items-center justify-center text-danger-sos animate-[pulse_1s_infinite] shadow-[0_0_120px_rgba(239,68,68,0.4)] mb-12 relative">
                             <AlertTriangle size={110} fill="currentColor" className="opacity-90" />
                             <div className="absolute -inset-12 border-4 border-danger-sos/10 rounded-full animate-[ping_3s_infinite]" />
                             <div className="absolute -inset-24 border-2 border-danger-sos/5 rounded-full animate-[ping_5s_infinite]" />
                        </div>

                        <div className="mb-14 space-y-6 max-w-4xl">
                            <h2 className="text-4xl lg:text-7xl font-black text-white italic leading-[0.85] uppercase tracking-tighter">Signal <span className="text-danger-sos">Transmitted</span></h2>
                            <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-xs lg:text-base italic">Command Center Rerouting Immediate Intercept Unit</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl relative z-10 px-4">
                            <div className="bg-[#121214] border border-danger-sos/20 p-10 rounded-[48px] space-y-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] text-left relative overflow-hidden">
                                 <div className="absolute top-0 right-0 p-8 flex gap-2">
                                    <div className="w-1.5 h-6 bg-danger-sos rounded-full animate-bounce" />
                                    <div className="w-1.5 h-4 bg-danger-sos rounded-full animate-bounce delay-150" />
                                 </div>
                                 <div className="flex items-center gap-4 text-white pt-2">
                                    <div className="w-4 h-4 bg-danger-sos rounded-full animate-ping" />
                                    <span className="font-black text-[10px] uppercase tracking-[0.4em] italic leading-none">Field Logic Active</span>
                                 </div>
                                 <p className="text-xl lg:text-2xl font-black text-zinc-100 italic leading-[1.1] uppercase tracking-tight">
                                    "Lead Node Sarah, secure current position. Unit Alpha-09 is 54m from your terminal. Estimated intercept in 18s."
                                 </p>
                                 <div className="flex items-center gap-4 text-zinc-500 pt-8 border-t border-white/5">
                                    <div className="p-2.5 bg-zinc-950 rounded-xl border border-white/5">
                                        <MapPin size={20} className="text-danger-sos" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest italic monospaced">COORD: 34.0522°N // 118.2437°W</span>
                                 </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <a 
                                    href="tel:100"
                                    className="w-full bg-danger-sos text-white h-32 rounded-[48px] font-black uppercase tracking-[0.2em] text-3xl shadow-[0_30px_90px_rgba(239,68,68,0.4)] hover:brightness-110 hover:-translate-y-2 transition-all active:scale-95 flex items-center justify-center gap-6 border border-white/20"
                                >
                                    <Phone size={36} fill="white" /> Call 100
                                </a>
                                <button 
                                    onClick={() => {
                                        setPanicActive(false);
                                        setStatus('safe');
                                    }}
                                    className="w-full bg-white/[0.03] border border-white/10 text-zinc-600 font-black uppercase tracking-[0.4em] py-8 rounded-[40px] hover:text-white hover:bg-white/5 transition-all text-[10px] italic shadow-2xl"
                                >
                                    Reset Terminal • False Alert
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
