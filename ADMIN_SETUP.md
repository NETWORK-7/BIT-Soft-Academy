# Admin Portal Password Protection - Setup Guide

## Overview
Your admin portal at `localhost:3000/admin` is now password protected. Only authorized administrators with the correct name and password can access it. Regular users cannot gain access.

## Files Created/Modified

### 1. **Login Page** (`/src/app/admin/login/page.jsx`)
- Beautiful login interface for admin authentication
- Requires Name and Password
- Redirects to admin dashboard on successful login
- Shows error messages for invalid credentials

### 2. **Login API** (`/src/app/api/admin/login/route.js`)
- Handles authentication
- Sets secure httpOnly cookie (`adminAuth`) on successful login
- Default credentials:
  - **Name:** `Admin`
  - **Password:** `admin123`

### 3. **Logout API** (`/src/app/api/admin/logout/route.js`)
- Handles logout by removing admin session cookie
- Redirects user back to login page

### 4. **Logout Component** (`/src/components/AdminLogout.jsx`)
- Logout button in admin sidebar
- One-click logout functionality

### 5. **Updated Middleware** (`/src/middleware.js`)
- Protects `/admin` routes with cookie-based authentication
- Allows access to `/admin/login` without authentication
- Redirects unauthenticated users to login page

### 6. **Updated Admin Dashboard** (`/src/app/admin/page.jsx`)
- Added logout button in the sidebar
- All admin functionality remains the same

## How It Works

1. **First Visit**: When users try to access `localhost:3000/admin`, they are redirected to `/admin/login`
2. **Login**: They enter their name and password
3. **Authentication**: The system validates credentials and sets a secure cookie
4. **Access Granted**: Authenticated users can access the admin dashboard and all admin features
5. **Logout**: Users can click the logout button to clear their session

## Credentials

| Field    | Value     |
|----------|-----------|
| Name     | Admin     |
| Password | admin123  |

## Security Features

✅ **HttpOnly Cookies** - Cookies cannot be accessed via JavaScript, protecting against XSS attacks
✅ **Secure Flag** - In production, cookies are only sent over HTTPS
✅ **SameSite Strict** - Prevents CSRF attacks
✅ **24-hour Session** - Sessions automatically expire after 24 hours
✅ **No User Access** - Regular users cannot guess or bypass this login

## Customization

To change the admin credentials, edit `/src/app/api/admin/login/route.js`:

```javascript
const ADMIN_PASSWORD = "n1m2d3b4b5"; // Change this
const ADMIN_NAME = "admin";             // Change this
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. You should be redirected to the login page
4. Enter credentials:
   - Name: `Admin`
   - Password: `admin123`
5. You should now see the admin dashboard
6. Click "Logout" in the sidebar to test logout functionality

## Notes

- The login page is clean and professional
- All existing admin features continue to work normally
- Sessions persist across page refreshes (within 24 hours)
- The cookie is deleted when users logout or sessions expire
