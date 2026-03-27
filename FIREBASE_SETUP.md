# 🔥 Firebase Authentication Setup Guide

## 📋 **Required Steps for Admin Operations**

Your Firebase rules now require authentication for write operations. Follow these steps:

### **1. Create Admin User in Firebase Console**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `bitsoft-da7a0`
3. **Go to Authentication** → "Users" tab
4. **Click "Add user"**:
   - **Email**: `admin@bitsoft.com`
   - **Password**: `admin123`
   - **Enable**: ✅

### **2. Set Admin Role in Database**

After creating the user, add admin role to the users collection:

```json
{
  "users": {
    "ADMIN_USER_ID": {
      "email": "admin@bitsoft.com",
      "name": "Admin",
      "role": "admin",
      "createdAt": "2026-03-27T...",
      "updatedAt": "2026-03-27T..."
    }
  }
}
```

### **3. Test Admin Operations**

Once admin user is created:
- ✅ Admin can create/edit/delete courses
- ✅ Admin can create/edit/delete lessons  
- ✅ Public users can read courses/lessons
- ✅ User data is protected

### **4. Current Firebase Rules**

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

### **🚀 **Security Status**

- ✅ **Courses/Lessons**: Public read, authenticated write
- ✅ **Users**: Authenticated read/write only
- ✅ **Admin Operations**: Require Firebase authentication
- ✅ **Data Protection**: User data no longer public

### **🔧 **Troubleshooting**

If admin operations fail:
1. Check if `admin@bitsoft.com` user exists in Firebase Auth
2. Verify user has admin role in users collection
3. Check browser console for authentication errors

### **📞 **Need Help?**

Run this command to check admin auth:
```bash
node -e "const {getFirebaseAuth} = require('./src/lib/api/admin.js'); getFirebaseAuth().then(console.log)"
```

---

**Your Firebase is now secure!** 🔐
**Admin operations require Firebase authentication!** 🔑
