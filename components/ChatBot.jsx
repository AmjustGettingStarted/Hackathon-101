import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, HelpCircle, Phone, Minimize2, User, MessagesSquareIcon, Plus } from 'lucide-react';

const FAQ_RESPONSES = {
  'financing': 'We offer various financing options including bank loans, in-house financing, and lease-to-own programs. Our finance team can help you find the best rates based on your credit score and budget.',
  'warranty': 'All our vehicles come with a comprehensive warranty. Used cars include a 30-day guarantee, and we offer extended warranty options up to 5 years for additional peace of mind.',
  'inspection': 'Every vehicle undergoes a rigorous 150-point inspection covering engine, transmission, brakes, electrical systems, and safety features. We provide a detailed inspection report with each car.',
  'trade-in': 'Yes! We accept trade-ins and offer competitive values. You can get an instant quote online or visit our showroom for a professional appraisal. Trade-in value can be applied toward your purchase.',
  'delivery': 'We offer free delivery within 50 miles and affordable shipping nationwide. Most local deliveries can be scheduled within 2-3 business days.',
  'test-drive': 'Absolutely! We encourage test drives. You can schedule one online or walk in during business hours. Just bring a valid driver\'s license and proof of insurance.'
};

const FAQ_QUESTIONS = [
  { key: 'financing', label: 'Financing Options' },
  { key: 'warranty', label: 'Warranty Information' },
  { key: 'inspection', label: 'Vehicle Inspection' },
  { key: 'trade-in', label: 'Trade-In Process' },
  { key: 'delivery', label: 'Delivery Options' },
  { key: 'test-drive', label: 'Test Drive Booking' }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatMode, setChatMode] = useState('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, sender, type) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleWelcomeChoice = (mode) => {
    setChatMode(mode);
    
    if (mode === 'faq') {
      simulateTyping(() => {
        addMessage("I can help you with frequently asked questions. Choose a topic below or type your question:", 'bot', 'faq');
      });
    } else if (mode === 'support') {
      simulateTyping(() => {
        addMessage("I'm here to help with any concerns. You can also reach our support team at (555) 123-4567 or support@carmarketplace.com", 'bot', 'support');
      });
    } else if (mode === 'ai') {
      simulateTyping(() => {
        addMessage("I'm your AI assistant! I can help you find the perfect car, compare models, or answer specific questions about our inventory.", 'bot', 'ai');
      });
    }
  };

  const handleFAQClick = (key) => {
    const question = FAQ_QUESTIONS.find(q => q.key === key);
    if (question) {
      addMessage(question.label, 'user');
      simulateTyping(() => {
        addMessage(FAQ_RESPONSES[key], 'bot', 'faq');
      });
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(inputText, 'user');
    const userMessage = inputText.toLowerCase();
    setInputText('');

    // Simple response logic based on mode and keywords
    simulateTyping(() => {
      if (chatMode === 'ai') {
        if (userMessage.includes('recommend') || userMessage.includes('suggest')) {
          addMessage("Based on your preferences, I'd recommend checking out our SUV section. We have excellent Honda CR-Vs and Toyota RAV4s in stock. Would you like me to show you specific models?", 'bot', 'ai');
        } else if (userMessage.includes('price') || userMessage.includes('cost')) {
          addMessage("Our prices are competitive and include all fees upfront. Most of our vehicles are priced 10-15% below market value. Would you like information about financing options?", 'bot', 'ai');
        } else {
          addMessage("I understand your question. Let me connect you with a specialist who can provide detailed information. Would you like me to schedule a callback?", 'bot', 'ai');
        }
      } else if (chatMode === 'support') {
        addMessage("Thank you for contacting support. I've noted your inquiry and our team will respond within 2 hours. Is there anything else I can help you with?", 'bot', 'support');
      } else {
        addMessage("I can help you find the right information. Try selecting from our FAQ topics or switch to AI Assistant for more personalized help.", 'bot');
      }
    });
  };

  const resetChat = () => {
    setMessages([]);
    setChatMode('welcome');
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      simulateTyping(() => {
        addMessage("Welcome to CarMarketplace! How can I help you today?", 'bot');
      }, 500);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`mb-4 bg-white rounded-md shadow-2xl transition-all duration-300 ${
            isMinimized ? "w-80 h-14 " : "w-96 h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-md p-4 bg-[#27251F] text-white">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">Karmart Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-white hover:text-black rounded transition-colors cursor-pointer"
              >
                <Minimize2 size={20} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:text-black rounded transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-90 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex  items-start ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-[#27251F] text-white rounded-br-sm"
                          : "bg-red-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}

                {/* Welcome Mode Buttons */}
                {chatMode === "welcome" && messages.length > 0 && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleWelcomeChoice("faq")}
                      className="w-full cursor-pointer flex items-center space-x-2 p-3 bg-blue-100 hover:bg-blue-200 rounded-sm transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        FAQ & Common Questions
                      </span>
                    </button>
                    <button
                      onClick={() => handleWelcomeChoice("support")}
                      className="w-full flex cursor-pointer items-center space-x-2 p-3 bg-green-100 hover:bg-green-200 rounded-sm transition-colors"
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Customer Support
                      </span>
                    </button>
                    <button
                      onClick={() => handleWelcomeChoice("ai")}
                      className="w-full  cursor-pointer flex items-center space-x-2 p-3 bg-purple-100 hover:bg-purple-200 rounded-sm transition-colors"
                    >
                      <Bot className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">
                        AI Assistant
                      </span>
                    </button>
                  </div>
                )}

                {/* FAQ Quick Buttons */}
                {chatMode === "faq" && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {FAQ_QUESTIONS.map((faq) => (
                      <button
                        key={faq.key}
                        onClick={() => handleFAQClick(faq.key)}
                        className="p-2 cursor-pointer text-xs bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-sm transition-colors"
                      >
                        {faq.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#27251F] rounded-2xl rounded-bl-sm px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-2 pt-4 border-t border-slate-200 bg-slate-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border bg-white border-gray-300 rounded-sm focus:ring-2 focus:ring-slate-500/50 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-black hover:bg-white text-white hover:text-black rounded-full transition-colors duration-500 ease-in-out"
                  >
                    <Send size={20} />
                  </button>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={resetChat}
                    className=" flex gap-2 items-center cursor-pointer text-black hover:text-slate-700 ml-2 py-2 text-sm"
                  >
                    <Plus
                      size={15}
                      className="bg-black text-white rounded-full"
                    />
                    Start new conversation
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={toggleOpen}
        className={`w-12 h-12 bg-[#0C0404] border-1 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-0" : "hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X size={25} className="cursor-pointer" />
        ) : (
          <MessagesSquareIcon size={25} className="cursor-pointer" />
        )}
      </button>
    </div>
  );
}