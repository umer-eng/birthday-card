import React, { useState, useRef } from "react";
import "./App.css";
import FloatingEmojis from "./FloatingEmojis";

const quizData = [
  {
    id: 1,
    question: "How well do you know me? 👀",
    options: [
      { text: "You know me really well", correct: true },
      { text: "Maybe I need to give you hints", correct: false },
      { text: "I'm just here for the fun", correct: false }
    ]
  },
  {
    id: 2,
    question: "What is my favorite thing to do? ✨",
    options: [
      { text: "Late night coding & chilling", correct: true },
      { text: "Sleeping all day", correct: false },
      { text: "Partying outside", correct: false }
    ]
  },
  {
    id: 3,
    question: "Which vibe fits us best? 💙",
    options: [
      { text: "Best friends forever", correct: true },
      { text: "Tom & Jerry fights", correct: false },
      { text: "Quiet & serious", correct: false }
    ]
  }
];

function App() {
  // Screens: 'home' | 'quiz' | 'surprise' | 'letter' | 'gift' | 'video'
  const [screen, setScreen] = useState("home");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const videoRef = useRef(null);
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
      setScreen("surprise");
    }
  };

  return (
    <div className="app-container">
      <FloatingEmojis />

      {/* SCREEN 1: WELCOME / HOME */}
      {screen === "home" && (
        <div className="card-box fade-in">
          <div className="panda-avatar">
            <img src="/panda.png" alt="Panda" onError={(e) => (e.target.style.display = "none")} />
          </div>
          <h1 className="title">A Very Special Birthday Wish 🎉</h1>
          <p className="subtitle">
            Welcome! Ready to unlock your special surprise? Answer a few quick quiz questions!
          </p>
          <button className="main-btn" onClick={() => setScreen("quiz")}>
            Start Quiz 🚀
          </button>
        </div>
      )}

      {/* SCREEN 2: QUIZ */}
      {screen === "quiz" && (
        <div className="card-box fade-in">
          <span className="step-tag">
            Question {currentQuestionIndex + 1} of {quizData.length}
          </span>
          <h2 className="question-title">{currentQuestion.question}</h2>

          <div className="options-list">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "option-btn";
              if (selectedOption === idx) {
                btnClass += option.correct ? " selected-correct" : " selected-wrong";
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
              {currentQuestionIndex === quizData.length - 1 ? "Finish Quiz ✨" : "Next ➡️"}
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3: SURPRISE RESULT */}
      {screen === "surprise" && (
        <div className="card-box fade-in">
          <div className="surprise-icon">🎉</div>
          <h2 className="title">Awesome! Quiz Cleared!</h2>
          <p className="subtitle">
            You know me so well! Now let's head over to your special letter.
          </p>
          <button className="main-btn" onClick={() => setScreen("letter")}>
            Read Letter 💌
          </button>
        </div>
      )}

      {/* SCREEN 4: LETTER & MEMORIES */}
      {screen === "letter" && (
        <div className="card-box fade-in">
          <h2 className="title">Happy Birthday! 🎂✨</h2>
          <div className="letter-content">
            <p>Wishing you a wonderful birthday filled with peace, laughter, and endless success!</p>
            <p>Thank you for always being such a great person. Stay blessed and keep shining bright!</p>
          </div>

          <div className="journey-gallery">
            <img src="/journey1.jpg" alt="Memory 1" onError={(e) => (e.target.style.display = "none")} />
            <img src="/journey2.jpg" alt="Memory 2" onError={(e) => (e.target.style.display = "none")} />
            <img src="/journey3.jpg" alt="Memory 3" onError={(e) => (e.target.style.display = "none")} />
          </div>

          <button className="main-btn" onClick={() => setScreen("gift")}>
            Next: Open Your Gift 🎁
          </button>
        </div>
      )}

      {/* SCREEN 5: GIFT BOX TRANSITION SCREEN (BEFORE VIDEO) */}
      {screen === "gift" && (
        <div className="card-box fade-in">
          <div className="gift-box-icon" onClick={() => setScreen("video")}>
            🎁
          </div>
          <h2 className="title">A Final Surprise Awaits!</h2>
          <p className="subtitle">
            Tap the gift box or click the button below to unwrap your special birthday video!
          </p>
          
          <div className="nav-buttons">
            <button className="secondary-btn" onClick={() => setScreen("letter")}>
              ← Back to Letter
            </button>
            <button className="main-btn" onClick={() => setScreen("video")}>
              Unwrap Gift 🎬
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 6: FINAL VIDEO */}
      {screen === "video" && (
        <div className="card-box fade-in">
          <h2 className="title">Special Video For You 🎥</h2>
          <div className="video-wrapper">
            <video ref={videoRef} controls autoPlay playsInline className="final-video">
              <source src="/birthday-video.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>

          <div className="nav-buttons">
            <button className="secondary-btn" onClick={() => setScreen("gift")}>
              ← Back to Gift
            </button>
            <button
              className="secondary-btn"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setIsCorrect(false);
                setScreen("home");
              }}
            >
              Restart 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;