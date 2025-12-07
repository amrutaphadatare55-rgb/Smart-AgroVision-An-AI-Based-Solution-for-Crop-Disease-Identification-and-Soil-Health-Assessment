# Smart AgroVision App - Setup Guide

## Backend Setup (FastAPI + ML Models)

### Prerequisites
- Python 3.8+
- PostgreSQL (or use SQLite for development)
- CUDA (optional, for GPU acceleration)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Create Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
DATABASE_URL=sqlite:///./test.db
JWT_SECRET=your-secret-key-change-in-production
```

5. Run backend server:
```bash
python main.py
```

The backend will start on `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## Frontend Setup (Next.js + React)

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Navigate to project root (if not already there)

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create `.env.local` (already included):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run dev server:
```bash
npm run dev
# or
pnpm dev
```

The frontend will start on `http://localhost:3000`

## Features

### 1. **Crop Detection & Disease Analysis**
   - Upload crop images for AI-powered disease detection
   - Real-time analysis using deep learning (EfficientNet + ResNet)
   - Detected crops: Rice, Corn, Wheat, Soybean, Cotton, Potato, Tomato
   - Colorful disease progression charts

### 2. **Soil Analysis**
   - Analyze soil composition from images
   - NPK nutrient levels detection
   - Soil type classification
   - Fertility score calculation

### 3. **Camera Capture**
   - Real-time crop photo capture from device camera
   - Crop selector (Rice, Corn, Wheat, Soybean, Tomato, Potato, Cotton)
   - Photo download and gallery view
   - LocalStorage persistence

### 4. **Dashboard**
   - Overview KPI cards with sparkline charts
   - Recent captures gallery
   - Analysis history tracking
   - Quick action buttons

### 5. **Analysis Results**
   - Multi-line disease progression chart (Severity, Spread, Treatment Response)
   - Disease recommendations
   - Treatment options with dosage and cost
   - PDF report download

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info

### Analysis
- `POST /analyze/crop` - Analyze crop image (requires token, multipart form-data)
- `POST /analyze/soil` - Analyze soil image (requires token, multipart form-data)

### History
- `GET /history` - Get user's analysis history
- `GET /history/{id}` - Get specific analysis record

### Admin
- `POST /admin/crop/add` - Add new crop (admin only)
- `POST /admin/disease/add` - Add new disease (admin only)
- `GET /admin/users` - List all users (admin only)

## Troubleshooting

### Backend Won't Start
- Ensure Python packages installed: `pip install -r requirements.txt`
- Check DATABASE_URL is valid
- If using PostgreSQL, ensure server is running

### Frontend API Errors
- Verify backend is running on `http://localhost:8000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Open browser DevTools (F12) for detailed error messages

### Camera Not Working
- Grant browser permission for camera access
- Use HTTPS or localhost for camera access
- Check device camera is not in use

### ML Model Issues
- First run downloads pre-trained models (~500MB)
- Requires internet connection for initial setup
- GPU optional but recommended for faster inference

## Development Notes

- Frontend uses Next.js 16, React 19, Tailwind CSS
- Backend uses FastAPI, SQLAlchemy, PyTorch
- ML Models: EfficientNet-B3 (crop), ResNet-50 (disease)
- State management: React hooks + localStorage
- Charts: Recharts with custom gradients and animations

## Production Deployment

### Backend
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

### Frontend
```bash
npm run build
npm start
```

## Security Notes
- Change `JWT_SECRET` in production
- Use environment variables for sensitive data
- Enable HTTPS for API communication
- Implement rate limiting on API endpoints
- Add authentication validation on all endpoints
