export const DEMO_USERS = {
  'admin@ertmac.demo': { _id: '6571a0000000000000000001', name: 'Admin Kumar', email: 'admin@ertmac.demo', role: 'ADMIN', department: 'IT & Digital', status: 'ACTIVE' },
  'engineer@ertmac.demo': { _id: '6571a0000000000000000002', name: 'Rajesh Engineer', email: 'engineer@ertmac.demo', role: 'ENGINEER', department: 'Drilling Engineering', status: 'ACTIVE' },
  'manager@ertmac.demo': { _id: '6571a0000000000000000003', name: 'Manager Singh', email: 'manager@ertmac.demo', role: 'MANAGER', department: 'Drilling Operations', status: 'ACTIVE' },
};

export const DEMO_WELLS = [
  {
    _id: '6571b0000000000000000101', wellName: 'WELL-101', field: 'Deohal Field', operator: 'Oil India Limited',
    latitude: 27.3850, longitude: 95.3200, status: 'DRILLING',
    currentDepth: 2820, targetDepth: 3500, currentFormation: 'Formation-X',
    riskLevel: 'HIGH', spudDate: '2024-08-01', isActive: true,
    formations: [
      { name: 'Alluvium', topDepth: 0, bottomDepth: 250, lithology: 'Sand & Clay' },
      { name: 'Tipam Formation', topDepth: 250, bottomDepth: 900, lithology: 'Sandstone' },
      { name: 'Barail Formation', topDepth: 900, bottomDepth: 1800, lithology: 'Sandstone/Shale' },
      { name: 'Kopili Formation', topDepth: 1800, bottomDepth: 2500, lithology: 'Shale' },
      { name: 'Formation-X', topDepth: 2500, bottomDepth: 3000, lithology: 'Limestone/Dolomite', description: 'Target carbonate reservoir' },
      { name: 'Formation-Y', topDepth: 3000, bottomDepth: 3500, lithology: 'Limestone' },
    ],
    trajectory: { type: 'DIRECTIONAL', inclination: 12.5, azimuth: 245, kickoffPoint: 1200 },
    description: 'Active directional well targeting Formation-X carbonate reservoir.',
  },
  {
    _id: '6571b0000000000000000102', wellName: 'WELL-102', field: 'Deohal Field', operator: 'Oil India Limited',
    latitude: 27.3760, longitude: 95.3310, status: 'COMPLETED',
    currentDepth: 3420, targetDepth: 3420, currentFormation: 'Formation-Y',
    riskLevel: 'LOW', spudDate: '2023-03-15', completionDate: '2023-11-20', isActive: true,
    formations: [], description: 'Completed well producing from Formation-Y.',
  },
  {
    _id: '6571b0000000000000000103', wellName: 'WELL-103', field: 'Deohal Field', operator: 'Oil India Limited',
    latitude: 27.3660, longitude: 95.3380, status: 'COMPLETED',
    currentDepth: 3300, targetDepth: 3300, currentFormation: 'Formation-Y',
    riskLevel: 'MEDIUM', spudDate: '2022-06-10', completionDate: '2023-01-15', isActive: true,
    formations: [], description: 'Key offset well. Formation-X zone highly fractured with mud loss history.',
  },
  {
    _id: '6571b0000000000000000104', wellName: 'WELL-104', field: 'Deohal Field', operator: 'Oil India Limited',
    latitude: 27.3520, longitude: 95.3080, status: 'SUSPENDED',
    currentDepth: 2950, targetDepth: 3500, currentFormation: 'Formation-X',
    riskLevel: 'HIGH', spudDate: '2023-09-01', isActive: true,
    formations: [], description: 'Suspended due to high-pressure kick at 2900m in Formation-X.',
  },
  {
    _id: '6571b0000000000000000105', wellName: 'WELL-105', field: 'Nagapathar Field', operator: 'Oil India Limited',
    latitude: 27.4120, longitude: 95.3650, status: 'PRODUCING',
    currentDepth: 3150, targetDepth: 3150, currentFormation: 'Formation-Z',
    riskLevel: 'LOW', spudDate: '2021-04-20', completionDate: '2022-02-28', isActive: true,
    formations: [], description: 'Producing well from Formation-Z.',
  },
];

