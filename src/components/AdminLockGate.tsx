/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLockGateProps {
  onUnlock: () => void;
  tabLabel: string;
}

export default function AdminLockGate({ onUnlock, tabLabel }: AdminLockGateProps) {
  const [passcode, setPasscode] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Accept strictly the requested admin passcode
    const normalized = passcode.trim();
    if (normalized === '739682') {
      setIsSuccess(true);
      setErrorStatus(false);
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setErrorStatus(true);
      setPasscode('');
      // Reset error after 2 seconds
      setTimeout(() => setErrorStatus(false), 2000);
    }
  };

  const handleKeypadTap = (digit: string) => {
    setErrorStatus(false);
    setPasscode(prev => prev + digit);
  };

  const handleBackspace = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-[#0e0e10] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
      
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-50"></div>
      
      <div className="relative z-10 space-y-3">
        {/* Animated Locking Hex */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center relative shadow-inner">
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1.1 }}
              className="text-emerald-400"
            >
              <Unlock className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              animate={errorStatus ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={errorStatus ? 'text-rose-500' : 'text-amber-500'}
            >
              <Lock className="w-8 h-8" />
            </motion.div>
          )}

          {/* Sparkles around lock */}
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
        </div>

        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded font-bold">
            Administrative Guard Layer
          </span>
          <h3 className="text-lg font-serif font-medium text-white mt-2">
            Locked Segment: {tabLabel}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            Access to this strategy ledger requires standard administrator credentials to protect dispatch queues and keyword matrixes.
          </p>
        </div>
      </div>

      {/* Main pin-pad and entry form */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
        
        {/* Passcode input field */}
        <div className="relative">
          <input
            type="password"
            placeholder="•••• Enter Admin Passcode"
            value={passcode}
            onChange={(e) => {
              setErrorStatus(false);
              setPasscode(e.target.value);
            }}
            className={`w-full text-center text-sm font-mono tracking-widest px-4 py-3 rounded-xl border focus:outline-none transition-all ${
              errorStatus 
                ? 'bg-rose-500/10 border-rose-500 text-rose-400 placeholder-rose-300' 
                : isSuccess
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-450'
                : 'bg-[#16161a] border-white/10 text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20'
            }`}
          />
          <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-98 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
          >
            Authorize Check ➔
          </button>
        </div>

        {/* Digit Keypad */}
        <div className="pt-2">
          <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                type="button"
                key={digit}
                onClick={() => handleKeypadTap(digit)}
                className="py-2.5 bg-[#141417] hover:bg-[#1a1a20] active:scale-95 text-slate-200 hover:text-white border border-white/5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPasscode('')}
              className="py-2.5 bg-[#141417] hover:bg-[#1a1a20] active:scale-95 text-rose-450 border border-white/5 rounded-lg text-[10px] font-bold transition-all uppercase cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeypadTap('0')}
              className="py-2.5 bg-[#141417] hover:bg-[#1a1a20] active:scale-95 text-slate-200 hover:text-white border border-white/5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-2.5 bg-[#141417] hover:bg-[#1a1a20] active:scale-95 text-amber-500 border border-white/5 rounded-lg text-[10px] font-bold transition-all uppercase cursor-pointer"
            >
              Del
            </button>
          </div>
        </div>

        {/* Informative Diagnostic Info & Hint */}
        {errorStatus ? (
          <p className="text-[11px] text-rose-400 font-medium flex items-center justify-center gap-1.5 animate-pulse mt-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Passcode rejected. Please retry.
          </p>
        ) : (
          <p className="text-[10px] text-slate-500 leading-snug mt-2">
            🔒 Enter the secure 6-digit administrator passcode to unlock the strategic modules.
          </p>
        )}
      </form>
    </div>
  );
}
