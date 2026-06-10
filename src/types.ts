/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Destination {
  id: string;
  name: string;
  state: string;
  distanceKm: number;
  tollFaresRs: number;
  travelTimeStr: string;
  popularFor: string;
}

export interface Vehicle {
  id: string;
  name: string;
  className: string; // Sedan, SUV, Premium
  baseRateOneWay: number; // Rs per km
  baseRateRoundTrip: number; // Rs per km
  capacityPassengers: number;
  capacityBaggage: number;
  hasAC: boolean;
  driverBattaPerDay: number; // Daily allowance
  description: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  destinationId: string;
  vehicleId: string;
  tripType: 'one-way' | 'round-trip';
  bookingDate: string;
  pickupTime: string;
  estimatedFare: number;
  status: 'pending' | 'confirmed' | 'on-ride' | 'completed' | 'cancelled';
  assignedDriverId?: string;
  paidAmount: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  status: 'available' | 'on-ride' | 'offline';
  assignedVehicle: string;
  licenseNumber: string;
  tripsCompleted: number;
}

export interface SeoKeyword {
  keyword: string;
  monthlySearchVolume: number;
  difficulty: 'Low' | 'Medium' | 'High';
  difficultyPercentage: number;
  costPerClickEstimate: string;
  intent: 'Commercial' | 'Informational' | 'Transactional';
  relevance: string;
  recommendedPage: string;
}

export interface TechStackItem {
  layer: string;
  technology: string;
  icon: string; // Lucide icon identifier
  justification: string;
  alternatives: string[];
  isPrimary: boolean;
  speedRating: number; // out of 5
  seoRating: number; // out of 5
}

