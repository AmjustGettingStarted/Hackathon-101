'use client';

import dynamic from 'next/dynamic';

// Lazy load the chatbot
const ChatBot = dynamic(() => import('@/components/chatbot'), { ssr: false });

export default function ChatBotWrapper() {
  return <ChatBot />;
}
