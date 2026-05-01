import type { Vehicle } from '@/types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'rav4',
    name: 'Toyota RAV4',
    trim: 'XLE / 2022-2023 CPO',
    segment: 'CPO',
    priceLow: 24000,
    priceHigh: 28000,
    cargoMax: 69.8,
    cargoBehind: 37.6,
    awd: 'available',
    warranty: '12mo/12k CPO + remaining 5yr/60k powertrain',
    topPick: true,
    note: 'King of reliability. Holds value better than anything else here. Strong WI choice with optional AWD.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/2019_Toyota_RAV4_LE_2.5L_front_4.14.19.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/DSC06531-Toyota_Rav4_Hybrid.jpg'
    },
    manufacturerUrl: 'https://www.toyota.com/rav4/',
    searchUrlSlug: { make: 'toyota', model: 'rav4' },
    safety: {
      suite: 'Toyota Safety Sense 2.5+',
      standard: [
        'Pre-Collision System with Pedestrian Detection',
        'Lane Departure Alert with Steering Assist',
        'Lane Tracing Assist',
        'Full-Speed Dynamic Radar Cruise Control',
        'Automatic High Beams',
        'Road Sign Assist',
        'Backup Camera',
        '8 Airbags'
      ],
      available: [
        'Blind Spot Monitor with Rear Cross Traffic Alert',
        'Front and Rear Parking Assist with Auto Braking',
        'Bird\'s Eye View Camera',
        'Digital Rearview Mirror'
      ]
    },
    tech: {
      standard: [
        '8" Touchscreen',
        'Wireless Apple CarPlay',
        'Wireless Android Auto',
        'Bluetooth + USB',
        '6-Speaker Audio',
        'WiFi Hotspot capable'
      ],
      available: [
        '10.5" Premium Audio Display',
        'Wireless Phone Charging',
        '11-Speaker JBL Premium Audio',
        'Head-Up Display',
        'Digital Key',
        'Hands-Free Power Liftgate'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Push-button Start',
        'Auto Climate Control',
        'Power Windows + Locks',
        '60/40 Split Folding Rear Seats'
      ],
      available: [
        'SofTex Synthetic Leather',
        'Heated Front Seats',
        'Heated Steering Wheel',
        'Power Driver Seat',
        'Panoramic Sunroof',
        'Power Liftgate'
      ]
    },
    specs: { mpg: '27 city / 35 hwy', horsepower: 203, seating: 5, towingLb: 1500, groundClearanceIn: 8.4 }
  },
  {
    id: 'forester',
    name: 'Subaru Forester',
    trim: 'Premium / 2022-2023 CPO',
    segment: 'CPO',
    priceLow: 23000,
    priceHigh: 27000,
    cargoMax: 76.1,
    cargoBehind: 31.1,
    awd: 'standard',
    warranty: '7yr/100k CPO from original date + 5yr/60k powertrain',
    topPick: true,
    note: 'Standard symmetrical AWD - best for WI winters. Easy visibility, simple to live with, huge cargo. Boxer engine = unique vibration profile.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/2019_Subaru_Forester_2.5i_Touring_AWD_front_3.17.19.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Subaru_FORESTER_Premium_%285BA-SK9%29_interior.jpg',
      rear: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/2019_Subaru_Forester_2.5i_Premium%2C_rear_10.6.19.jpg'
    },
    manufacturerUrl: 'https://www.subaru.com/vehicles/forester/',
    searchUrlSlug: { make: 'subaru', model: 'forester' },
    safety: {
      suite: 'Subaru EyeSight Driver Assist',
      standard: [
        'Pre-Collision Braking',
        'Pre-Collision Throttle Management',
        'Adaptive Cruise Control',
        'Lane Departure & Sway Warning',
        'Lane Keep Assist',
        'Lead Vehicle Start Alert',
        'Automatic Emergency Steering',
        'Backup Camera',
        '8 Airbags',
        'Symmetrical AWD (standard)'
      ],
      available: [
        'Blind Spot Detection with Rear Cross Traffic Alert',
        'Reverse Automatic Braking',
        'Steering Responsive Headlights',
        'DriverFocus Distraction Mitigation'
      ]
    },
    tech: {
      standard: [
        '6.5" or 8" Touchscreen',
        'Apple CarPlay (wired)',
        'Android Auto (wired)',
        'Bluetooth + USB',
        'STARLINK Connected Services'
      ],
      available: [
        '8" Touchscreen with Dual USB',
        'Wireless CarPlay/Android Auto (Sport+)',
        'Harman Kardon 9-Speaker Premium Audio',
        'Built-in Navigation'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Auto Climate Control',
        'Power Windows + Locks',
        '60/40 Split Folding Rear Seats',
        'Roof Rails',
        '8.7" Ground Clearance'
      ],
      available: [
        'Heated Front Seats',
        'Heated Steering Wheel',
        'Power Driver Seat',
        'Panoramic Power Moonroof',
        'Power Liftgate with Memory',
        'Leather Seats (Touring)',
        'Heated Rear Seats (Touring)'
      ]
    },
    specs: { mpg: '26 city / 33 hwy', horsepower: 182, seating: 5, towingLb: 1500, groundClearanceIn: 8.7 }
  },
  {
    id: 'crv',
    name: 'Honda CR-V',
    trim: 'EX / 2022-2023 CPO',
    segment: 'CPO',
    priceLow: 25000,
    priceHigh: 28000,
    cargoMax: 76.5,
    cargoBehind: 39.3,
    awd: 'available',
    warranty: '12mo/12k CPO + remaining 5yr/60k powertrain',
    note: 'Massive cargo, very roomy rear seat. Hybrid versions exist if MPG matters. Slightly pricier than rivals but holds value.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Honda_CR-V_e-HEV_Elegance_AWD_%28VI%29_%E2%80%93_f_14072024.jpg'
    },
    manufacturerUrl: 'https://automobiles.honda.com/cr-v',
    searchUrlSlug: { make: 'honda', model: 'cr-v' },
    safety: {
      suite: 'Honda Sensing',
      standard: [
        'Collision Mitigation Braking System',
        'Forward Collision Warning',
        'Lane Keeping Assist System',
        'Road Departure Mitigation',
        'Adaptive Cruise Control with Low-Speed Follow',
        'Traffic Sign Recognition',
        'Auto High Beams',
        'Driver Attention Monitor',
        'Backup Camera with Dynamic Guidelines'
      ],
      available: [
        'Blind Spot Information System',
        'Rear Cross Traffic Monitor',
        'Front and Rear Parking Sensors',
        'Low-Speed Braking Control'
      ]
    },
    tech: {
      standard: [
        '7" Touchscreen (LX) or 9" (EX+)',
        'Apple CarPlay (wireless on EX+)',
        'Android Auto (wireless on EX+)',
        'Bluetooth + 2 USB ports',
        'HondaLink Connected Services'
      ],
      available: [
        '9" Touchscreen with Wireless CarPlay',
        'Wireless Phone Charger',
        'Bose 12-Speaker Premium Audio',
        'Wi-Fi Hotspot',
        'Head-Up Display (Hybrid trims)'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Dual-Zone Climate Control',
        'Push-Button Start',
        'Multi-Angle Backup Camera',
        '60/40 Split Folding Rear Seats'
      ],
      available: [
        'Leather-Trimmed Seats',
        'Heated Front Seats',
        'Heated Steering Wheel',
        '12-Way Power Driver Seat',
        'Panoramic Moonroof',
        'Hands-Free Power Tailgate',
        'Heated Rear Seats'
      ]
    },
    specs: { mpg: '28 city / 34 hwy', horsepower: 190, seating: 5, towingLb: 1500, groundClearanceIn: 8.2 }
  },
  {
    id: 'cx5',
    name: 'Mazda CX-5',
    trim: 'Touring / 2022-2023 CPO',
    segment: 'CPO',
    priceLow: 22000,
    priceHigh: 26000,
    cargoMax: 59.3,
    cargoBehind: 30.9,
    awd: 'available',
    warranty: '12mo/12k CPO + remaining 5yr/60k powertrain',
    note: 'Premium-feeling interior, sportier drive. Smaller cargo than rivals but the cabin punches well above price.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/5/58/2020-2021_Mazda_CX-5_XD_AWD.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Mazda_CX-5_XD_L_Package_2WD_%28LDA-KF2P%29_interior.jpg',
      rear: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/2020-2021_Mazda_CX-5_XD_AWD_rear.jpg'
    },
    manufacturerUrl: 'https://www.mazdausa.com/vehicles/cx-5',
    searchUrlSlug: { make: 'mazda', model: 'cx-5' },
    safety: {
      suite: 'Mazda i-Activsense',
      standard: [
        'Smart Brake Support (Forward AEB)',
        'Mazda Radar Cruise Control',
        'Lane Departure Warning System',
        'Lane Keep Assist',
        'Blind Spot Monitoring',
        'Rear Cross Traffic Alert',
        'Driver Attention Alert',
        'Auto High-Beam Control',
        'Backup Camera'
      ],
      available: [
        'Smart Brake Support Reverse',
        'Front Cross Traffic Alert',
        'Adaptive Front-Lighting System',
        '360° View Monitor',
        'Traffic Jam Assist'
      ]
    },
    tech: {
      standard: [
        '10.25" Mazda Connect Display',
        'Apple CarPlay (wired or wireless)',
        'Android Auto (wired)',
        'Bluetooth',
        '6-Speaker Audio'
      ],
      available: [
        '10-Speaker Bose Premium Audio',
        'Wireless Phone Charging',
        'Active Driving Display (HUD)',
        'Built-in Navigation'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Dual-Zone Auto Climate',
        'Push-Button Start',
        '40/20/40 Split Folding Rear Seats'
      ],
      available: [
        'Leatherette or Leather Seats',
        'Heated Front Seats',
        'Heated Steering Wheel',
        'Heated Rear Seats',
        'Ventilated Front Seats',
        '10-Way Power Driver Seat',
        'Power Moonroof',
        'Power Liftgate'
      ]
    },
    specs: { mpg: '24 city / 30 hwy', horsepower: 187, seating: 5, towingLb: 2000, groundClearanceIn: 7.6 }
  },
  {
    id: 'sportage',
    name: 'Kia Sportage',
    trim: 'LX (NEW) / EX (CPO 2023)',
    segment: 'NEW',
    priceLow: 27000,
    priceHigh: 28000,
    cargoMax: 73.7,
    cargoBehind: 39.6,
    awd: 'available',
    warranty: '10yr/100k powertrain (new), 5yr/60k bumper-to-bumper',
    topPick: true,
    note: '2023 redesign was a huge upgrade. 10-year warranty is killer for subprime peace of mind. Modern tech, lots of room.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/2022_Kia_Sportage_GT-Line_ISG_HEV_Automatic_1.6_Front.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Kia_Sportage_Plug-in-Hybrid_%28NQ5%29_IAA_2021_1X7A0114.jpg',
      rear: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/2022_Kia_Sportage_GT-Line_ISG_HEV_Automatic_1.6_Rear.jpg'
    },
    manufacturerUrl: 'https://www.kia.com/us/en/sportage',
    searchUrlSlug: { make: 'kia', model: 'sportage' },
    safety: {
      suite: 'Kia Drive Wise',
      standard: [
        'Forward Collision-Avoidance Assist (Car/Pedestrian/Cyclist)',
        'Blind-Spot Collision-Avoidance Assist',
        'Lane Keeping Assist',
        'Lane Following Assist',
        'Smart Cruise Control with Stop & Go',
        'Driver Attention Warning',
        'High Beam Assist',
        'Rear Cross-Traffic Collision Avoidance',
        'Safe Exit Warning'
      ],
      available: [
        'Highway Driving Assist 2',
        'Blind-Spot View Monitor',
        'Surround View Monitor (360)',
        'Remote Smart Parking Assist',
        'Forward/Reverse Parking Distance Warning'
      ]
    },
    tech: {
      standard: [
        '8" Touchscreen',
        'Apple CarPlay (wireless)',
        'Android Auto (wireless)',
        'Bluetooth + USB-C ports',
        '6-Speaker Audio'
      ],
      available: [
        '12.3" Curved Display (instrument + infotainment)',
        'Wireless Phone Charger',
        'Harman Kardon 8-Speaker Premium Audio',
        'Head-Up Display',
        'Digital Key 2 (smartphone as key)',
        'Built-in Navigation'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Auto Climate Control',
        'Push-Button Start',
        'Heated Front Seats (most trims)',
        '60/40 Split Folding Rear Seats'
      ],
      available: [
        'SynTex or Leather Seats',
        'Heated Steering Wheel',
        'Heated Rear Seats',
        'Ventilated Front Seats',
        '10-Way Power Driver Seat',
        'Panoramic Sunroof',
        'Power Liftgate with Smart Open'
      ]
    },
    specs: { mpg: '25 city / 32 hwy', horsepower: 187, seating: 5, towingLb: 2500, groundClearanceIn: 8.3 }
  },
  {
    id: 'tucson',
    name: 'Hyundai Tucson',
    trim: 'SE (NEW) / SEL (CPO 2023)',
    segment: 'NEW',
    priceLow: 28000,
    priceHigh: 29000,
    cargoMax: 74.8,
    cargoBehind: 38.7,
    awd: 'available',
    warranty: '10yr/100k powertrain (new), 5yr/60k bumper-to-bumper',
    note: 'Same chassis as Sportage. Sharper exterior design. CPO carries remaining 10yr warranty.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Hyundai_Tucscon_1.6_T-GDI_Hybrid_Prime_%28IV%29_%E2%80%93_f_25042024.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Hyundai_Tucson_Inspiration_NX4_Gray_Interior_%284%29.jpg',
      rear: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/2024_Hyundai_Tucson_Limited%2C_rear_12.10.24.jpg'
    },
    manufacturerUrl: 'https://www.hyundaiusa.com/us/en/vehicles/tucson',
    searchUrlSlug: { make: 'hyundai', model: 'tucson' },
    safety: {
      suite: 'Hyundai SmartSense',
      standard: [
        'Forward Collision-Avoidance Assist (Car/Pedestrian/Cyclist)',
        'Blind-Spot Collision-Avoidance Assist',
        'Lane Keeping Assist',
        'Lane Following Assist',
        'Smart Cruise Control with Stop & Go',
        'Driver Attention Warning',
        'High Beam Assist',
        'Rear Cross-Traffic Collision Avoidance',
        'Safe Exit Warning'
      ],
      available: [
        'Highway Driving Assist',
        'Blind-Spot View Monitor',
        'Surround View Monitor (360)',
        'Remote Smart Parking Assist'
      ]
    },
    tech: {
      standard: [
        '8" Touchscreen',
        'Apple CarPlay (wireless)',
        'Android Auto (wireless)',
        'Bluetooth + USB-C ports',
        '6-Speaker Audio'
      ],
      available: [
        '10.25" Touchscreen + 10.25" Digital Cluster',
        'Wireless Phone Charger',
        'Bose 8-Speaker Premium Audio',
        'Built-in Navigation',
        'Digital Key 2'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Auto Climate Control',
        'Push-Button Start',
        '60/40 Split Folding Rear Seats'
      ],
      available: [
        'Leather Seats',
        'Heated Front Seats',
        'Heated Steering Wheel',
        'Heated Rear Seats',
        'Ventilated Front Seats',
        '8-Way Power Driver Seat',
        'Panoramic Sunroof',
        'Hands-Free Smart Liftgate'
      ]
    },
    specs: { mpg: '25 city / 32 hwy', horsepower: 187, seating: 5, towingLb: 2000, groundClearanceIn: 8.3 }
  },
  {
    id: 'rogue',
    name: 'Nissan Rogue',
    trim: 'S (NEW) / SV (CPO 2022-2023)',
    segment: 'NEW',
    priceLow: 28000,
    priceHigh: 30000,
    cargoMax: 74.1,
    cargoBehind: 36.5,
    awd: 'available',
    warranty: '5yr/60k powertrain, 3yr/36k bumper-to-bumper',
    note: 'Comfortable ride, good MPG. Nissan Motor Acceptance is one of the most subprime-friendly captives in the industry.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/9/94/2021_Nissan_Rogue_SV_AWD%2C_front_1.1.21.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/2022_Nissan_Rogue_interior.jpg',
      rear: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/2023_Nissan_Rogue_SV%2C_rear_3.24.23.jpg'
    },
    manufacturerUrl: 'https://www.nissanusa.com/vehicles/crossovers-suvs/rogue.html',
    searchUrlSlug: { make: 'nissan', model: 'rogue' },
    safety: {
      suite: 'Nissan Safety Shield 360',
      standard: [
        'Automatic Emergency Braking with Pedestrian Detection',
        'Rear Automatic Braking',
        'Blind Spot Warning',
        'Rear Cross Traffic Alert',
        'Lane Departure Warning',
        'High Beam Assist',
        'Intelligent Cruise Control',
        'Intelligent Forward Collision Warning',
        'Rear Door Alert'
      ],
      available: [
        'ProPILOT Assist with Navi-Link',
        'Intelligent Around View Monitor (360)',
        'Traffic Sign Recognition',
        'Front and Rear Sonar with Auto Brake'
      ]
    },
    tech: {
      standard: [
        '8" Touchscreen',
        'Apple CarPlay (wireless)',
        'Android Auto (wired)',
        'Bluetooth + USB',
        'NissanConnect Services'
      ],
      available: [
        '12.3" Touchscreen',
        'Wireless Phone Charging',
        'Bose 10-Speaker Premium Audio',
        'Head-Up Display',
        'Built-in Navigation',
        'Wi-Fi Hotspot'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Auto Climate Control',
        'Push-Button Start',
        'Rear Door Alert',
        '60/40 Split Folding Rear Seats',
        'Divide-N-Hide Cargo System'
      ],
      available: [
        'Quilted Semi-Aniline Leather',
        'Heated Front Seats',
        'Heated Steering Wheel',
        'Heated Rear Outboard Seats',
        '8-Way Power Driver Seat',
        'Panoramic Moonroof',
        'Power Liftgate with Motion Activation'
      ]
    },
    specs: { mpg: '30 city / 37 hwy', horsepower: 201, seating: 5, towingLb: 1500, groundClearanceIn: 8.2 }
  },
  {
    id: 'outlander',
    name: 'Mitsubishi Outlander',
    trim: 'ES (NEW)',
    segment: 'NEW',
    priceLow: 28000,
    priceHigh: 30000,
    cargoMax: 64.3,
    cargoBehind: 30.0,
    awd: 'available',
    warranty: '10yr/100k powertrain, 5yr/60k bumper-to-bumper',
    note: '10-year warranty + optional 3rd row seating (rare in this class). Mitsubishi heavily incentivized for subprime.',
    images: {
      exterior: 'https://upload.wikimedia.org/wikipedia/commons/2/23/2022_Mitsubishi_Outlander_SEL_2.5_in_Alloy_Silver%2C_front_left.jpg',
      interior: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/2023_Mitsubishi_Outlander_interior.jpg',
      rear: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/2022_Mitsubishi_Outlander_SEL_2.5_in_Alloy_Silver%2C_rear_left.jpg'
    },
    manufacturerUrl: 'https://www.mitsubishicars.com/outlander',
    searchUrlSlug: { make: 'mitsubishi', model: 'outlander' },
    safety: {
      suite: 'MI-PILOT Assist',
      standard: [
        'Forward Collision Mitigation',
        'Blind Spot Warning with Lane Change Assist',
        'Rear Cross Traffic Alert',
        'Lane Departure Warning',
        'Auto High Beam',
        'Adaptive Cruise Control',
        'Driver Attention Alert',
        'Hill Start Assist'
      ],
      available: [
        'MI-PILOT Assist (semi-autonomous highway driving)',
        'Multi-View Camera (360)',
        'Front and Rear Parking Sensors',
        'Predictive Forward Collision Warning'
      ]
    },
    tech: {
      standard: [
        '8" Touchscreen',
        'Apple CarPlay (wireless)',
        'Android Auto (wired)',
        'Bluetooth + USB',
        '6-Speaker Audio'
      ],
      available: [
        '9" Touchscreen with Built-in Nav',
        '12.3" Digital Driver Display',
        'Wireless Phone Charging',
        'Bose 10-Speaker Premium Audio',
        'Head-Up Display',
        'Tri-Zone Auto Climate'
      ]
    },
    comfort: {
      standard: [
        'Cloth Seats',
        'Auto Climate Control',
        'Push-Button Start',
        '60/40 Split Folding 2nd Row',
        '50/50 Split Folding 3rd Row (optional)',
        'Up to 7 Passengers'
      ],
      available: [
        'Quilted Semi-Aniline Leather',
        'Heated Front Seats',
        'Heated Steering Wheel',
        'Heated 2nd Row Seats',
        'Ventilated Front Seats',
        '8-Way Power Driver Seat',
        'Panoramic Sunroof',
        'Power Liftgate'
      ]
    },
    specs: { mpg: '24 city / 31 hwy', horsepower: 181, seating: 7, towingLb: 2000, groundClearanceIn: 8.3 }
  }
];

