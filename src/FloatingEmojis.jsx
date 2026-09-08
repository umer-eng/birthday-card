import React from "react";
import "./FloatingEmojis.css";

const EMOJIS = ["💙", "✨", "🎈", "💗", "💖", "💫", "🎁", "🎉"];

export default function FloatingEmojis() {
  // 20 Floating items continuous float ke liye
  const items = Array.from({ length: 20 });

  return (
    <div className="floating-container">
      {items.map((_, index) => {
        const emoji = EMOJIS[index % EMOJIS.length];
        const leftPos = Math.floor(Math.random() * 90) + 5; // 5% - 95% width
        const duration = Math.floor(Math.random() * 4) + 5; // 5s - 9s speed
        const delay = (Math.random() * 5).toFixed(1); // random start delay

        return (
          <span
            key={index}
            className="floating-item"
            style={{
              left: `${leftPos}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}