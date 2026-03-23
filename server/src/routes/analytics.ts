import express, { Request, Response } from 'express';

export const analyticsRoutes = express.Router();

// Mock data
const analyticsData = {
  performanceMetrics: {
    overallHealth: 94,
    efficiencyIndex: 91,
    reliabilityScore: 97,
  },
  performanceData: [
    { name: 'Engine 1', efficiency: 96, reliability: 98, temp: 74 },
    { name: 'Engine 2', efficiency: 92, reliability: 94, temp: 82 },
    { name: 'APU', efficiency: 88, reliability: 97, temp: 68 },
    { name: 'Hydraulic', efficiency: 95, reliability: 99, temp: 45 },
    { name: 'Electrical', efficiency: 97, reliability: 96, temp: 38 },
  ],
  radarData: [
    { subject: 'Thrust', A: 95 },
    { subject: 'Fuel Eff.', A: 88 },
    { subject: 'Vibration', A: 92 },
    { subject: 'Temp', A: 85 },
    { subject: 'Oil Press.', A: 97 },
    { subject: 'RPM', A: 91 },
  ],
  faultPredictions: [
    { component: 'Engine Bearing #2', probability: 12, risk: 'low', eta: '~2400 flight hours' },
    { component: 'Hydraulic Pump A', probability: 34, risk: 'medium', eta: '~800 flight hours' },
    { component: 'Fuel Valve Actuator', probability: 8, risk: 'low', eta: '~3200 flight hours' },
    { component: 'Bleed Air System', probability: 56, risk: 'high', eta: '~200 flight hours' },
  ],
  statusDistribution: [
    { name: 'Nominal', value: 72 },
    { name: 'Advisory', value: 18 },
    { name: 'Caution', value: 8 },
    { name: 'Warning', value: 2 },
  ],
};

// GET all analytics
analyticsRoutes.get('/', (req: Request, res: Response) => {
  res.json(analyticsData);
});

// GET specific analytics section
analyticsRoutes.get('/:section', (req: Request, res: Response) => {
  const section = req.params.section as keyof typeof analyticsData;
  if (!analyticsData[section]) {
    return res.status(404).json({ error: 'Analytics section not found' });
  }
  res.json({ [section]: analyticsData[section] });
});

// GET performance metrics
analyticsRoutes.get('/metrics/performance', (req: Request, res: Response) => {
  res.json(analyticsData.performanceMetrics);
});

// GET fault predictions
analyticsRoutes.get('/predictions/faults', (req: Request, res: Response) => {
  res.json(analyticsData.faultPredictions);
});
