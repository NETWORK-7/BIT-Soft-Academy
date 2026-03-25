import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireDb } from "@/lib/db";
import { isAdminRequest } from "@/lib/api/admin";

export async function DELETE(req, { params }) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const courseId = String(id || "");
    if (!courseId) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    let oid;
    try {
      oid = new ObjectId(courseId);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid course id" }, { status: 400 });
    }

    const db = await requireDb();
    const del = await db.collection("courses").deleteOne({ _id: oid });
    if (del.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
    }
    await db.collection("lessons").deleteMany({ courseId });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/courses/[id]:", e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
