// Groq API utility for Bit-Soft AI Agent

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function chatWithGroq(messages, language = 'en') {
  try {
    const systemPrompt = getSystemPrompt(language);
    
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error);
    throw error;
  }
}

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

export async function generateAIResponse(userMessage, language = 'en') {
  const messages = [
    { role: "user", content: userMessage }
  ];
  
  return await chatWithGroq(messages, language);
}
