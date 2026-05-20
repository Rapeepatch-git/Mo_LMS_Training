import { NextRequest, NextResponse } from 'next/server';
import { ALL_COURSES } from '@/data';

const GREET_TRIGGERS = ['สวัสดี', 'hello', 'hi', 'หวัดดี', 'ดีครับ', 'ดีค่ะ'];
const PRICE_TRIGGERS = ['ราคา', 'เท่าไร', 'กี่บาท', 'ค่าเรียน', 'ถูก', 'แพง', 'ส่วนลด'];
const CAT_TRIGGERS = ['หมวด', 'ประเภท', 'category', 'มีอะไรบ้าง', 'คอร์สอะไร'];
const INVEST_TRIGGERS = ['ลงทุน', 'หุ้น', 'investing', 'vi', 'การเงิน', 'finance', 'excel'];
const TECH_TRIGGERS = ['เทคโนโลยี', 'ai', 'โปรแกรม', 'tech', 'claude', 'คอมพิวเตอร์'];
const LANG_TRIGGERS = ['ภาษา', 'english', 'toeic', 'เกาหลี', 'ญี่ปุ่น', 'language'];
const BIZ_TRIGGERS = ['ธุรกิจ', 'business', 'marketing', 'การตลาด', 'management'];
const HEALTH_TRIGGERS = ['สุขภาพ', 'health', 'yoga', 'นอน', 'stress', 'สมดุล'];
const BESTSELLER_TRIGGERS = ['ยอดนิยม', 'best', 'แนะนำ', 'ดีที่สุด', 'popular', 'อันดับ'];
const HOW_TRIGGERS = ['เรียนยังไง', 'เริ่มยังไง', 'วิธี', 'ขั้นตอน', 'สมัคร', 'ลงทะเบียน'];
const CERT_TRIGGERS = ['certificate', 'ใบรับรอง', 'ใบเซอร์', 'วุฒิ', 'proof'];

function matchAny(text: string, triggers: string[]) {
  return triggers.some((t) => text.includes(t));
}

function cheapestCourses() {
  return [...ALL_COURSES].sort((a, b) => a.price - b.price).slice(0, 3);
}

