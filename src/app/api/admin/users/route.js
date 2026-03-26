import { NextResponse } from "next/server";
import { 
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "@/lib/firebase-db";
import { isAdminRequest } from "@/lib/api/admin";

export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await getAllUsers();
    console.log(`👥 Found ${users.length} users`);
    
    return NextResponse.json({ 
      success: true,
      users: users,
      count: users.length
    });

  } catch (error) {
    console.error("❌ GET /api/admin/users error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { email, displayName, role = "student" } = body;

    if (!email || !displayName) {
      return NextResponse.json({ 
        error: "Email and display name are required" 
      }, { status: 400 });
    }

    const userData = {
      email,
      displayName,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const user = await createUser(userData);
    console.log(`✅ Created user: ${user.displayName} (${user.email})`);

    return NextResponse.json({ 
      success: true,
      user,
      message: "User created successfully"
    });

  } catch (error) {
    console.error("❌ POST /api/admin/users error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return NextResponse.json({ 
        error: "User ID is required" 
      }, { status: 400 });
    }

    updateData.updatedAt = new Date().toISOString();

    const success = await updateUser(userId, updateData);
    
    if (success) {
      console.log(`✅ Updated user: ${userId}`);
      return NextResponse.json({ 
        success: true,
        message: "User updated successfully"
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 });
    }

  } catch (error) {
    console.error("❌ PUT /api/admin/users error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ 
        error: "User ID is required" 
      }, { status: 400 });
    }

    const success = await deleteUser(userId);
    
    if (success) {
      console.log(`✅ Deleted user: ${userId}`);
      return NextResponse.json({ 
        success: true,
        message: "User deleted successfully"
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 });
    }

  } catch (error) {
    console.error("❌ DELETE /api/admin/users error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
