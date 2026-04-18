import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
    Bell, 
    Shield, 
    Accessibility, 
    User, 
    Lock, 
    Eye, 
    EyeOff, 
    Volume2, 
    Smartphone,
    CreditCard,
    ChevronRight,
    Search,
    Heart,
    Map,
    Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

export const SettingsModule: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'general' | 'notifications' | 'accessibility' | 'account'>('general');

    const sections = [
        { id: 'general', label: 'General', icon: Map },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
        { id: 'account', label: 'Account', icon: User },
    ];

    return (
        <div className="p-6 lg:p-10 space-y-10 max-w-6xl mx-auto bg-stadium-black min-h-screen">
            <header className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-black text-electric-green uppercase tracking-[0.3em] italic">
                    <Shield size={14} /> System Core
                </div>
                <h2 className="text-4xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">Command<span className="text-electric-green"> Center</span></h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs italic max-w-2xl">
                    Configure your personalized stadium operating system experience. Manage intelligence feeds, navigation accessibility, and VIP account security.
                </p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                {/* Navigation Sidebar */}
                <div className="xl:col-span-3 space-y-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id as any)}
                            className={cn(
                                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all border group",
                                activeSection === section.id 
                                    ? "bg-electric-green/10 border-electric-green text-white shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                                    : "bg-stadium-card border-stadium-border text-zinc-500 hover:text-white"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-colors",
                                activeSection === section.id ? "bg-electric-green text-black" : "bg-stadium-black text-zinc-600 group-hover:text-zinc-400"
                            )}>
                                <section.icon size={18} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest italic">{section.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="xl:col-span-9 space-y-8">
                    <div className="bg-stadium-card border border-stadium-border rounded-[48px] p-8 lg:p-12 shadow-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 flex gap-2">
                             <div className="w-1 h-3 bg-electric-green/40 rounded-full" />
                             <div className="w-1 h-2 bg-electric-green/20 rounded-full" />
                        </div>

                        {activeSection === 'notifications' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Notification Preferences</h3>
                                    <p className="text-zinc-500 text-sm font-medium">Control how and when you receive intelligence updates.</p>
                                </div>

                                <div className="space-y-6">
                                    <ToggleSetting 
                                        title="Push Transmissions" 
                                        desc="Real-time alerts for flow state and emergency SOS pings." 
                                        defaultChecked={true}
                                    />
                                    <ToggleSetting 
                                        title="Logic Feed Sounds" 
                                        desc="Auditory confirmation for incoming command center logs." 
                                        defaultChecked={false}
                                    />
                                    <ToggleSetting 
                                        title="proximity pings" 
                                        desc="Alerts when you are near friends in the Bio-Sync mesh." 
                                        defaultChecked={true}
                                    />
                                    <ToggleSetting 
                                        title="Concession Updates" 
                                        desc="Instant notification when your order is ready for pickup." 
                                        defaultChecked={true}
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'accessibility' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Accessibility Guard</h3>
                                    <p className="text-zinc-500 text-sm font-medium">Customize the OS interface for clarity and comfort.</p>
                                </div>

                                <div className="space-y-6">
                                    <ToggleSetting 
                                        title="High Contrast Mesh" 
                                        desc="Enhanced visual separation between UI elements and data feeds." 
                                        defaultChecked={false}
                                    />
                                    <ToggleSetting 
                                        title="Tactical Motion" 
                                        desc="Reduces system animations for a static, low-latency experience." 
                                        defaultChecked={false}
                                    />
                                    <ToggleSetting 
                                        title="Large Type Protocol" 
                                        desc="Increases font size across all terminal and navigation modules." 
                                        defaultChecked={false}
                                    />
                                    <ToggleSetting 
                                        title="Screen Reader Sync" 
                                        desc="Optimizes data labels for situational awareness via voice." 
                                        defaultChecked={true}
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === 'account' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">VIP Identity Management</h3>
                                    <p className="text-zinc-500 text-sm font-medium">Secure your biometric credentials and seat logic.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ActionButton 
                                        icon={Lock} 
                                        title="Security Keys" 
                                        desc="Manage 2FA and session auth" 
                                    />
                                    <ActionButton 
                                        icon={CreditCard} 
                                        title="Payment Logic" 
                                        desc="VIP express checkout methods" 
                                    />
                                    <ActionButton 
                                        icon={Smartphone} 
                                        title="Linked Terminals" 
                                        desc="Manage authorized stadium devices" 
                                    />
                                    <ActionButton 
                                        icon={Eye} 
                                        title="Privacy Shield" 
                                        desc="Control data tracking visibility" 
                                    />
                                </div>

                                <div className="pt-10 border-t border-white/5 space-y-6">
                                     <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Personal Data</h4>
                                     <div className="space-y-4">
                                        <div className="flex items-center justify-between p-6 bg-stadium-black border border-white/5 rounded-[32px]">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl border border-white/10 overflow-hidden">
                                                     <img src="https://picsum.photos/seed/user-main/160/160" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-black italic uppercase tracking-tight">Sarvesh Kolhe</p>
                                                    <p className="text-[10px] text-electric-green font-bold uppercase tracking-widest">VIP Platinum Member</p>
                                                </div>
                                            </div>
                                            <button className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-full">
                                                Modify Node
                                            </button>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'general' && (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">General Directives</h3>
                                    <p className="text-zinc-500 text-sm font-medium">Standard operating parameters for the stadium core.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                     {[
                                        { label: 'Language Logic', val: 'Digital English', icon: Map },
                                        { label: 'Time Horizon', val: 'UTC+5:30 (Current)', icon: Zap },
                                        { label: 'Data Sync Mode', val: 'Ultra-Low Latency', icon: Smartphone }
                                     ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 bg-stadium-black border border-white/5 rounded-[32px] group hover:border-zinc-700 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="p-3 bg-zinc-900 rounded-xl text-zinc-600 group-hover:text-white transition-colors">
                                                    <item.icon size={20} />
                                                </div>
                                                <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">{item.label}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-black text-electric-green/80 italic uppercase tracking-widest">{item.val}</span>
                                                <ChevronRight size={16} className="text-zinc-800" />
                                            </div>
                                        </div>
                                     ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 bg-electric-green/5 border border-electric-green/10 rounded-[32px] flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-stadium-card rounded-2xl flex items-center justify-center text-electric-green shadow-inner">
                                <Heart size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-white italic uppercase tracking-tight">Need Protocol Support?</p>
                                <p className="text-[10px] text-zinc-500 font-medium tracking-wide">Our automated guard is ready 24/7 for VIP assistance.</p>
                            </div>
                         </div>
                         <button className="bg-electric-green text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
                            Request Uplink
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToggleSetting: React.FC<{ title: string; desc: string; defaultChecked?: boolean }> = ({ title, desc, defaultChecked = false }) => {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div className="flex items-center justify-between p-6 bg-stadium-black border border-white/5 rounded-[32px] group transition-all hover:border-zinc-700">
            <div className="space-y-1">
                <p className="text-lg font-black text-white italic uppercase tracking-tight group-hover:text-electric-green transition-colors">{title}</p>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-md">{desc}</p>
            </div>
            <button 
                onClick={() => setChecked(!checked)}
                className={cn(
                    "w-14 h-8 rounded-full p-1 transition-all duration-300 relative border",
                    checked ? "bg-electric-green border-electric-green" : "bg-zinc-900 border-white/5"
                )}
            >
                <div className={cn(
                    "w-6 h-6 rounded-full transition-all duration-300 shadow-xl",
                    checked ? "translate-x-6 bg-black" : "translate-x-0 bg-zinc-700"
                )} />
            </button>
        </div>
    );
};

const ActionButton: React.FC<{ icon: any; title: string; desc: string }> = ({ icon: Icon, title, desc }) => (
    <button className="flex flex-col items-start p-8 bg-stadium-black border border-white/5 rounded-[40px] text-left group hover:border-zinc-700 transition-all hover:shadow-2xl">
        <div className="p-4 bg-zinc-900 rounded-2xl text-zinc-600 mb-6 group-hover:text-electric-green group-hover:bg-electric-green/10 transition-all">
            <Icon size={24} />
        </div>
        <p className="text-lg font-black text-white italic uppercase tracking-tight mb-2">{title}</p>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{desc}</p>
    </button>
);
