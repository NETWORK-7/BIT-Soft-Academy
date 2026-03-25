import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    return NextResponse.json({ points: 0, completed: [], isPro: false });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ points: 0, completed: [], isPro: false });
  }
}