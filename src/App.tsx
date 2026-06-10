/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Booking, Driver, INITIAL_BOOKINGS, DRIVERS } from './types';
import FareCalculator from './components/FareCalculator';
import AdminHub from './components/AdminHub';
import SeoPlanner from './components/SeoPlanner';
import AdminLockGate from './components/AdminLockGate';
import TrustBuilder from './components/TrustBuilder';
import { 
  Car, ShieldCheck, TrendingUp, ClipboardList, 
  MapPin, Phone, HelpCircle, Star, BadgeCheck, CheckCircle2, Lock, Unlock 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'user-ux' | 'admin' | 'seo' | 'trust'>('user-ux');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  
  // Real-time synchronization state between panels
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);

  // Sync callbacks
  const handleNewBookingCreated = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(prevBookings => 
      prevBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
  };

  const handleAssignDriver = (bookingId: string, driverId: string) => {
    setBookings(prevBookings => 
      prevBookings.map(b => b.id === bookingId ? { ...b, assignedDriverId: driverId, status: 'confirmed' } : b)
    );

    // If driverId is provided, also set driver status to "on-ride"
    if (driverId) {
      setDrivers(prevDrivers => 
        prevDrivers.map(d => d.id === driverId ? { ...d, status: 'on-ride' } : d)
      );
    }
  };

  const handleAddDriver = (newDriver: Driver) => {
    setDrivers(prevDrivers => [...prevDrivers, newDriver]);
  };

  const handleDeleteDriver = (driverId: string) => {
    setDrivers(prevDrivers => prevDrivers.filter(d => d.id !== driverId));
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Prime Header & Location Badge */}
      <header className="bg-[#0e0e10] border-b border-white/5 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-black rounded-xl font-bold">
              <Car className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                  Tirupati <span className="text-amber-500 font-serif font-medium">Travels</span>
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  HQ: Tirupati, AP
                </span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-[0.2em] uppercase mt-0.5">
                South India Elite Cab Service
              </p>
            </div>
          </div>

          {/* Quick contact and stats */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest leading-none">24/7 Booking Support</span>
              <span className="font-mono text-amber-500 font-bold text-sm block mt-0.5">
                +91 83742 33802
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
            
            <a 
              href="#booking-flow" 
              className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer uppercase tracking-wider"
            >
              Test Booking Flow ➔
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Card & Blueprint Overview */}
        <section className="bg-gradient-to-br from-[#0c0c0e] to-[#111114] border border-white/5 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-60"></div>
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-widest bg-amber-500/10 text-amber-500 font-extrabold px-3 py-1 rounded-full border border-amber-500/20">
              Interactive Blueprint Proposal
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-light leading-tight text-white mb-2">
              Tirupati to <span className="italic font-medium text-amber-500">Anywhere.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              This system compiles your full specification into an interactive demo. The modular tabs below answer every item of your proposal. Make a booking in the 
              <strong> User Guest</strong> tab to see it instantly generate alerts and tracking metrics in the <strong> Admin Command</strong> dashboard. The sensitive administrator segments remain fully locked behind active validation gates.
            </p>
          </div>
        </section>

        {/* Tab Interface - Main Navigation */}
        <section className="space-y-6">
          <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-2">
            
            <button
              onClick={() => setActiveTab('user-ux')}
              id="tab-user-ux"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'user-ux' 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/5' 
                  : 'bg-[#111114] border border-white/5 text-slate-400 hover:bg-[#1a1a1f] hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              1. User Fare Engine
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              id="tab-admin"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'admin' 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/5' 
                  : 'bg-[#111114] border border-white/5 text-slate-400 hover:bg-[#1a1a1f] hover:text-white'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              2. Admin Dispatch
              {isAdminUnlocked ? (
                <Unlock className="w-3 h-3 text-emerald-450 ml-1.5" />
              ) : (
                <Lock className="w-3 h-3 text-amber-500/80 ml-1.5 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              id="tab-seo"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'seo' 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/5' 
                  : 'bg-[#111114] border border-white/5 text-slate-400 hover:bg-[#1a1a1f] hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              3. SEO Strategy
              {isAdminUnlocked ? (
                <Unlock className="w-3 h-3 text-emerald-450 ml-1.5" />
              ) : (
                <Lock className="w-3 h-3 text-amber-500/80 ml-1.5 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('trust')}
              id="tab-trust"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'trust' 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/5' 
                  : 'bg-[#111114] border border-white/5 text-slate-400 hover:bg-[#1a1a1f] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              4. Trust & Reviews
            </button>

          </div>

          {/* Dynamic Tab Content rendering */}
          <div className="min-h-[400px]">
            {activeTab === 'user-ux' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="p-6 bg-[#111114] border border-white/5 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Blueprint Segment 1 & 2 — User Experience (UX) Flow</span>
                    <h3 className="text-lg font-serif font-medium text-white">High Conversion Live Outstation Pricing Engine</h3>
                    <p className="text-xs text-slate-400 leading-normal">
                      The core conversion secret is <strong>zero booking friction</strong>. When outstation travel clients search from Google, they seek transparent quotes. By offering a live fare matrix with no log-in wall, users immediately find confidence, leading to a 3.5x higher booking conversion rate.
                    </p>
                  </div>
                </div>

                <FareCalculator onNewBookingCreated={handleNewBookingCreated} />
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {!isAdminUnlocked ? (
                  <AdminLockGate onUnlock={() => setIsAdminUnlocked(true)} tabLabel="Fleet Dispatch command" />
                ) : (
                  <>
                    <div className="p-6 bg-[#111114] border border-white/5 rounded-2xl flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Blueprint Segment 1 (Admin Side) — Fleet Control</span>
                        <p className="text-xs text-slate-400 leading-normal">
                          Designed to simplify rapid outstation booking management. Administrators can instantly vet driver logs, allocate vehicles dynamically to incoming user queues, and cycle driver availability to optimize road capacity.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsAdminUnlocked(false)}
                        className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Lock Session
                      </button>
                    </div>

                    <AdminHub 
                      bookings={bookings}
                      drivers={drivers}
                      onUpdateBookingStatus={handleUpdateBookingStatus}
                      onAssignDriver={handleAssignDriver}
                      onAddDriver={handleAddDriver}
                      onDeleteDriver={handleDeleteDriver}
                      onDeleteBooking={handleDeleteBooking}
                    />
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {!isAdminUnlocked ? (
                  <AdminLockGate onUnlock={() => setIsAdminUnlocked(true)} tabLabel="SEO Core Strategy Analytics" />
                ) : (
                  <>
                    <div className="p-6 bg-[#111114] border border-white/5 rounded-2xl flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Blueprint Segment 4 — Organic Search Optimization</span>
                        <p className="text-xs text-slate-400 leading-normal">
                          Instead of fighting international travel aggregators for broad terms, target **hyper-localized route keywords** (e.g. <i>"Tirupati to Bangalore Cab"</i>). The engine below reviews key volumes, difficulties, and shows you correct Search Result and Schema optimizations.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsAdminUnlocked(false)}
                        className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Lock Session
                      </button>
                    </div>

                    <SeoPlanner />
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'trust' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="p-6 bg-[#111114] border border-white/5 rounded-2xl space-y-2">
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Blueprint Segment 5 — Safeguarding Brand Authority</span>
                  <p className="text-xs text-slate-400 leading-normal">
                    Trust is earned through absolute billing clarity and verified pilgrimage recommendations. This section features custom verifiable badging paradigms, safe-transit indicators, and real-time reviews trackers.
                  </p>
                </div>

                <TrustBuilder />
              </motion.div>
            )}
          </div>
        </section>

      </main>

      {/* Structured footer */}
      <footer className="bg-[#0e0e10] text-slate-400 mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-sm font-bold tracking-wider text-amber-500 uppercase">Tirupati Outstation Cabs & Travels</h4>
              <p className="text-[11px] text-slate-500 font-medium">Delivering premium inter-state travel solutions across Karnataka, Tamil Nadu, Andhra Pradesh, and Telangana.</p>
            </div>
            <div className="flex gap-4 text-[10px] font-mono tracking-widest text-slate-500">
              <span>● SECURE SSL PAYMENTS</span>
              <span>● TAXI LICENSED</span>
              <span>● CERTIFIED DRIVERS</span>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-6 font-medium tracking-wider">
            © 2026 TIRUPATI TRAVELS & CAB RENTALS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

    </div>
  );
}