function coursesByCategory(cat: string) {
  return ALL_COURSES.filter((c) => c.category.includes(cat) || c.categorySlug.includes(cat));
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const text = (message as string).toLowerCase().trim();

  await new Promise((r) => setTimeout(r, 400));

  let reply = '';
  let suggestions: string[] = [];

  if (matchAny(text, GREET_TRIGGERS)) {
    reply = 'สวัสดีครับ! ผมคือ Panya ผู้ช่วยด้านคอร์สเรียน 🤖\nถามเรื่องคอร์สได้เลยครับ เช่น ราคา, หมวดหมู่, หรือคอร์สแนะนำ';
    suggestions = ['คอร์สมีอะไรบ้าง', 'คอร์สราคาถูก', 'คอร์สแนะนำ'];

  } else if (matchAny(text, HOW_TRIGGERS)) {
    reply = 'วิธีเริ่มเรียนง่ายมากครับ:\n1. สมัครสมาชิกฟรีที่ /register\n2. เลือกคอร์สที่สนใจใน /courses\n3. เพิ่มลงตะกร้า → ชำระเงิน\n4. เข้าเรียนได้ทันทีที่ Dashboard ครับ';
    suggestions = ['ดูคอร์สทั้งหมด', 'คอร์สแนะนำสำหรับมือใหม่'];

  } else if (matchAny(text, CERT_TRIGGERS)) {
    reply = 'Pannya ออกใบรับรองดิจิทัลให้เมื่อเรียนจบครบทุกบทเรียนครับ ดาวน์โหลดได้ที่หน้า Dashboard → Certificate นำไปแสดงบน LinkedIn ได้เลย!';
    suggestions = ['วิธีเริ่มเรียน', 'คอร์สแนะนำ'];

  } else if (matchAny(text, BESTSELLER_TRIGGERS)) {
    const top = ALL_COURSES.filter((c) => c.badge === 'BESTSELLER' || c.rating >= 4.9);
    reply = `คอร์สยอดนิยมตอนนี้ครับ:\n${top.slice(0, 3).map((c) => `• ${c.title} — ฿${c.price.toLocaleString()} (${c.rating}★)`).join('\n')}`;
    suggestions = ['รายละเอียดคอร์สลงทุน', 'คอร์สราคาถูก'];

  } else if (matchAny(text, PRICE_TRIGGERS)) {
    const cheap = cheapestCourses();
    reply = `คอร์สราคาเริ่มต้นในตอนนี้ครับ:\n${cheap.map((c) => `• ${c.title}\n  ฿${c.price.toLocaleString()}${c.oldPrice ? ` (ลดจาก ฿${c.oldPrice.toLocaleString()})` : ''}`).join('\n')}`;
    suggestions = ['ดูคอร์สทั้งหมด', 'คอร์สด้านการลงทุน'];

  } else if (matchAny(text, CAT_TRIGGERS)) {
    reply = 'คอร์สใน Pannya แบ่งเป็นหมวดหมู่ดังนี้ครับ:\n• การลงทุน & การเงิน\n• เทคโนโลยี & AI\n• ธุรกิจ & การตลาด\n• ภาษา (อังกฤษ, เกาหลี, ญี่ปุ่น)\n• สุขภาพ & Wellness\nสนใจหมวดไหนครับ?';
    suggestions = ['คอร์สการลงทุน', 'คอร์สภาษา', 'คอร์ส AI'];

  } else if (matchAny(text, INVEST_TRIGGERS)) {
    const courses = coursesByCategory('invest').concat(coursesByCategory('finance'));
    const unique = [...new Map(courses.map((c) => [c.id, c])).values()];
    if (unique.length) {
      reply = `คอร์สด้านการลงทุน & การเงินครับ:\n${unique.slice(0, 3).map((c) => `• ${c.title}\n  ${c.instructor} — ฿${c.price.toLocaleString()} · ${c.lessons} บทเรียน`).join('\n')}`;
    } else {
      reply = 'ขณะนี้กำลังเพิ่มคอร์สการลงทุนเพิ่มเติมครับ ติดตามได้ที่ /courses';
    }
    suggestions = ['คอร์สราคาถูก', 'วิธีเริ่มเรียน'];

  } else if (matchAny(text, TECH_TRIGGERS)) {
    const courses = coursesByCategory('tech').concat(coursesByCategory('technology'));
    const unique = [...new Map(courses.map((c) => [c.id, c])).values()];
    if (unique.length) {
      reply = `คอร์สด้านเทคโนโลยีครับ:\n${unique.slice(0, 3).map((c) => `• ${c.title}\n  ${c.instructor} — ฿${c.price.toLocaleString()}`).join('\n')}`;
    } else {
      reply = 'กำลังเพิ่มคอร์สด้าน Tech เพิ่มเติมครับ ดูได้ที่ /courses?category=technology';
    }
    suggestions = ['คอร์ส AI', 'คอร์สแนะนำ'];

  } else if (matchAny(text, LANG_TRIGGERS)) {
    const courses = coursesByCategory('language').concat(coursesByCategory('lang'));
    const unique = [...new Map(courses.map((c) => [c.id, c])).values()];
    if (unique.length) {
      reply = `คอร์สภาษาที่เปิดสอนครับ:\n${unique.slice(0, 3).map((c) => `• ${c.title}\n  ${c.instructor} — ฿${c.price.toLocaleString()} · ${c.duration}`).join('\n')}`;
    } else {
      reply = 'มีคอร์สภาษาอังกฤษและภาษาเกาหลีครับ ดูเพิ่มเติมที่ /courses?category=language';
    }
    suggestions = ['คอร์ส TOEIC', 'คอร์สราคาถูก'];

  } else if (matchAny(text, BIZ_TRIGGERS)) {
    const courses = coursesByCategory('business').concat(coursesByCategory('marketing'));
    const unique = [...new Map(courses.map((c) => [c.id, c])).values()];
    if (unique.length) {
      reply = `คอร์สด้านธุรกิจ & การตลาดครับ:\n${unique.slice(0, 3).map((c) => `• ${c.title}\n  ${c.instructor} — ฿${c.price.toLocaleString()}`).join('\n')}`;
    } else {
      reply = 'มีคอร์ส Design Thinking และ Marketing ครับ ดูได้ที่ /courses?category=business';
    }
    suggestions = ['คอร์สแนะนำ', 'วิธีเริ่มเรียน'];

  } else if (matchAny(text, HEALTH_TRIGGERS)) {
    const courses = coursesByCategory('health').concat(coursesByCategory('wellness'));
    const unique = [...new Map(courses.map((c) => [c.id, c])).values()];
    if (unique.length) {
      reply = `คอร์สด้านสุขภาพครับ:\n${unique.slice(0, 3).map((c) => `• ${c.title} — ฿${c.price.toLocaleString()}`).join('\n')}`;
    } else {
      reply = 'กำลังเพิ่มคอร์สสุขภาพเพิ่มเติมครับ ดูได้ที่ /courses?category=health';
    }
    suggestions = ['คอร์สอื่น ๆ', 'คอร์สแนะนำ'];

  } else {
    const matched = ALL_COURSES.filter((c) =>
      c.title.toLowerCase().includes(text) ||
      c.category.toLowerCase().includes(text) ||
      (c.tags ?? []).some((t) => t.toLowerCase().includes(text))
    );
    if (matched.length) {
      reply = `พบคอร์สที่เกี่ยวข้องครับ:\n${matched.slice(0, 3).map((c) => `• ${c.title}\n  ฿${c.price.toLocaleString()} · ${c.rating}★ · ${c.lessons} บทเรียน`).join('\n')}`;
      suggestions = ['รายละเอียดเพิ่มเติม', 'คอร์สแนะนำ'];
    } else {
      reply = 'ขออภัยครับ ยังไม่เข้าใจคำถาม ลองถามเรื่องเหล่านี้ได้เลยครับ:';
      suggestions = ['คอร์สมีอะไรบ้าง', 'คอร์สราคาถูก', 'วิธีเริ่มเรียน', 'คอร์สแนะนำ'];
    }
  }

  return NextResponse.json({ reply, suggestions });
}
