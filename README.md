# ✈️ AeroSmart - Aircraft Monitoring Dashboard

Real-time aircraft monitoring dashboard with React, TypeScript, Express backend, and Vercel deployment.

##  Live Demo

**[ Open AeroSmart Dashboard](https://aero-smart-view.vercel.app/)**

---

##  Quick Start

### Prerequisites
- Node.js v18+

### Installation & Run
```bash
git clone https://github.com/Kiranwaqar/AeroSmartView.git
cd AeroSmartView
npm run setup
npm run dev:all
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

---

##  Features

-  **Dashboard** - Real-time metrics (temp, pressure, fuel, engine health)
-  **Analytics** - Performance analysis with charts and predictions
-  **Systems** - Detailed system parameters (Engine, Fuel, Navigation)
-  **Settings** - Configurable API, notifications, theme, performance
-  **Responsive** - Works on desktop, tablet, mobile
-  **Dark Theme** - Modern sleek interface
-  **TypeScript** - Full type safety
-  **Fast Caching** - TanStack Query for data management

---

##  Commands

```bash
npm run dev:all          # Frontend + Backend
npm run dev              # Frontend only
npm run dev:backend      # Backend only
npm run build:all        # Build both
npm run test             # Run tests
npm run lint             # Lint code
```

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health |
| GET | `/api/metrics` | All metrics |
| GET | `/api/systems` | All systems |
| GET | `/api/analytics` | Analytics data |

---

##  Project Structure

```
src/                     # React frontend
├── components/          # UI components
├── pages/              # Dashboard, Analytics, Systems, Settings
├── hooks/              # API hooks (useMetrics, useSystems, etc)
└── lib/                # Utils & config

server/                 # Express backend
├── src/
│   ├── index.ts        # Server entry
│   └── routes/         # API endpoints
└── package.json
```

---

##  Environment Setup

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:3001
```

**Backend (server/.env):**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

##  Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Shadcn/ui, React Router, TanStack Query, Recharts, Framer Motion

**Backend:** Express.js, TypeScript, Node.js

---

##  Deployment

Already deployed on **[Vercel](https://aero-smart-view.vercel.app/)** 

---

##  Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend not connecting | Check `VITE_API_URL` in `.env.local` |
| Port already in use | `lsof -i :3001` then `kill -9 <PID>` (macOS/Linux) |
| Dependencies missing | `npm run setup` |
| Build fails | Run `npm run build:all` to test locally |

---

