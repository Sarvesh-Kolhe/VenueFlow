import React from 'react';
import { 
  Navigation, 
  Utensils, 
  Activity, 
  Compass, 
  ShieldAlert,
  Home,
  ChevronRight,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';
import { type Module } from './BottomNav';

interface SidebarProps {
  activeModule: Module;
  onModuleChange: (module: Module) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Experience Hub' },
    { id: 'navigator', icon: Navigation, label: 'SmartFlow Navigator' },
    { id: 'concessions', icon: Utensils, label: 'ZeroWait Eats' },
    { id: 'pulse', icon: Activity, label: 'LivePulse Dashboard' },
    { id: 'compass', icon: Compass, label: 'Venue Compass' },
  ];

  const safetyTab = { id: 'safety', icon: ShieldAlert, label: 'SafetyNet SOS' };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen bg-stadium-black border-r border-stadium-border sticky top-0 py-8 px-6 overflow-y-auto">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black tracking-tighter text-[#fafafa] italic">
          VENUE<span className="text-electric-green">FLOW</span>
        </h1>
        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em] mt-1">
          Operational Core
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-4 px-2">
          Management
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onModuleChange(tab.id as Module)}
              className={cn(
                "w-full flex items-center justify-between group px-4 py-3 rounded-2xl transition-all duration-300 border",
                isActive 
                  ? "bg-electric-green/5 border-electric-green text-white" 
                  : "bg-transparent border-transparent text-text-secondary hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  isActive ? "bg-electric-green text-black" : "bg-stadium-card text-text-secondary"
                )}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-bold tracking-tight">{tab.label}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-electric-green" />}
            </button>
          );
        })}

        <div className="pt-8 mb-4">
           <div className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-4 px-2">
            Emergency
          </div>
          <button
            onClick={() => onModuleChange(safetyTab.id as Module)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border",
              activeModule === 'safety'
                ? "bg-red-500/10 border-red-500 text-white"
                : "bg-red-500 text-white border-transparent shadow-lg shadow-red-500/20 active:scale-95"
            )}
          >
            <div className="p-2 bg-white/10 rounded-xl">
              <ShieldAlert size={18} />
            </div>
            <span className="text-sm font-black uppercase tracking-wider">{safetyTab.label}</span>
          </button>
        </div>
      </nav>

      <div className="mt-auto space-y-4 pt-10 px-2">
        <div className="flex items-center gap-4 py-4 border-t border-stadium-border mb-4">
            <div className="w-10 h-10 rounded-full border border-stadium-border overflow-hidden">
                <img 
                    src="https://picsum.photos/seed/user123/100/100" 
                    alt="User" 
                    className="w-full h-full object-cover grayscale-[0.2]"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="flex-1">
                <p className="text-xs font-black text-white tracking-tight uppercase">S. Kolhe</p>
                <p className="text-[10px] text-electric-green font-bold">VIP Platinum</p>
            </div>
            <button 
                onClick={() => onModuleChange('settings')}
                className={cn(
                    "p-2 rounded-xl transition-all",
                    activeModule === 'settings' ? "bg-electric-green text-black" : "text-zinc-600 hover:text-white"
                )}
            >
                <Settings size={18} />
            </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-stadium-border text-zinc-500 hover:text-white hover:border-white/20 transition-all text-sm font-bold">
            <LogOut size={16} />
            Log Out
        </button>
      </div>
    </aside>
  );
};
