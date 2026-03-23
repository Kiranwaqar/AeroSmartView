

# AeroSmart - Aircraft Monitoring Dashboard

Welcome to AeroSmart, a modern real-time aircraft monitoring and analytics dashboard built with React, TypeScript, Vite, and Express.js backend.

## 🚀 Project Structure

```
aerosmart-view-main/
├── src/                    # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks (including API hooks)
│   ├── lib/              # Utilities and configuration
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── server/               # Backend Express API
│   ├── src/
│   │   ├── index.ts      # Express server entry point
│   │   └── routes/       # API endpoints
│   ├── package.json
│   └── tsconfig.json
├── public/               # Static files
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
└── vercel.json          # Vercel deployment config
```

## 📋 Requirements

- **Node.js**: v18 or higher
- **npm** or **bun**: Package manager
- **Git**: For version control

## 🛠️ Local Development Setup

### 1. Clone and Install Dependencies

```bash
cd aerosmart-view-main

# Install all dependencies (frontend + backend)
npm run setup
```

This command will:
- Install frontend dependencies
- Navigate to `server/` and install backend dependencies
- Return to root directory

### 2. Configure Environment Variables

**Frontend (.env.local):**
```bash
VITE_API_URL=http://localhost:3001
```

**Backend (server/.env):**
```bash
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Copy `.env.example` files if needed:
```bash
cp .env.example .env.local
cp server/.env.example server/.env
```

### 3. Run Development Servers

#### Option A: Run Both Servers Together
```bash
npm run dev:all
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

#### Option B: Run Separately (In Different Terminals)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
```

### 4. Verify Setup

Check that everything is working:

```bash
# Check frontend (should show React app)
curl http://localhost:5173

# Check backend health
curl http://localhost:3001/api/health
```

Expected health check response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-23T...",
  "environment": "development"
}
```

## 🏗️ Building for Production

```bash
# Build both frontend and backend
npm run build:all

# Build only frontend
npm run build

# Build only backend
npm run build:backend
```

## 📦 Backend API Endpoints

### Health Check
- `GET /api/health` - Check backend status

### Metrics
- `GET /api/metrics` - Get all metrics
- `GET /api/metrics/:id` - Get specific metric
- `POST /api/metrics` - Create new metric
- `PUT /api/metrics/:id` - Update metric
- `DELETE /api/metrics/:id` - Delete metric

### Systems
- `GET /api/systems` - Get all systems
- `GET /api/systems/:id` - Get specific system
- `POST /api/systems` - Create new system
- `PUT /api/systems/:id` - Update system
- `DELETE /api/systems/:id` - Delete system

### Analytics
- `GET /api/analytics` - Get all analytics
- `GET /api/analytics/:section` - Get specific section
- `GET /api/analytics/metrics/performance` - Get performance metrics
- `GET /api/analytics/predictions/faults` - Get fault predictions

## 🎨 Frontend Features

- **Real-time Metrics**: Temperature, pressure, fuel level, engine health monitoring
- **System Details**: Detailed parameters for engine, fuel, and navigation systems
- **Analytics Dashboard**: Performance analysis, radar charts, fault predictions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern dark UI with accessible components
- **Framer Motion**: Smooth animations and transitions

## 🔗 Using Frontend API Hooks

The frontend includes custom hooks to easily fetch data from the backend:

```typescript
import { useMetrics, useSystems, useAnalytics, useHealthCheck } from '@/hooks/use-api';

function MyComponent() {
  const { data: metrics, isLoading, error } = useMetrics();
  const { data: systems } = useSystems();
  const { data: analytics } = useAnalytics();
  const { data: health } = useHealthCheck();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Use your data */}</div>;
}
```

## 📚 Technology Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS
- **Shadcn/ui**: Component library
- **React Router**: Client-side routing
- **React Query (TanStack)**: Data fetching and caching
- **Recharts**: Data visualization
- **Framer Motion**: Animations
- **Zod**: Schema validation

### Backend
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **Node.js**: Runtime

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

## 📝 Linting

```bash
npm run lint
```

## 🚨 Troubleshooting

### Backend connection issues
1. Ensure backend is running on port 3001
2. Check `VITE_API_URL` in `.env.local`
3. Verify CORS is enabled in `server/src/index.ts`

### Port already in use
```bash
# Find process using port 3001
lsof -i :3001

# Kill process (on Unix/Mac)
kill -9 <PID>

# On Windows, use Task Manager or:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Module not found errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules server/node_modules
npm run setup
```

## 🌐 Deploying to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## 📄 License

This project is part of the AeroSmart initiative.

## 💡 Next Steps

1. **Database Integration**: Replace mock data with real database
2. **Authentication**: Add user authentication and authorization
3. **Real-time Updates**: Implement WebSockets for live updates
4. **Alerting System**: Create notification system for critical events
5. **Data Export**: Add export functionality for reports

---

For questions or issues, please refer to the troubleshooting section or create an issue on GitHub.
