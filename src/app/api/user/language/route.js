import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { language } = await req.json();
    const validLanguages = ["en", "ru", "uz"];
    if (!validLanguages.includes(language)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }
    const response = NextResponse.json({ success: true, language });
    response.cookies.set("language", language, { maxAge: 60 * 60 * 24 * 365 });
    return response;
  } catch (error) {
    console.error("Language update error:", error);
    return NextResponse.json({ language: "en" }, { status: 200 });
  }
}

export async function GET(req) {
  try {
    

    const cookieLanguage = req.cookies.get("language")?.value;
    if (cookieLanguage && ["en", "ru", "uz"].includes(cookieLanguage)) {
      return NextResponse.json({ language: cookieLanguage });
    }


    const response = NextResponse.json({ language: "en" });
    response.cookies.set("language", "en", { maxAge: 60 * 60 * 24 * 365 });
    return response;
  } catch (error) {
    console.error("Language fetch error:", error);
    return NextResponse.json({ language: "en" }, { status: 200 });
  }
}

