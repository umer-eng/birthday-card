import React, { useState } from "react";
import "./App.css";

// Aap ke naye 5 questions
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
  const [screen, setScreen] = useState("quiz"); // States: 'quiz', 'pre-final', 'final'
  
  // Quiz States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentQuestion = quizData[currentQuestionIndex];

  // Option select handler
  const handleOptionSelect = (option, idx) => {
    setSelectedOption(idx);
    if (option.correct) {
      setIsCorrect(true);
      setErrorMessage("");
    } else {
      setIsCorrect(false);
      setErrorMessage("Oops! Sahi answer choose karo aage badhne ke liye! 😜");
    }
  };

  // Next question handler
  const handleNextQuestion = () => {
    if (!isCorrect) return; // Galat jawab par aage nahi jane dega

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
    else if (screen === "pre-final") setScreen("quiz");
  };

  return (
    <div className="app-container">
      
      {/* ================= QUIZ SCREEN ================= */}
      {screen === "quiz" && (
        <section className="quiz-screen">
          <p className="question-count">
            ❤️ Question {currentQuestionIndex + 1} of {quizData.length}
          </p>

          <h1 className="quiz-title">{currentQuestion.question}</h1>
          <p className="quiz-subtitle">Choose the answer you think is correct! ✨</p>

          <div className="options-container">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "option-btn";
              if (selectedOption === idx) {
                btnClass += option.correct ? " correct" : " wrong";
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleOptionSelect(option, idx)}
                >
                  {option.text}
                  {selectedOption === idx && option.correct && " ✓ Correct"}
                </button>
              );
            })}
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={!isCorrect}
          >
            Next Question →
          </button>
        </section>
      )}

      {/* ================= PRE-FINAL SCREEN ================= */}
      {screen === "pre-final" && (
        <section className="pre-final-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="special-card">
            <h2>You Made It! 🎉</h2>
            <img src="/special-photo.jpg" alt="Special Memory" className="special-img" />
            <p>Ready for the main surprise?</p>
            <button className="final-btn" onClick={() => setScreen("final")}>
              See Final Surprise ❤️
            </button>
          </div>
        </section>
      )}

      {/* ================= FINAL SURPRISE (ANIMATION & VIDEO) ================= */}
      {screen === "final" && (
        <section className="final-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>

          <div className="final-card">
            <h1 className="forever-title">You Are My Forever ❤️</h1>

            <div className="final-video-wrapper">
              <video className="final-video" controls playsInline preload="auto">
                <source src="/birthday-video.mp4" type="video/mp4" />
                Your browser does not support the video.
              </video>
            </div>

            <p className="final-message">
              Some memories are simply too special to be forgotten. 💙
            </p>

            <div className="final-hearts">💙 💙 💙</div>
          </div>
        </section>
      )}

    </div>
  );
}

export default App;