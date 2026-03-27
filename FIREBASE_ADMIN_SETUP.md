# Firebase Admin User Setup Guide

## Problem
Your Firebase Realtime Database has security rules that require authentication for write operations:
```json
{
  "rules": {
    "courses": {
      ".read": "true",
      ".write": "auth != null"
    },
    "lessons": {
      ".read": "true", 
      ".write": "auth != null"
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## Solution
Create an admin user in Firebase Authentication to enable full admin functionality.

## Steps to Create Admin User

### 1. Go to Firebase Console
- Open [Firebase Console](https://console.firebase.google.com/)
- Select your project: `bitsoft-da7a0`

### 2. Navigate to Authentication
- In the left sidebar, click "Authentication"
- Click "Get started" if you haven't set it up yet

### 3. Enable Email/Password Authentication
- Click "Sign-in method" tab
- Enable "Email/Password" provider
- Click "Save"

### 4. Add Admin User
- Go to "Users" tab
- Click "Add user"
- Enter:
  - **Email:** `admin@bitsoft.com`
  - **Password:** `admin123`
- Click "Add user"

### 5. Test Admin Access
- Go to your admin login page: `/admin/login`
- Login with:
  - **Name:** `Admin`
  - **Password:** `admin123`

## How It Works

### Hybrid Authentication System
Your application now uses a hybrid approach:

1. **Cookie Authentication** - For admin UI access
2. **Firebase Authentication** - For database operations
3. **Local Database Fallback** - When Firebase auth fails

### Authentication Flow
1. Admin logs in with name/password
2. System sets admin cookie for UI access
3. Attempts Firebase authentication for database operations
4. Falls back to local database if Firebase auth fails

### Benefits
- ✅ Works immediately with local database
- ✅ Full Firebase functionality when admin user exists
- ✅ No breaking changes to existing code
- ✅ Graceful degradation when Firebase is unavailable

## Current Admin Credentials
- **Login Name:** Admin
- **Login Password:** admin123
- **Firebase Email:** admin@bitsoft.com
- **Firebase Password:** admin123

## Troubleshooting

### If you see "Admin authentication required" errors:
1. Complete the Firebase admin user setup above
2. Restart your development server
3. Try logging out and back in

### If Firebase operations fail:
- The system will automatically fall back to local database
- Check console logs for detailed error messages
- Ensure Firebase project configuration is correct

### If you want to change credentials:
- Update `ADMIN_PASSWORD`, `ADMIN_NAME`, and `ADMIN_EMAIL` in:
  - `/src/app/api/admin/login/route.js`
  - `/src/lib/api/admin.js`

## Security Notes
- Change the default passwords in production
- Consider using environment variables for credentials
- The local database fallback should be disabled in production
- Firebase security rules should be reviewed for production use