export const DEMO_EVENTS = [
  {
    _id: '6571d0000000000000000001', wellId: '6571b0000000000000000103',
    eventType: 'MUD_LOSS', depth: 2850, formation: 'Formation-X', severity: 'HIGH',
    description: 'Partial mud loss detected while drilling through Formation-X carbonate zone at 2850m. Loss rate: 25-30 bbl/hr. Natural fracturing of carbonate observed.',
    cause: 'Natural fracture system in Formation-X carbonate zone.',
    mitigation: 'Drilling stopped. LCM pill (50 bbl fibrous mix) spotted. Pump rates reduced. Mud weight maintained at 1.32 SG.',
    outcome: 'Drilling resumed after 6.5 hours NPT. Modified mud program implemented.',
    nptHours: 6.5,
    parameters: { torque: 18.5, rpm: 45, wob: 180, rop: 2.8, mudWeight: 1.32, pressure: 185 },
    verificationStatus: 'APPROVED',
  },
  {
    _id: '6571d0000000000000000002', wellId: '6571b0000000000000000103',
    eventType: 'HIGH_TORQUE', depth: 2880, formation: 'Formation-X', severity: 'MEDIUM',
    description: 'Torque spike from 14 to 22 kNm at 2880m. Natural fracture encounter.',
    cause: 'Natural fracture encounter in Formation-X.',
    mitigation: 'Reduced WOB, increased circulation. Normal drilling resumed after 2.5 hrs.',
    outcome: 'Normal drilling after 2.5 hours.', nptHours: 2.5,
    parameters: { torque: 22.0, rpm: 40, wob: 150, rop: 1.5, mudWeight: 1.32, pressure: 192 },
    verificationStatus: 'APPROVED',
  },
  {
    _id: '6571d0000000000000000003', wellId: '6571b0000000000000000104',
    eventType: 'KICK', depth: 2900, formation: 'Formation-X', severity: 'CRITICAL',
    description: 'Well kick at 2900m in Formation-X. 15 bbl kick volume. Well shut-in. SICP 380 psi, SIDPP 320 psi.',
    cause: 'Underbalanced condition in over-pressured Formation-X.',
    mitigation: 'Immediate well shut-in. Driller method applied. Kill mud weight increased to 1.45 SG.',
    outcome: 'Well killed after 18 hours. Operations suspended.', nptHours: 18.0,
    parameters: { mudWeight: 1.38, pressure: 380 },
    verificationStatus: 'APPROVED',
  },
];

export const DEMO_RISK_ALERTS = [
  {
    _id: '6571e0000000000000000001',
    activeWellId: '6571b0000000000000000101', offsetWellId: '6571b0000000000000000103',
    activeWellName: 'WELL-101', offsetWellName: 'WELL-103',
    currentDepth: 2820, historicalDepth: 2850, depthDifference: 30,
    distance: 2.1, formationSimilarity: 'EXACT_MATCH',
    riskLevel: 'HIGH', riskScore: 88, eventType: 'MUD_LOSS',
    reason: 'Active well WELL-101 is at 2820m depth in Formation-X, only 30m away from historical MUD_LOSS incident at 2850m in offset well WELL-103 (2.1km away). High risk of severe mud loss.',
    evidence: [
      { label: 'Offset Well', value: 'WELL-103 (2.1 km distance)' },
      { label: 'Historical Event', value: 'MUD_LOSS at 2850m (NPT: 6.5 hrs)' },
      { label: 'Formation Match', value: 'Formation-X (Limestone/Dolomite)' },
    ],
    status: 'OPEN', isActive: true,
  },
];

export const DEMO_REPORTS = [
  {
    _id: '6571c0000000000000000001', title: 'WELL-103 Daily Drilling Report — Formation-X Interval',
    fileName: 'well103-ddr-demo.pdf', fileSize: 245000, mimeType: 'application/pdf',
    wellId: '6571b0000000000000000103', wellName: 'WELL-103', reportType: 'DAILY_DRILLING_REPORT',
    extractionStatus: 'COMPLETED', verificationStatus: 'PARTIALLY_APPROVED',
    pageCount: 14, isDemo: true,
    extractedData: [
      { eventType: 'MUD_LOSS', depth: 2850, formation: 'Formation-X', severity: 'HIGH', description: 'Partial mud loss at 2850m in Formation-X carbonate. Loss rate 25-30 bbl/hr.', verificationStatus: 'APPROVED' },
      { eventType: 'HIGH_TORQUE', depth: 2880, formation: 'Formation-X', severity: 'MEDIUM', description: 'Torque spike from 14 to 22 kNm at 2880m.', verificationStatus: 'APPROVED' },
    ],
  },
];

export const DEMO_READINGS = [
  { timestamp: new Date().toISOString(), depth: 2820, torque: 18.2, rpm: 50, wob: 175, rop: 3.2, mudWeight: 1.32, mudFlow: 1200, pressure: 185, temperature: 78, hookLoad: 120 },
  { timestamp: new Date(Date.now() - 60000).toISOString(), depth: 2819.5, torque: 18.0, rpm: 50, wob: 172, rop: 3.4, mudWeight: 1.32, mudFlow: 1200, pressure: 184, temperature: 78, hookLoad: 119 },
  { timestamp: new Date(Date.now() - 120000).toISOString(), depth: 2819.0, torque: 17.8, rpm: 50, wob: 170, rop: 3.5, mudWeight: 1.32, mudFlow: 1200, pressure: 183, temperature: 77, hookLoad: 118 },
];
