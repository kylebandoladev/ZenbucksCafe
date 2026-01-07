// components/Chatbot.tsx
import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onRecommendation?: (category: string, items: string[]) => void;
}

const Chatbot = ({ onRecommendation }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi! I'm your personal coffee assistant. How are you feeling today? I can recommend beverages, foods, desserts, and snacks based on your mood or the weather!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Sample recommendations based on mood and weather
  const getRecommendations = (query: string) => {
    const lowerQuery = query.toLowerCase();

    // Mood-based recommendations
    if (
      lowerQuery.includes("tired") ||
      lowerQuery.includes("exhausted") ||
      lowerQuery.includes("energy")
    ) {
      return {
        category: "Energy Boost",
        items: [
          "Espresso",
          "Americano",
          "Cold Brew",
          "Energy Smoothie",
          "Protein Bar",
        ],
      };
    }

    if (
      lowerQuery.includes("happy") ||
      lowerQuery.includes("celebrating") ||
      lowerQuery.includes("excited")
    ) {
      return {
        category: "Celebration Treats",
        items: [
          "Cappuccino",
          "Mocha",
          "Chocolate Croissant",
          "Cheesecake",
          "Chocolate Chip Cookie",
        ],
      };
    }

    if (
      lowerQuery.includes("sad") ||
      lowerQuery.includes("down") ||
      lowerQuery.includes("comfort")
    ) {
      return {
        category: "Comfort Foods",
        items: [
          "Hot Chocolate",
          "Latte",
          "Warm Croissant",
          "Chocolate Cake",
          "Warm Cookie",
        ],
      };
    }

    if (
      lowerQuery.includes("stressed") ||
      lowerQuery.includes("anxious") ||
      lowerQuery.includes("calm")
    ) {
      return {
        category: "Relaxing Options",
        items: [
          "Herbal Tea",
          "Decaf Coffee",
          "Green Smoothie",
          "Fruit Bowl",
          "Yogurt Parfait",
        ],
      };
    }

    // Weather-based recommendations
    if (
      lowerQuery.includes("hot") ||
      lowerQuery.includes("sunny") ||
      lowerQuery.includes("summer")
    ) {
      return {
        category: "Refreshing Options",
        items: [
          "Iced Coffee",
          "Cold Brew",
          "Fruit Smoothie",
          "Iced Tea",
          "Frozen Yogurt",
        ],
      };
    }

    if (
      lowerQuery.includes("cold") ||
      lowerQuery.includes("winter") ||
      lowerQuery.includes("rainy")
    ) {
      return {
        category: "Warming Options",
        items: [
          "Hot Coffee",
          "Hot Chocolate",
          "Warm Soup",
          "Hot Sandwich",
          "Warm Pastry",
        ],
      };
    }

    // Default recommendations
    return {
      category: "Popular Items",
      items: [
        "Cappuccino",
        "Latte",
        "Croissant",
        "Fresh Juice",
        "Chocolate Chip Cookie",
      ],
    };
  };

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      text,
      isBot,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage(response, true);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    addMessage(inputText, false);

    // Get recommendations
    const recommendations = getRecommendations(inputText);

    // Simulate bot response
    const response = `Based on what you've told me, I recommend these ${recommendations.category.toLowerCase()}:\n\n${recommendations.items
      .map((item) => `• ${item}`)
      .join("\n")}\n\nWould you like to know more about any of these items?`;

    simulateTyping(response);

    // Call recommendation callback if provided
    if (onRecommendation) {
      onRecommendation(recommendations.category, recommendations.items);
    }

    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    "I'm feeling tired",
    "It's a hot day",
    "I need comfort food",
    "I'm celebrating",
    "It's cold outside",
    "I'm stressed",
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 cursor-pointer"
        >
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">Zenbot</h3>
              <p className="text-xs text-gray-300">How can I help you today?</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors z-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
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

          {/* Quick Suggestions */}
          <div className="p-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(suggestion)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input - Messenger style */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 placeholder:text-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
