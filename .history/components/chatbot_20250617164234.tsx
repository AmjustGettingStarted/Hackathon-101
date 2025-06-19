import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, HelpCircle, Phone, Minimize2, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'faq' | 'support' | 'ai';
}

type ChatMode = 'welcome' | 'faq' | 'support' | 'ai';

const FAQ_RESPONSES = {
  'financing': 'We offer various financing options including bank loans, in-house financing, and lease-to-own programs. Our finance team can help you find the best rates based on your credit score and budget.',
  'warranty': 'All our vehicles come with a comprehensive warranty. Used cars include a 30-day guarantee, and we offer extended warranty options up to 5 years for additional peace of mind.',
  'inspection': 'Every vehicle undergoes a rigorous 150-point inspection covering engine, transmission, brakes, electrical systems, and safety features. We provide a detailed inspection report with each car.',
  'trade-in': 'Yes! We accept trade-ins. Bring your vehicle for a quick evaluation and get an instant offer toward your next purchase.'
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ChatMode>('welcome');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setMode('welcome');
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string, sender: 'user' | 'bot', type?: Message['type']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    sendMessage(userText, 'user');
    setInput('');

    if (mode === 'faq') {
      const key = Object.keys(FAQ_RESPONSES).find(k => userText.toLowerCase().includes(k));
      const reply = key ? FAQ_RESPONSES[key as keyof typeof FAQ_RESPONSES] : "Sorry, I couldn't understand that FAQ topic.";
      sendMessage(reply, 'bot', 'faq');
    } else if (mode === 'support') {
      sendMessage('A support agent will contact you shortly. Please leave your name and contact info.', 'bot', 'support');
    } else if (mode === 'ai') {
      sendMessage(`(AI) I received: "${userText}". AI-generated response will appear here.`, 'bot', 'ai');
    }
  };

  return (
    <div>
      {isOpen ? (
        <div className="fixed bottom-4 right-4 w-96 h-[540px] bg-white shadow-2xl border rounded-2xl flex flex-col z-50">
          <div className="bg-black text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" /> <span className="font-bold text-sm">AI x Car Assistant</span>
            </div>
            <X className="cursor-pointer w-5 h-5" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex justify-around bg-gray-100 py-2">
            <button onClick={() => setMode('faq')} className="text-sm hover:underline flex items-center gap-1"><HelpCircle className="w-4 h-4" />FAQ</button>
            <button onClick={() => setMode('support')} className="text-sm hover:underline flex items-center gap-1"><Phone className="w-4 h-4" />Support</button>
            <button onClick={() => setMode('ai')} className="text-sm hover:underline flex items-center gap-1"><Bot className="w-4 h-4" />AI Chat</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {messages.map(msg => (
              <div key={msg.id} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg text-sm max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-2 border-t flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg text-sm"
            />
            <Send className="w-5 h-5 ml-2 text-blue-500 cursor-pointer" onClick={handleSend} />
          </div>
        </div>
      ) : (
        <button
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
