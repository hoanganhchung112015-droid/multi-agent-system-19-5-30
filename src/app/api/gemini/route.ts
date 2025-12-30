// src/app/api/gemini/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const API_KEY = process.env.GEMINI_API_KEY; // Cài đặt trong Cloudflare Settings
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    return NextResponse.json({ text: data.candidates[0].content.parts[0].text });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi API' }, { status: 500 });
  }
}
