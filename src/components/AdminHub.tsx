/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Booking, Driver, DRIVERS, VEHICLES, DESTINATIONS } from '../types';
import { 
  Users, MapPin, ClipboardList, CheckCircle2, ChevronRight, UserPlus, 
  Trash2, Eye, Star, AlertCircle, Phone, Smartphone, BadgePercent 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminHubProps {
  bookings: Booking[];
  drivers: Driver[];
  onUpdateBookingStatus: (bookingId: string, newStatus: Booking['status']) => void;
  onAssignDriver: (bookingId: string, driverId: string) => void;
  onAddDriver: (newDriver: Driver) => void;
  onDeleteDriver: (driverId: string) => void;
  onDeleteBooking: (bookingId: string) => void;
}

export default function AdminHub({ 
  bookings, 
  drivers, 
  onUpdateBookingStatus, 
  onAssignDriver, 
  onAddDriver,
  onDeleteDriver,
  onDeleteBooking
}: AdminHubProps) {
  
  // Tab within Admin: 'bookings' | 'drivers'
  const [adminTab, setAdminTab] = useState<'bookings' | 'drivers'>('bookings');

  // New Driver Form state
  const [showAddDriverForm, setShowAddDriverForm] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [assignedVehicle, setAssignedVehicle] = useState('Toyota Innova Crysta (AP03-TX-1010)');
  const [licenseNumber, setLicenseNumber] = useState('DL-A039' + Math.floor(Math.random()*90000+10000));

  const filteredBookings = bookings;

  const handleSubmitDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName.trim() || !driverPhone.trim()) return;

    const newDriver: Driver = {
      id: 'D' + (drivers.length + 1).toString().padStart(2, '0'),
      name: driverName,
      phone: driverPhone,
      rating: 4.8,
      status: 'available',
      assignedVehicle,
      licenseNumber,
      tripsCompleted: 0
    };

    onAddDriver(newDriver);
    // Reset Form
    setDriverName('');
    setDriverPhone('');
    setLicenseNumber('DL-A039' + Math.floor(Math.random()*90000+10000));
    setShowAddDriverForm(false);
  };

  return (
    <div className="bg-[#0e0e10] rounded-2xl shadow-xl border border-white/5 overflow-hidden">
      
      {/* Header and Inner Subtabs */}
      <div className="bg-[#0a0a0b] p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5">
        <div>
          <h3 className="text-lg font-serif font-medium flex items-center gap-2 text-white">
            <ClipboardList className="text-amber-500 w-5 h-5" />
            Tirupati Travels — Admin Command Center
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Real-time simulation of dispatcher operations, outstation route monitoring, and driver manifest.
          </p>
        </div>

        {/* Operational Statistics */}
        <div className="flex gap-4">
          <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-center min-w-20">
            <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold">Total Booked</span>
            <span className="text-xs font-mono font-bold text-amber-500">{bookings.length} Orders</span>
          </div>
          <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-center min-w-20">
            <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold">Certified Fleet</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{drivers.length} Drivers</span>
          </div>
        </div>
      </div>

      <div className="border-b border-white/5 bg-[#121215] flex justify-between items-center px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setAdminTab('bookings')}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              adminTab === 'bookings' 
                ? 'border-amber-500 text-white' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Booking Dispatch List ({bookings.length})
          </button>
          <button
            onClick={() => setAdminTab('drivers')}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              adminTab === 'drivers' 
                ? 'border-amber-500 text-white' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Certified Drivers ({drivers.length})
          </button>
        </div>

        {adminTab === 'drivers' && (
          <button
            onClick={() => setShowAddDriverForm(!showAddDriverForm)}
            className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add New Driver
          </button>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {adminTab === 'bookings' ? (
            <motion.div 
              key="bookings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Filter Row removed for deployment direct access */}

              {/* Bookings Tracker Table / Grid */}
              {filteredBookings.length === 0 ? (
                <div className="py-12 text-center rounded-xl border border-dashed border-white/10 text-slate-400 bg-[#121215]/50 space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-500/80 mx-auto" />
                  <p className="text-xs font-semibold">No bookings registered in local memory.</p>
                  <p className="text-[10px] text-slate-500">Generate a custom booking in the first Tab to monitor live list updates.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-[#121215] text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <th className="py-3 px-4">Booking ID</th>
                        <th className="py-3 px-4">Client Detail</th>
                        <th className="py-3 px-4">Route Info</th>
                        <th className="py-3 px-4">Est Fare / Paid</th>
                        <th className="py-3 px-4">Assigned Driver</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 text-xs bg-[#0c0c0e]">
                      {filteredBookings.map((b) => {
                        const destination = DESTINATIONS.find(d => d.id === b.destinationId);
                        const vehicle = VEHICLES.find(v => v.id === b.vehicleId);
                        const assignedDriver = drivers.find(d => d.id === b.assignedDriverId);

                        return (
                          <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-bold font-mono text-white">
                              {b.id}
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-bold block text-white">{b.customerName}</span>
                              <span className="text-[10px] text-slate-400 font-mono block">{b.customerPhone}</span>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 max-w-[150px]">{b.pickupLocation}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-bold text-white block">Tirupati ➔ {destination?.name || b.destinationId}</span>
                              <span className="text-[10px] text-slate-400 font-semibold block">{b.tripType === 'one-way' ? 'One Way Drop' : 'Round Trip'}</span>
                              <span className="text-[10px] text-slate-500 block mt-1">Date: {b.bookingDate} at {b.pickupTime}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-mono font-bold block text-white">₹{b.estimatedFare}</span>
                              <span className="text-[10px] text-slate-400 block font-light">Paid: ₹{b.paidAmount}</span>
                              {b.paidAmount === 0 && <span className="text-[9px] text-amber-500 font-bold bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">Collect Cash At Drop</span>}
                            </td>
                            <td className="py-4 px-4">
                              {assignedDriver ? (
                                <div>
                                  <span className="font-semibold text-white block flex items-center gap-1">
                                    {assignedDriver.name}
                                    <span className="text-amber-500 text-[10px] flex items-center select-none font-bold">★ {assignedDriver.rating}</span>
                                  </span>
                                  <span className="text-[10px] text-slate-400 block font-mono">{assignedDriver.phone}</span>
                                </div>
                              ) : (
                                <span className="text-[10px] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded font-semibold italic">Unassigned Driver</span>
                              )}
                            </td>
                            {/* Actions controls - status selections removed */}
                            <td className="py-4 px-4 text-right border-l border-white/5">
                              <div className="flex gap-2 justify-end items-center">
                                <select 
                                  value={b.assignedDriverId || ''}
                                  onChange={(e) => onAssignDriver(b.id, e.target.value)}
                                  className="text-[11px] bg-[#16161a] text-slate-200 border border-white/10 rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                                >
                                  <option value="">-- Assign Driver --</option>
                                  {drivers.map(d => (
                                    <option key={d.id} value={d.id}>
                                      {d.name}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => onDeleteBooking(b.id)}
                                  title="Delete Booking"
                                  className="p-1.5 bg-[#1a1a20]/60 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg border border-white/5 transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="drivers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Add New Driver Form Panel */}
              <AnimatePresence>
                {showAddDriverForm && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSubmitDriver}
                    className="p-5 bg-[#121215] rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="md:col-span-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">Register Certified Commercial Driver</h4>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-350 mb-1">Driver Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Anand Kumar"
                        value={driverName}
                        required
                        onChange={(e) => setDriverName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-white/10 rounded bg-[#16161a] text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-350 mb-1">WhatsApp Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 93456 78901"
                        value={driverPhone}
                        required
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-white/10 rounded bg-[#16161a] text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-350 mb-1">Vehicle Match Assignment</label>
                      <input
                        type="text"
                        placeholder="e.g. Toyota Innova (AP-03-TV-1234)"
                        value={assignedVehicle}
                        required
                        onChange={(e) => setAssignedVehicle(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-white/10 rounded bg-[#16161a] text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-350 mb-1">License Number ID</label>
                      <input
                        type="text"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-white/10 rounded bg-[#16161a] font-mono text-slate-350"
                      />
                    </div>
                    <div className="md:col-span-3 flex justify-end gap-2 mt-2">
                       <button
                        type="button"
                        onClick={() => setShowAddDriverForm(false)}
                        className="px-3 py-1.5 bg-[#222228] hover:bg-[#2c2c36] text-slate-300 rounded text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider rounded text-xs cursor-pointer"
                      >
                        Confirm & Register Driver
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Driver Cards Deck */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drivers.map((driver) => {
                  return (
                    <div 
                      key={driver.id} 
                      className="border border-white/5 rounded-xl p-4 space-y-3.5 bg-[#121215] hover:bg-[#15151a] transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            {driver.name}
                            <span className="text-[10px] text-slate-400 font-mono">({driver.id})</span>
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono font-semibold">{driver.phone}</span>
                        </div>
                        <button
                          onClick={() => onDeleteDriver(driver.id)}
                          title="Delete Driver"
                          className="p-1.5 bg-[#1a1a20]/60 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg border border-white/5 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-300 space-y-1 bg-[#1a1a20] p-2.5 rounded-lg border border-white/5">
                        <p><span className="text-slate-500 uppercase font-mono text-[9px] block">Assigned Vehicle</span> <span className="font-semibold text-white truncate">{driver.assignedVehicle}</span></p>
                        <p className="pt-1"><span className="text-slate-500 uppercase font-mono text-[9px] block">Commercial License ID</span> <span className="font-mono text-slate-350">{driver.licenseNumber}</span></p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-450 pt-1">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          <strong>{driver.rating}</strong> (Certified)
                        </span>
                        <span className="text-slate-400">
                          <strong>{driver.tripsCompleted}</strong> Finished Outstations
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
