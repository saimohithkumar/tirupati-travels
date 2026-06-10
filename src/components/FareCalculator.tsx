/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DESTINATIONS, VEHICLES, DRIVERS, Booking, Destination, Vehicle } from '../types';
import { 
  Car, MapPin, Calendar, Clock, Phone, User, Users, Briefcase, 
  CheckCircle, ArrowRight, RefreshCcw, DollarSign, Award, ShieldCheck, Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FareCalculatorProps {
  onNewBookingCreated: (booking: Booking) => void;
}

export default function FareCalculator({ onNewBookingCreated }: FareCalculatorProps) {
  // Pre-defined high fidelity Tirupati/Tirumala pickup points
  const TIRUPATI_LANDMARKS = [
    { name: 'Tirupati Railway Station (Main Gate platform 1-4)', area: 'Tirupati Station Area' },
    { name: 'Tirumala Hill Srivari Main Temple Ridge', area: 'Tirumala Hills (Top)' },
    { name: 'Renigunta Airport (Tirupati Domestic - TJG)', area: 'Tirupati Airport' },
    { name: 'Alipiri toll checkpost (Srivari Hills foot base)', area: 'Alipiri Road' },
    { name: 'Srinivasam Amenities Complex RTC bus station gate', area: 'Near RTC Bus Stand' },
    { name: 'Padmavathi Ammavari Temple (Trichanur Complex)', area: 'Tirupati Rural' },
    { name: 'Tirumala Central Bus Stand Out-gate dropoff', area: 'Tirumala Hills (Top)' },
    { name: 'Sri Kalahasteeshwara Swamy temple entrance walkway', area: 'Tirupati (Outer)' },
    { name: 'Kapila Theertham sacred waterfalls & temple steps', area: 'Alipiri Hills Base' },
    { name: 'Vishnu Nivasam mega pilgrims amenities block', area: 'Opposite Railway Station' },
  ];

  // Dynamic South Indian Distance & details estimator function
  const getDynamicDistanceAndDetails = (destName: string) => {
    const clean = destName.toLowerCase().trim();
    if (!clean) {
      return {
        id: 'custom-temp',
        name: 'Custom Location',
        state: 'South India',
        distanceKm: 150,
        tollFaresRs: 180,
        travelTimeStr: '4 hrs',
        popularFor: 'Custom outstation tour route'
      };
    }

    // Keyword detection checks
    if (clean.includes('bangalore') || clean.includes('bengaluru')) {
      return { id: 'bangalore', name: 'Bengaluru (Bangalore)', state: 'Karnataka', distanceKm: 250, tollFaresRs: 480, travelTimeStr: '5 hrs', popularFor: 'IT Hubs, Airport Transfers, Outstation Commutes' };
    }
    if (clean.includes('chennai') || clean.includes('madras')) {
      return { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', distanceKm: 135, tollFaresRs: 150, travelTimeStr: '3.5 hrs', popularFor: 'Direct Drops, US Consulate, Airport, Marina Beach' };
    }
    if (clean.includes('vellore')) {
      return { id: 'vellore', name: 'Vellore (CMC Hospital & Golden Temple)', state: 'Tamil Nadu', distanceKm: 110, tollFaresRs: 80, travelTimeStr: '2.5 hrs', popularFor: 'Medical Tourism, CMC Hospital, Golden Temple Visit' };
    }
    if (clean.includes('srisailam')) {
      return { id: 'srisailam', name: 'Srisailam (Mallikarjuna Jyotirlinga)', state: 'Andhra Pradesh', distanceKm: 380, tollFaresRs: 420, travelTimeStr: '7.5 hrs', popularFor: 'Nallamala Hills, Mallikarjuna Swamy Jyotirlinga' };
    }
    if (clean.includes('kalahasti') || clean.includes('kalahasthi')) {
      return { id: 'kalahasti', name: 'Sri Kalahasti (Rahu-Ketu Kshetra)', state: 'Andhra Pradesh', distanceKm: 40, tollFaresRs: 0, travelTimeStr: '1 hr', popularFor: 'Srikalahasteeswara Vayu Linga, Rahu Ketu Pooja' };
    }
    if (clean.includes('kanipakam')) {
      return { id: 'kanipakam', name: 'Kanipakam (Varasiddhi Vinayaka)', state: 'Andhra Pradesh', distanceKm: 75, tollFaresRs: 0, travelTimeStr: '1.5 hrs', popularFor: 'Famous Swayambhu Varasiddhi Vinayaka Temple' };
    }
    if (clean.includes('mantralayam')) {
      return { id: 'mantralayam', name: 'Mantralayam (Sri Raghavendra Swamy)', state: 'Andhra Pradesh', distanceKm: 410, tollFaresRs: 380, travelTimeStr: '8 hrs', popularFor: 'Sacred Brindavan of Sri Raghavendra Swamy' };
    }
    if (clean.includes('tiruvannamalai') || clean.includes('arunachal')) {
      return { id: 'tiruvannamalai', name: 'Tiruvannamalai (Arunachala Girivalam)', state: 'Tamil Nadu', distanceKm: 200, tollFaresRs: 220, travelTimeStr: '4 hrs', popularFor: 'Arunachaleswarar Temple, Giri Pradakshina, Ramana Ashram' };
    }

    // Determine State tag based on queries
    let state = 'South India';
    if (clean.includes('tamilnadu') || clean.includes('tamil nadu') || clean.includes('madurai') || clean.includes('coimbatore') || clean.includes('ooty') || clean.includes('rameswaram') || clean.includes('salem') || clean.includes('trichy') || clean.includes('pondy') || clean.includes('pondicherry') || clean.includes('vellore') || clean.includes('kumbakonam')) {
      state = 'Tamil Nadu';
    } else if (clean.includes('karnataka') || clean.includes('bengaluru') || clean.includes('bangalore') || clean.includes('mysor') || clean.includes('hampi') || clean.includes('mangaluru') || clean.includes('udupi')) {
      state = 'Karnataka';
    } else if (clean.includes('kerala') || clean.includes('kochi') || clean.includes('trivandrum') || clean.includes('calicut') || clean.includes('munnar')) {
      state = 'Kerala';
    } else if (clean.includes('andhra') || clean.includes('telangana') || clean.includes('hyderabad') || clean.includes('vijayawada') || clean.includes('guntur') || clean.includes('vizag') || clean.includes('nellore') || clean.includes('kurnool') || clean.includes('chittoor') || clean.includes('kadapa') || clean.includes('anantapur')) {
      state = 'Andhra / Telangana';
    }

    // Simple deterministic string parser hash
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = clean.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    const distanceKm = Math.max(90, Math.min(850, 110 + (hash % 690)));
    const tollFaresRs = Math.round(50 + (distanceKm * 1.35) % 290);
    const hours = Math.max(2, Math.round(distanceKm / 65));
    
    // Capitalize output nicely
    const capitalizedName = destName.split(' ').map(word => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    return {
      id: 'custom-temp',
      name: capitalizedName || 'Custom Location',
      state: state,
      distanceKm: distanceKm,
      tollFaresRs: tollFaresRs,
      travelTimeStr: `${hours} hrs`,
      popularFor: `Custom Tour Route (${state} Dist.)`
    };
  };

  // Booking Form State
  const [pickup, setPickup] = useState('Tirupati Railway Station (Main Gate platform 1-4)');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [selectedDestId, setSelectedDestId] = useState(DESTINATIONS[0].id);
  const [searchQuery, setSearchQuery] = useState(DESTINATIONS[0].name);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLES[1].id); // Default Sedan
  const [tripDate, setTripDate] = useState('2026-06-11');
  const [tripTime, setTripTime] = useState('08:00');
  
  // Custom Days for round-trip (e.g. 1 to 5 days)
  const [numDays, setNumDays] = useState(1);
  
  // Passenger Contact State
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  
  // Booking Step State: 'input' | 'submitting' | 'confirmed'
  const [bookingStep, setBookingStep] = useState<'input' | 'submitting' | 'confirmed'>('input');
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  
  // Driver Allocation Animation
  const [allocationTimer, setAllocationTimer] = useState(4);
  const [allocatedDriverName, setAllocatedDriverName] = useState('Checking database for nearest cab...');

  // Match exact or closest destination
  const matchedDest = DESTINATIONS.find(
    d => d.id === selectedDestId
  );

  const currentDestination = matchedDest || getDynamicDistanceAndDetails(searchQuery);

  const currentVehicle = VEHICLES.find(v => v.id === selectedVehicleId) || VEHICLES[1];

  // Adjust number of days according to tripType
  useEffect(() => {
    if (tripType === 'one-way') {
      setNumDays(1);
    } else if (numDays <= 1) {
      setNumDays(2); // Outstation round-trip usually warrants minimum 2 days
    }
  }, [tripType]);

  // Fare calculations
  const distance = tripType === 'one-way' ? currentDestination.distanceKm : (currentDestination.distanceKm * 2);
  const ratePerKm = tripType === 'one-way' ? currentVehicle.baseRateOneWay : currentVehicle.baseRateRoundTrip;
  
  const distanceCost = Math.round(distance * ratePerKm);
  const driverBatta = currentVehicle.driverBattaPerDay * numDays;
  const tollFares = tripType === 'one-way' ? currentDestination.tollFaresRs : (currentDestination.tollFaresRs * 2);
  const permitStateTax = tripType === 'one-way' ? 250 : 450; // generic state boundary pass estimation
  const totalBaseFare = distanceCost + driverBatta + tollFares + permitStateTax;

  // Handle Form Submission
  const handleCalculateAndBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim() || !passengerPhone.trim()) {
      alert('Please fill out custom contact details to simulate booking.');
      return;
    }

    setBookingStep('submitting');
    setAllocationTimer(3);

    // Save/Persist custom destination to global array if it's dynamic
    let finalDestId = currentDestination.id;
    if (finalDestId === 'custom-temp') {
      const generatedId = 'custom-' + Math.floor(Math.random() * 9000 + 1000);
      const persistentCustomDest = {
        id: generatedId,
        name: searchQuery || 'Custom Location',
        state: 'South India',
        distanceKm: currentDestination.distanceKm,
        tollFaresRs: currentDestination.tollFaresRs,
        travelTimeStr: currentDestination.travelTimeStr,
        popularFor: 'Custom Route (User Input)'
      };
      DESTINATIONS.push(persistentCustomDest);
      finalDestId = generatedId;
      setSelectedDestId(generatedId);
    }

    // Simulated network latency & driver assignment logic
    setTimeout(() => {
      const newBookingId = 'B' + Math.floor(Math.random() * 9000 + 1000);
      const bookingRecord: Booking = {
        id: newBookingId,
        customerName: passengerName,
        customerPhone: passengerPhone,
        pickupLocation: pickup,
        destinationId: finalDestId,
        vehicleId: selectedVehicleId,
        tripType: tripType,
        bookingDate: tripDate,
        pickupTime: tripTime,
        estimatedFare: totalBaseFare,
        status: 'confirmed',
        assignedDriverId: 'D01', // Pre-assigned first driver for simulation
        paidAmount: 0
      };

      setCreatedBooking(bookingRecord);
      onNewBookingCreated(bookingRecord);
      setBookingStep('confirmed');
    }, 3000);
  };

  // Live Status message updates for assignment simulation
  useEffect(() => {
    if (bookingStep === 'submitting') {
      const messages = [
        'Finding nearest certified driver in Tirupati...',
        'Checking driver rating profile & license...',
        'Confirming cab dispatch (Dzire/Innova)...',
        'Ready for booking!'
      ];
      const interval = setInterval(() => {
        setAllocationTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [bookingStep]);

  const resetBookingForm = () => {
    setBookingStep('input');
    setPassengerName('');
    setPassengerPhone('');
    setCreatedBooking(null);
  };

  return (
    <div id="booking-flow" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0a0a0b] p-0 sm:p-2 rounded-2xl md:ring-1 md:ring-white/5">
      
      {/* Left Column: Form & Calculator Inputs (Cols: 7) */}
      <div className="lg:col-span-7 bg-[#0e0e10] p-6 rounded-2xl shadow-xl border border-white/5 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {bookingStep === 'input' && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleCalculateAndBook}
              className="space-y-5"
            >
              <div>
                <h3 className="text-lg font-serif font-medium text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-500" />
                  Instant Outstation Trip Fare Estimator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Accurate, flat-rate outstation rides starting from Tirupati City, Tirupati Airport, or Tirumala Hill.
                </p>
              </div>

              {/* Trip Type Selector */}
              <div className="flex bg-[#16161a] p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setTripType('one-way')}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    tripType === 'one-way' 
                      ? 'bg-amber-500 text-black shadow-md font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  One Way Drop
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('round-trip')}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    tripType === 'round-trip' 
                      ? 'bg-amber-500 text-black shadow-md font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Round Trip (Multi-Day Package)
                </button>
              </div>

              {/* Pickup & Destination Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Pickup Point in Tirupati / Tirumala
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => {
                      setPickup(e.target.value);
                      setShowPickupSuggestions(true);
                    }}
                    onFocus={() => setShowPickupSuggestions(true)}
                    onBlur={() => {
                      // Delay closing slightly so click can register
                      setTimeout(() => setShowPickupSuggestions(false), 250);
                    }}
                    placeholder="Type or select any place in Tirupati/Tirumala"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500/50 transition-all font-semibold text-white bg-[#16161a] placeholder-slate-500"
                  />
                  
                  {/* Pickup Suggestions Dropdown */}
                  {showPickupSuggestions && (
                    <div className="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-[#121215] border border-white/10 rounded-xl shadow-2xl divide-y divide-white/5">
                      {TIRUPATI_LANDMARKS.filter(landmark => 
                        landmark.name.toLowerCase().includes(pickup.toLowerCase()) ||
                        landmark.area.toLowerCase().includes(pickup.toLowerCase())
                      ).length > 0 ? (
                        TIRUPATI_LANDMARKS.filter(landmark => 
                          landmark.name.toLowerCase().includes(pickup.toLowerCase()) ||
                          landmark.area.toLowerCase().includes(pickup.toLowerCase())
                        ).map((landmark, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setPickup(landmark.name);
                              setShowPickupSuggestions(false);
                            }}
                            className="p-2.5 text-xs hover:bg-emerald-500/10 cursor-pointer transition-all flex justify-between items-center text-left"
                          >
                            <div>
                              <span className="font-bold text-white block">{landmark.name}</span>
                              <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{landmark.area}</span>
                            </div>
                            <span className="text-[9px] border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">
                              {landmark.name.toLowerCase().includes('tirumala') ? 'Tirumala' : 'Tirupati'}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-xs text-slate-400 text-left">
                          <p className="font-medium text-emerald-400">Custom Tirupati / Tirumala Address:</p>
                          <span className="text-white font-bold font-mono">"{pickup}"</span>
                          <span className="text-[10px] text-slate-500 block mt-1">Our driver will navigate safely to this custom pickup landmark.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> Outstation Destination
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      setShowSuggestions(true);
                      // Auto-match exact match if user typed full name
                      const match = DESTINATIONS.find(d => d.name.toLowerCase() === val.toLowerCase());
                      if (match) {
                        setSelectedDestId(match.id);
                      } else {
                        setSelectedDestId('custom-temp');
                      }
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      // Delay closing suggestions slightly, so clicks can register
                      setTimeout(() => setShowSuggestions(false), 250);
                    }}
                    placeholder="Type any South Indian place (suggestions appear...)"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500/50 transition-all font-semibold text-white bg-[#16161a] placeholder-slate-500"
                  />
                  
                  {/* Floating suggestions panel */}
                  {showSuggestions && (
                    <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-[#121215] border border-white/10 rounded-xl shadow-2xl divide-y divide-white/5">
                      {DESTINATIONS.filter(d => 
                        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.popularFor.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length > 0 ? (
                        DESTINATIONS.filter(d => 
                          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.popularFor.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((dest) => (
                          <div
                            key={dest.id}
                            onClick={() => {
                              setSelectedDestId(dest.id);
                              setSearchQuery(dest.name);
                              setShowSuggestions(false);
                            }}
                            className="p-3 text-xs hover:bg-amber-500/10 cursor-pointer transition-all flex justify-between items-center text-left"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white block">{dest.name}</span>
                                <span className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1 py-0.5 rounded font-bold uppercase tracking-widest">Rated Tour</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{dest.popularFor}</span>
                            </div>
                            <div className="text-right flex flex-col justify-center">
                              <span className="text-[10px] border border-amber-500/20 bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-mono font-bold">{dest.state}</span>
                              <span className="text-[9px] text-slate-500 font-mono mt-1">{dest.distanceKm} km</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div 
                          className="p-3 text-xs text-slate-400 text-left"
                        >
                          <p className="font-medium text-amber-500">Create custom outstation path:</p>
                          <span className="text-white font-bold font-mono">"{searchQuery || 'Custom Location'}"</span>
                          <span className="text-[10px] text-slate-500 block mt-1">We will compute estimated tolls and route distances dynamically across South India.</span>
                        </div>
                      )}
                    </div>
                  )}


                </div>
              </div>

              {/* Date, Time & Multi-day Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" /> Journey Date
                  </label>
                  <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500/50 font-medium text-white bg-[#16161a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Boarding Time
                  </label>
                  <input
                    type="time"
                    value={tripTime}
                    onChange={(e) => setTripTime(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500/50 font-medium text-white bg-[#16161a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Number of Days
                  </label>
                  <select
                    disabled={tripType === 'one-way'}
                    value={numDays}
                    onChange={(e) => setNumDays(Number(e.target.value))}
                    className="disabled:opacity-50 w-full text-xs px-3 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500/50 font-medium text-white bg-[#16161a]"
                  >
                    <option value={1}>1 Day (Single drop / return)</option>
                    <option value={2}>2 Days (Comfort pilgrim visit)</option>
                    <option value={3}>3 Days (Extended outstation)</option>
                    <option value={4}>4 Days (Leisure tour package)</option>
                    <option value={5}>5 Days (Tour of South India)</option>
                  </select>
                </div>
              </div>

              {/* Fleet Selection Horizontal Cards */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Your Vehicle Class
                </label>
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {VEHICLES.map((vehicle) => {
                    const isSelected = selectedVehicleId === vehicle.id;
                    const calculatedVehicleRate = tripType === 'one-way' ? vehicle.baseRateOneWay : vehicle.baseRateRoundTrip;
                    return (
                      <div
                        key={vehicle.id}
                        onClick={() => setSelectedVehicleId(vehicle.id)}
                        className={`cursor-pointer border rounded-xl p-3.5 flex items-start gap-4 transition-all ${
                          isSelected 
                            ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500/20' 
                            : 'border-white/5 bg-[#121215] hover:bg-[#1a1a20]'
                        }`}
                      >
                        <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-amber-500 text-black' : 'bg-[#1c1c22] text-slate-400'}`}>
                          <Car className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-1">
                            <h4 className="text-xs font-bold text-white truncate">
                              {vehicle.name} <span className="text-[10px] font-normal text-slate-400">[{vehicle.className}]</span>
                            </h4>
                            <span className="text-xs font-bold text-amber-500 whitespace-nowrap">
                              ₹{calculatedVehicleRate}/km
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{vehicle.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Users className="w-3 h-3 text-amber-500" /> {vehicle.capacityPassengers} Seats
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-amber-500" /> {vehicle.capacityBaggage} Bags
                            </span>
                            {vehicle.hasAC && (
                              <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-0.5 animate-pulse">
                                • AC Standard
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conversion UX: Real-time dynamic Contact collector to book immediately */}
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full text-amber-500 bg-amber-500/10">
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white">No Prepayment Required to Lock Booking</h5>
                    <p className="text-[10px] text-slate-400 font-light">Just share your phone. Driver contact & cab tracking details will be dispatched immediately via SMS/WhatsApp.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your First & Last Name"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      required={passengerName.length > 0}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-white/15 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#16161a] text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile Number (+91)"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      required={passengerPhone.length > 0}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-white/15 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#16161a] text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Estimate Fare & Lock Booking
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {bookingStep === 'submitting' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center space-y-6 flex flex-col items-center justify-center h-full"
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                <Car className="absolute inset-4 text-amber-500 w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dispatching Your Request</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Connecting with the highest-rated driver near <span className="font-semibold text-white">{pickup}</span>.
                </p>
              </div>

              {/* Status messages simulation */}
              <div className="bg-[#121215] border border-white/5 px-4 py-2 rounded-full text-[10px] font-mono text-slate-450 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
                {allocationTimer === 3 ? 'Contacting drivers...' : allocationTimer === 2 ? 'Verifying driver availability...' : 'Configuring live routing matrix...'}
              </div>
            </motion.div>
          )}

          {bookingStep === 'confirmed' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif text-white">Booking Confirmed Safely!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Your outstation taxi to <span className="font-semibold text-white">{currentDestination.name}</span> has been secure-registered. Full details have been simulated and pushed onto the Admin dashboard.
                </p>
              </div>

              {/* Virtual WhatsApp Simulation card */}
              <div className="p-4 bg-[#0a0a0b] text-white rounded-xl space-y-3 shadow-inner border border-white/10">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">● VIRTUAL WHATSAPP ALERT PUSHED</span>
                  <span className="text-[9px] text-white/50">{createdBooking?.bookingDate}</span>
                </div>
                
                <div className="space-y-1.5 text-xs font-mono text-white/90">
                  <p><span className="text-white/40">ID:</span> {createdBooking?.id}</p>
                  <p><span className="text-white/40">PICKUP:</span> {createdBooking?.pickupLocation} AT {createdBooking?.pickupTime}</p>
                  <p><span className="text-white/40">ROUTE:</span> Tirupati ➔ {currentDestination.name}</p>
                  <p><span className="text-white/40">CAB MODEL:</span> {currentVehicle.name}</p>
                  <p><span className="text-white/40">DRIVER:</span> Praveen Goud (Rating {DRIVERS[0].rating} ★)</p>
                  <p><span className="text-white/40">TOTAL FARE:</span> ₹{createdBooking?.estimatedFare} (Cash/UPI to driver at end of trip)</p>
                </div>

                <div className="bg-white/5 p-2 rounded text-[10px] text-amber-300">
                  ⚠️ <strong>Transparent Billing:</strong> Toll chargers (₹{tollFares}) and driver allowance are completely integrated. Nil hidden fees.
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetBookingForm}
                  className="flex-1 py-2.5 bg-[#16161a] hover:bg-[#202026] text-slate-350 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border border-[#ffffff0a]"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Close & Plan Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Dynamic Price Breakdown and Live Map/Vibe (Cols: 5) */}
      <div className="lg:col-span-5 bg-[#0e0e10] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-white/5">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                Selected Route Guide
              </span>
              {currentDestination.id === 'custom-temp' && (
                <span className="text-[9px] bg-blue-500/15 text-sky-400 border border-sky-400/20 px-2 py-0.5 rounded font-black uppercase tracking-widest font-mono">
                  Approximated KM
                </span>
              )}
            </div>
            <h4 className="text-xl font-serif font-medium mt-3">Tirupati ➔ {currentDestination.name}</h4>
            <p className="text-xs text-slate-400">
              Popular for: <span className="text-amber-500 font-semibold">{currentDestination.popularFor}</span>
            </p>

            {currentDestination.id === 'custom-temp' && (
              <div className="mt-3 p-3 bg-blue-500/5 border border-blue-500/10 text-slate-350 rounded-xl space-y-1.5 text-[11px] text-left">
                <span className="text-[9px] font-mono tracking-widest font-black uppercase text-sky-450 block">🗺️ South Indian Custom Router</span>
                <p className="leading-relaxed">
                  We've approximated a driving path of <strong className="font-mono text-white text-xs">{currentDestination.distanceKm} Km</strong> to <span className="text-white font-bold">{currentDestination.name}</span>. Feel free to book this route! Our travel co-ordinators will verify standard maps coordinates and call you shortly.
                </p>
              </div>
            )}
          </div>

          {/* Route Stats row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
            <div>
              <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Est. Distance</span>
              <span className="text-sm font-semibold font-mono text-white mt-1 block">
                {tripType === 'one-way' ? currentDestination.distanceKm : (currentDestination.distanceKm * 2)} Km
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Driving Time</span>
              <span className="text-sm font-semibold font-mono text-white mt-1 block">
                {currentDestination.travelTimeStr}
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Active Period</span>
              <span className="text-sm font-semibold font-mono text-white mt-1 block">
                {numDays} {numDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
          </div>

          {/* Detailed Itemized Ledger breakdown */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Itemized Pricing (No Surprise Fees)</h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Base distance charge ({distance} km @ ₹{ratePerKm}/km)</span>
                <span className="font-mono text-slate-100">₹{distanceCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Allowance / Batta ({numDays} days Allowance)</span>
                <span className="font-mono text-slate-100">₹{driverBatta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Predictive toll taxes (South India passes)</span>
                <span className="font-mono text-slate-100">₹{tollFares}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">State border permit taxation pass</span>
                <span className="font-mono text-slate-100">₹{permitStateTax}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Total display at bottom */}
        <div className="mt-8 pt-4 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Estimated Total (INR)</span>
            <div className="text-right">
              <span className="text-3xl font-bold font-mono text-white">₹{totalBaseFare}</span>
              <span className="block text-[9px] text-slate-500 mt-0.5">All-inclusive billing guarantee</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-white/5 p-2.5 rounded-lg flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 animate-pulse" />
              <p className="text-[10px] text-slate-400 leading-snug">
                <strong>Zero Advance Needed:</strong> No up-front fee required. Simulates the user experience where you only pay driver at final drop.
              </p>
            </div>
            
            <div className="bg-white/5 p-2.5 rounded-lg flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-[10px] text-slate-400 leading-snug">
                <strong>Clean CAB Match:</strong> GPS enabled vehicle, premium commercial permit, sanitised interior, certified driver guaranteed.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
