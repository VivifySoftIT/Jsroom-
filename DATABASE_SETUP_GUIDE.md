# JS ROOMS - Database Setup Guide

## Current Issue
The rooms are being saved to localStorage (browser storage) instead of the actual database. To save to the database, you need to:

1. **Install .NET SDK**
2. **Start the Backend API**
3. **Verify Database Connection**

## Step 1: Install .NET SDK

### Download and Install:
1. Go to: https://dotnet.microsoft.com/download
2. Download .NET 8.0 SDK (or latest version)
3. Install it on your system
4. Restart your command prompt/terminal

### Verify Installation:
```bash
dotnet --version
```
You should see a version number like `8.0.x`

## Step 2: Start the Backend API

### Navigate to Backend Directory:
```bash
cd JSRoomsAPI/JSRoomsAPI
```

### Run the API:
```bash
dotnet run
```

You should see output like:
```
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7001
      Now listening on: http://localhost:5000
```

## Step 3: Verify Database Connection

### Your Database Configuration:
- **Server**: 103.230.85.44
- **Database**: JSroomsEcommerce
- **Connection**: Already configured in appsettings.json

### Test the Connection:
1. Keep the API running (`dotnet run`)
2. Open your browser to: `https://localhost:7001/api/rooms/GetActiveCategories`
3. You should see JSON response with categories

## Step 4: Frontend Integration

Once the backend is running, the frontend will automatically:
- ✅ Try to save rooms to the database first
- ⚠️ Fall back to localStorage if database is unavailable
- 📝 Show appropriate messages to indicate where data was saved

## Current Status

### ✅ What's Working:
- Frontend room management (localStorage)
- Database connection configuration
- API endpoints created
- Fallback mechanism implemented

### 🔄 What Needs Setup:
- .NET SDK installation
- Backend API server running
- Database connection active

## Quick Test

After starting the backend API:

1. **Add a new room** in the admin panel
2. **Check the console logs** - you should see:
   - "✅ Room created via API successfully" (database save)
   - Instead of "✅ Room added to localStorage successfully" (local save)

3. **Check your database** - the new room should appear in the `RoomDetails` table

## Troubleshooting

### If API doesn't start:
- Ensure .NET SDK is installed: `dotnet --version`
- Check if port 7001 is available
- Verify database server is accessible

### If database connection fails:
- Check your database server (103.230.85.44) is running
- Verify credentials in appsettings.json
- Test connection from SQL Server Management Studio

### If frontend still uses localStorage:
- Check browser console for API error messages
- Verify API is running on https://localhost:7001
- Check network tab in browser dev tools

## Success Indicators

When everything is working correctly:
- ✅ Backend API runs without errors
- ✅ Frontend shows "Loaded data from API successfully"
- ✅ New rooms appear in database table
- ✅ Room operations work in both frontend and database

---

**Note**: The current implementation gracefully falls back to localStorage when the database is unavailable, so your website continues to work even without the backend running. However, for production use, you'll want the database connection active to persist data permanently.