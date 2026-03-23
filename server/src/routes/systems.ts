import express, { Request, Response } from 'express';

export const systemsRoutes = express.Router();

// Mock data
const systemsData = [
  {
    id: 'engine',
    name: 'Engine System',
    status: 'normal',
    lastUpdate: new Date(),
    params: [
      { label: 'RPM', value: '12,450', unit: 'rpm' },
      { label: 'EGT', value: '645', unit: '°C' },
      { label: 'Oil Pressure', value: '72', unit: 'PSI' },
      { label: 'Vibration', value: '0.12', unit: 'mm/s' },
    ],
  },
  {
    id: 'fuel',
    name: 'Fuel System',
    status: 'warning',
    lastUpdate: new Date(),
    params: [
      { label: 'Total Fuel', value: '18,240', unit: 'kg' },
      { label: 'Flow Rate', value: '2,840', unit: 'kg/h' },
      { label: 'Temp', value: '22', unit: '°C' },
      { label: 'Remaining', value: '6.4', unit: 'hrs' },
    ],
  },
  {
    id: 'nav',
    name: 'Navigation System',
    status: 'normal',
    lastUpdate: new Date(),
    params: [
      { label: 'GPS Status', value: 'Locked', unit: '' },
      { label: 'Heading', value: '274', unit: '°' },
      { label: 'Altitude', value: '35,000', unit: 'ft' },
      { label: 'Ground Speed', value: '487', unit: 'kts' },
    ],
  },
];

// GET all systems
systemsRoutes.get('/', (req: Request, res: Response) => {
  res.json(systemsData);
});

// GET system by ID
systemsRoutes.get('/:id', (req: Request, res: Response) => {
  const system = systemsData.find(s => s.id === req.params.id);
  if (!system) {
    return res.status(404).json({ error: 'System not found' });
  }
  res.json(system);
});

// POST new system
systemsRoutes.post('/', (req: Request, res: Response) => {
  const newSystem = {
    ...req.body,
    lastUpdate: new Date(),
  };
  systemsData.push(newSystem);
  res.status(201).json(newSystem);
});

// PUT update system
systemsRoutes.put('/:id', (req: Request, res: Response) => {
  const system = systemsData.find(s => s.id === req.params.id);
  if (!system) {
    return res.status(404).json({ error: 'System not found' });
  }
  Object.assign(system, req.body, { lastUpdate: new Date() });
  res.json(system);
});

// DELETE system
systemsRoutes.delete('/:id', (req: Request, res: Response) => {
  const index = systemsData.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'System not found' });
  }
  const deletedSystem = systemsData.splice(index, 1);
  res.json(deletedSystem[0]);
});
