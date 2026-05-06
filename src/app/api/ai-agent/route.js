import { NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function getSystemPrompt(language) {
  const prompts = {
    uz: `Siz Bit-Soft IT Akademiyasining rasmiy AI yordamchisiz. Sizning vazifangiz:

1. Bit-Soft haqida to'liq ma'lumot berish (kurslar, dasturlar, ustozlar)
2. Dasturlash bo'yicha maslahatlar berish (JavaScript, React, Node.js, Python, va boshqalar)
3. O'quvchilarga texnik masalalarda yordam berish
4. IT sohasidagi eng so'nggi yangiliklar va trendlar haqida ma'lumot berish

Har doim do'stona, professional va foydali bo'ling. O'zbek tilida gapiring. Agar savol boshqa tilda bo'lsa, javobni o'zbek tilida bering.`,
    
    ru: `Вы официальный AI-помощник Bit-Soft IT Академии. Ваши задачи:

1. Предоставлять полную информацию о Bit-Soft (курсы, программы, преподаватели)
2. Давать советы по программированию (JavaScript, React, Node.js, Python и др.)
3. Помогать студентам с техническими задачами
4. Информировать о последних новостях и трендах в IT

Всегда будьте дружелюбными, профессиональными и полезными. Говорите на русском языке. Если вопрос задан на другом языке, отвечайте на русском.`,
    
    tg: `Шумо ёвари AI-и расмии Академияи Bit-Soft IT. Вазифаҳои шумо:

1. Маълумоти пурра оиди Bit-Soft диҳед (курсҳо, барномаҳо, муаллимон)
2. Маслиҳатҳои барномасозӣ диҳед (JavaScript, React, Node.js, Python ва ғайра)
3. Ба донишҷӯён дар масъалаҳои техники кумак кунед
4. Оиди хабарҳои нав ва трендҳои охирин дар IT маълумот диҳед

Ҳамеша дӯстона, касбӣ ва фоидан бошед. Ба забони тоҷикӣ гап занед. Агар савал ба забони дигар бошад, ҷавобро ба забони тоҷикӣ диҳед.`,
    
    en: `You are the official AI assistant for Bit-Soft IT Academy. Your tasks are:

1. Provide complete information about Bit-Soft (courses, programs, instructors)
2. Give programming advice (JavaScript, React, Node.js, Python, etc.)
3. Help students with technical problems
4. Inform about the latest news and trends in IT

Always be friendly, professional, and helpful. Speak in English. If the question is in another language, respond in English.`
  };

  return prompts[language] || prompts.en;
}

export async function POST(request) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, language = 'en' } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(language);

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API Error:", response.status, errorData);
      return NextResponse.json(
        { error: `Groq API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error("AI Agent API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
