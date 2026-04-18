import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    MapPin, 
    Navigation2, 
    Accessibility, 
    Car, 
    Users,
    Search,
    PackageSearch,
    MessageSquare,
    CheckCircle2,
    X,
    Volume2,
    VolumeX,
    Navigation,
    Radio
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ParkingLot {
    id: string;
    name: string;
    level: string;
    occupancy: number; // 0 to 100
    proximityScore: number; // Lower is better (simulated distance)
    gateProximity: string;
}

const INITIAL_PARKING_LOTS: ParkingLot[] = [
    { id: '1', name: 'West Garage', level: 'P2', occupancy: 42, proximityScore: 2, gateProximity: 'Gate 4' },
    { id: '2', name: 'East Plaza', level: 'LVL 1', occupancy: 88, proximityScore: 5, gateProximity: 'Gate 1' },
    { id: '3', name: 'North Lot', level: 'Surface', occupancy: 15, proximityScore: 8, gateProximity: 'Gate 7' },
];

interface ReportedItem {
    id: string;
    description: string;
    location: string;
    timestamp: string;
    status: 'Searching' | 'Found' | 'Pending';
}

export const VenueCompass: React.FC = () => {
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [itemDesc, setItemDesc] = useState('');
    const [location, setLocation] = useState('');
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
    
    // Feature Persistence
    const [reportedItems, setReportedItems] = useState<ReportedItem[]>([]);
    const [activeDestination, setActiveDestination] = useState<string | null>(null);
    const [navStep, setNavStep] = useState(0);

    // Parking States
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>(INITIAL_PARKING_LOTS);
    const [selectedGate, setSelectedGate] = useState<string>('Gate 4');

    const speak = useCallback((text: string) => {
        if (!isSpeechEnabled || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }, [isSpeechEnabled]);

    // Simulated Navigation Steps
    const navInstructions = useMemo(() => [
        "Head straight towards the North Concourse",
        "Turn right at the Merchandise kiosk",
        "Proceed 20 yards to the escalators",
        "Continue past the Food Court",
        "Your destination is on the left"
    ], []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (activeDestination) {
            timer = setInterval(() => {
                setNavStep(prev => (prev + 1) % navInstructions.length);
                speak(navInstructions[(navStep + 1) % navInstructions.length]);
            }, 6000);
        }
        return () => clearInterval(timer);
    }, [activeDestination, navStep, navInstructions, speak]);

    // Simulated real-time parking updates
    useEffect(() => {
        const interval = setInterval(() => {
            setParkingLots(prev => prev.map(lot => ({
                ...lot,
                occupancy: Math.max(0, Math.min(100, lot.occupancy + (Math.random() > 0.5 ? 1 : -1)))
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const bestLot = useMemo(() => {
        return [...parkingLots].sort((a, b) => {
            if (a.gateProximity === selectedGate && b.gateProximity !== selectedGate) return -1;
            if (b.gateProximity === selectedGate && a.gateProximity !== selectedGate) return 1;
            return a.occupancy - b.occupancy;
        })[0];
    }, [parkingLots, selectedGate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setReportStatus('submitting');
        const announcement = `Reporting lost item: ${itemDesc} at ${location}. Submitting now.`;
        speak(announcement);
        
        setTimeout(() => {
            const newItem: ReportedItem = {
                id: Math.random().toString(36).substr(2, 9),
                description: itemDesc,
                location: location,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'Searching'
            };
            setReportedItems(prev => [newItem, ...prev]);
            setReportStatus('success');
            speak("Report received successfully. We will notify you if your item is found.");
            setTimeout(() => {
                setShowReportModal(false);
                setReportStatus('idle');
                setItemDesc('');
                setLocation('');
            }, 2500);
        }, 1500);
    };

    return (
        <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto bg-stadium-black min-h-screen">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stadium-border pb-8">
                <div>
                     <h2 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">Venue<span className="text-electric-green"> Compass</span></h2>
                    <p className="text-xs lg:text-sm text-text-secondary font-bold uppercase tracking-[0.3em] mt-2 italic">Indoor GPS • Precision Wayfinding • Level 2 Active</p>
                </div>
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                        className={cn(
                            "flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all shadow-xl group",
                            isSpeechEnabled 
                                ? "bg-electric-green text-black border-white" 
                                : "bg-stadium-card border-stadium-border text-text-secondary hover:text-white"
                        )}
                    >
                        {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{isSpeechEnabled ? "Voice Enabled" : "Voice Assist"}</span>
                    </button>
                    <div className="relative group hidden lg:block">
                        <input 
                            placeholder="SEARCH VENUE..." 
                            className="bg-stadium-card border border-stadium-border rounded-2xl pl-12 pr-6 py-3 text-xs font-black text-white focus:outline-none focus:border-electric-green/30 placeholder:text-zinc-700 w-64 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-hover:text-electric-green transition-colors" size={18} />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 items-start">
                {/* Left Side: Wayfinding Navigation */}
                <div className="xl:col-span-1 space-y-4">
                     <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 px-2 lg:mb-6 leading-none italic">Wayfinding Hub</h3>
                    {[
                        { label: 'My Entry Point', detail: 'SEC 204 • G-12', icon: MapPin, color: 'text-electric-green' },
                        { label: 'Premium Lounges', detail: 'LVL 3 • DIAMOND', icon: Users, color: 'text-purple-400' },
                        { label: 'Tactical Exits', detail: 'GATE 4 • 5 MIN', icon: Navigation2, color: 'text-orange-400' },
                        { label: 'Medical Station', detail: 'SEC 112 • CONCOURSE', icon: Accessibility, color: 'text-red-400' },
                    ].map((item, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                setActiveDestination(item.label);
                                speak(`Navigating to ${item.label}. ${navInstructions[0]}`);
                            }}
                            className={cn(
                                "w-full text-left p-6 rounded-[32px] border transition-all flex items-center gap-6 group",
                                activeDestination === item.label 
                                    ? "bg-white text-black border-white shadow-2xl scale-105 z-10" 
                                    : "bg-stadium-card border-stadium-border text-zinc-500 hover:border-zinc-700 hover:text-white"
                            )}
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                                activeDestination === item.label ? "bg-zinc-100 text-black" : "bg-zinc-900"
                            )}>
                                <item.icon className={cn(activeDestination === item.label ? "text-black" : item.color)} size={24} />
                            </div>
                            <div>
                                <p className="font-black text-sm uppercase italic tracking-tight">{item.label}</p>
                                <p className={cn("text-[10px] font-bold mt-1 uppercase tracking-widest", activeDestination === item.label ? "text-zinc-500" : "text-zinc-700")}>{item.detail}</p>
                            </div>
                        </button>
                    ))}

                    <div className="pt-8 space-y-4">
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 px-2 lg:mb-4 italic">Reporting Suite</h3>
                         <button 
                            onClick={() => setShowReportModal(true)}
                            className="w-full bg-electric-green/5 border border-electric-green/10 p-8 rounded-[40px] text-center group hover:bg-electric-green/10 transition-all flex flex-col items-center gap-4"
                         >
                            <div className="w-16 h-16 bg-electric-green text-black rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <PackageSearch size={32} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none mb-1">Lost & Found</h4>
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Active Recovery Protocol</p>
                            </div>
                         </button>
                    </div>
                </div>

                {/* Center: Expansive Map Interface */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex justify-between items-end px-2">
                        <div>
                             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 leading-none mb-2 italic">Tactical Field Analysis</h3>
                             <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-widest">Global Heatmap Sync Enabled</p>
                        </div>
                        <div className="flex bg-zinc-950 p-2 rounded-2xl border border-stadium-border">
                            {['L1', 'L2', 'L3', 'SUITES'].map((lvl, i) => (
                                <button 
                                    key={lvl} 
                                    className={cn(
                                        "px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all",
                                        lvl === 'L2' ? "bg-white text-black shadow-lg" : "text-zinc-600 hover:text-white"
                                    )}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="aspect-square lg:aspect-video bg-stadium-card border border-stadium-border rounded-[56px] relative overflow-hidden group shadow-3xl">
                         <img src="https://picsum.photos/seed/stadium-blueprint/1920/1080" alt="Venue Blueprint" className="w-full h-full object-cover opacity-10 grayscale group-hover:scale-105 transition-transform duration-[60s] ease-linear" referrerPolicy="no-referrer" />
                         
                         {/* Navigation Path Mockup */}
                         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                             <motion.path
                                d="M 100 800 L 300 600 L 500 700 L 800 400"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: activeDestination ? 1 : 0 }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                             />
                         </svg>

                         <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                animate={{ 
                                    x: activeDestination ? [0, 20, -20, 0] : 0,
                                    y: activeDestination ? [0, -30, 10, 0] : 0
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="w-8 h-8 bg-electric-green rounded-full shadow-[0_0_40px_#22c55e] relative z-20 flex items-center justify-center border-4 border-white"
                            >
                                <div className="absolute inset-0 bg-electric-green rounded-full animate-ping opacity-30" />
                                <div className="w-2 h-2 bg-black rounded-full" />
                            </motion.div>
                         </div>

                         <div className="absolute inset-x-12 bottom-12 z-30">
                            <AnimatePresence mode="wait">
                                {activeDestination ? (
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        className="bg-[#09090b]/90 backdrop-blur-3xl p-10 rounded-[48px] border border-white/10 flex items-center justify-between shadow-3xl"
                                    >
                                         <div className="flex items-center gap-8">
                                            <div className="w-20 h-20 bg-electric-green/10 rounded-3xl flex items-center justify-center text-electric-green shadow-inner border border-electric-green/20">
                                                <Navigation2 size={32} className="transform rotate-45 animate-pulse" fill="currentColor" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-2 leading-none italic">Route Active: {activeDestination}</p>
                                                <h4 className="text-3xl font-black text-white italic tracking-tighter leading-none uppercase">{navInstructions[navStep]}</h4>
                                            </div>
                                         </div>
                                         <button 
                                            onClick={() => setActiveDestination(null)}
                                            className="bg-red-600/10 border border-red-600/20 text-red-500 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600/20 transition-all"
                                         >
                                            Terminate Route
                                         </button>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-black/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/5 flex items-center justify-center text-zinc-600 italic uppercase font-black tracking-[0.4em] text-sm"
                                    >
                                        Waiting for Global Coordinates
                                    </motion.div>
                                )}
                            </AnimatePresence>
                         </div>
                    </div>
                </div>

                {/* Right Side: Parking Telemetry */}
                <div className="xl:col-span-1 space-y-8">
                    <section className="bg-stadium-card border border-stadium-border rounded-[48px] overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-stadium-border bg-white/[0.02]">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1 italic">Tele-Parking Base</span>
                                    <h4 className="text-3xl font-black text-white italic tracking-tighter leading-none uppercase">Node<span className="text-electric-green"> {bestLot.name.split(' ')[0]}</span></h4>
                                </div>
                                <div className="w-16 h-16 bg-electric-green/10 rounded-2xl flex items-center justify-center text-electric-green border border-electric-green/20 shadow-inner">
                                    <Car size={28} />
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex items-end justify-between">
                                    <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest italic">Live Occupancy</p>
                                    <p className="text-5xl font-black text-white italic tracking-tighter leading-none">{bestLot.occupancy}<span className="text-xl not-italic ml-1 opacity-20">%</span></p>
                                </div>
                                <div className="h-4 bg-zinc-950 rounded-full flex overflow-hidden p-[2px] border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${bestLot.occupancy}%` }}
                                        className={cn(
                                            "h-full rounded-full transition-all duration-1000",
                                            bestLot.occupancy > 80 ? "bg-red-600 shadow-[0_0_15px_#dc2626]" : "bg-electric-green shadow-[0_0_15px_#22c55e]"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-start gap-4 bg-zinc-950 p-6 rounded-3xl border border-white/[0.03]">
                                <Navigation className="text-electric-green mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <p className="text-xs font-black text-white italic uppercase tracking-tight mb-1">Optimized Path</p>
                                    <p className="text-[10px] text-zinc-600 font-bold leading-relaxed uppercase">
                                        Rerouted for <span className="text-electric-green">{selectedGate}</span> access node.
                                    </p>
                                </div>
                            </div>

                            <button className="w-full bg-white text-black py-6 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                                Anchor Path Link
                            </button>

                            <div className="space-y-3 pt-4 border-t border-stadium-border">
                                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] mb-4 italic">Sensor Clusters</p>
                                {parkingLots.filter(l => l.id !== bestLot.id).map(lot => (
                                    <div key={lot.id} className="flex items-center justify-between p-5 bg-zinc-950/40 rounded-2xl border border-white/[0.03] group hover:border-white/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-2 h-2 rounded-full", lot.occupancy > 80 ? "bg-red-600" : "bg-zinc-800")} />
                                            <div>
                                                <p className="text-xs font-black text-zinc-400 uppercase tracking-tighter leading-none mb-1">{lot.name}</p>
                                                <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest">{lot.gateProximity}</p>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-black text-white italic">{lot.occupancy}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {reportedItems.length > 0 && (
                        <motion.section 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 px-2 leading-none italic">Log Archives</h3>
                            <div className="space-y-4">
                                {reportedItems.map(item => (
                                    <div key={item.id} className="bg-stadium-card border border-stadium-border p-6 rounded-[32px] flex items-center justify-between shadow-xl relative overflow-hidden group">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-500 border border-stadium-border shadow-inner">
                                                <PackageSearch size={22} />
                                            </div>
                                            <div>
                                                <p className="font-black text-sm text-white tracking-tight uppercase italic mb-1">{item.description}</p>
                                                <p className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">{item.location} • {item.timestamp}</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-black text-electric-green bg-electric-green/10 px-3 py-1.5 rounded-xl border border-electric-green/20 uppercase italic tracking-widest shadow-inner">
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>

            {/* Lost Item Modal */}
            <AnimatePresence>
                {showReportModal && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !reportStatus.includes('submitting') && setShowReportModal(false)}
                            className="fixed inset-0 bg-black/98 z-[100] backdrop-blur-3xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="fixed inset-0 m-auto w-full max-w-2xl h-fit bg-[#09090b] rounded-[64px] z-[110] p-16 border border-white/10 shadow-3xl overflow-hidden"
                            role="dialog"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-electric-green/40 blur-lg" />
                            
                            <div className="flex justify-between items-start mb-16 relative z-10">
                                <div>
                                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2 leading-none">Initialize <span className="text-electric-green">Recovery Log</span></h2>
                                    <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.4em] italic">Stadium Intelligence Network Integration</p>
                                </div>
                                <button 
                                    onClick={() => setShowReportModal(false)}
                                    className="w-16 h-16 bg-stadium-card rounded-full border border-stadium-border flex items-center justify-center text-zinc-100 hover:text-white transition-all shadow-xl active:scale-90"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            {reportStatus === 'success' ? (
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-32 h-32 bg-electric-green/10 rounded-[48px] flex items-center justify-center mb-10 shadow-3xl border border-electric-green/20">
                                        <CheckCircle2 size={64} className="text-electric-green" />
                                    </div>
                                    <h3 className="text-4xl font-black text-white italic tracking-tighter mb-4 uppercase leading-none">Protocol Active</h3>
                                    <p className="text-sm text-zinc-500 font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-widest italic">
                                        Log anchored to stadium central hub. Personnel units dispatched for scanning.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600 pl-4 italic leading-none">Item Telemetry Type</label>
                                            <div className="relative">
                                                <input 
                                                    required
                                                    value={itemDesc}
                                                    onChange={(e) => setItemDesc(e.target.value)}
                                                    placeholder="Tactical Gear"
                                                    className="w-full bg-stadium-card border border-stadium-border rounded-[32px] px-8 py-6 text-base text-white focus:outline-none focus:border-electric-green/40 placeholder:text-zinc-800 font-black italic uppercase transition-all shadow-xl"
                                                />
                                                <PackageSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-800" size={24} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-600 pl-4 italic leading-none">Last Known Coordinates</label>
                                            <div className="relative">
                                                <input 
                                                    required
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    placeholder="Sector Delta-4"
                                                    className="w-full bg-stadium-card border border-stadium-border rounded-[32px] px-8 py-6 text-base text-white focus:outline-none focus:border-electric-green/40 placeholder:text-zinc-800 font-black italic uppercase transition-all shadow-xl"
                                                />
                                                <MapPin className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-800" size={24} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-electric-green/[0.03] border border-electric-green/10 p-10 rounded-[40px] flex items-center space-x-8 shadow-inner">
                                        <div className="w-16 h-16 bg-electric-green/10 rounded-2xl flex items-center justify-center border border-electric-green/20 flex-shrink-0 shadow-inner">
                                            <Radio className="text-electric-green" size={28} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white italic uppercase mb-1 leading-none tracking-tight">Intelligence Broadcast</p>
                                            <p className="text-[10px] text-zinc-600 font-black leading-relaxed uppercase tracking-[0.1em]">
                                                Manual staff protocols synchronized with your biometric signal.
                                            </p>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={reportStatus === 'submitting'}
                                        className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-8 rounded-[32px] text-xs shadow-3xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                                    >
                                        {reportStatus === 'submitting' ? (
                                            <span className="w-6 h-6 border-4 border-zinc-200 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            'Anchor Recovery Log'
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