export const PREQUAL_SITES = [
  { name: 'Capital One Auto Navigator', url: 'https://www.capitalone.com/cars/', detail: 'Soft pull · 12,000+ dealers · subprime-friendly' },
  { name: 'CarMax Pre-Approval', url: 'https://www.carmax.com/pre-qualify', detail: 'Soft pull · valid 30 days · no-haggle' },
  { name: 'Carvana Pre-Qualify', url: 'https://www.carvana.com/financing', detail: 'Soft pull · online buying · marks up subprime' },
  { name: 'Chase Auto', url: 'https://www.chase.com/personal/auto-loans', detail: 'If you bank with Chase · existing customer rates' }
];

export const WI_CREDIT_UNIONS = [
  { name: 'Landmark Credit Union', url: 'https://www.landmarkcu.com/', detail: 'Statewide WI · large footprint' },
  { name: 'UW Credit Union', url: 'https://www.uwcu.org/', detail: 'Open to anyone in WI · competitive rates' },
  { name: 'Summit Credit Union', url: 'https://www.summitcreditunion.com/', detail: 'Madison area · member-friendly' },
  { name: 'Educators Credit Union', url: 'https://www.ecu.com/', detail: 'Racine area · WI-wide membership' },
  { name: 'Connexus Credit Union', url: 'https://www.connexuscu.org/', detail: 'Wausau · statewide' }
];