// Global Static Data
export const DESTINATIONS: Destination[] = [
  { id: 'bangalore', name: 'Bengaluru (Bangalore)', state: 'Karnataka', distanceKm: 250, tollFaresRs: 480, travelTimeStr: '5 hrs', popularFor: 'IT Hubs, Airport Transfers, Outstation Commutes' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', distanceKm: 135, tollFaresRs: 150, travelTimeStr: '3.5 hrs', popularFor: 'Direct Drops, US Consulate, Airport, Marina Beach' },
  { id: 'vellore', name: 'Vellore (CMC Hospital & Golden Temple)', state: 'Tamil Nadu', distanceKm: 110, tollFaresRs: 80, travelTimeStr: '2.5 hrs', popularFor: 'Medical Tourism, CMC Hospital, Golden Temple Visit' },
  { id: 'srisailam', name: 'Srisailam (Mallikarjuna Jyotirlinga)', state: 'Andhra Pradesh', distanceKm: 380, tollFaresRs: 420, travelTimeStr: '7.5 hrs', popularFor: 'Nallamala Hills, Mallikarjuna Swamy Jyotirlinga' },
  { id: 'kalahasti', name: 'Sri Kalahasti (Rahu-Ketu Kshetra)', state: 'Andhra Pradesh', distanceKm: 40, tollFaresRs: 0, travelTimeStr: '1 hr', popularFor: 'Srikalahasteeswara Vayu Linga, Rahu Ketu Pooja' },
  { id: 'kanipakam', name: 'Kanipakam (Varasiddhi Vinayaka)', state: 'Andhra Pradesh', distanceKm: 75, tollFaresRs: 0, travelTimeStr: '1.5 hrs', popularFor: 'Famous Swayambhu Varasiddhi Vinayaka Temple' },
  { id: 'mantralayam', name: 'Mantralayam (Sri Raghavendra Swamy)', state: 'Andhra Pradesh', distanceKm: 410, tollFaresRs: 380, travelTimeStr: '8 hrs', popularFor: 'Sacred Brindavan of Sri Raghavendra Swamy' },
  { id: 'tiruvannamalai', name: 'Tiruvannamalai (Arunachala Girivalam)', state: 'Tamil Nadu', distanceKm: 200, tollFaresRs: 220, travelTimeStr: '4 hrs', popularFor: 'Arunachaleswarar Temple, Giri Pradakshina, Ramana Ashram' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', distanceKm: 560, tollFaresRs: 1120, travelTimeStr: '9 hrs', popularFor: 'Long distance transfers, Corporate visits' },
  { id: 'pondicherry', name: 'Pondicherry', state: 'Union Territory', distanceKm: 230, tollFaresRs: 310, travelTimeStr: '5 hrs', popularFor: 'Weekend Getaways, Leisure Tourism' },
  { id: 'kanchipuram', name: 'Kanchipuram (Silk & Temples)', state: 'Tamil Nadu', distanceKm: 115, tollFaresRs: 90, travelTimeStr: '2.5 hrs', popularFor: 'Kamakshee Amman Temple, Silk Saree Shopping' },
  { id: 'vijayawada', name: 'Vijayawada (Kanaka Durga)', state: 'Andhra Pradesh', distanceKm: 380, tollFaresRs: 650, travelTimeStr: '7 hrs', popularFor: 'Kanaka Durga Temple Malleshwara Hills' },
  { id: 'madurai', name: 'Madurai (Meenakshi Amman)', state: 'Tamil Nadu', distanceKm: 450, tollFaresRs: 720, travelTimeStr: '8 hrs', popularFor: 'Ancient Meenakshi Sundareswarar Temple Tour' },
  { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', distanceKm: 480, tollFaresRs: 790, travelTimeStr: '8.5 hrs', popularFor: 'Adiyogi Shiva Temple, Isha Yoga Center Transits' },
  { id: 'kochi', name: 'Kochi (Cochin)', state: 'Kerala', distanceKm: 620, tollFaresRs: 950, travelTimeStr: '11 hrs', popularFor: 'Backwaters, Fort Kochi, Scenic Tourism' },
  { id: 'mysuru', name: 'Mysuru (Mysore Palace)', state: 'Karnataka', distanceKm: 390, tollFaresRs: 600, travelTimeStr: '7.5 hrs', popularFor: 'Mysore Palace, Heritage Sites, Chamundi Hills' },
  { id: 'ooty', name: 'Ooty (Udhagamandalam)', state: 'Tamil Nadu', distanceKm: 510, tollFaresRs: 850, travelTimeStr: '10 hrs', popularFor: 'Hill Station Escape, Tea Estates, Botanical Gardens' },
  { id: 'visakhapatnam', name: 'Visakhapatnam (Vizag)', state: 'Andhra Pradesh', distanceKm: 780, tollFaresRs: 1340, travelTimeStr: '13 hrs', popularFor: 'Simhachalam Appanna Temple, Scenic Araku Valley' },
  { id: 'nellore', name: 'Nellore', state: 'Andhra Pradesh', distanceKm: 135, tollFaresRs: 180, travelTimeStr: '3 hrs', popularFor: 'Direct drops, Pennar River, local trade' },
  { id: 'guntur', name: 'Guntur', state: 'Andhra Pradesh', distanceKm: 350, tollFaresRs: 520, travelTimeStr: '6 hrs', popularFor: 'Spices Market, Amaravati Capital Region' },
  { id: 'kurnool', name: 'Kurnool', state: 'Andhra Pradesh', distanceKm: 340, tollFaresRs: 420, travelTimeStr: '6 hrs', popularFor: 'Orvakal Rock Garden, Gateway to Rayalaseema' },
  { id: 'kadapa', name: 'Kadapa (Cuddapah)', state: 'Andhra Pradesh', distanceKm: 140, tollFaresRs: 120, travelTimeStr: '2.5 hrs', popularFor: 'Devuni Kadapa Temple, Gandikota Grand Canyon' },
  { id: 'anantapur', name: 'Anantapur', state: 'Andhra Pradesh', distanceKm: 290, tollFaresRs: 350, travelTimeStr: '5 hrs', popularFor: 'Lepakshi Nandi Temple, Puttabarthi' },
  { id: 'hampi', name: 'Hampi', state: 'Karnataka', distanceKm: 430, tollFaresRs: 540, travelTimeStr: '8.5 hrs', popularFor: 'UNESCO Ruins, Stone Chariot, Virupaksha Temple' },
  { id: 'mangaluru', name: 'Mangaluru (Mangalore)', state: 'Karnataka', distanceKm: 610, tollFaresRs: 880, travelTimeStr: '11.5 hrs', popularFor: 'Panambur Beach, Coastal Cuisine & Port' },
  { id: 'hosur', name: 'Hosur', state: 'Tamil Nadu', distanceKm: 280, tollFaresRs: 450, travelTimeStr: '5 hrs', popularFor: 'Border Transit, Manufacturing Zones' },
  { id: 'chittoor', name: 'Chittoor', state: 'Andhra Pradesh', distanceKm: 70, tollFaresRs: 40, travelTimeStr: '1.2 hrs', popularFor: 'Local District drops, Kanipakam Vinayaka Temple' },
  { id: 'thanjavur', name: 'Thanjavur (Tanjore)', state: 'Tamil Nadu', distanceKm: 390, tollFaresRs: 520, travelTimeStr: '7 hrs', popularFor: 'Brihadeeswara Temple, Tanjore Paintings' },
  { id: 'trichy', name: 'Tiruchirappalli (Trichy)', state: 'Tamil Nadu', distanceKm: 390, tollFaresRs: 520, travelTimeStr: '7 hrs', popularFor: 'Rockfort Temple, Srirangam Temple' },
  { id: 'trivandrum', name: 'Trivandrum', state: 'Kerala', distanceKm: 850, tollFaresRs: 1450, travelTimeStr: '15 hrs', popularFor: 'Padmanabhaswamy Temple, Kovalam Beach' },
  { id: 'kozhikode', name: 'Kozhikode (Calicut)', state: 'Kerala', distanceKm: 585, tollFaresRs: 920, travelTimeStr: '11 hrs', popularFor: 'Malabar Coast Tourism' },
  { id: 'salem', name: 'Salem', state: 'Tamil Nadu', distanceKm: 340, tollFaresRs: 440, travelTimeStr: '6 hrs', popularFor: 'Mango Orchards, Steel City Commutes' },
  { id: 'kumbakonam', name: 'Kumbakonam', state: 'Tamil Nadu', distanceKm: 350, tollFaresRs: 460, travelTimeStr: '6.5 hrs', popularFor: 'Temple tours, Navagraha visits' },
  { id: 'rameswaram', name: 'Rameswaram', state: 'Tamil Nadu', distanceKm: 650, tollFaresRs: 980, travelTimeStr: '11.5 hrs', popularFor: 'Pamban Bridge, Ramanathaswamy Temple Pilgrimage' },
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'hatchback',
    name: 'Suzuki Swift / Indica',
    className: 'Economy Hatchback',
    baseRateOneWay: 18.2,
    baseRateRoundTrip: 15.4,
    capacityPassengers: 4,
    capacityBaggage: 2,
    hasAC: true,
    driverBattaPerDay: 400,
    description: 'Perfect, low-cost choice for solo travellers or small families with light luggage.'
  },
  {
    id: 'sedan',
    name: 'Toyota Etios / Maruti Dzire',
    className: 'Comfort Sedan',
    baseRateOneWay: 20.3,
    baseRateRoundTrip: 17.5,
    capacityPassengers: 4,
    capacityBaggage: 3,
    hasAC: true,
    driverBattaPerDay: 450,
    description: 'The executive ride: balanced legroom, generous trunk space, and high comfort.'
  },
  {
    id: 'suv-classic',
    name: 'Maruti Ertiga',
    className: 'Standard 7-Seater',
    baseRateOneWay: 25.2,
    baseRateRoundTrip: 21,
    capacityPassengers: 6,
    capacityBaggage: 4,
    hasAC: true,
    driverBattaPerDay: 500,
    description: 'Spacious multi-utility vehicle designed for family transfers with moderate bags.'
  },
  {
    id: 'suv-premium',
    name: 'Toyota Innova Crysta',
    className: 'Premium Outstation King',
    baseRateOneWay: 29.4,
    baseRateRoundTrip: 25.2,
    capacityPassengers: 7,
    capacityBaggage: 5,
    hasAC: true,
    driverBattaPerDay: 600,
    description: 'Gold standard for long distance South India tours. Legendary comfort and air conditioning.'
  },
  {
    id: 'tempo-traveller',
    name: 'Force Tempo Traveller',
    className: 'Large Group Carrier (12S)',
    baseRateOneWay: 39.2,
    baseRateRoundTrip: 33.6,
    capacityPassengers: 12,
    capacityBaggage: 10,
    hasAC: true,
    driverBattaPerDay: 700,
    description: 'Best for joint families taking pilgrimage package tours or airport delegations.'
  },
  {
    id: 'mini-bus',
    name: 'Force Urbania / Eicher Mini Bus',
    className: 'Comfort Mini Bus (20S)',
    baseRateOneWay: 53.2,
    baseRateRoundTrip: 44.8,
    capacityPassengers: 20,
    capacityBaggage: 18,
    hasAC: true,
    driverBattaPerDay: 1000,
    description: 'Ideal option for large group pilgrimages, marriage delegations, or corporate tours.'
  }
];

export const DRIVERS: Driver[] = [
  { id: 'D01', name: 'Praveen Goud', phone: '+91 98765 43210', rating: 4.9, status: 'available', assignedVehicle: 'Toyota Innova Crysta (AP03-TV-1234)', licenseNumber: 'DL-A0392019932', tripsCompleted: 412 },
  { id: 'D02', name: 'Srinivas Murthy', phone: '+91 91234 56789', rating: 4.8, status: 'on-ride', assignedVehicle: 'Toyota Etios (AP03-TX-5678)', licenseNumber: 'DL-A0420210088', tripsCompleted: 350 },
  { id: 'D03', name: 'C. Reddy', phone: '+91 99887 76655', rating: 4.7, status: 'available', assignedVehicle: 'Maruti Dzire (AP03-TY-9012)', licenseNumber: 'DL-A0388271021', tripsCompleted: 580 },
  { id: 'D04', name: 'M. Krishna', phone: '+91 90500 12345', rating: 4.9, status: 'on-ride', assignedVehicle: 'Maruti Ertiga (AP03-TZ-3456)', licenseNumber: 'DL-A0512018844', tripsCompleted: 215 },
  { id: 'D05', name: 'Ravi Teja', phone: '+91 94412 34567', rating: 4.6, status: 'offline', assignedVehicle: 'Tempo Traveller (AP03-TV-7890)', licenseNumber: 'DL-A0299101234', tripsCompleted: 188 }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'B001',
    customerName: 'Anoop Sharma',
    customerPhone: '+91 98450 11223',
    pickupLocation: 'Tirupati Railway Station (Platforms 1-4 Gate)',
    destinationId: 'bangalore',
    vehicleId: 'suv-premium',
    tripType: 'one-way',
    bookingDate: '2026-06-11',
    pickupTime: '08:30 AM',
    estimatedFare: 5850,
    status: 'confirmed',
    assignedDriverId: 'D01',
    paidAmount: 1000 // Partial advance token
  },
  {
    id: 'B002',
    customerName: 'Lakshmi Narayanan',
    customerPhone: '+91 91100 22334',
    pickupLocation: 'Tirupati Alipiri Guest House',
    destinationId: 'chennai',
    vehicleId: 'sedan',
    tripType: 'round-trip',
    bookingDate: '2026-06-10',
    pickupTime: '13:00 PM',
    estimatedFare: 4275,
    status: 'on-ride',
    assignedDriverId: 'D02',
    paidAmount: 4275 // Fully paid cash/UPI
  },
  {
    id: 'B003',
    customerName: 'Dr. Vineet Roy',
    customerPhone: '+91 97722 88291',
    pickupLocation: 'Srinivasam Amenities Complex',
    destinationId: 'vellore',
    vehicleId: 'hatchback',
    tripType: 'one-way',
    bookingDate: '2026-06-12',
    pickupTime: '06:00 AM',
    estimatedFare: 1910,
    status: 'pending',
    paidAmount: 0
  }
];

export const SEO_KEYWORDS: SeoKeyword[] = [
  { keyword: 'Tirupati to Bangalore Cab', monthlySearchVolume: 8400, difficulty: 'Medium', difficultyPercentage: 45, costPerClickEstimate: '₹12.40', intent: 'Transactional', relevance: 'Ultra High (Pilgrims returning to Bangalore seek direct drops/pickups)', recommendedPage: '/routes/tirupati-to-bangalore' },
  { keyword: 'Tirupati to Chennai Travels', monthlySearchVolume: 6200, difficulty: 'Medium', difficultyPercentage: 48, costPerClickEstimate: '₹9.80', intent: 'Commercial', relevance: 'Ultra High (Chennai has the nearest major international airport; direct transfers are frequent)', recommendedPage: '/routes/tirupati-to-chennai' },
  { keyword: 'Tirupati to Vellore Cab', monthlySearchVolume: 4300, difficulty: 'Low', difficultyPercentage: 25, costPerClickEstimate: '₹7.50', intent: 'Transactional', relevance: 'High (Common for patient transfers to CMC Vellore or tourists visited Sripuram Golden Temple)', recommendedPage: '/routes/tirupati-to-vellore' },
  { keyword: 'Innova Rental Tirupati', monthlySearchVolume: 2900, difficulty: 'Medium', difficultyPercentage: 54, costPerClickEstimate: '₹16.00', intent: 'Transactional', relevance: 'Very High (Families want Innova specs for comfortable temple trips with seniors)', recommendedPage: '/car-rentals/innova' },
  { keyword: 'Tirupati Padmavati Travels', monthlySearchVolume: 1200, difficulty: 'Low', difficultyPercentage: 18, costPerClickEstimate: '₹4.50', intent: 'Commercial', relevance: 'Medium-High (Trust searches on local travels name)', recommendedPage: '/' },
  { keyword: 'Tirupati Balaji Darshan Car Package', monthlySearchVolume: 5400, difficulty: 'High', difficultyPercentage: 72, costPerClickEstimate: '₹22.50', intent: 'Transactional', relevance: 'Extremely High (Lucrative all-inclusive luxury car packages with quick Darshan guidance)', recommendedPage: '/packages/tirumala-darshan' },
  { keyword: 'Tirupati Airport to Tirumala Taxi cost', monthlySearchVolume: 1800, difficulty: 'Low', difficultyPercentage: 15, costPerClickEstimate: '₹5.20', intent: 'Informational', relevance: 'High (Direct click-to-book intent right after flight booking)', recommendedPage: '/routes/airport-to-tirumala-hills' }
];

export const TECH_STACK: TechStackItem[] = [
  {
    layer: 'Frontend Framework',
    technology: 'Next.js (React Server Components)',
    icon: 'Layers',
    justification: 'Critical for SEO and routing pages. Next.js natively compiles static pages for outstation routes (e.g., /routes/tirupati-to-bangalore-cab) during build time, achieving 100/100 Lighthouse performance and instant load speeds, which rank exceptionally high on Google Mobile Search.',
    alternatives: ['React SPA (Vite) + Prerender.io', 'Remix'],
    isPrimary: true,
    speedRating: 5,
    seoRating: 5
  },
  {
    layer: 'Styling Engine',
    technology: 'Tailwind CSS v4 + Framer Motion',
    icon: 'Sparkles',
    justification: 'Accelerates UI composition with super fast mobile-first layouts. Dynamic interactive micro-animations (like a moving taxi on booking confirmation) greatly enhance user conversion rates on smartphones.',
    alternatives: ['Bootstrap', 'CSS Modules'],
    isPrimary: true,
    speedRating: 5,
    seoRating: 5
  },
  {
    layer: 'Backend API Service',
    technology: 'Node.js Serverless Functions / Express',
    icon: 'Cpu',
    justification: 'Lightweight API endpoints for live fare computation (using matrix distance engines like Google Distance Matrix API), sending automated WhatsApp notifications, and managing SMS booking codes.',
    alternatives: ['Python FastAPI', 'Go (Golang)'],
    isPrimary: true,
    speedRating: 5,
    seoRating: 5
  },
  {
    layer: 'Database & Real-time',
    technology: 'Supabase (PostgreSQL) / Firebase',
    icon: 'Database',
    justification: 'Handles user details and booking tracking. Supabase gives a relational PostgreSQL database with instant REST APIs, while enabling Real-time webhooks for live driver allocation triggers and WhatsApp tracking pushes.',
    alternatives: ['MongoDB', 'Prisma + Cloud SQL PostgreSQL'],
    isPrimary: true,
    speedRating: 5,
    seoRating: 4
  },
  {
    layer: 'Customer Alerts & Communications',
    technology: 'Twilio + WhatsApp Business API',
    icon: 'MessageSquare',
    justification: 'Crucial for outstation cabs. Instantly sends booking confirmations, driver assignment details (name, photo, phone, OTP), and tracking links directly to the customer as soon as they book. Reduces cancellation rates to near-zero.',
    alternatives: ['SendGrid SMS', 'MessageBird'],
    isPrimary: true,
    speedRating: 5,
    seoRating: 3
  }
];
