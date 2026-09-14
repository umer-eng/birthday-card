import React, { useState } from "react";
import "./App.css";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentQuestion = quizData[currentQuestionIndex];

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

  const handleBackToQuiz = () => {
    setScreen("quiz");
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(false);
    setErrorMessage("");
  };

  return (
    <div className="app-container">
      {/* QUIZ SCREEN */}
      {screen === "quiz" && (
        <div className="quiz-card">
          <p className="question-count">
            ❤️ Question {currentQuestionIndex + 1} of {quizData.length}
          </p>

          <h1 className="quiz-title">{currentQuestion.question}</h1>
          <p className="quiz-subtitle">
            Choose the answer you think is correct! ✨
          </p>

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
        </div>
      )}

      {/* PRE-FINAL / LETTER SCREEN */}
      {screen === "pre-final" && (
        <div className="pre-final-card">
          <h2 className="quiz-title">You Made It! 🎉</h2>
          <img
            src="/special-photo.jpg"
            alt="Special Memory"
            className="special-img"
          />
          <p className="quiz-subtitle">Ready for the main surprise?</p>

          <div className="button-group">
            <button className="back-btn" onClick={handleBackToQuiz}>
              ← Back to Quiz
            </button>
            <button
              className="next-button"
              onClick={() => setScreen("final")}
            >
              See Final Surprise ❤️
            </button>
          </div>
        </div>
      )}

      {/* FINAL SURPRISE SCREEN */}
      {screen === "final" && (
        <div className="final-card">
          <h1 className="quiz-title" style={{ color: "#ff4b72" }}>
            You Are My Forever ❤️
          </h1>

          <div className="final-video-wrapper">
            <video
              className="final-video"
              controls
              playsInline
              preload="auto"
            >
              <source src="/birthday-video.mp4" type="video/mp4" />
              Your browser does not support the video.
            </video>
          </div>

          <p className="quiz-subtitle">
            Some memories are simply too special to be forgotten. 💙
          </p>

          <div style={{ margin: "10px 0" }}>💙 💙 💙</div>

          <button
            className="back-btn"
            onClick={() => setScreen("pre-final")}
          >
            ← Back to Letter
          </button>
        </div>
      )}
    </div>
  );
}

export default App;