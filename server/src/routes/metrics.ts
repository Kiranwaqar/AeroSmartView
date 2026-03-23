import express, { Request, Response } from 'express';

export const metricsRoutes = express.Router();

// Mock data - replace with real database calls
const metricsData = [
  { id: 1, name: 'Temperature', value: 78, unit: '°C', status: 'normal', timestamp: new Date() },
  { id: 2, name: 'Pressure', value: 14.7, unit: 'PSI', status: 'normal', timestamp: new Date() },
  { id: 3, name: 'Fuel Level', value: 74, unit: '%', status: 'warning', timestamp: new Date() },
  { id: 4, name: 'Engine Health', value: 97, unit: '%', status: 'normal', timestamp: new Date() },
];

// GET all metrics
metricsRoutes.get('/', (req: Request, res: Response) => {
  res.json(metricsData);
});

// GET metric by ID
metricsRoutes.get('/:id', (req: Request, res: Response) => {
  const metric = metricsData.find(m => m.id === parseInt(req.params.id));
  if (!metric) {
    return res.status(404).json({ error: 'Metric not found' });
  }
  res.json(metric);
});

// POST new metric
metricsRoutes.post('/', (req: Request, res: Response) => {
  const newMetric = {
    id: Math.max(...metricsData.map(m => m.id), 0) + 1,
    ...req.body,
    timestamp: new Date(),
  };
  metricsData.push(newMetric);
  res.status(201).json(newMetric);
});

// PUT update metric
metricsRoutes.put('/:id', (req: Request, res: Response) => {
  const metric = metricsData.find(m => m.id === parseInt(req.params.id));
  if (!metric) {
    return res.status(404).json({ error: 'Metric not found' });
  }
  Object.assign(metric, req.body, { timestamp: new Date() });
  res.json(metric);
});

// DELETE metric
metricsRoutes.delete('/:id', (req: Request, res: Response) => {
  const index = metricsData.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Metric not found' });
  }
  const deletedMetric = metricsData.splice(index, 1);
  res.json(deletedMetric[0]);
});
