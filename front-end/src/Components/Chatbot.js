import { useState, useRef, useEffect } from "react";
import "../Css/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // 🔥 control open/close
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 Welcome to BookMyShow Assistant!",
    },
    {
      sender: "bot",
      text: "You can ask about booking, seats, movie, time, price, cancellation and more.",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const knowledgeBase = [
    { keywords: ["hello", "hi", "hey"], answer: "Hello 👋 How can I assist you today?" },
    {
      keywords: ["how", "book", "help"],
      answer: `🎟️ Booking Steps:
1️⃣ Select a Movie
2️⃣ Choose a Time Slot
3️⃣ Select Seats
4️⃣ Click 'Book Now'
Your booking details will appear in right side box.`
    },
    { keywords: ["movie"], answer: "You can select movies from the top section like Tenet, Fast X, Captain America etc." },
    { keywords: ["time", "slot"], answer: "Available time slots: 10:00 AM, 01:00 PM, 03:00 PM, 08:00 PM ⏰" },
    { keywords: ["seat"], answer: "Seats available: A1, A2, A3, A4, D1, D2." },
    { keywords: ["price"], answer: "Ticket pricing depends on seat category 💰" },
    { keywords: ["cancel"], answer: "Cancellation feature is not enabled yet." },
    { keywords: ["status", "booking"], answer: "Your last booking is shown in the right-side box." },
    { keywords: ["thank"], answer: "You're welcome 😊 Enjoy your movie!" },
  ];

  const generateReply = (userText) => {
    const text = userText.toLowerCase();
    for (let item of knowledgeBase) {
      if (item.keywords.some(keyword => text.includes(keyword))) {
        return item.answer;
      }
    }
    return "Sorry 🤖 I couldn't understand. Try asking about booking, movie, seat, time etc.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botReply = { sender: "bot", text: generateReply(input) };

    setMessages(prev => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-box">
          <div className="chat-header">
            <div className="bot-icon">🎬</div>
            <span>Movie Booking Assistant</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;