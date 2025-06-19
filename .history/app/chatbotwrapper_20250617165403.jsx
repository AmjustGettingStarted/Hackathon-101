'use client';

import dynamic from 'next/dynamic';

// Dynamically import chatbot without SSR
const ChatBot = dynamic(() => import('@/components/hatbot'), { ssr: false });

export default function ChatBotWrapper() {
  return <ChatBot />;
}