export const SHOP_SITES = [
  { name: 'CarGurus', url: 'https://www.cargurus.com/', detail: 'Best deal-rating algorithm' },
  { name: 'Autotrader', url: 'https://www.autotrader.com/', detail: 'Biggest inventory selection' },
  { name: 'Cars.com', url: 'https://www.cars.com/', detail: 'Clean comparison UI' },
  { name: 'TrueCar', url: 'https://www.truecar.com/', detail: 'Shows what others paid in your area' },
  { name: 'CarMax', url: 'https://www.carmax.com/', detail: 'No-haggle, big CPO inventory' },
  { name: 'Carvana', url: 'https://www.carvana.com/', detail: 'Online + delivery' }
];

export const WI_DEALERS = [
  { name: 'Bergstrom Automotive', url: 'https://www.bergstromauto.com/', detail: 'Huge WI footprint, multi-brand' },
  { name: 'Russ Darrow', url: 'https://www.russdarrow.com/', detail: 'Milwaukee/SE Wisconsin' },
  { name: 'Ewald Automotive', url: 'https://www.ewaldauto.com/', detail: 'Milwaukee area' },
  { name: 'Boucher Automotive', url: 'https://www.boucher.com/', detail: 'Milwaukee/Waukesha area' },
  { name: 'Kayser Automotive', url: 'https://www.kayserauto.com/', detail: 'Madison area' }
];

