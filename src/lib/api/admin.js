import { cookies } from "next/headers";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function isAdminRequest() {
  try {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("adminAuth")?.value;
    
    console.log("Checking admin auth, cookie value:", adminAuth);
    
    if (adminAuth === "true") {
      console.log("✅ Admin authentication successful");
      return true;
    }
    
    console.log("❌ Admin authentication failed - no valid cookie");
    return false;
  } catch (error) {
    console.error("Error checking admin auth:", error);
    return false;
  }
}

export async function getFirebaseAuth() {
  try {
    const adminEmail = "admin@bitsoft.com";
    const adminPassword = "admin123";
    const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase auth error:", error);
    if (error.code === 'auth/user-not-found') {
      console.log("Admin user not found in Firebase. Please create admin@bitsoft.com user in Firebase Console.");
      console.log("For now, admin operations will work but may have limited functionality.");
    } else if (error.code === 'auth/too-many-requests') {
      console.log("Too many Firebase auth attempts. Please try again later.");
    }
    return null;
  }
}

export async function createAdminFirebaseUser() {
  try {
  
    console.log("To create admin user:");
    console.log("1. Go to Firebase Console → Authentication");
    console.log("2. Add user: admin@bitsoft.com / admin123");
    console.log("3. Set role as admin in users collection");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}
