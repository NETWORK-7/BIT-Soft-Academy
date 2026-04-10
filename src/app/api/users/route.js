import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/admin";
import { db } from "@/lib/firebase.js";
import { ref, get } from "firebase/database";

export async function GET() {
  try {
    // Check if admin is authenticated
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching users from Firebase...");
    
    // Get users from Firebase
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);
    const usersData = usersSnapshot.val();
    
    let users = [];
    if (usersData) {
      users = Object.keys(usersData).map(key => ({
        _id: key,
        ...usersData[key]
      }));
    }
    
    console.log(`Found ${users.length} users in Firebase`);
    
    return NextResponse.json({ 
      success: true,
      users: users,
      count: users.length 
    });
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ 
      success: false,
      users: [], 
      error: error.message 
    }, { status: 500 });
  }
}
