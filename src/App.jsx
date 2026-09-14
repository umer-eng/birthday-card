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
  // Screens: 'home' | 'quiz' | 'letter' | 'final'
  const [screen, setScreen] = useState("home");
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
      setErrorMessage("❌ Wrong answer! Pick the correct option to proceed.");
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
      setScreen("letter");
    }
  };

  return (
    <div className="app-container">
      {/* SCREEN 1: HOME PAGE */}
      {screen === "home" && (
        <div className="quiz-card">
          <div className="panda-avatar">🐼</div>
          <h1 className="quiz-title">A Very Special Birthday Surprise! 🎉</h1>
          <p className="quiz-subtitle">
            Answer a few fun questions to unlock your special letter & video gift! ✨
          </p>
          <button className="next-button" onClick={() => setScreen("quiz")}>
            Start Surprise Quiz 🚀
          </button>
        </div>
      )}

      {/* SCREEN 2: QUIZ */}
      {screen === "quiz" && (
        <div className="quiz-card">
          <p className="question-count">
            ❤️ Question {currentQuestionIndex + 1} of {quizData.length}
          </p>

          <h1 className="quiz-title">{currentQuestion.question}</h1>
          <p className="quiz-subtitle">Choose the correct answer! ✨</p>

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

          <div className="nav-buttons">
            {currentQuestionIndex > 0 ? (
              <button
                className="secondary-btn"
                onClick={() => {
                  setCurrentQuestionIndex((prev) => prev - 1);
                  setSelectedOption(null);
                  setIsCorrect(false);
                  setErrorMessage("");
                }}
              >
                ← Back
              </button>
            ) : (
              <button className="secondary-btn" onClick={() => setScreen("home")}>
                ← Home
              </button>
            )}

            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={!isCorrect}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3: LETTER & GIFT TRANSITION */}
      {screen === "letter" && (
        <div className="quiz-card">
          <h1 className="quiz-title">You Made It! 🎁</h1>
          <div className="letter-box">
            <p>Happy Birthday! 🎂✨</p>
            <p>
              Thank you for being such an incredible part of my life. Hope your day is filled with joy, laughter, and endless happiness!
            </p>
          </div>
          <div className="nav-buttons">
            <button
              className="secondary-btn"
              onClick={() => {
                setScreen("quiz");
                setCurrentQuestionIndex(quizData.length - 1);
              }}
            >
              ← Back to Quiz
            </button>
            <button className="next-button" onClick={() => setScreen("final")}>
              See Video Surprise ❤️
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 4: FINAL SURPRISE VIDEO */}
      {screen === "final" && (
        <div className="quiz-card">
          <h1 className="quiz-title" style={{ color: "#ff4b72" }}>
            You Are My Forever ❤️
          </h1>

          <div className="video-wrapper">
            <video className="final-video" controls autoPlay playsInline>
              <source src="/birthday-video.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>

          <button className="secondary-btn" onClick={() => setScreen("letter")}>
            ← Back to Letter
          </button>
        </div>
      )}
    </div>
  );
}

export default App;