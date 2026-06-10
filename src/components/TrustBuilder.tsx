/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Award, Star, ThumbsUp, DollarSign, 
  MapPin, Heart, Clock, CheckCircle2, UserCheck, Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  name: string;
  trip: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export default function TrustBuilder() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      name: "Tirumala S.",
      trip: "Tirupati to Bangalore Return Trip",
      rating: 5,
      text: "We booked an Innova Crysta for our joint family of 6. Driver Srinivas was courteous, spoke fluent Kannada, and was very patient with my elderly grandparents. Clean AC, timely pickup right from railway station plat 1.",
      date: "2026-06-03",
      verified: true
    },
    {
      name: "Dr. Sandip Rao",
      trip: "Tirupati to Vellore CMC Medical Drop",
      rating: 5,
      text: "Excellent urgent service. Booked at midnight, cab was waiting at Alipiri by 5 AM. Flat price match guarantee, absolutely zero arguments with the driver about extra state toll taxes. Clean vehicle.",
      date: "2026-05-28",
      verified: true
    },
    {
      name: "Ananya Deshpande",
      trip: "Tirupati to Chennai Airport Drop",
      rating: 4.8,
      text: "Extremely reliable outstation cab vendor. Toll price was estimated precisely on the website. Safe driving speeds on highways. Recommending to my circles.",
      date: "2026-05-20",
      verified: true
    }
  ]);

  // Form State for simulated rating add
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewTrip, setNewReviewTrip] = useState('Tirupati to Bangalore Cab');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReviewSimCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const added: Review = {
      name: newReviewName,
      trip: newReviewTrip,
      rating: newReviewRating,
      text: newReviewText,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    setReviews([added, ...reviews]);
    setNewReviewName('');
    setNewReviewText('');
  };

  // Compute stats dynamically
  const avgRatingRef = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2);

  return (
    <div className="space-y-8">
      
      {/* Trust Factors Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-[#0e0e10] border border-white/5 rounded-2xl shadow-xl text-center space-y-3">
          <div className="mx-auto w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-medium text-white">100% Certified Drivers</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Every single driver undergoes meticulous background screening, has 5+ years commercial highway experience, and carries safe pilgrimage ratings.
            </p>
          </div>
        </div>

        <div className="p-5 bg-[#0e0e10] border border-white/5 rounded-2xl shadow-xl text-center space-y-3">
          <div className="mx-auto w-10 h-10 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center border border-amber-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-medium text-white">Transparent Price Match</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              No sneaky extra hidden driver allowances, night batta, or state pass surcharges at final drop. What we estimate on checkout is exactly what you pay.
            </p>
          </div>
        </div>

        <div className="p-5 bg-[#0e0e10] border border-white/5 rounded-2xl shadow-xl text-center space-y-3">
          <div className="mx-auto w-10 h-10 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center border border-amber-500/15">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-medium text-white">Govt Registered & Insured</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Our taxi fleet is compliant with the AP Transport Department, ensuring valid tourist carriage insurance and legal inter-state travel permissions.
            </p>
          </div>
        </div>

        <div className="p-5 bg-[#0e0e10] border border-white/5 rounded-2xl shadow-xl text-center space-y-3">
          <div className="mx-auto w-10 h-10 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center border border-sky-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-medium text-white">24/7 Pilgrimage Tracking</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Trains/Flights can get delayed. We offer constant outstation flight and train status checks to update pickups inside Tirupati with zero penalty.
            </p>
          </div>
        </div>

      </div>

      {/* Trust & Guarantee Detail layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Review Deck Container (Col: 7) */}
        <div className="lg:col-span-7 bg-[#0e0e10] p-6 rounded-2xl shadow-xl border border-white/5 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <div>
              <h3 className="text-sm font-serif font-semibold text-white uppercase tracking-wider">
                Interactive Pilgrims Testimonial Ledger
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Real feedback from family tourists visiting Tirupati temples from South Indian capital cities.
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-center">
              <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-wider">Dynamic Score</span>
              <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {avgRatingRef} ★
              </span>
            </div>
          </div>

          {/* Review List cards */}
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            <AnimatePresence>
              {reviews.map((rev, revIdx) => (
                <motion.div 
                  key={revIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#121215] rounded-xl border border-white/5 space-y-2 relative hover:bg-[#15151a] transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold">{rev.trip}</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                        {'★'.repeat(Math.floor(rev.rating))} {rev.rating}
                      </span>
                      <span className="text-[9px] text-slate-500">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal italic">
                    "{rev.text}"
                  </p>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Verified booking
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Add PILGRIM Review Panel (Col: 5) */}
        <div className="lg:col-span-5 bg-[#0a0a0b] text-white p-6 rounded-2xl shadow-xl border border-white/5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold py-1 px-2.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 uppercase tracking-wider">
                Trust Tester Sandbox
              </span>
              <h4 className="text-sm font-serif font-medium mt-3 text-white">Simulate Client Review Additions</h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                Write a quick custom review to calculate how the aggregate rating metrics and client trust score changes dynamically in the local web session.
              </p>
            </div>

            <form onSubmit={handleAddReviewSimCallback} className="space-y-3 text-white text-xs text-left">
              <div>
                <input
                  type="text"
                  placeholder="Visitor / Family Name (e.g., Balaji K.)"
                  value={newReviewName}
                  required
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#16161a] border border-white/10 focus:outline-none focus:border-amber-500 font-medium text-white placeholder-slate-500"
                />
              </div>

              <div>
                <select
                  value={newReviewTrip}
                  onChange={(e) => setNewReviewTrip(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#16161a] border border-white/10 focus:outline-none focus:border-amber-500 font-medium text-white"
                >
                  <option value="Tirupati to Bangalore Cab Drop">Tirupati to Bangalore Cab Drop</option>
                  <option value="Tirupati to Chennai Travels Direct">Tirupati to Chennai Travels Direct</option>
                  <option value="Tirupati to Vellore CMC Medical">Tirupati to Vellore CMC Medical</option>
                  <option value="Tirumala Sightseeing Package Tour">Tirumala Sightseeing Package Tour</option>
                </select>
              </div>

              <div>
                <textarea
                  placeholder="Share details of vehicle cleanliness, driver friendliness, highway driving safety..."
                  value={newReviewText}
                  rows={2}
                  required
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#16161a] border border-white/10 focus:outline-none focus:border-amber-500 font-medium text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Satisfied Rating Score</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#16161a] border border-white/10 focus:outline-none focus:border-amber-500 font-semibold text-white"
                >
                  <option value={5}>5 Stars (Flawless Service)</option>
                  <option value={4}>4 Stars (Good Journey)</option>
                  <option value={3}>3 Stars (Satisfactory)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider rounded-lg text-xs cursor-pointer transition-all active:scale-98"
              >
                Push Feedback & Re-Calculate Score
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-450">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Secure Payments Enabled
            </span>
            <span className="font-mono text-slate-300 text-[9px] bg-[#121215] border border-white/5 px-2 py-0.5 rounded">
              UPI • GPAY • PHONEPE • NETBANKING
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
