import { cookies } from "next/headers";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function isAdminRequest() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("adminAuth")?.value;
  
  if (!adminAuth) {
    return false;
  }
  
  // Keep cookie check for admin UI access
  return true;
}

export async function getFirebaseAuth() {
  try {
    // Create a dedicated admin user in Firebase
    const adminEmail = "admin@bitsoft.com";
    const adminPassword = "admin123";
    
    // Sign in with Firebase to get proper auth token
    const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase auth error:", error);
    // If admin user doesn't exist, we'll need to create it
    if (error.code === 'auth/user-not-found') {
      console.log("Admin user not found in Firebase. Please create admin@bitsoft.com user in Firebase Console.");
    }
    return null;
  }
}

export async function createAdminFirebaseUser() {
  try {
    // This would need to be done manually in Firebase Console
    // or using Firebase Admin SDK (server-side only)
    console.log("To create admin user:");
    console.log("1. Go to Firebase Console → Authentication");
    console.log("2. Add user: admin@bitsoft.com / admin123");
    console.log("3. Set role as admin in users collection");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}
