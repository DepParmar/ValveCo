import { Product, Service } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'gate-valve',
    name: 'Gate Valve',
    tagline: 'Full bore isolation for critical service.',
    description: 'A full-bore isolation valve for on/off service. The wedge moves vertically to open or close the flow path — providing minimal pressure drop when fully open. Ideal for infrequent operation and tight shutoff in oil, gas, water, and steam lines.',
    icon: '🔩',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    badge: 'API 600 / API 602 / IS 14846',
    specs: {
      type: 'Gate Valve – Buttweld End',
      operation: 'Manual (Gear / Actuator Optional)',
      pressureClass: '150# to 2500#',
      sizeRange: '½" to 48"',
      endConnection: 'Butt Weld / Flanged / RTJ',
      testing: 'API 598',
      standard: 'API 600 / API 602'
    },
    visualType: 'gate',
    bom: [
      { id: '01', component: 'Body', description: 'Main pressure-retaining outer shell', material: 'WCB / CF8 / CF8M / Alloy Steel', function: 'Houses internal components & withstands line pressure' },
      { id: '02', component: 'Seat Ring', description: 'Replaceable sealing surface', material: 'SS 304 / SS 316 / Stellite', function: 'Provides tight shut-off with wedge' },
      { id: '03', component: 'Wedge (Disc)', description: 'Closing element', material: 'SS / Alloy Steel / Hardfaced', function: 'Controls flow by moving up/down' },
      { id: '04', component: 'Stem', description: 'Threaded operating shaft', material: 'SS 410 / SS 304 / SS 316', function: 'Transfers motion from handwheel to wedge' },
      { id: '05', component: 'Body Gasket', description: 'Sealing gasket between body & bonnet', material: 'Graphite / Spiral Wound', function: 'Prevents leakage at body joint' },
      { id: '06', component: 'Bonnet', description: 'Upper pressure-containing cover', material: 'WCB / CF8 / Alloy Steel', function: 'Encloses stem & supports stuffing box' }
    ]
  },
  {
    id: 'globe-valve',
    name: 'Globe Valve',
    tagline: 'Precision flow regulation and throttling.',
    description: 'Designed for precise flow throttling and regulation. The disc moves perpendicular to the flow path, allowing fine control over flow rate. Best suited for frequent operation and throttling in steam, water, and chemical services.',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80',
    badge: 'API 600 / BS 1873',
    specs: {
      type: 'Globe Valve – Flanged End',
      operation: 'Manual / Gear / Actuated',
      pressureClass: '150# to 2500#',
      sizeRange: '½" to 24"',
      endConnection: 'Flanged / Butt Weld / Socket Weld',
      testing: 'API 598',
      standard: 'BS 1873'
    },
    visualType: 'globe',
    bom: [
      { id: '01', component: 'Body', description: 'Main pressure-retaining casting', material: 'WCB / CF8 / CF8M / Alloy Steel', function: 'Withstands line pressure and houses internal parts' },
      { id: '02', component: 'Seat Ring', description: 'Renewable seating surface', material: 'SS 304 / SS 316 / Stellite', function: 'Provides tight shut-off with disc' },
      { id: '03', component: 'Disc (Plug)', description: 'Movable closing element', material: 'SS / Alloy Steel / Hardfaced', function: 'Controls flow by vertical motion' },
      { id: '04', component: 'Stem', description: 'Threaded operating shaft', material: 'SS 410 / SS 304 / SS 316', function: 'Transmits motion from handwheel to disc' }
    ]
  },
  {
    id: 'ball-valve',
    name: 'Ball Valve',
    tagline: 'Quarter-turn rotary valve for bubble-tight shutoff.',
    description: 'Quarter-turn rotary valve providing bubble-tight shutoff with minimal torque. Available in full bore and reduced bore. Suitable for gases, liquids, and slurries. Fast operation makes it ideal for emergency shutoff across all industries.',
    icon: '⚪',
    image: 'https://images.unsplash.com/photo-1531266752426-aad472b7bdf4?w=800&q=80',
    badge: 'API 6D / ISO 17292',
    specs: {
      type: 'Full Bore / Reduced Bore / 1-pc / 2-pc / 3-pc',
      operation: 'Lever / Gear / Pneumatic / Electric',
      pressureClass: '150# to 600#',
      sizeRange: '½" to 24"',
      endConnection: 'Flanged / Butt Weld / Threaded',
      testing: 'API 598',
      standard: 'API 6D'
    },
    visualType: 'ball',
    bom: [
      { id: '01', component: 'Body', description: 'Main pressure-retaining housing', material: 'WCB / CF8 / CF8M', function: 'Houses internal components' },
      { id: '02', component: 'Ball', description: 'Full Port spherical closure element', material: 'SS 304 / SS 316', function: 'Allows unrestricted flow when open' },
      { id: '03', component: 'Seats', description: 'Soft sealing rings', material: 'PTFE / RPTFE / PEEK', function: 'Ensures bubble-tight sealing' },
      { id: '04', component: 'Stem', description: 'Anti-blowout design', material: 'SS 410 / SS 316', function: 'Transfers motion' }
    ]
  },
  {
    id: 'butterfly-valve',
    name: 'Butterfly Valve',
    tagline: 'Compact and lightweight flow control.',
    description: 'Quarter-turn valve using a rotating disc to regulate or isolate flow. Wafer type (2"–48") and double flanged (2"–72"). Compact and lightweight — ideal for large diameter pipelines and space-constrained water, HVAC, and process plant installations.',
    icon: '🦋',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    badge: 'API 609 / BS EN 593',
    specs: {
      type: 'Wafer / Lug / Double Flanged',
      operation: 'Lever / Gear / Pneumatic / Electric',
      pressureClass: 'PN10 / PN16 / Class 150',
      sizeRange: '2" to 72"',
      endConnection: 'Wafer / Lug / Flanged',
      testing: 'API 598',
      standard: 'API 609'
    },
    visualType: 'butterfly',
    bom: [
      { id: '01', component: 'Body', description: 'Circular valve housing', material: 'Cast Iron / Ductile Iron / WCB / SS', function: 'Houses disc & seat' },
      { id: '02', component: 'Disc', description: 'Rotating closure element', material: 'SG Iron / SS 304 / SS 316 / CF8M', function: 'Controls flow via 90° rotation' },
      { id: '03', component: 'Seat', description: 'Resilient sealing liner', material: 'EPDM / NBR / PTFE', function: 'Provides leak-tight sealing' }
    ]
  },
  {
    id: 'check-valve',
    name: 'Check Valve',
    tagline: 'Automatic non-return flow protection.',
    description: 'Non-return valve that allows flow in one direction only — opens with forward flow and closes automatically on reverse. Available in swing check and disk check configurations. Essential for protecting pumps, compressors, and boilers from damaging backflow.',
    icon: '↩',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    badge: 'API 6D / BS 1868',
    specs: {
      type: 'Swing Check / Disk Check / Dual Plate',
      operation: 'Automatic (Non-Return)',
      pressureClass: '150# to 2500#',
      sizeRange: '2" to 60"',
      endConnection: 'Butt Weld / Flanged / Wafer',
      testing: 'API 598',
      standard: 'API 6D / BS 1868'
    },
    visualType: 'check',
    bom: [
      { id: '01', component: 'Body', description: 'Main pressure-retaining housing', material: 'WCB / CF8 / CF8M / Alloy Steel', function: 'Contains internals & withstands line pressure' },
      { id: '02', component: 'Cover (Bonnet)', description: 'Top cover plate', material: 'WCB / CF8 / Alloy Steel', function: 'Provides access for maintenance' },
      { id: '03', component: 'Disc', description: 'Swinging closure element', material: 'SS / Alloy Steel / Hardfaced', function: 'Automatic closure' }
    ]
  },
  {
    id: 'plug-valve',
    name: 'Plug Valve',
    tagline: 'Durable quarter-turn valve for abrasive media.',
    description: 'A quarter-turn rotary valve that uses a tapered or cylindrical plug to start or stop flow. Excellent for handling abrasive slurries and corrosive chemicals due to its simple, robust design.',
    icon: '🔌',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80',
    badge: 'API 599 / API 6D',
    specs: {
      type: 'Lubricated / Non-Lubricated / Sleeved',
      operation: 'Wrench / Gear / Actuator',
      pressureClass: '150# to 600#',
      sizeRange: '½" to 12"',
      endConnection: 'Flanged / Threaded',
      testing: 'API 598',
      standard: 'API 599'
    },
    visualType: 'ball',
    bom: [
      { id: '01', component: 'Body', description: 'Heavy duty cast body', material: 'WCB / CF8 / CF8M', function: 'Main housing' },
      { id: '02', component: 'Plug', description: 'Tapered rotary element', material: 'SS / Alloy Steel / PFA Lined', function: 'Flow control element' },
      { id: '03', component: 'Sleeve', description: 'PTFE sleeve for non-lubricated', material: 'PTFE / PFA', function: 'Sealing and lubrication' }
    ]
  },
  {
    id: 'strainer',
    name: 'Strainer',
    tagline: 'In-line filtration for equipment protection.',
    description: 'In-line filtration device protecting valves, pumps, meters, and instruments from solid particle damage. Available in Y-Type and Basket Type. Mesh filtration rating customized per customer requirement.',
    icon: '⬡',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    badge: 'ASME B16.34',
    specs: {
      type: 'Y-Type / Basket Type / Pot Type',
      operation: 'Manual Cleaning',
      pressureClass: '150# to 600#',
      sizeRange: '½" to 24"',
      endConnection: 'Butt Weld / Flanged / Screwed',
      testing: 'API 598',
      standard: 'ASME B16.34'
    },
    visualType: 'strainer',
    bom: [
      { id: '01', component: 'Body', description: 'Main pressure-retaining casting', material: 'WCB / CF8 / CF8M / Alloy Steel', function: 'Houses screen and withstands line pressure' },
      { id: '02', component: 'Screen (Mesh)', description: 'Perforated / wire mesh filter element', material: 'SS 304 / SS 316', function: 'Filters solid particles from fluid' },
      { id: '03', component: 'Gasket', description: 'Sealing gasket', material: 'Graphite / PTFE', function: 'Prevents leakage' }
    ]
  },
  {
    id: 'control-valve',
    name: 'Control Valve',
    tagline: 'Automated flow control for process systems.',
    description: 'Automated valves used to control conditions such as flow, pressure, temperature, and liquid level by fully or partially opening or closing in response to signals received from controllers.',
    icon: '🎛',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80',
    badge: 'ASME B16.34 / ISA S.75.03',
    specs: {
      type: 'Globe Type / Y-Type / 2-way / 3-way',
      operation: 'Pneumatic / Electric / Hydraulic',
      pressureClass: '150# to 600#',
      sizeRange: '½" to 14"',
      endConnection: 'Flanged / Butt Weld',
      testing: 'API 598 / BS 5146',
      standard: 'ASME B16.34'
    },
    visualType: 'globe',
    bom: [
      { id: '01', component: 'Body', description: 'Main valve body', material: 'WCB / CF8 / CF8M', function: 'Main housing' },
      { id: '02', component: 'Actuator', description: 'Pneumatic / Electric drive', material: 'Aluminium / Cast Iron', function: 'Provides operating force' },
      { id: '03', component: 'Positioner', description: 'Signal controller', material: 'Die Cast Aluminium', function: 'Ensures accurate valve positioning' }
    ]
  },
  {
    id: 'flush-bottom-valve',
    name: 'Flush Bottom Valve',
    tagline: 'Complete tank bottom drainage.',
    description: 'Specialized valve for complete tank bottom drainage — no dead pockets. Available in inside opening and jacketed designs. Ideal for slurries and viscous media.',
    icon: '🔲',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    badge: 'API 6D / ASME B16.34',
    specs: {
      type: 'Inside Opening / Jacketed / Ball Type',
      operation: 'Manual / Gear / Actuated',
      pressureClass: '150# to 300#',
      sizeRange: '1" to 12"',
      endConnection: 'Flanged',
      testing: 'API 598',
      standard: 'ASME B16.34'
    },
    visualType: 'flush',
    bom: [
      { id: '01', component: 'Body', description: 'Main housing', material: 'WCB / CF8 / CF8M', function: 'Connects to tank bottom' },
      { id: '02', component: 'Disc / Plug', description: 'Closing element', material: 'SS 304 / SS 316', function: 'Controls flow' },
      { id: '03', component: 'Jacket', description: 'Heating/Cooling jacket', material: 'Carbon Steel / SS', function: 'Temperature control' }
    ]
  },
  {
    id: 'relief-valve',
    name: 'Pressure Relief Valve',
    tagline: 'Spring-loaded automatic safety protection.',
    description: 'Spring-loaded automatic safety valve that opens at a preset pressure to protect vessels, boilers, and piping from over-pressurization.',
    icon: '🎚',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    badge: 'API 526 / ASME Section VIII',
    specs: {
      type: 'Spring Loaded / Pilot Operated',
      operation: 'Automatic Pressure Release',
      pressureClass: 'As per requirement',
      sizeRange: '½" to 12"',
      endConnection: 'Threaded / Flanged',
      testing: 'API 527',
      standard: 'API 526'
    },
    visualType: 'relief',
    bom: [
      { id: '01', component: 'Body', description: 'Main housing', material: 'Carbon Steel / SS / Alloy Steel', function: 'Withstands system pressure' },
      { id: '02', component: 'Disc', description: 'Movable sealing element', material: 'SS 304 / SS 316', function: 'Seals against seat' },
      { id: '03', component: 'Spring', description: 'Calibrated spring', material: 'Alloy Spring Steel', function: 'Controls set pressure' }
    ]
  }
];

