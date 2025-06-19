import './globals.css';
import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('@/components/chatbot'), { ssr: false });

export const metadata = {
  title: 'AI Car Marketplace',
  description: 'Explore futuristic car models with AI assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
