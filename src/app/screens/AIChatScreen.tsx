import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Mic, Sparkles, User } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hi! I'm your AI study assistant. I can help you understand concepts, answer questions, or quiz you on your materials. What would you like to learn about?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Explain encryption",
    "Summarize lecture 5",
    "Quiz me on algorithms",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Great question! Based on your study materials, encryption is the process of converting plaintext into ciphertext using algorithms and keys. The two main types are symmetric (same key for encryption/decryption) and asymmetric (public/private key pairs). Would you like me to explain either type in more detail?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="h-screen bg-[#0F0F14] flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 border-b border-white/10 bg-[#0F0F14]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5F33E1] to-[#8B5CF6] rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Tutor</h1>
            <p className="text-[#B8B8C7] text-sm">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                message.role === "ai"
                  ? "bg-gradient-to-br from-[#5F33E1] to-[#8B5CF6]"
                  : "bg-[#232334]"
              }`}
            >
              {message.role === "ai" ? (
                <Sparkles className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] rounded-3xl px-5 py-4 ${
                message.role === "ai"
                  ? "bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10"
                  : "bg-[#5F33E1]"
              }`}
            >
              <p className="text-white text-sm leading-relaxed">{message.content}</p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-4"
        >
          <p className="text-[#B8B8C7] text-sm mb-3">Try asking:</p>
          <div className="flex gap-2 flex-wrap">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className="bg-[#232334] hover:bg-[#2A2A3C] border border-white/10 text-[#B8B8C7] px-4 py-2 rounded-xl text-sm transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="px-6 pb-24 pt-4 border-t border-white/10 bg-[#0F0F14]">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="w-full bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 pr-12 text-white placeholder:text-[#B8B8C7]/50 focus:outline-none focus:ring-2 focus:ring-[#5F33E1] transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#B8B8C7] hover:text-white transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="bg-[#5F33E1] hover:bg-[#7047E8] p-4 rounded-2xl transition-all shadow-lg shadow-[#5F33E1]/30"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
