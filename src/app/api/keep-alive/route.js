import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true,
    message: 'Server is awake',
    timestamp: new Date().toISOString()
  });
}
