/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BottomNav, type Module } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './modules/Explore';
import { SmartFlowNavigator } from './modules/Navigator';
import { ZeroWaitConcessions } from './modules/Concessions';
import { LivePulseDashboard } from './modules/Stats';
import { VenueCompass } from './modules/VenueCompass';
import { SafetyNetCoordination } from './modules/Safety';
import { SettingsModule } from './modules/Settings';
import { IntroPage } from './modules/Intro';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, User, X } from 'lucide-react';
import { NotificationsPanel, type Notification } from './components/NotificationsPanel';
import { APP_NAME } from './constants';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Ready',
      message: 'Your Burger & Craft Beer logic is ready at Gate 4. Scan to collect.',
      time: '2M AGO',
      type: 'order',
      read: false,
    },
    {
      id: '2',
      title: 'Flow Alert',
      message: 'Heavy congestion detected at North Exit. Rerouting active.',
      time: '15M AGO',
      type: 'alert',
      read: false,
    },
    {
      id: '3',
      title: 'Tactical Info',
      message: 'Live halftime stats now optimized for your section profile.',
      time: '45M AGO',
      type: 'info',
      read: true,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => {
    setNotifications([]);
    setIsNotificationsOpen(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'navigator':
        return <SmartFlowNavigator />;
      case 'concessions':
        return <ZeroWaitConcessions />;
      case 'pulse':
        return <LivePulseDashboard />;
      case 'compass':
        return <VenueCompass />;
      case 'safety':
        return <SafetyNetCoordination />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-[#fafafa] font-sans selection:bg-electric-green selection:text-black">
      <AnimatePresence>
        {showIntro && (
          <IntroPage onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop */}
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />

      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-stadium-border sticky top-0 bg-black/80 backdrop-blur-xl z-30" role="banner">
          <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Venue<span className="text-electric-green">Flow</span></h1>
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              aria-expanded={isNotificationsOpen}
              aria-haspopup="true"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-electric-green rounded-full border-2 border-black" />
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" 
                    onClick={() => setIsNotificationsOpen(false)} 
                  />
                  <NotificationsPanel 
                    notifications={notifications}
                    onClose={() => setIsNotificationsOpen(false)}
                    onMarkAsRead={markAsRead}
                    onClearAll={clearAll}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Top Header - Desktop/Laptop */}
        <header className="hidden lg:flex items-center justify-between px-10 py-6 border-b border-stadium-border sticky top-0 bg-black/80 backdrop-blur-xl z-30" role="banner">
          <div className="flex items-center gap-10">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-electric-green transition-colors" size={18} aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search events, seats, or amenities..." 
                className="bg-stadium-card border border-stadium-border rounded-xl py-2.5 pl-10 pr-4 w-96 text-sm font-medium focus:outline-none focus:border-electric-green/30 transition-all"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                aria-expanded={isNotificationsOpen}
                aria-haspopup="true"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-electric-green rounded-full border-2 border-black" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsNotificationsOpen(false)} 
                    />
                    <NotificationsPanel 
                      notifications={notifications}
                      onClose={() => setIsNotificationsOpen(false)}
                      onMarkAsRead={markAsRead}
                      onClearAll={clearAll}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="h-6 w-[1px] bg-stadium-border mx-2" />
            <button 
              onClick={() => setActiveModule('settings')}
              className="flex items-center gap-3 group px-4 py-2 rounded-2xl hover:bg-white/5 transition-all"
              aria-label="User Profile and Settings"
            >
               <div className="text-right">
                  <p className="text-sm font-black tracking-tight leading-none uppercase group-hover:text-electric-green transition-colors">S. Kolhe</p>
                  <p className="text-[10px] text-electric-green font-bold uppercase tracking-widest mt-1">Section 104 • Row B</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-stadium-card border border-stadium-border flex items-center justify-center group-hover:border-electric-green transition-colors">
                  <User size={20} className="text-zinc-500 group-hover:text-electric-green transition-colors" />
               </div>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full bg-stadium-black relative pb-24 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <div className="w-full h-full relative">
                {renderModule()}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Nav for Mobile/Tablet */}
        <div className="lg:hidden">
          <BottomNav activeModule={activeModule} onModuleChange={setActiveModule} />
        </div>
      </div>
    </div>
  );
}

