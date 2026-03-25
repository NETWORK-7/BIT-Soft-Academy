import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'seed-practical'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: result.message || 'Courses seeded successfully',
        ...result
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to seed courses'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
