import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, ShoppingCart, Info, Percent, AlertCircle } from "lucide-react";
import { Product, CartItem } from "../types";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface AiChatbotProps {
  currentPage: string;
  currentProduct?: Product;
  cartItems: CartItem[];
  onViewChange: (view: string, param?: any) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onApplyCoupon: (code: string) => void;
}

export default function AiChatbot({
  currentPage,
  currentProduct,
  cartItems,
  onViewChange,
  onAddToCart,
  onApplyCoupon,
}: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "model",
          text: "Welcome to Zentrova! 🌟 I'm **Zene**, your premium personal AI stylist and shopping guide. I can help you search our premium catalog, find size/specification fits, compare brands, and unlock active discount campaigns. \n\nWhat can I help you discover today?"
        }
      ]);
    }
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Open chatbot with initial focus/flicker indicator
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userText = userInput;
    setUserInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const cartSummary = cartItems.map((item) => ({
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-10), // Pass recent conversation context
          currentPage,
          currentProduct: currentProduct ? { id: currentProduct.id, title: currentProduct.title, price: currentProduct.price } : undefined,
          cartSummary,
        }),
      });

      if (!res.ok) throw new Error("AI Engine request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.response }]);
    } catch (error) {
      console.error("Chatbot transmission error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I experienced a brief transmission interruption with our server core. However, I can still recommend you browse our **Electronics** or **Lifestyle** collections which are currently running a **SOLSTICE40** (40% discount) campaign!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Safe client-side Custom Renderer to parse standard Markdown-like structures (*bold*, **headers**, bullet lists) safely without dependencies
  const renderMessageContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      let trimmed = line.trim();
      let elements: React.ReactNode = line;

      // Handle bullet lists: "- text" or "* text"
      const listMatch = line.match(/^(\*|-)\s+(.*)$/);
      if (listMatch) {
        trimmed = listMatch[2];
        elements = <li className="ml-4 list-disc pl-1 text-[13.5px] leading-relaxed mb-1">{parseBoldAndCodes(trimmed)}</li>;
        return <div key={i}>{elements}</div>;
      }

      // Handle normal paragraphs
      return (
        <p key={i} className="text-[13.5px] leading-relaxed mb-2.5 break-words">
          {parseBoldAndCodes(line)}
        </p>
      );
    });
  };

  const parseBoldAndCodes = (str: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let currentText = str;

    // Direct matcher for double esterisks (**text**)
    const regex = /(\*\*|`)(.*?)\1/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(str)) !== null) {
      // Push preceding normal strings
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }

      // Parse current match with styling
      const type = match[1];
      const matchText = match[2];

      if (type === "**") {
        parts.push(<strong key={match.index} className="font-semibold text-slate-900">{matchText}</strong>);
      } else if (type === "`") {
        parts.push(
          <code key={match.index} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-red-650 rounded font-mono text-xs">
            {matchText}
          </code>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    // Fallback if no markdown blocks
    return parts.length > 0 ? parts : [str];
  };

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Icon */}
      {!isOpen && (
        <button
          id="chatbot-floating-toggle"
          onClick={() => {
            setIsOpen(true);
            setHasNewMessage(false);
          }}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-300 hover:bg-blue-500 hover:scale-105 transition-all outline-none"
        >
          <MessageSquare className="w-6 h-6 z-10" />
          <span className="absolute inset-0 rounded-full bg-blue-500 scale-100 group-hover:scale-110 opacity-70 animate-ping"></span>
          
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
            </span>
          )}

          <div className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Chat with AI Stylist
          </div>
        </button>
      )}

      {/* Main Expandable Chataroo Window */}
      {isOpen && (
        <div id="chatbot-frame" className="w-[calc(100vw-48px)] sm:w-[400px] h-[min(550px,calc(100vh-100px))] max-h-[550px] bg-white rounded-3xl border border-slate-100 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-sm leading-none flex items-center gap-1.5">
                  Zene AI Core <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </span>
                <span className="text-[10px] text-blue-200 mt-0.5">Zentrova Premium Stylist</span>
              </div>
            </div>
            <button 
              id="chatbot-close-btn"
              onClick={() => setIsOpen(false)} 
              className="p-1.5 rounded-full hover:bg-white/25 text-white/95 hover:text-white transition-all cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive contextual banner */}
          <div className="bg-blue-50 border-b border-blue-100/60 p-2.5 flex items-start gap-2 text-xs">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-slate-600 leading-normal">
              {currentProduct ? (
                <span>Currently advising on <strong>{currentProduct.title}</strong> page. Ask about specifications or size recommendations.</span>
              ) : currentPage === "cart" && cartItems.length > 0 ? (
                <span>Reviewing your active Cart. Do you need details on our <strong>SOLSTICE40</strong> coupon code?</span>
              ) : (
                <span>Synthesizing smart trends. Ask &ldquo;Are there any coupons active?&rdquo; to test AI integration.</span>
              )}
            </div>
          </div>

          {/* Message log wrapper */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m, index) => (
              <div key={index} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                }`}>
                  {renderMessageContent(m.text)}
                  
                  {/* Dynamic CTA trigger injects if matching criteria appears in the response */}
                  {m.role === "model" && m.text.includes("SOLSTICE40") && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10.5px] text-slate-500 font-medium flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 text-amber-500" /> Coupon Available
                      </span>
                      <button 
                        onClick={() => {
                          onApplyCoupon("SOLSTICE40");
                          alert("Coupon SOLSTICE40 applied! Enjoy 40% off eligible items.");
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold transition-all shadow-sm flex items-center gap-1"
                      >
                        Claim 40% Off
                      </button>
                    </div>
                  )}

                  {m.role === "model" && m.text.includes("Aethera") && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end gap-2">
                      <button 
                        onClick={() => onViewChange("product", "elec-1")}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-semibold transition-all"
                      >
                        View Headphones
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-3xl px-4 py-3.5 border border-slate-100 rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef}></div>
          </div>

          {/* User Input bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              id="chatbot-user-input"
              type="text"
              placeholder="Ask about materials, orders, or coupons..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow py-2 px-3 text-sm bg-slate-50 outline-none border border-slate-200/60 focus:border-blue-500 rounded-xl transition-all"
            />
            <button 
              type="submit" 
              className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all active:scale-95"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
