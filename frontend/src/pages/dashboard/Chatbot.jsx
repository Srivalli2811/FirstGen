import { useEffect, useRef, useState } from "react";
import api from "../../utils/api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    api
      .get("/chat/history")
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const text = input.trim();

    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat/send", {
        message: text,
      });

      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err.response?.data?.reply ||
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "Find scholarships for CSE students",
    "How can I improve my resume?",
    "Interview preparation tips",
    "How should I prepare for placements?"
  ];

  return (
    <div className="chat-page">

      <div className="chat-header card">

        <div>

          <h2 className="card-title">
            🤖 FirstGen AI Mentor
          </h2>

          <p className="card-subtitle">
            Ask about academics, placements,
            scholarships, resumes and careers.
          </p>

        </div>

      </div>

      <div className="chat-window">

        {messages.length === 0 && (

          <div className="chat-empty">

            <div className="chat-logo">
              🤖
            </div>

            <h2>
              Welcome to FirstGen AI
            </h2>

            <p>
              Ask me anything and I'll help you
              throughout your academic journey.
            </p>

            <div className="chat-suggestions">

              {suggestions.map((item) => (

                <button
                  key={item}
                  className="suggestion-btn"
                  onClick={() => setInput(item)}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.role === "user"
                ? "message-row user"
                : "message-row assistant"
            }
          >

            {msg.role === "assistant" && (
              <div className="message-avatar">
                🤖
              </div>
            )}

            <div
              className={
                msg.role === "user"
                  ? "message user-message"
                  : "message ai-message"
              }
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="message-avatar user-avatar-chat">
                👤
              </div>
            )}

          </div>

        ))}

        {loading && (

          <div className="message-row assistant">

            <div className="message-avatar">
              🤖
            </div>

            <div className="typing-indicator">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>

      <div className="chat-input-area">

        <textarea
          className="chat-input"
          rows={2}
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="chat-send-btn"
          disabled={loading || !input.trim()}
          onClick={sendMessage}
        >
          ➜
        </button>

      </div>

    </div>
  );
}

export default Chatbot;