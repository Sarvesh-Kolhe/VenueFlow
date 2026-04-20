import React from 'react';
import { motion } from 'motion/react';
import { X, Bell, Zap, Utensils, Info, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'order' | 'info' | 'safety';
  read: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onClearAll
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full right-0 mt-4 w-[280px] sm:w-[360px] md:w-[400px] bg-stadium-card border border-stadium-border rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] z-50 overflow-hidden backdrop-blur-2xl lg:right-[-20px]"
      role="dialog"
      aria-modal="true"
      aria-label="Notifications Panel"
    >
      <div className="p-6 border-b border-stadium-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-electric-green/10 flex items-center justify-center text-electric-green">
            <Bell size={18} />
          </div>
          <h3 className="font-black italic uppercase tracking-tight text-white">Live Updates</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="max-h-[480px] overflow-y-auto no-scrollbar">
        {notifications.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto">
              <ShieldAlert size={32} className="text-zinc-700" />
            </div>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs italic">All clear at the moment</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                className={cn(
                  "p-6 cursor-pointer transition-all hover:bg-white/[0.02] group relative",
                  !notif.read && "bg-electric-green/[0.02]"
                )}
              >
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-electric-green" />
                )}
                <div className="flex gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner",
                    notif.type === 'alert' && "bg-orange-500/10 text-orange-400",
                    notif.type === 'order' && "bg-electric-green/10 text-electric-green",
                    notif.type === 'info' && "bg-blue-500/10 text-blue-400",
                    notif.type === 'safety' && "bg-red-500/10 text-red-400",
                  )}>
                    {notif.type === 'alert' && <Zap size={18} />}
                    {notif.type === 'order' && <Utensils size={18} />}
                    {notif.type === 'info' && <Info size={18} />}
                    {notif.type === 'safety' && <ShieldAlert size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">{notif.time}</p>
                    </div>
                    <h4 className="font-black text-white italic uppercase tracking-tight leading-none mb-1 group-hover:text-electric-green transition-colors">{notif.title}</h4>
                    <p className="text-xs text-zinc-400 leading-snug font-medium line-clamp-2">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-4 bg-zinc-950/20 border-t border-white/[0.02]">
          <button 
            onClick={onClearAll}
            className="w-full py-3 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] hover:text-white transition-colors bg-white/[0.02] border border-white/5 rounded-xl"
          >
            Clear All Transmissions
          </button>
        </div>
      )}
    </motion.div>
  );
};
