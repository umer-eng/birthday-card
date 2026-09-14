import React, { useState } from "react";
import "./App.css";

// Aapke 5 Quiz Questions
const quizData = [
  {
    id: 1,
    question: "How well do you know me? 👀",
    options: [
      { text: "💙 You know me really well", correct: true },
      { text: "😭 Maybe I need to give you hints", correct: false },
      { text: "😂 I'm just here for the fun", correct: false }
    ]
  },
  {
    id: 2,
    question: "Who is the most special person? 💖",
    options: [
      { text: "You! 💖", correct: true },
      { text: "Me 😎", correct: false },
      { text: "Everyone 🌍", correct: false }
    ]
  },
  {
    id: 3,
    question: "What makes you happiest? ✨",
    options: [
      { text: "Gifts 🎁", correct: false },
      { text: "Good Food 🍕", correct: false },
      { text: "Spending time together ✨", correct: true }
    ]
  },
  {
    id: 4,
    question: "What's our favorite thing to do? 💬",
    options: [
      { text: "Late night talks & gossip 🌙", correct: true },
      { text: "Studying hard all day 📚", correct: false },
      { text: "Fighting over small things 👊", correct: false }
    ]
  },
  {
    id: 5,
    question: "How special are you to me? 🌟",
    options: [
      { text: "Just a regular friend 🙃", correct: false },
      { text: "More than words can say! 💙✨", correct: true },
      { text: "A little bit special 🤏", correct: false }
    ]
  }
];

function App() {
  const [screen, setScreen] = useState("quiz");

  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentQuestion = quizData[currentQuestionIndex];

  // Option selection handler
  const handleOptionSelect = (option, idx) => {
    setSelectedOption(idx);

    if (option.correct) {
      setIsCorrect(true);
      setErrorMessage(""); 
    } else {
      setIsCorrect(false); 
      setErrorMessage("❌ Wrong answer! Try again to proceed.");
    }
  };

  // Next question handler
  const handleNextQuestion = () => {
    if (!isCorrect) return;

    setSelectedOption(null);
    setIsCorrect(false);
    setErrorMessage("");

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setScreen("pre-final");
    }
  };

  const goBack = () => {
    if (screen === "final") setScreen("pre-final");
    else if (screen === "pre-final") {
      setScreen("quiz");
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsCorrect(false);
      setErrorMessage("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100vw", boxSizing: "border-box", padding: "20px" }}>
      
      {/* ================= QUIZ SCREEN ================= */}
      {screen === "quiz" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "420px", padding: "25px", borderRadius: "20px", backgroundColor: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.12)", textAlign: "center" }}>
          <p style={{ color: "#ff4b72", fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
            ❤️ Question {currentQuestionIndex + 1} of {quizData.length}
          </p>

          <h1 style={{ fontSize: "22px", color: "#222", marginBottom: "8px", fontWeight: "bold" }}>{currentQuestion.question}</h1>
          <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
            Choose the answer you think is correct! ✨
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", marginBottom: "15px" }}>
            {currentQuestion.options.map((option, idx) => {
              let bg = "#f5f5f5";
              let border = "#e0e0e0";
              let color = "#333";

              if (selectedOption === idx) {
                if (option.correct) {
                  bg = "#28a745";
                  border = "#28a745";
                  color = "#ffffff";
                } else {
                  bg = "#ff4d4d";
                  border = "#ff4d4d";
                  color = "#ffffff";
                }
              }

              return (
                <button
                  key={idx}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: `2px solid ${border}`,
                    backgroundColor: bg,
                    color: color,
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%"
                  }}
                  onClick={() => handleOptionSelect(option, idx)}
                >
                  {option.text}
                  {selectedOption === idx &&
                    (option.correct ? " ✓ Correct!" : " ❌ Wrong")}
                </button>
              );
            })}
          </div>

          {errorMessage && <p style={{ color: "#ff4d4d", fontWeight: "bold", fontSize: "13px", marginBottom: "15px" }}>{errorMessage}</p>}

          <button
            onClick={handleNextQuestion}
            disabled={!isCorrect}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#ff4b72",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
              opacity: isCorrect ? 1 : 0.5,
              cursor: isCorrect ? "pointer" : "not-allowed"
            }}
          >
            Next Question →
          </button>
        </div>
      )}

      {/* ================= PRE-FINAL / LETTER SCREEN ================= */}
      {screen === "pre-final" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "420px", padding: "25px", borderRadius: "20px", backgroundColor: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.12)", textAlign: "center" }}>
          <h2 style={{ color: "#222", marginBottom: "15px" }}>You Made It! 🎉</h2>
          <img
            src="/special-photo.jpg"
            alt="Special Memory"
            style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "12px", marginBottom: "15px" }}
          />
          <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>Ready for the main surprise?</p>

          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <button onClick={goBack} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "#e0e0e0", color: "#333", fontWeight: "bold", fontSize: "13px" }}>
              ← Back to Quiz
            </button>
            <button onClick={() => setScreen("final")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "#ff4b72", color: "white", fontWeight: "bold", fontSize: "13px" }}>
              See Final Surprise ❤️
            </button>
          </div>
        </div>
      )}

      {/* ================= FINAL SURPRISE (ANIMATION & VIDEO) ================= */}
      {screen === "final" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "420px", padding: "25px", borderRadius: "20px", backgroundColor: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.12)", textAlign: "center" }}>
          <h1 style={{ color: "#ff4b72", fontSize: "20px", marginBottom: "15px", fontWeight: "bold" }}>You Are My Forever ❤️</h1>

          <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", marginBottom: "15px" }}>
            <video
              controls
              playsInline
              preload="auto"
              style={{ width: "100%", borderRadius: "12px", display: "block" }}
            >
              <source src="/birthday-video.mp4" type="video/mp4" />
              Your browser does not support the video.
            </video>
          </div>

          <p style={{ color: "#555", fontSize: "14px", marginBottom: "10px" }}>
            Some memories are simply too special to be forgotten. 💙
          </p>

          <div style={{ marginBottom: "15px" }}>💙 💙 💙</div>

          <button 
            onClick={() => setScreen("pre-final")} 
            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "#e0e0e0", color: "#333", fontWeight: "bold", fontSize: "13px" }}
          >
            ← Back to Letter
          </button>
        </div>
      )}
    </div>
  );
}

export default App;