export interface DealerStop {
  name: string;
  brand: string;
  city: string;
  url: string;
  phone?: string;
  mapsQuery: string;
  vehicles: string[];
  whyVisit: string;
  noPressure?: boolean;
}

export const SHOPPING_DAY_DEALERS: DealerStop[] = [
  {
    name: 'CarMax',
    brand: 'Multi-brand CPO',
    city: 'Brookfield',
    url: 'https://www.carmax.com/stores/7102',
    phone: '+18889224875',
    mapsQuery: 'CarMax Brookfield WI',
    vehicles: ['RAV4', 'Forester', 'CR-V', 'CX-5', 'Tucson', 'Sportage', 'Rogue'],
    whyVisit: 'Start here. Browse every brand at one stop, no haggling, no pressure, and your CarMax pre-approval works on the spot.',
    noPressure: true
  },
  {
    name: 'Wilde Toyota',
    brand: 'Toyota — RAV4',
    city: 'West Allis',
    url: 'https://www.wildetoyota.com/',
    phone: '+14148212733',
    mapsQuery: 'Wilde Toyota West Allis WI',
    vehicles: ['RAV4'],
    whyVisit: 'Largest Toyota dealer in WI. Big CPO RAV4 inventory, decent pricing, busy enough that they negotiate.'
  },
  {
    name: 'Andrew Toyota',
    brand: 'Toyota — RAV4',
    city: 'Glendale',
    url: 'https://www.andrewtoyota.com/',
    phone: '+14149643000',
    mapsQuery: 'Andrew Toyota Glendale WI',
    vehicles: ['RAV4'],
    whyVisit: 'Solid backup Toyota dealer near Milwaukee. Good for cross-shopping Wilde to keep them honest on price.'
  },
  {
    name: 'Schlossmann Subaru City',
    brand: 'Subaru — Forester',
    city: 'Milwaukee',
    url: 'https://www.subarucityofmilwaukee.com/',
    phone: '+14143536000',
    mapsQuery: 'Schlossmann Subaru City of Milwaukee',
    vehicles: ['Forester'],
    whyVisit: 'Highest-volume Subaru dealer in metro Milwaukee. Standard AWD Foresters in and out of CPO inventory regularly.'
  },
  {
    name: 'Russ Darrow Subaru',
    brand: 'Subaru — Forester',
    city: 'Milwaukee',
    url: 'https://www.russdarrowsubaru.com/',
    phone: '+14149611000',
    mapsQuery: 'Russ Darrow Subaru Milwaukee WI',
    vehicles: ['Forester'],
    whyVisit: 'Russ Darrow group has aggressive pricing. Cross-shop against Schlossmann.'
  },
  {
    name: 'Frank Boucher Hyundai',
    brand: 'Hyundai — Tucson',
    city: 'Waukesha',
    url: 'https://www.boucherhyundai.com/',
    phone: '+12625477700',
    mapsQuery: 'Frank Boucher Hyundai Waukesha',
    vehicles: ['Tucson'],
    whyVisit: 'Closest Hyundai dealer to home. 10yr/100k warranty on new + Hyundai Capital subprime programs.'
  },
  {
    name: 'Russ Darrow Kia of Wauwatosa',
    brand: 'Kia — Sportage',
    city: 'Wauwatosa',
    url: 'https://www.russdarrowkiaofwauwatosa.com/',
    phone: '+14144532900',
    mapsQuery: 'Russ Darrow Kia Wauwatosa',
    vehicles: ['Sportage'],
    whyVisit: 'New 2023+ Sportage, 10yr/100k powertrain warranty, Kia Finance subprime-friendly.'
  },
  {
    name: 'Heiser Honda Milwaukee',
    brand: 'Honda — CR-V',
    city: 'West Allis',
    url: 'https://www.heiserhonda.com/',
    phone: '+14143283600',
    mapsQuery: 'Heiser Honda West Allis WI',
    vehicles: ['CR-V'],
    whyVisit: 'Big CR-V inventory. Honda holds value, so CPO is the smart play here over new.'
  },
  {
    name: 'Russ Darrow Mazda',
    brand: 'Mazda — CX-5',
    city: 'Greenfield',
    url: 'https://www.russdarrowmazda.com/',
    phone: '+14144235300',
    mapsQuery: 'Russ Darrow Mazda Greenfield WI',
    vehicles: ['CX-5'],
    whyVisit: 'Premium-feeling cabin for the money. CX-5 is underrated and often discounted vs CR-V/RAV4.'
  },
  {
    name: 'Russ Darrow Nissan Milwaukee',
    brand: 'Nissan — Rogue',
    city: 'Milwaukee',
    url: 'https://www.russdarrownissan.com/',
    phone: '+14148732400',
    mapsQuery: 'Russ Darrow Nissan Milwaukee',
    vehicles: ['Rogue'],
    whyVisit: 'NMAC (Nissan financing) is one of the most subprime-friendly captives. New Rogue often has factory promos.'
  }
];

