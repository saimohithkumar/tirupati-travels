/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SEO_KEYWORDS, DESTINATIONS, SeoKeyword } from '../types';
import { 
  Search, TrendingUp, Compass, Award, ExternalLink, Code, 
  Lightbulb, CheckCircle2, ChevronRight, HelpCircle 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SeoPlanner() {
  const [selectedRouteId, setSelectedRouteId] = useState('bangalore');
  const [keywordSort, setKeywordSort] = useState<'volume' | 'difficulty'>('volume');

  const selectedDest = DESTINATIONS.find(d => d.id === selectedRouteId) || DESTINATIONS[0];

  // Sort Keyword rules
  const sortedKeywords = [...SEO_KEYWORDS].sort((a, b) => {
    if (keywordSort === 'volume') {
      return b.monthlySearchVolume - a.monthlySearchVolume;
    } else {
      return a.difficultyPercentage - b.difficultyPercentage;
    }
  });

  // Dynamic Metadata generator based on route selection
  const titleTag = `${selectedDest.name} to Tirupati Cab | Car Rental Service ₹${selectedDest.id === 'chennai' ? '12.50' : '15'}/km`;
  const metaDescription = `Looking for a premium outstation budget taxi from Tirupati to ${selectedDest.name}? Certified AC Cabs (Sedan, Innova, SUV). Secure booking, driver batta included, 0% advance. Click to estimate fare in 10 seconds!`;
  const slug = `https://www.tirupaticabs.com/routes/tirupati-to-${selectedDest.id}-cab`;

  // Schema LD-JSON output
  const schemaMarkup = `{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "Tirupati Travels & Cab Rental",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Tirupati Travels & Cab Rental",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tirupati",
      "addressRegion": "Andhra Pradesh",
      "addressCountry": "IN"
    }
  },
  "areaServed": "${selectedDest.name}, South India",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "12.50",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/MinimumPrice",
      "billingIncrement": "1",
      "unitCode": "KMT"
    }
  }
}`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Left Column: Keyword Performance Grid (Cols: 7) */}
      <div className="xl:col-span-7 space-y-6">
        <div className="bg-[#0e0e10] p-6 rounded-2xl shadow-xl border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-serif font-medium text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="text-amber-500 w-5 h-5" />
                South India Travel & Cab Keywords Planner
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Targeting high commercial intent terms that tourists search after booking temple Darshan.
              </p>
            </div>

            {/* Keyword sorters */}
            <div className="flex bg-[#16161a] p-1 rounded-lg text-xs self-start sm:self-center font-bold text-slate-400 border border-white/5">
              <button
                onClick={() => setKeywordSort('volume')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${keywordSort === 'volume' ? 'bg-amber-500 text-black shadow-sm' : 'hover:text-white'}`}
              >
                Sort by Volume
              </button>
              <button
                onClick={() => setKeywordSort('difficulty')}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${keywordSort === 'difficulty' ? 'bg-amber-500 text-black shadow-sm' : 'hover:text-white'}`}
              >
                Sort by Low Difficulty
              </button>
            </div>
          </div>

          {/* Keywords List Row */}
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs text-slate-300 divide-y divide-white/5 bg-[#0c0c0e]">
              <thead>
                <tr className="bg-[#121215] text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-white/5">
                  <th className="py-3 px-3">Target Keyword Phrase</th>
                  <th className="py-3 px-3 text-right">M. Vol</th>
                  <th className="py-3 px-3">SEO Difficulty</th>
                  <th className="py-3 px-3">CPC Est.</th>
                  <th className="py-3 px-3">Search Purpose / Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {sortedKeywords.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-white font-sans">
                      "{kw.keyword}"
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#e2e8f0]">
                      {kw.monthlySearchVolume.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          kw.difficulty === 'Low' ? 'bg-emerald-500' :
                          kw.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
                        }`}></span>
                        <span className="font-semibold text-white">{kw.difficulty}</span>
                        <span className="text-[10px] text-slate-500 font-normal">({kw.difficultyPercentage}%)</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">
                      {kw.costPerClickEstimate}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        kw.intent === 'Transactional' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        kw.intent === 'Commercial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}>
                        {kw.intent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategical Landing Page architecture */}
        <div className="bg-[#0e0e10] p-6 rounded-2xl shadow-xl border border-white/5 space-y-4">
          <h4 className="text-xs font-serif font-semibold text-white uppercase tracking-widest flex items-center gap-2">
            <Lightbulb className="text-amber-500 w-4 h-4" /> Recommended 3-Tier SEO Architecture
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#121215] rounded-xl space-y-2 border border-white/5 hover:bg-[#15151a] transition-all">
              <span className="text-[10px] uppercase font-bold text-amber-500/70">Phase 1 (Easy wins)</span>
              <h5 className="font-bold text-white">Target Specific Route Landers</h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Create dedicated pages like <code className="bg-white/5 border border-white/5 text-amber-400 px-1 text-[10px] rounded">/routes/tirupati-to-bangalore-cab</code>. These target low-competition localized searches directly and bypass generic travel aggregate platforms.
              </p>
            </div>

            <div className="p-4 bg-[#121215] rounded-xl space-y-2 border border-white/5 hover:bg-[#15151a] transition-all">
              <span className="text-[10px] uppercase font-bold text-amber-500/70">Phase 2 (Content depth)</span>
              <h5 className="font-bold text-white">Darshan Guides & Toll Info</h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Publish high quality lists covering toll fees, border permit steps, local food choices, and darshan booking procedures. Guides act as informational magnets that naturally refer organic traffic.
              </p>
            </div>

            <div className="p-4 bg-[#121215] rounded-xl space-y-2 border border-white/5 hover:bg-[#15151a] transition-all">
              <span className="text-[10px] uppercase font-bold text-amber-500/70">Phase 3 (Structured Rank)</span>
              <h5 className="font-bold text-white">Rich snippet optimizations</h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Inject real **JSON-LD Schema** (like the snippet on the right) so Google ranks pricing tables, vehicle pictures, and reviews star ratings of your cabs directly inside the organic search slots.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Google SERP Previewer & Dynamic Schema (Cols: 5) */}
      <div className="xl:col-span-5 space-y-6">
        
        {/* Dynamic Route selector for Preview */}
        <div className="bg-[#0e0e10] p-6 rounded-2xl shadow-xl border border-white/5 space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-serif font-semibold text-white uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" />
              Interactive SERP Meta Generator
            </h4>
            <p className="text-[11px] text-slate-400">
              Select any South India outstation destination to preview how search spiders index and display your cab company to tourists.
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-slate-350">Select Specific Target Outstation Route</label>
            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-white/10 bg-[#16161a] text-white focus:outline-none focus:border-amber-500"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>Tirupati to {d.name} Outstation Route</option>
              ))}
            </select>
          </div>

          {/* Desktop Google Search Mockup */}
          <div className="border border-white/5 rounded-xl p-4 bg-[#121215]/80 space-y-2 shadow-inner">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5 text-[10px] font-sans text-slate-400">
              <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 font-mono text-[9px]">SERP MOCK</span>
              <span>Google Desktop Preview for mobile conversions</span>
            </div>

            <div className="space-y-1 pt-1 font-sans">
              {/* Site URL */}
              <div className="text-[11px] text-sky-400 truncate flex items-center gap-1">
                <span>https://www.tirupaticabs.com</span>
                <span className="text-[9px] text-slate-500">› routes › tirupati-...</span>
              </div>
              
              {/* Search Title */}
              <h5 className="text-[15px] text-[#f59e0b] hover:underline font-medium cursor-pointer leading-tight">
                {titleTag}
              </h5>

              {/* Snippet Description */}
              <p className="text-xs text-slate-300 leading-snug">
                <span className="text-slate-400 font-mono">Rating: 4.9 · ‎188 votes · ‎₹{(selectedDest.distanceKm * 12.5).toLocaleString()} est · </span>
                {metaDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Google Schema generator code block */}
        <div className="bg-[#0e0e10] text-white rounded-2xl shadow-xl border border-white/5 overflow-hidden">
          <div className="bg-[#0a0a0b] px-5 py-3.5 flex justify-between items-center border-b border-white/5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-500 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> Structured Schema (JSON-LD)
            </span>
            <span className="text-[9px] text-slate-500">Paste in &lt;head&gt;</span>
          </div>
          <div className="p-5 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-72 leading-relaxed bg-[#070708]">
            <pre>{schemaMarkup}</pre>
          </div>
        </div>

      </div>
    </div>
  );
}
