import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Clock, 
    Zap, 
    ArrowRight, 
    Plus, 
    ShoppingBag,
    Star,
    Flame,
    X,
    Loader2,
    ShieldCheck,
    ChevronRight,
    Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Stand {
    id: string;
    name: string;
    type: string;
    wait: number; // in mins
    rating: number;
    popular: string;
    isHot: boolean;
}

const STANDS: Stand[] = [
    { id: '1', name: 'Prime Grill', type: 'Burgers & Fries', wait: 4, rating: 4.8, popular: 'Monster Burger', isHot: true },
    { id: '2', name: 'Taco Stadium', type: 'Mexican', wait: 12, rating: 4.5, popular: 'Street Taco Pack', isHot: false },
    { id: '3', name: 'Draft Express', type: 'Drinks & Beer', wait: 2, rating: 4.9, popular: 'Local Craft IPA', isHot: true },
    { id: '4', name: 'Pizza Corner', type: 'Italian', wait: 8, rating: 4.2, popular: 'Pepperoni Slice', isHot: false },
];

export const ZeroWaitConcessions: React.FC = () => {
    const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
    const [cart, setCart] = useState<{name: string, price: string, count: number, standName?: string}[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const addToCart = (name: string, price: string, standName: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.name === name);
            if (existing) return prev.map(i => i.name === name ? {...i, count: i.count + 1} : i);
            return [...prev, { name, price, count: 1, standName }];
        });
    };

    const cartTotal = cart.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.count), 0).toFixed(2);
    const cartCount = cart.reduce((a, b) => a + b.count, 0);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            setOrderSuccess(true);
            setCart([]);
            setTimeout(() => {
                setOrderSuccess(false);
                setShowCart(false);
                setSelectedStand(null);
            }, 3000);
        }, 2000);
    };

    const filteredStands = selectedCategory === 'All' 
        ? STANDS 
        : STANDS.filter(s => s.type.toLowerCase().includes(selectedCategory.toLowerCase()));

    return (
        <div className="p-6 lg:p-10 space-y-8 lg:space-y-12 max-w-7xl mx-auto bg-stadium-black min-h-screen">
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stadium-border pb-8">
                <div>
                    <h2 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">ZeroWait<span className="text-electric-green"> Eats</span></h2>
                    <p className="text-xs lg:text-sm text-text-secondary font-bold uppercase tracking-[0.3em] mt-2 italic">Priority Concession Network • Operational Dashboard</p>
                </div>
                <div className="flex items-center gap-4">
                     <div className="bg-electric-green/10 border border-electric-green/20 px-6 py-4 rounded-3xl flex items-center gap-6">
                        <ShoppingBag size={24} className="text-electric-green" />
                        <div>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Global Order Total</p>
                            <p className="text-xl font-black text-white italic">${cartTotal}</p>
                        </div>
                        {cartCount > 0 && (
                            <button 
                                onClick={() => setShowCart(true)}
                                className="ml-4 bg-electric-green text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-electric-green/20"
                            >
                                Checkout ({cartCount})
                            </button>
                        )}
                     </div>
                </div>
            </header>

            {/* Halftime Alert Banner - Responsive */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-electric-green text-black px-8 py-6 rounded-[32px] shadow-xl flex items-center justify-between relative overflow-hidden group"
            >
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-black/5 skew-x-12 translate-x-12" />
                <div className="flex items-center space-x-6 relative z-10">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 opaque-70">Predictive Flow Alert</p>
                        <p className="text-xl lg:text-2xl font-black leading-tight italic uppercase tracking-tighter">Halftime Surge Predicted in 12m. Secure your priority slot now.</p>
                    </div>
                </div>
                <div className="hidden lg:block relative z-10">
                     <button className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                        Pre-Order Now
                     </button>
                </div>
            </motion.div>

            {/* Content Sidebar Layout on Large Screens */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Categories Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 px-2 lg:mb-6">Refine Feed</h3>
                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0 gap-3">
                        {['All', 'Burgers', 'Mexican', 'Drinks', 'Healthy', 'Snacks'].map((cat, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-6 lg:px-8 py-4 rounded-[20px] text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap border transition-all duration-300 text-left flex items-center justify-between group glass-card",
                                    selectedCategory === cat
                                        ? "bg-white text-black border-white shadow-xl shadow-white/5" 
                                        : "bg-stadium-card text-text-secondary border-stadium-border hover:border-zinc-700 hover:text-white"
                                )}
                            >
                                {cat}
                                {selectedCategory === cat && <ChevronRight size={14} />}
                            </button>
                        ))}
                    </div>

                    {/* Operational Stats for Concessions */}
                    <div className="hidden lg:block bg-stadium-card border border-stadium-border p-8 rounded-[32px] mt-10 glass-card">
                        <div className="flex items-center gap-3 mb-6 text-electric-green">
                            <Activity size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Network Health</span>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: 'Average Prep', val: '4.2m', color: 'text-electric-green' },
                                { label: 'Peak Capacity', val: '88%', color: 'text-yellow-500' },
                                { label: 'Supply Chain', val: 'Optimal', color: 'text-electric-green' },
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-zinc-800 pb-2">
                                    <span className="text-[10px] text-zinc-500 uppercase font-black">{stat.label}</span>
                                    <span className={cn("text-sm font-black italic", stat.color)}>{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Stands Grid */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {filteredStands.map((stand) => (
                            <motion.div 
                                key={stand.id}
                                layoutId={stand.id}
                                onClick={() => setSelectedStand(stand)}
                                className="bg-stadium-card border border-stadium-border rounded-[32px] p-8 cursor-pointer hover:border-electric-green/30 transition-all active:scale-[0.99] shadow-xl group border-l-4 border-l-transparent hover:border-l-electric-green glass-card"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">{stand.name}</h3>
                                            {stand.isHot && <Flame size={18} className="text-orange-500 fill-current" />}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-text-secondary">{stand.type}</span>
                                    </div>
                                    <div className="bg-zinc-950/80 border border-stadium-border rounded-2xl p-4 text-center min-w-[80px] shadow-inner">
                                        <p className="text-2xl font-black text-electric-green leading-none italic font-mono tracking-tighter">{stand.wait}<span className="text-[10px] not-italic ml-0.5 text-zinc-600">M</span></p>
                                        <p className="text-[8px] text-text-secondary font-black uppercase tracking-[0.2em] mt-2">Prep Time</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-12 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="flex items-center space-x-6">
                                        <span className="flex items-center gap-2 text-xs font-black text-white italic">
                                            <Star size={14} fill="#22c55e" className="text-electric-green" /> {stand.rating}
                                        </span>
                                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest truncate max-w-[120px]">Top: <span className="text-white italic">{stand.popular}</span></p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-electric-green text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Expansion Modals handled for Website Screen Sizes */}
            <AnimatePresence>
                {selectedStand && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStand(null)}
                            className="fixed inset-0 bg-black/90 z-[60] backdrop-blur-xl"
                        />
                        <motion.div 
                            layoutId={selectedStand.id}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-[#09090b] rounded-[48px] z-[70] p-12 lg:p-16 border border-white/10 shadow-3xl overflow-y-auto no-scrollbar"
                        >
                            <button 
                                onClick={() => setSelectedStand(null)}
                                className="absolute top-8 right-8 p-3 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="lg:w-1/3">
                                    <div className="aspect-video lg:aspect-square bg-zinc-900 rounded-[32px] overflow-hidden mb-8 border border-stadium-border">
                                        <img src={`https://picsum.photos/seed/${selectedStand.id}/600/600`} alt="shop" className="w-full h-full object-cover grayscale-[0.2]" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="flex justify-between items-end border-b border-stadium-border pb-6">
                                        <div>
                                            <h2 className="text-4xl font-black mb-2 text-white italic tracking-tighter uppercase leading-none">
                                                {selectedStand.name}
                                            </h2>
                                            <div className="flex items-center space-x-4">
                                                <span className="bg-electric-green/10 text-electric-green text-[10px] font-black px-3 py-1 rounded-lg border border-electric-green/20 uppercase tracking-widest">VIP Express Lane</span>
                                                <span className="text-xs text-text-secondary font-black uppercase tracking-[0.15em]">{selectedStand.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <div className="p-6 bg-stadium-card rounded-2xl border border-stadium-border">
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Queue Delay</p>
                                            <p className="text-2xl font-black text-electric-green italic">{selectedStand.wait}M</p>
                                        </div>
                                        <div className="p-6 bg-stadium-card rounded-2xl border border-stadium-border">
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Success Rate</p>
                                            <p className="text-2xl font-black text-white italic">99%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-2/3 space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 mb-8 flex items-center gap-4">
                                        Curated Operational Menu <div className="h-[1px] bg-zinc-800 flex-1" />
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { name: selectedStand.popular, price: '$14.99', desc: 'Premium ingredients, rapid preparation protocol' },
                                            { name: 'Stadium Signature Pack', price: '$22.50', desc: 'Bundled experience for maximum grid efficiency' },
                                            { name: 'Cold Beverage Set', price: '$8.00', desc: 'Double chilled hydration' },
                                            { name: 'Express Snack', price: '$6.50', desc: 'Low density collection time' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col justify-between p-8 bg-stadium-card rounded-[32px] border border-stadium-border hover:border-electric-green/30 transition-all group glass-card">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <p className="font-black text-white text-lg tracking-tight uppercase italic">{item.name}</p>
                                                        <p className="text-lg font-black text-electric-green italic ml-4">{item.price}</p>
                                                    </div>
                                                    <p className="text-[11px] text-text-secondary leading-snug mb-8">{item.desc}</p>
                                                </div>
                                                <button 
                                                    onClick={() => addToCart(item.name, item.price, selectedStand.name)}
                                                    className="w-full bg-zinc-950 py-4 rounded-2xl border border-stadium-border flex items-center justify-center gap-3 text-white transition-all hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px]"
                                                >
                                                     <Plus size={18} /> Add to Tab
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Order/Success Overlays as expansive full-screen layers */}
            <AnimatePresence>
                {showCart && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-end">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isCheckingOut && setShowCart(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative z-[90] h-screen w-full max-w-lg bg-stadium-black border-l border-stadium-border p-12 lg:p-16 flex flex-col shadow-3xl"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Current <span className="text-electric-green">Tab</span></h3>
                                <button 
                                    onClick={() => setShowCart(false)}
                                    className="p-4 bg-zinc-900 rounded-2xl text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-96 text-zinc-600 gap-4">
                                        <ShoppingBag size={80} className="opacity-10" />
                                        <p className="text-sm font-black uppercase tracking-widest italic tracking-tight">Active Tab is Null</p>
                                    </div>
                                ) : (
                                    cart.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center p-8 bg-stadium-card rounded-3xl border border-stadium-border shadow-lg relative overflow-hidden group glass-card">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-electric-green opacity-30" />
                                            <div>
                                                <p className="font-black text-lg text-white italic uppercase tracking-tighter">{item.name}</p>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Source: {item.standName} • Qty: {item.count} </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-black text-electric-green italic">{item.price}</p>
                                                <button 
                                                    onClick={() => setCart(prev => prev.filter(it => it.name !== item.name))} 
                                                    className="text-[9px] text-red-500 font-black uppercase tracking-widest mt-2 hover:underline"
                                                >
                                                    Discard
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="pt-10 border-t border-stadium-border mt-12">
                                <div className="flex justify-between items-end mb-10">
                                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Aggregated Final Tab</span>
                                    <span className="text-5xl font-black text-white italic tracking-tighter">${cartTotal}</span>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut || cart.length === 0}
                                    className="w-full bg-electric-green text-black font-black uppercase tracking-widest py-6 rounded-3xl flex items-center justify-center gap-4 shadow-3xl shadow-electric-green/10 active:scale-95 transition-all text-sm mb-6 disabled:opacity-30 italic"
                                >
                                    {isCheckingOut ? (
                                        <><Loader2 size={24} className="animate-spin" /> Authorizing Network Transaction...</>
                                    ) : (
                                        <>Finalize Priority Purchase <ArrowRight size={20} /></>
                                    )}
                                </button>
                                <div className="flex items-center justify-center gap-3 text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] italic">
                                    <ShieldCheck size={16} /> 256-BIT OPERATIONAL ENCRYPTION ACTIVE
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {orderSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8"
                    >
                         <div className="bg-stadium-card border border-electric-green/30 p-16 lg:p-24 rounded-[64px] max-w-2xl w-full text-center shadow-3xl relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-electric-green shadow-[0_0_30px_#22c55e]" />
                            <div className="w-28 h-28 bg-electric-green/10 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-electric-green/20">
                                <ShieldCheck className="text-electric-green" size={56} />
                            </div>
                            <h3 className="text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">Priority Intake <br/><span className="text-electric-green">Authorized</span></h3>
                            <p className="text-zinc-400 font-medium text-lg leading-relaxed mb-12 max-w-md mx-auto">
                                Order #STQ-4482 synced. Your temperature-controlled pickup box at <span className="text-white font-bold italic">Section 104</span> is ready for intake in <span className="text-electric-green font-black">2:44m</span>.
                            </p>
                            <button 
                                onClick={() => setOrderSuccess(false)}
                                className="bg-electric-green text-black px-16 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-electric-green/10"
                            >
                                Return to Command Center
                            </button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