export const SHOPPING_DAY_PLAN = [
  {
    timeBlock: 'Morning · 9-11am',
    title: '☕ Start at CarMax (low pressure)',
    notes: [
      'Walk the lot, sit in 3-5 different SUVs back-to-back',
      'Notice cargo room, rear seat space, dashboard layout differences',
      'Use your CarMax pre-approval to lock in a no-haggle price as a benchmark',
      'No commitment yet — this is recon'
    ]
  },
  {
    timeBlock: 'Late morning · 11am-12pm',
    title: '🥪 Lunch + decision',
    notes: [
      'Pick the 1-2 SUVs that felt right at CarMax',
      'Look up CarGurus + Autotrader for those models within 100 miles',
      'Pick 2 dealerships to visit this afternoon (one Toyota OR one Subaru, plus one alternate brand)',
      'Eat. Drive there full, not hungry — hangry shopping = bad decisions'
    ]
  },
  {
    timeBlock: 'Afternoon · 1-3pm',
    title: '🎯 First brand dealer visit',
    notes: [
      'Test drive 30+ minutes (highway + city + parking lot)',
      'Get OTD price IN WRITING before talking financing',
      'Mention you have pre-approval (Capital One / CU) — kills their F&I upsell',
      'Decline ALL add-ons (GAP, paint, fabric, ext warranty, VIN etch)'
    ]
  },
  {
    timeBlock: 'Late afternoon · 3-5pm',
    title: '🔁 Second dealer visit',
    notes: [
      'Same drill — OTD price in writing, test drive 30+ min',
      'Now you have two real OTD prices to play against each other',
      'If pressured to buy today, leave. The deal will still be there Monday.',
      'Compare both quotes at home before signing anything'
    ]
  },
  {
    timeBlock: 'Evening · 6pm+',
    title: '🛋️ Sleep on it (mandatory)',
    notes: [
      'Never sign on day 1 unless the deal is genuinely exceptional',
      'Talk it through with your wife — both of you say yes or pass',
      'Sleep beats every "today only" pitch a dealer will give you',
      'Tomorrow morning: call/email the better dealer, accept, set delivery'
    ]
  }
];

export const QUICK_TIPS = {
  say: {
    label: 'SAY THIS',
    color: 'success',
    items: [
      "What's the out-the-door price including ALL fees?",
      'I have my own financing — what do you have for me?',
      "I'm comparing prices with [other specific dealer]",
      'Email me the breakdown before I come in',
      'I need to think about it. I\'ll let you know tomorrow.'
    ]
  },
  dontSay: {
    label: 'NEVER SAY',
    color: 'danger',
    items: [
      '"What payment can I afford monthly?" → They stretch the term to whatever fits',
      '"I love this car" → You just lost negotiating leverage',
      '"I need a car today" → They smell desperation, prices go up',
      '"How much can I put down?" → Reveals your max budget',
      '"What\'s the best you can do?" → Vague — ask for specific dollar amounts'
    ]
  },
  askFor: {
    label: 'ALWAYS ASK FOR',
    color: 'accent',
    items: [
      'Carfax / AutoCheck vehicle history report (free at CarMax/most dealers)',
      'Pre-purchase inspection at YOUR mechanic (CPO too — non-negotiable on used)',
      'Itemized breakdown of every fee in writing',
      'Window sticker (Monroney) for new cars',
      '24 hours to review the contract before signing'
    ]
  },
  walkIf: {
    label: 'WALK AWAY IF',
    color: 'warning',
    items: [
      "They won't put the OTD price in writing",
      'They demand your SSN before giving any pricing',
      '"Today only" pressure to sign within hours',
      'They refuse a pre-purchase inspection',
      'They want to roll your old loan into the new one ("rolling negative equity")',
      'The price changes between desk and finance office'
    ]
  },
  tricks: {
    label: 'TRICKS THEY USE',
    color: 'warning',
    items: [
      '"Four square" sheet — confusing math designed to hide costs',
      'Payment packing — hides add-ons inside the monthly payment',
      'Bait & switch — advertised car "just sold" but here\'s a pricier one',
      'Spot delivery / yo-yo — take car home, "financing fell through" later',
      'Doc fees — they say "non-negotiable" but they ARE negotiable',
      'Mandatory dealer add-ons — fabric protection, VIN etch, nitrogen tires (decline all)'
    ]
  }
};

export const SCRIPT_OPENING = [
  {
    situation: 'Walking in the door',
    say: "Hi, I'm just looking today. I'd like to see your [model] inventory.",
    why: 'Sets the tone: you\'re browsing, not desperate. "Just looking" is the universal "back off a bit" signal.'
  },
  {
    situation: 'Salesperson asks why you\'re here',
    say: "I'm doing research before I buy. Not buying today.",
    why: 'Removes urgency. They know they have to earn the visit, not pressure-close.'
  },
  {
    situation: 'They ask for your name/number/email',
    say: "I'd rather just look around first. I'll let you know if I have questions.",
    why: 'Their CRM follow-up calls are relentless. Don\'t hand over contact info until you\'re seriously interested.'
  },
  {
    situation: 'Ready to test drive',
    say: 'Can I take it on a 30-minute test drive — highway plus city?',
    why: '5-minute parking-lot drives hide everything. You need real conditions to catch suspension noise, transmission shifts, road noise.'
  },
  {
    situation: 'They want to "run your credit" first',
    say: 'I have my own pre-approval through [your bank/CU/Capital One]. Just give me the cash price.',
    why: 'Hard pulls drop your score 5-10 points each. Multiple dealers = multiple drops. Use your pre-approval as a shield.'
  },
  {
    situation: 'They ask about your trade-in',
    say: "I haven't decided whether I'm trading. What\'s the OTD price without a trade?",
    why: 'Trade-in negotiation gets mixed with car price = confusion = profit for them. Negotiate price first, trade second, separately.'
  },
  {
    situation: 'They ask about your max monthly payment',
    say: "I'm focused on the total out-the-door price, not monthly. What\'s the OTD?",
    why: 'Monthly-payment shopping is how they extend you to 84 months and bury you in interest.'
  },
  {
    situation: 'They pressure you to buy today',
    say: "I never buy on the same day I shop. I'll think it over and call you tomorrow.",
    why: 'Anyone refusing to wait 24 hours is hiding something. Real deals survive a night of sleep.'
  },
  {
    situation: 'Leaving without buying',
    say: 'Thanks for your time. Can you email me the OTD price for that car?',
    why: 'Forces them to commit a number in writing. Now you have leverage to shop it elsewhere.'
  }
];

