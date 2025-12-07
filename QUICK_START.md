# Quick Start Guide - Smart AgroVision

## 🚀 One-Click Setup

### Backend (Python FastAPI)

```powershell
cd backend
python -m pip install -r requirements.txt
python main.py
```

✅ **Wait for:** `Uvicorn running on http://0.0.0.0:8000`

### Frontend (Next.js)

**In a NEW terminal window:**

```powershell
npm run dev
```

✅ **Wait for:** `Local: http://localhost:3000` (or 3001)

---

## 🌐 Access the App

- **Frontend:** http://localhost:3000
- **Backend API Docs:** http://localhost:8000/docs

---

## 🔐 Login Options

### Option 1: Quick Test Account (Easiest)
1. Go to http://localhost:3000/login
2. Click **"🚀 Quick Test Account"** button
3. Auto-creates: `test@example.com` / `password123`
4. Redirects to dashboard

### Option 2: Manual Login
1. Use any email and password
2. Backend will create the account automatically

---

## ✨ Features to Try

### 1. **Camera Capture** (Homepage)
- Click "Crop Photo Capture" section
- Grant camera permission
- Select crop type (Rice, Corn, Wheat, etc.)
- Capture photos
- See gallery below

### 2. **Image Upload & Analysis** (Dashboard)
- Go to Dashboard → Upload & Analyze tab
- Upload a crop image (JPG/PNG)
- Click "Analyze Image"
- See crop detection and disease analysis
- View colorful disease progression chart

### 3. **Dashboard Metrics**
- Overview KPI cards with sparklines
- Recent captures gallery
- Quick action buttons

---

## 🐛 Troubleshooting

### "Failed to fetch" Error
✅ **Make sure BOTH servers are running:**
- Backend: `http://localhost:8000` should respond
- Frontend: `http://localhost:3000` should load

### Backend Won't Start
```powershell
python -m pip install -r requirements.txt --upgrade
```

### Port Already in Use
- **Port 3000 in use?** Frontend will use 3001 automatically
- **Port 8000 in use?** Change in backend/main.py: `uvicorn.run(app, host="0.0.0.0", port=8001)`

### Database Issues
```powershell
cd backend
del test.db  # Remove old database
python main.py
```

---

## 📱 Test Workflow

1. **Open Frontend:** http://localhost:3000
2. **Click Quick Test** → Creates account and logs in
3. **Go to Dashboard** → See empty state
4. **Upload Image** → Analyze crop
5. **See Results** → Disease detection + colorful charts
6. **View History** → All analyses saved

---

## 🔧 Environment Setup (Already Done)

- `.env.local` → Frontend API URL configured
- `.env` → Backend JWT secret configured  
- `backend/requirements.txt` → Dependencies listed

---

## 📚 API Examples (Using Token from Login)

Get your token from browser DevTools (F12):
1. Login successfully
2. Open Console → `localStorage.getItem('token')`
3. Copy the token

### Analyze Crop Image
```bash
curl -X POST "http://localhost:8000/analyze/crop?token=YOUR_TOKEN" \
  -F "file=@path/to/image.jpg"
```

### Get Analysis History
```bash
curl "http://localhost:8000/history?token=YOUR_TOKEN"
```

---

## 🎯 Next Steps

1. ✅ Both servers running
2. ✅ Quick test account created  
3. ✅ Upload and analyze images
4. ✅ View disease progression charts
5. ➡️ Optional: Replace mock ML with real models (PyTorch)
