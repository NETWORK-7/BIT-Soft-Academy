import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/admin";
import { 
  createComment, 
  getAllComments, 
  updateComment, 
  deleteComment 
} from "@/lib/firebase-db.js";

// GET - Fetch all comments (public) or admin-only for management
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    
    // If admin param is set, check admin auth
    if (admin === 'true') {
      if (!(await isAdminRequest())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
    
    const comments = await getAllComments();
    
    return NextResponse.json({ 
      success: true,
      comments: comments,
      count: comments.length 
    });
    
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ 
      success: false,
      comments: [], 
      error: error.message 
    }, { status: 500 });
  }
}

// POST - Create new comment (public for users, admin for management)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, text, rating, isPublic = true } = body;
    
    // Validate required fields
    if (!name || !text) {
      return NextResponse.json({ 
        success: false, 
        error: "Name and text are required" 
      }, { status: 400 });
    }
    
    const commentData = {
      name: name.trim(),
      email: email?.trim() || null,
      text: text.trim(),
      rating: rating ? parseInt(rating) : null,
      isPublic,
      userAgent: request.headers.get('user-agent') || null,
    };
    
    const createdComment = await createComment(commentData);
    
    return NextResponse.json({ 
      success: true,
      comment: createdComment 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

// PUT - Update comment (admin only)
export async function PUT(request) {
  try {
    // Check admin auth
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, name, email, text, rating, isPublic } = body;
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: "Comment ID is required" 
      }, { status: 400 });
    }
    
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email?.trim() || null;
    if (text !== undefined) updateData.text = text.trim();
    if (rating !== undefined) updateData.rating = rating ? parseInt(rating) : null;
    if (isPublic !== undefined) updateData.isPublic = isPublic;
    
    await updateComment(id, updateData);
    
    return NextResponse.json({ 
      success: true,
      message: "Comment updated successfully"
    });
    
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

// DELETE - Delete comment (admin only)
export async function DELETE(request) {
  try {
    // Check admin auth
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: "Comment ID is required" 
      }, { status: 400 });
    }
    
    await deleteComment(id);
    
    return NextResponse.json({ 
      success: true,
      message: "Comment deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
