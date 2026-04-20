import React from 'react';
import { 
  Navigation, 
  Utensils, 
  Activity, 
  Compass, 
  ShieldAlert,
  Home
} from 'lucide-react';
import { cn } from '../lib/utils';

export type Module = 'dashboard' | 'navigator' | 'concessions' | 'pulse' | 'compass' | 'safety' | 'settings';

interface BottomNavProps {
  activeModule: Module;
  onModuleChange: (module: Module) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeModule, onModuleChange }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'navigator', icon: Navigation, label: 'Flow' },
    { id: 'concessions', icon: Utensils, label: 'Eats' },
    { id: 'pulse', icon: Activity, label: 'Live' },
    { id: 'compass', icon: Compass, label: 'Guide' },
    { id: 'safety', icon: ShieldAlert, label: 'SOS' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#09090b]/95 backdrop-blur-xl border-t border-stadium-border pb-safe h-20" aria-label="Mobile Navigation Bar">
      <div className="flex justify-around items-center h-full max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          const isSafety = tab.id === 'safety';
          
          if (isSafety) {
            return (
              <button
                key={tab.id}
                onClick={() => onModuleChange(tab.id as Module)}
                aria-label="Open Emergency Safety SOS"
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-black text-white transition-all transform active:scale-95 shadow-lg",
                  isActive ? "bg-red-600 shadow-red-600/40" : "bg-red-500 shadow-red-500/30"
                )}
              >
                SOS
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onModuleChange(tab.id as Module)}
              aria-label={`Go to ${tab.label}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all group px-2",
                isActive ? "text-electric-green opacity-100" : "text-text-secondary opacity-50 hover:opacity-100"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center mb-0.5",
                isActive ? "border-electric-green" : "border-text-secondary"
              )}>
                <Icon size={12} strokeWidth={isActive ? 3 : 2} />
              </div>
              <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