export const DEALER_DECODER = [
  {
    theySay: '"What monthly payment are you looking for?"',
    meaning: "I'll stretch the loan term to whatever fits, then bury fees in there.",
    youReply: 'I\'m focused on total price, not monthly. What\'s the out-the-door?'
  },
  {
    theySay: '"Let me check with my manager."',
    meaning: 'Theater. Often they\'re just waiting in the back for you to soften. Sometimes the "manager" is real, but the back-and-forth is designed to wear you down.',
    youReply: 'Take your time. I\'ll be here.' + ' (Then sit silently. Don\'t fill the silence.)'
  },
  {
    theySay: '"This price is only good today."',
    meaning: "I'm trying to remove your ability to sleep on it. Real deals don\'t expire in 4 hours.",
    youReply: 'Then it\'s not the right deal for me. Have a good day.'
  },
  {
    theySay: '"We have other people interested in this car."',
    meaning: '90% of the time, fake. Designed to create FOMO.',
    youReply: 'Then they should buy it. I\'ll find another one.'
  },
  {
    theySay: '"What did you have in mind for a price?"',
    meaning: 'Trying to anchor you on a number first so they can negotiate up.',
    youReply: 'What\'s your best out-the-door price including all fees?'
  },
  {
    theySay: '"Let\'s just see if we can get you approved."',
    meaning: 'Hard credit pull is about to happen. Each one drops your score 5-10 points.',
    youReply: 'Not until I have a written OTD price. I have my own pre-approval.'
  },
  {
    theySay: '"I can\'t go any lower than that."',
    meaning: 'Almost always a test. They\'ll go lower if you walk or push.',
    youReply: 'Okay. Thanks for your time.' + ' (Stand up. Move to leave. Watch the price drop.)'
  },
  {
    theySay: '"We\'ll match any competitor\'s price."',
    meaning: 'Make YOU do the legwork shopping their competitors.',
    youReply: 'Here\'s the OTD email from [other dealer] — beat it.'
  },
  {
    theySay: '"Sign here, it\'s just a credit application."',
    meaning: 'Often it\'s actually a contract or authorization for a hard pull. Read every line.',
    youReply: 'Hold on, let me read this completely before signing.'
  },
  {
    theySay: '"What needs to happen for you to drive home in this today?"',
    meaning: 'Classic close. Trying to get you to verbalize commitment.',
    youReply: 'Nothing today. I\'m sleeping on it before I make any decision.'
  },
  {
    theySay: '"It\'s a non-refundable deposit to hold the car."',
    meaning: 'Locks you in psychologically and financially. Once you put money down, you\'re much less likely to walk.',
    youReply: 'I don\'t put deposits down. If the car sells, I\'ll find another one.'
  },
  {
    theySay: '"That fee is non-negotiable / required by the state."',
    meaning: 'Doc fees, dealer prep fees, "advertising" fees — almost all are pure profit. Some ARE negotiable, some can be waived.',
    youReply: 'Show me the state requirement in writing. Otherwise, take it off.'
  },
  {
    theySay: '"Why don\'t we get you approved first, then we\'ll talk price."',
    meaning: 'They want commitment energy from you BEFORE you know the price.',
    youReply: 'Price first, financing second. That\'s how I shop.'
  },
  {
    theySay: '"You\'re going to need GAP / extended warranty / paint protection."',
    meaning: 'F&I office upsell. These are huge profit centers. You probably don\'t need most of them.',
    youReply: 'No thanks. I\'ll get GAP from my insurance for $40/year, and the manufacturer warranty covers me.'
  },
  {
    theySay: '"The financing fell through. We need you to come back in."',
    meaning: '"Spot delivery" or "yo-yo financing" scam. They sent you home with a car, now want to renegotiate at worse terms.',
    youReply: 'Bring me the car. I\'m returning it and the deal is off.'
  }
];

export const MONTHLY_PAYMENT_PLAYBOOK = {
  headline: "Yes, you DO care about monthly payment. Here's how to honor that without losing leverage.",
  insight: "Monthly payment is the OUTPUT of three numbers: OTD price, APR, and loan term. If you tell the dealer your max monthly, they control all three inputs and engineer the worst possible deal that still hits your number (longer term, higher APR, packed add-ons). Instead: control the INPUTS yourself, then calculate the monthly to verify it fits.",
  rules: [
    "Know your monthly cap privately ($500). Don't volunteer it.",
    "Negotiate on OTD price first. APR second. Term third.",
    "Calculate the monthly YOURSELF using their numbers — never accept their monthly figure on faith.",
    "If their monthly is too high, the answer is 'lower the price' or 'better APR' — never 'longer loan term'.",
    "If they ask your monthly cap directly, see the script in the next section."
  ]
};

export const DEFENSIVE_ANSWERS = [
  {
    theyAsk: '"What monthly payment are you looking for?"',
    whyTheyAsk: 'They want to engineer a loan that hits your number — but on THEIR terms. Longer loan, higher APR, hidden fees rolled into the payment.',
    dontReveal: 'Your actual $500 monthly cap.',
    smartReply: "I'm focused on total OTD price, not monthly. I'll do the monthly math myself once I see your best price and APR.",
    ifPushed: "Honest answer? I want a payment that comes from a fair price and a reasonable APR. Not from a stretched 84-month loan that buries me. So show me the OTD and the APR, and I'll tell you if the monthly works."
  },
  {
    theyAsk: '"What\'s your price range?"',
    whyTheyAsk: "Whatever number you say, they'll show you cars near the TOP of that range. If you say $30k, you won't see anything under $28k.",
    dontReveal: 'Your actual $30k ceiling.',
    smartReply: "I'm looking in the low-to-mid twenties for the right SUV.",
    ifPushed: "Show me what you have under $25k first. I'll go up if I see something worth it."
  },
  {
    theyAsk: '"What APR have you been approved for?"',
    whyTheyAsk: 'They want to beat your pre-approval by 0.25% to win the financing — even if their underlying terms are worse. Or they want to know how badly they can mark up.',
    dontReveal: 'Your exact pre-approval APR.',
    smartReply: "I have a competitive pre-approval lined up. What's your best APR for someone in my situation?",
    ifPushed: "Quote me your APR first. If it beats what I have, I'll consider it. If not, I'm using my own financing."
  },
  {
    theyAsk: '"What do you think your trade is worth?"',
    whyTheyAsk: 'Trade-in negotiation gets blended with car price negotiation = chaos = profit for them. Also, your guess sets the ceiling.',
    dontReveal: 'Any number — even your KBB guess.',
    smartReply: "I haven't decided whether I'm trading. Let's settle the price on this car first, then we can talk trade separately.",
    ifPushed: "Appraise it without me anchoring you. Show me your offer in writing, and I'll compare it to selling private."
  },
  {
    theyAsk: '"How much are you putting down?"',
    whyTheyAsk: 'Your down payment reveals your liquidity and your max budget. They use it to size up the rest of the deal.',
    dontReveal: 'Your full $3-5k available.',
    smartReply: "Depends on the deal. Let's settle the price first, then I'll decide what makes sense for down payment.",
    ifPushed: "I'd like to put as little down as possible — depends on whether the financing terms make that worthwhile."
  },
  {
    theyAsk: '"When do you need a car by?"',
    whyTheyAsk: 'Urgency = leverage. If you need it this weekend, they have you over a barrel.',
    dontReveal: 'Any actual deadline.',
    smartReply: "Whenever I find the right car at the right price. Could be this week, could be next month.",
    ifPushed: "I'm not on a clock. The deal has to be right or I'll keep looking."
  },
  {
    theyAsk: '"Are you ready to buy today if the price is right?"',
    whyTheyAsk: 'Classic close. Once you say yes, the entire conversation becomes about overcoming objections, not finding a fair deal.',
    dontReveal: 'That you\'re emotionally ready.',
    smartReply: "I never buy on the same day I shop. I always sleep on it. So no, but I might tomorrow if your offer is the best one.",
    ifPushed: "I told you — I sleep on every major purchase. If that\'s a problem, I\'ll go to the next dealer."
  },
  {
    theyAsk: '"What other dealers have you visited?"',
    whyTheyAsk: 'They want to know who they\'re competing with so they can position against them — or undercut by just enough.',
    dontReveal: 'Specific competing offers.',
    smartReply: "I'm shopping a few places — give me your best out-the-door price and I\'ll compare.",
    ifPushed: "Bring me your best offer. If it beats what I\'ve seen, you win the sale. If not, you don\'t."
  },
  {
    theyAsk: '"Have you been pre-approved for financing?"',
    whyTheyAsk: 'If yes, they have to compete with that rate. If no, they have wide latitude to mark up dealer financing.',
    dontReveal: 'Whether you DON\'T have pre-approval (if true).',
    smartReply: "Yes, I have pre-approval. What\'s your best APR offer?",
    ifPushed: "I'd rather not share the exact rate. Just give me your best, and I\'ll compare."
  }
];

