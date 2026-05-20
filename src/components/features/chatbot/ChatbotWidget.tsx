'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  suggestions?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'bot',
    text: 'สวัสดีครับ! ผมคือ Panya ผู้ช่วยด้านคอร์สเรียน\nถามเรื่องคอร์ส ราคา หรือวิธีเริ่มเรียนได้เลยครับ',
    suggestions: ['คอร์สมีอะไรบ้าง', 'คอร์สราคาถูก', 'คอร์สแนะนำ', 'วิธีเริ่มเรียน'],
  },
];

function RobotIcon({ size = 24, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 12h.01M15 12h.01" strokeWidth={2.5} />
      <path d="M9 16h6" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1" fill={color} stroke="none" />
      <path d="M3 13h-1a1 1 0 000 2h1M21 13h1a1 1 0 010 2h-1" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-2 h-2 rounded-full bg-ink-4 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'bot', text: data.reply, suggestions: data.suggestions }]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'ขออภัยครับ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div className="w-[340px] bg-white rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden"
          style={{ height: 480, animation: 'chatSlideUp 0.2s ease' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-coral">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <RobotIcon size={18} color="#fff" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold leading-none">Panya Assistant</p>
              <p className="text-white/70 text-xs mt-0.5">ผู้ช่วยด้านคอร์สเรียน</p>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-white text-xs">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-paper">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-coral shrink-0 mt-0.5 flex items-center justify-center">
                      <RobotIcon size={14} color="#fff" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-coral text-white rounded-br-sm'
                      : 'bg-white border border-line text-ink rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>

                {/* Suggestion chips */}
                {msg.role === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                    {msg.suggestions.map((s, si) => (
                      <button key={si} onClick={() => send(s)} disabled={loading}
                        className="text-xs px-2.5 py-1 rounded-full border border-coral text-coral hover:bg-coral hover:text-white transition-colors disabled:opacity-40">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-coral shrink-0 flex items-center justify-center">
                  <RobotIcon size={14} color="#fff" />
                </div>
                <div className="bg-white border border-line rounded-2xl rounded-bl-sm">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-line bg-white flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="พิมพ์คำถามได้เลย..."
              disabled={loading}
              className="flex-1 h-9 px-3 rounded-full border border-line text-sm focus:outline-none focus:border-coral bg-paper disabled:opacity-50"
            />
            <button onClick={() => send(input)} disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full bg-coral text-white flex items-center justify-center hover:bg-coral-dark transition-colors disabled:opacity-40 shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-coral shadow-lg hover:bg-coral-dark transition-all hover:scale-105 active:scale-95 flex items-center justify-center relative"
        aria-label="เปิด Chatbot"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <RobotIcon size={26} color="#fff" />
        )}

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-coral animate-ping opacity-30" />
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  );
}
