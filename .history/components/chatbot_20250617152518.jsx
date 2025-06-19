"use client";
import React, { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your AI Car Assistant. Ask me anything." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = {
      from: "bot",
      text: `You said: "${input}" – I'm still learning!`
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "#111",
          color: "#fff",
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          fontSize: "24px",
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "96px",
            right: "24px",
            width: "320px",
            height: "400px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px", fontWeight: "bold", borderBottom: "1px solid #eee" }}>
            AI Car Assistant
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background: msg.from === "user" ? "#007bff" : "#eee",
                    color: msg.from === "user" ? "#fff" : "#000",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #eee", padding: "8px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
            <button onClick={handleSend} style={{ marginLeft: "8px", padding: "6px 12px" }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
