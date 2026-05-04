import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Halo! Ada yang bisa saya bantu terkait MicroInfluencer Hub?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })), {
          role: 'user',
          parts: [{ text: userMessage }]
        }],
        config: {
          systemInstruction: "Anda adalah asisten AI untuk MicroInfluencer Hub, marketplace influencer kuliner di Indonesia. Bantu UMKM menemukan influencer dan bantu influencer memahami platform. Gunakan bahasa Indonesia yang ramah dan profesional. Fokus pada kuliner, analitik TikTok/Instagram, dan kolaborasi brand.",
        },
      });

      const botResponse = response.text || "Maaf, saya sedang mengalami kendala teknis. Bisa ulangi lagi?";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Maaf, sepertinya ada masalah koneksi. Silakan coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-400 text-brand-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-[30px] shadow-2xl flex flex-col border border-brand-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-900 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-brand-400 p-2 rounded-xl">
                  <Bot size={20} className="text-brand-900" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Asisten Hub</h3>
                  <p className="text-brand-300 text-xs">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`mt-1 p-1 rounded-lg shrink-0 ${m.role === 'user' ? 'bg-brand-100' : 'bg-brand-400/20'}`}>
                      {m.role === 'user' ? <User size={16} className="text-brand-600" /> : <Bot size={16} className="text-brand-500" />}
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-brand-900 text-white rounded-tr-none'
                          : 'bg-brand-50 text-brand-900 rounded-tl-none'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-brand-50 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-500" />
                    <span className="text-xs text-brand-500 font-medium">Sedang mengetik...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-brand-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-brand-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-brand-900 text-white p-3 rounded-xl hover:bg-brand-800 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