export const SERVICES: Service[] = [
  { 
    id: 'mfg', 
    title: 'Industrial Valve Manufacturing', 
    description: 'Full range of API and ASME-compliant valves manufactured to order. Standard and custom configurations with full material traceability.', 
    icon: 'Factory',
    features: ['API 600/602 Compliance', 'Material Traceability', 'Custom Configurations']
  },
  { 
    id: 'repair', 
    title: 'Valve Repair & Refurbishment', 
    description: 'Complete disassembly, inspection, lapping, reconditioning and reassembly. Before and after API 598 testing included.', 
    icon: 'Wrench',
    features: ['API 598 Testing', 'Precision Lapping', 'Full Reconditioning']
  },
  { 
    id: 'test', 
    title: 'Hydro & Leakage Testing', 
    description: 'Full hydrostatic shell and seat leakage tests per API 598. PMI, NDE, and third-party inspection coordinated.', 
    icon: 'ShieldCheck',
    features: ['Hydrostatic Testing', 'PMI Analysis', 'NDE Inspection']
  },
  { 
    id: 'custom', 
    title: 'Custom Valve Solutions', 
    description: 'Special materials — Duplex, Inconel, Monel, Hastelloy — non-standard sizes and custom actuator configurations.', 
    icon: 'Settings',
    features: ['Special Alloys', 'Actuator Integration', 'Non-Standard Sizes']
  },
  { 
    id: 'spares', 
    title: 'Spare Parts Supply', 
    description: 'Genuine replacement seats, stems, packings, gaskets, and discs. Fast dispatch for critical plant maintenance.', 
    icon: 'Award',
    features: ['Genuine Spares', 'Fast Dispatch', 'Critical Inventory']
  },
  { 
    id: 'site', 
    title: 'On-Site Maintenance Support', 
    description: 'Trained technicians for on-site inspection, preventive maintenance, and emergency breakdown support.', 
    icon: 'Globe',
    features: ['24/7 Support', 'Mobile Service Units', 'Preventive Maintenance']
  }
];

export const INDUSTRIES = [
  { name: 'Oil & Gas Processing', icon: '🛢' },
  { name: 'Petrochemical & Refineries', icon: '⚗' },
  { name: 'Power Generation & Thermal Plants', icon: '⚡' },
  { name: 'Water & Wastewater Treatment', icon: '💧' },
  { name: 'Chemical Manufacturing', icon: '🧪' },
  { name: 'Pharmaceuticals', icon: '💊' },
  { name: 'Food & Beverage', icon: '🍽' },
  { name: 'Marine, Offshore & Shipbuilding', icon: '⚓' },
  { name: 'Pulp & Paper', icon: '📄' },
  { name: 'HVAC & Infrastructure Projects', icon: '🏗' }
];