export const QUESTIONS_TO_ASK = [
  {
    category: '💰 Price (FIRST — before anything else)',
    items: [
      "What's the OTD price including tax, title, registration, doc fees, AND every other fee?",
      'Can you put that OTD price in writing or email?',
      'What add-ons are included in that price that I can decline?',
      'What\'s your dealer doc fee specifically? Is any portion negotiable?',
      'If I pay cash, is there a different price?'
    ]
  },
  {
    category: '🚗 The car itself (used/CPO)',
    items: [
      'Can I see the Carfax or AutoCheck report?',
      'Has it been in any accidents, even minor ones?',
      'Why was the previous owner trading it in?',
      'What does the CPO warranty cover — exactly which parts and for how long?',
      'Can I have it inspected by my own mechanic before I sign?',
      'What service records do you have for it?'
    ]
  },
  {
    category: '🚗 The car itself (new)',
    items: [
      'Can I see the Monroney sticker (window sticker)?',
      'What\'s the build date / how long has it been on the lot?',
      'Are there any current factory rebates or incentives?',
      'Does the manufacturer have any subprime financing programs running?',
      'What\'s included in the delivery prep — and is the prep fee waivable?'
    ]
  },
  {
    category: '🏦 Financing (only AFTER you have an OTD price)',
    items: [
      'I have pre-approval through [bank]. What\'s your best APR for my situation?',
      'Can you put that APR in writing before running my credit?',
      'How many lenders will you submit my application to?',
      'What\'s the difference in price if I use your financing vs my pre-approval?',
      'If I use your financing, can I refinance after 6 months without penalty?'
    ]
  },
  {
    category: '📝 Before signing',
    items: [
      'Can I take the contract home to review overnight?',
      'Walk me through every line item on this contract.',
      'What is this fee for? (For each one — make them justify it.)',
      'What happens if I cancel within 24 hours?',
      'What\'s your return policy if something major comes up after I drive away?'
    ]
  }
];

export const SHOPPING_DAY_BRING = [
  "Driver's license",
  'Proof of insurance card',
  'Two recent pay stubs',
  'Pre-approval letter (Capital One / credit union)',
  'Current car title (if trading in — but consider selling private first)',
  'Phone with this app open at /tips',
  'Snacks, water — long stops at dealers'
];

export const CARMAX_BROOKFIELD = {
  name: 'CarMax Brookfield',
  address: '19115 W Bluemound Rd, Brookfield, WI 53045',
  phone: '+12625446620',
  phoneDisplay: '(262) 544-6620',
  storeId: '7102',
  driveTime: '~10 min from Waukesha',
  hours: 'Verify by phone — typical: Mon-Sat 10am-9pm, Sun 11am-7pm',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CarMax+Brookfield+WI',
  storeUrl: 'https://www.carmax.com/stores/7102'
};

export const CARMAX_SEARCH_LINKS = [
  {
    label: 'All compact SUVs at Brookfield',
    description: 'Toyota RAV4, Honda CR-V, Subaru Forester, Mazda CX-5, Kia Sportage, Hyundai Tucson, Nissan Rogue — under $28k',
    url: 'https://www.carmax.com/cars/suvs?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Toyota RAV4 only',
    description: 'King of reliability — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/toyota/rav4?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Subaru Forester only',
    description: 'Standard AWD — best for WI winters — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/subaru/forester?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Honda CR-V only',
    description: 'Massive cargo — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/honda/cr-v?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Mazda CX-5 only',
    description: 'Premium feel for the price — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/mazda/cx-5?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Kia Sportage only',
    description: 'Big upgrade in 2023 — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/kia/sportage?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Hyundai Tucson only',
    description: 'Same chassis as Sportage — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/hyundai/tucson?stores=7102&priceMax=28000&year=2022-2024'
  },
  {
    label: 'Nissan Rogue only',
    description: 'Comfortable + good MPG — under $28k, 2022+',
    url: 'https://www.carmax.com/cars/nissan/rogue?stores=7102&priceMax=28000&year=2022-2024'
  }
];

export const CARMAX_TACTICS = {
  pricing: {
    title: 'How CarMax pricing actually works',
    items: [
      'No-haggle on the car price. Period. Walking out won\'t make them lower it.',
      'BUT: you CAN negotiate your trade-in offer. Push back on it.',
      'BUT: you CAN choose your own financing (use your pre-approval).',
      'BUT: you CAN decline EVERY F&I add-on (MaxCare, GAP, etc).',
      'If you find the SAME car cheaper at another CarMax within 100mi, they may transfer it for free.'
    ]
  },
  upsells: {
    title: 'What they will push hard (decline these)',
    items: [
      'MaxCare extended warranty — $1500-3500. Almost never worth it on reliable Toyota/Honda/Subaru.',
      'GAP coverage — $400-800 from CarMax. Get it from Geico/Progressive for $40-60/yr.',
      'Tire & wheel protection — usually $400-600. Skip.',
      'Paint/interior protection — $400+. Definitely skip.',
      'Their financing — only beat your pre-approval if their APR is genuinely better. Compare in writing.'
    ]
  },
  advantages: {
    title: 'What CarMax does WELL (use these)',
    items: [
      '30-day / 1500-mile return policy. Genuine — actually use it if anything feels off.',
      '90-day / 4000-mile limited warranty included with every car.',
      'No high-pressure sales — staff is salaried, not commissioned.',
      'Free Carfax / AutoCheck on every car. Ask for it before you test drive.',
      'Soft credit pull for pre-approval (good if you didn\'t do Capital One yet).',
      'You can hold a car for 7 days for $99 (refundable if you don\'t buy).'
    ]
  }
};

export const TEST_DRIVE_CHECKLIST = [
  {
    category: '🚪 Before you drive (sitting in the lot)',
    items: [
      'Sit in driver seat — can you see all gauges clearly? Is reach comfortable?',
      'Adjust mirrors — are blind spots manageable for your height?',
      'Climb into back seat — adult passenger comfortable behind your seat position?',
      'Check cargo area — does your stroller / dog crate / weekly groceries fit?',
      'Pair your phone via Bluetooth — does CarPlay/Android Auto connect quickly?',
      'Check USB ports — front AND rear, do they all work?',
      'Test all power windows, locks, sunroof if equipped',
      'Look for warning lights on dash when key is on (engine NOT running yet)'
    ]
  },
  {
    category: '🛣️ Test drive — what to actually do',
    items: [
      'Start engine cold if possible — listen for any clatter, check for blue smoke',
      'In parking lot: hard left + right turns at low speed (listen for clicking → CV joint issue)',
      'Hard brake from 25mph — does it pull left/right? Pulsate? Squeal?',
      'Highway merge — hit 65mph, hold steady. Does it shift smoothly? Wander in lane?',
      'At 65mph, let go of wheel briefly — does car drift? (alignment issue)',
      'Lift throttle suddenly at 65 — feel any weird shudder? (transmission issue)',
      'On rough road — listen for clunks, rattles (suspension issue)',
      'Try AC on max cold — does it actually get cold within 1-2 minutes?',
      'Heat on max — same test. WI winter — verify it works.',
      'Try every button: heated seats, defroster, wipers, washer fluid, headlights, hazards'
    ]
  },
  {
    category: '🔍 After the drive (back in the lot)',
    items: [
      'Pop the hood. Look for: clean engine bay, no leaks, oil cap clean (not milky/sludgy)',
      'Check coolant overflow level — should be in the marked range',
      'Walk around exterior — look at panel gaps, do they all line up?',
      'Look for paint mismatches between panels (accident repair clue)',
      'Tire tread — stick a penny in upside down. If you see top of Lincoln\'s head, tires need replacing',
      'Check tire wear pattern — should be even across, not bald on edges',
      'Look under car for fresh fluid drips on the ground beneath',
      'Smell the interior — musty smell = past water damage. Cigarette = previous smoker.',
      'Open every door — do they latch firmly? Squeak on hinges?'
    ]
  }
];

