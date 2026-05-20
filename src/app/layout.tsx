import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google';
import ChatbotWidget from '@/components/features/chatbot/ChatbotWidget';
import './globals.css';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Pannya — เรียนรู้ทักษะใหม่จากผู้เชี่ยวชาญตัวจริง', template: '%s | Pannya.' },
  description: 'กว่า 1,200 คอร์สออนไลน์ ครอบคลุมธุรกิจ การลงทุน เทคโนโลยี ภาษา และสุขภาพ — เรียนเมื่อสะดวก ทบทวนได้ตลอดชีพ',
  keywords: ['คอร์สออนไลน์', 'เรียนออนไลน์', 'LMS', 'e-learning', 'Pannya'],
  openGraph: {
    title: 'Pannya — เรียนรู้ทักษะใหม่จากผู้เชี่ยวชาญตัวจริง',
    description: 'กว่า 1,200 คอร์สออนไลน์ สอนโดยผู้เชี่ยวชาญตัวจริง',
    locale: 'th_TH',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      className={`${ibmPlexSansThai.variable} ${ibmPlexSerif.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