export const CARFAX_RED_FLAGS = [
  {
    flag: 'Salvage / Rebuilt / Junk title',
    severity: 'WALK',
    why: 'Car was totaled by an insurance company. Even rebuilt, value is 30-40% lower forever and insurance is harder.'
  },
  {
    flag: 'Flood / Water damage',
    severity: 'WALK',
    why: 'Electrical issues will haunt the car forever. Mold can be hidden in carpets and seats.'
  },
  {
    flag: 'Lemon law buyback',
    severity: 'WALK',
    why: 'The manufacturer bought it back because it had a problem they couldn\'t fix.'
  },
  {
    flag: 'Frame damage / structural',
    severity: 'WALK',
    why: 'Even repaired, alignment will never be perfect. Crash safety is compromised.'
  },
  {
    flag: 'Odometer rollback alert',
    severity: 'WALK',
    why: 'Federal crime. Whatever else they hid is probably worse.'
  },
  {
    flag: '5+ owners in 5 years',
    severity: 'INVESTIGATE',
    why: 'Someone was trying to dump this car. Find out why.'
  },
  {
    flag: 'Fleet / rental history',
    severity: 'INVESTIGATE',
    why: 'Often hard miles + lots of drivers, but not always a dealbreaker. Check service records.'
  },
  {
    flag: 'Accident reported (any severity)',
    severity: 'INVESTIGATE',
    why: 'Ask for repair details. Minor bumper ding = OK. Anything structural = walk. Get an independent inspection.'
  },
  {
    flag: 'Service gap >12 months',
    severity: 'INVESTIGATE',
    why: 'Maintenance was likely skipped. Could mean major work coming due. Ask about timing belt, transmission service, brakes.'
  },
  {
    flag: 'Open recall not addressed',
    severity: 'NEGOTIATE',
    why: 'Make CarMax fix it before you take delivery — they should anyway, but verify.'
  },
  {
    flag: 'Failed state safety inspection',
    severity: 'INVESTIGATE',
    why: 'What was the failure? If it\'s already been fixed, fine. If not, it\'s on YOU after purchase.'
  }
];

export const TRAPS = [
  { title: '"Buy here pay here" lots', body: 'APR runs 20-29%. Cars are usually garbage. Predatory by design — avoid entirely.' },
  { title: 'Loans 84+ months', body: "Underwater for 4-5 years. Can't trade out. Pays thousands more in interest total." },
  { title: 'Dealer GAP insurance', body: '$800-1500 at the dealer. Get the same coverage from Geico/Progressive for $40-60/yr.' },
  { title: 'Extended warranties at signing', body: 'Pure dealer profit. Hyundai/Kia/Mitsubishi already cover you 10yr/100k. Decline.' },
  { title: '"Let us shop your rate"', body: "Dealer adds 1-3% on top as their cut. Use YOUR pre-approval as the benchmark instead." },
  { title: 'Yo-yo financing', body: 'Dealer calls 5 days later: "Financing fell through, come back in." Walk away.' },
  { title: 'Add-ons (paint, fabric, VIN etch)', body: '$1,500+ of nothing. Decline every single F&I add-on.' },
  { title: 'Rolling negative equity', body: 'Rolls old loan balance into new one. Underwater day one. Sell your old car privately first if possible.' },
  { title: 'Skipping the test drive', body: 'Always drive at least 30 minutes including highway. Listen for noises, check blind spots.' },
  { title: 'No pre-purchase inspection', body: '$100-150 at independent mechanic catches $5,000 problems on used cars. Non-negotiable for CPO.' }
];

export const CHECKLIST_STEPS = [
  {
    id: 'w1',
    week: 'Week 1',
    title: 'Prep your credit profile',
    items: [
      { id: 'w1-1', text: 'Check credit score on Credit Karma (free)' },
      { id: 'w1-2', text: 'Pull full credit report at annualcreditreport.com' },
      { id: 'w1-3', text: 'Dispute any errors on credit report' },
      { id: 'w1-4', text: 'Save additional down if possible (every $1k = $22/mo savings)' },
      { id: 'w1-5', text: 'Make recent bills perfect (last 2-3 months matter most)' }
    ]
  },
  {
    id: 'w2',
    week: 'Week 2',
    title: 'Pre-approval shopping',
    items: [
      { id: 'w2-1', text: 'Apply at local credit union (membership first if needed)' },
      { id: 'w2-2', text: 'Apply at Capital One Auto Navigator' },
      { id: 'w2-3', text: 'Apply at CarMax for no-haggle benchmark' },
      { id: 'w2-4', text: 'Compare APRs from all three' },
      { id: 'w2-5', text: 'Save best APR as your benchmark' }
    ]
  },
  {
    id: 'w3',
    week: 'Week 3',
    title: 'Hunt for the car',
    items: [
      { id: 'w3-1', text: 'Decide CPO vs new based on real budget' },
      { id: 'w3-2', text: 'Build target spec on manufacturer site' },
      { id: 'w3-3', text: 'Search CarGurus + Autotrader within 100 miles' },
      { id: 'w3-4', text: 'Sort by deal rating' },
      { id: 'w3-5', text: 'Cross-check on TrueCar for fair price' },
      { id: 'w3-6', text: 'Shortlist 3-5 specific cars at specific dealers' }
    ]
  },
  {
    id: 'w4',
    week: 'Week 4',
    title: 'Negotiate and buy',
    items: [
      { id: 'w4-1', text: 'Email dealer asking for OTD price in writing' },
      { id: 'w4-2', text: 'Compare OTD prices across dealers' },
      { id: 'w4-3', text: 'Visit best 1-2 only, test drive 30+ minutes' },
      { id: 'w4-4', text: 'For CPO: arrange independent pre-purchase inspection' },
      { id: 'w4-5', text: 'Negotiate against OTD + your pre-approval' },
      { id: 'w4-6', text: 'Decline ALL F&I add-ons (GAP, warranty, paint, etc)' },
      { id: 'w4-7', text: 'Verify monthly is under cap INCLUDING tax/title/registration' },
      { id: 'w4-8', text: 'Sign the deal' }
    ]
  }
];

export function getVehicleById(id: string): Vehicle | undefined {
  return VEHICLES.find(v => v.id === id);
}
