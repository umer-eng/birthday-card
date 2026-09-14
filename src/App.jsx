import { useState } from "react";
import FloatingEmojis from "./FloatingEmojis";
import "./App.css";

// ==========================================
// QUIZ DATA ARRAY (5 QUESTIONS)
// ==========================================
const quizQuestions = [
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
  const [screen, setScreen] = useState("welcome");

  const [showNoMessage, setShowNoMessage] = useState(false);
  const [noStep, setNoStep] = useState(0);

  // Quiz States
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  /* =========================
     BACK BUTTON
  ========================= */

  const goBack = () => {
    switch (screen) {
      case "question":
        setScreen("welcome");
        break;

      case "ready":
        setScreen("question");
        break;

      case "gifts":
        setScreen("ready");
        break;

      case "quiz":
        setScreen("gifts");
        break;

      case "result":
        setScreen("quiz");
        break;

      case "letter":
        setScreen("gifts");
        break;

      case "journey":
        setScreen("gifts");
        break;

      case "pre-final":
        setScreen("gifts");
        break;

      case "final":
        setScreen("pre-final");
        break;

      default:
        setScreen("welcome");
    }
  };


  /* =========================
     WELCOME
  ========================= */

  const startSurprise = () => {
    setScreen("question");
    setShowNoMessage(false);
    setNoStep(0);
  };


  /* =========================
     QUESTION
  ========================= */

  const chooseYes = () => {
    setScreen("ready");
  };

  const chooseNo = () => {
    setShowNoMessage(true);

    setNoStep((previous) => {
      if (previous < 2) {
        return previous + 1;
      }

      return previous;
    });
  };


  /* =========================
     BIRTHDAY
  ========================= */

  const openGifts = () => {
    setScreen("gifts");
  };


  /* =========================
     DYNAMIC QUIZ HANDLERS
  ========================= */

  const startQuiz = () => {
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScreen("quiz");
  };

  const handleOptionClick = (index, isCorrect) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setScreen("result");
    }
  };


  return (
    <div className="birthday-app" style={{ position: "relative" }}>

      {/* Dynamic Background Floating Emojis */}
      <FloatingEmojis />


      {/* =================================================
          WELCOME SCREEN
      ================================================= */}

      {screen === "welcome" && (
        <section className="welcome-screen">

          <div className="welcome-card">

            <div className="gift-icon">
              🎁
            </div>

            <p className="subtitle">
              A little surprise for you...
            </p>

            <h1>
              Hey Birthday Girl! 🎂
            </h1>

            <p className="description">
              I made something special just for you.
              <br />
              Are you ready to see it? 👀
            </p>

            <button
              className="start-button"
              onClick={startSurprise}
            >
              Open Your Surprise 🎁
            </button>

          </div>

        </section>
      )}


      {/* =================================================
          QUESTION SCREEN
      ================================================= */}

      {screen === "question" && (
        <section className="question-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="question-card">

            <div className="question-emoji">
              👀
            </div>

            <p className="question-small">
              Before we continue...
            </p>

            {!showNoMessage ? (
              <>
                <h1>
                  Are you ready
                  <br />
                  for your birthday surprise? 🎁
                </h1>

                <p className="question-description">
                  There might be a few little surprises
                  waiting for you. ✨
                </p>
              </>
            ) : (
              <>
                {noStep === 1 && (
                  <>
                    <h1>
                      Wait, you said no? 😭
                    </h1>

                    <p className="question-description">
                      Are you really sure about that? 👀
                    </p>
                  </>
                )}

                {noStep >= 2 && (
                  <>
                    <h1>
                      Don't you want your gift? 😡🎁
                    </h1>

                    <p className="question-description">
                      Come on... give the surprise a chance! 🥺
                    </p>
                  </>
                )}
              </>
            )}

            <div className="answer-buttons">

              <button
                className={`yes-button ${
                  noStep >= 2 ? "yes-big" : ""
                }`}
                onClick={chooseYes}
              >
                YES! 💙
              </button>

              {noStep < 2 && (
                <button
                  className="no-button"
                  onClick={chooseNo}
                >
                  NO 😭
                </button>
              )}

            </div>

            {showNoMessage && (
              <div className="no-message">

                {noStep === 1 &&
                  "The surprise is still waiting for you! 🎁"}

                {noStep >= 2 &&
                  "Okay okay... YES button is calling you! 😭💙"}

              </div>
            )}

          </div>

        </section>
      )}


      {/* =================================================
          READY / BIRTHDAY SCREEN
      ================================================= */}

      {screen === "ready" && (
        <section className="ready-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="ready-card">

            <div className="ready-emoji">
              🎉
            </div>

            <p className="question-small">
              That's the spirit! 💙
            </p>

            <h1>
              Happy Birthday Girl ! 🎈
            </h1>

            <p>
              Today is all about celebrating you. ✨
              <br />
              And I have a few surprises waiting...
            </p>

            <button
              className="start-button"
              onClick={openGifts}
            >
              OPEN YOUR GIFTS 🎁
            </button>

          </div>

        </section>
      )}


      {/* =================================================
          GIFTS SCREEN
      ================================================= */}

      {screen === "gifts" && (
        <section className="gifts-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="gifts-card">

            <p className="question-small">
              A few things made just for you 💙
            </p>

            <h1>
              Birthday Treats for You 🎁
            </h1>

            <p className="gifts-subtitle">
              Pick whichever surprise you want to explore first. ✨
            </p>

            <div className="gift-options">

              <button
                className="gift-item"
                onClick={startQuiz}
              >
                <div className="gift-item-icon">
                  💗
                </div>

                <h2>
                  Birthday Quiz
                </h2>

                <p>
                  Let's see how well you know me! 👀
                </p>
              </button>


              <button
                className="gift-item"
                onClick={() => setScreen("letter")}
              >
                <div className="gift-item-icon">
                  💌
                </div>

                <h2>
                  A Letter
                </h2>

                <p>
                  A few words from the heart. 💙
                </p>
              </button>


              <button
                className="gift-item"
                onClick={() => setScreen("journey")}
              >
                <div className="gift-item-icon">
                  🐰
                </div>

                <h2>
                  Our Journey
                </h2>

                <p>
                  Some memories worth remembering. ✨
                </p>
              </button>


              <button
                className="gift-item"
                onClick={() => setScreen("pre-final")}
              >
                <div className="gift-item-icon">
                  🎁
                </div>

                <h2>
                  Final Surprise
                </h2>

                <p>
                  One last surprise waiting for you. 💙
                </p>
              </button>

            </div>

          </div>

        </section>
      )}


      {/* =================================================
          DYNAMIC QUIZ SCREEN
      ================================================= */}

      {screen === "quiz" && (
        <section className="quiz-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="quiz-card">

            <div className="quiz-panda">
              <img
                src="/panda.png"
                alt="Cute panda"
              />
            </div>

            <p className="quiz-progress">
              💗 Question {currentQuizIndex + 1} of {quizQuestions.length}
            </p>

            <h1>
              {quizQuestions[currentQuizIndex].question}
            </h1>

            <p className="question-description">
              Choose the answer you think is correct! ✨
            </p>

            <div className="quiz-options">
              {quizQuestions[currentQuizIndex].options.map((option, idx) => {
                let customStyle = {};
                let badgeText = "";

                if (isAnswered) {
                  if (option.correct) {
                    customStyle = {
                      backgroundColor: "#2e7d32",
                      color: "#ffffff",
                      borderColor: "#1b5e20"
                    };
                    badgeText = "✓ Correct";
                  } else if (idx === selectedOption) {
                    customStyle = {
                      backgroundColor: "#d32f2f",
                      color: "#ffffff",
                      borderColor: "#b71c1c"
                    };
                    badgeText = "✗ Wrong";
                  }
                }

                return (
                  <button
                    key={idx}
                    className="quiz-option"
                    style={customStyle}
                    onClick={() => handleOptionClick(idx, option.correct)}
                    disabled={isAnswered}
                  >
                    <span>{option.text}</span>
                    {isAnswered && badgeText && (
                      <span className="feedback-badge" style={{ marginLeft: "auto", fontWeight: "bold" }}>
                        {badgeText}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <button
                className="start-button next-question-btn"
                onClick={handleNextQuestion}
                style={{ marginTop: "20px", width: "100%" }}
              >
                {currentQuizIndex < quizQuestions.length - 1
                  ? "Next Question →"
                  : "See Results 🏆"}
              </button>
            )}

          </div>

        </section>
      )}


      {/* =================================================
          QUIZ RESULT SCREEN
      ================================================= */}

      {screen === "result" && (
        <section className="result-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="result-card">

            <div className="result-panda">
              <img
                src="/panda.png"
                alt="Cute panda"
              />
            </div>

            <p className="question-small">
              Quiz Complete! 🎉
            </p>

            <h1>
              You did it! 💙
            </h1>

            <p className="result-score">
              Your Score: {quizScore} / {quizQuestions.length} 💗
            </p>

            <p className="result-message">
              No matter what your score was,
              you are still an important part of
              this little birthday surprise. ✨
            </p>

            <button
              className="start-button"
              onClick={() => setScreen("gifts")}
            >
              BACK TO GIFTS 🎁
            </button>

          </div>

        </section>
      )}


      {/* =================================================
          LETTER SCREEN
      ================================================= */}

      {screen === "letter" && (
        <section className="letter-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="letter-card">

            <div className="letter-icon">
              💌
            </div>

            <p className="question-small">
              A little something from the heart...
            </p>

            <h1>
              To My Best Friend 💙
            </h1>

            <div className="letter-content">

              <p>
                Sometimes you meet someone and slowly
                realize that they have become a really
                special part of your life.
              </p>

              <p>
                You are one of those people for me.
                Through all the random conversations,
                silly moments, laughs and memories,
                you've made so many ordinary days
                feel a little more special.
              </p>

              <p>
                I hope this birthday brings you
                countless reasons to smile, lots of
                happiness and many beautiful memories
                that you can look back on someday.
              </p>

              <p>
                Thank you for being such a wonderful
                friend and for being someone I can
                always share a good moment with.
              </p>

              <p className="letter-ending">
                Happy Birthday! 🎂✨
                <br />
                Keep smiling and keep being you. 💙
              </p>

              <p className="letter-signature">
                — Your Best Friend 💙
              </p>

            </div>

          </div>

        </section>
      )}


      {/* =================================================
          JOURNEY SCREEN
      ================================================= */}

      {screen === "journey" && (
        <section className="journey-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="journey-card">

            <div className="journey-icon">
              🐰
            </div>

            <p className="question-small">
              Little memories...
            </p>

            <h1>
              Our Journey ✨
            </h1>

            <p>
              Five little moments, five beautiful memories. 💙
            </p>

            <div className="journey-gallery">

              <div className="journey-photo">
                <img
                  src="/journey1.jpg"
                  alt="Memory 01"
                />
              </div>

              <div className="journey-photo">
                <img
                  src="/journey2.jpg"
                  alt="Memory 02"
                />
              </div>

              <div className="journey-photo">
                <img
                  src="/journey3.jpg"
                  alt="Memory 03"
                />
              </div>

              <div className="journey-photo">
                <img
                  src="/journey4.jpg"
                  alt="Memory 04"
                />
              </div>

              <div className="journey-photo">
                <img
                  src="/journey5.jpg"
                  alt="Memory 05"
                />
              </div>

            </div>

          </div>

        </section>
      )}


      {/* =================================================
          PRE-FINAL SURPRISE PAGE
      ================================================= */}

      {screen === "pre-final" && (
        <section className="pre-final-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="pre-final-card">

            <div className="pre-final-icon">
              ✨
            </div>

            <p className="question-small">
              Before the grand reveal... 💖
            </p>

            <h1>
              A Small Special Moment ✨
            </h1>

            <p className="pre-final-description">
              Before you open the final Surprise, I wanted to put this Special Memory right here...
              <br />
              Because your smile means the world to me! 😊💙
            </p>

            {/* PICTURE CONTAINER */}
            <div className="photo-placeholder-box">
              <img
                src="/special-photo.jpg"
                alt="Special Memory"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML =
                    "<div class='photo-placeholder-text'>📸 Place your image at <b>public/special-photo.jpg</b></div>";
                }}
              />
            </div>

            <button
              className="see-surprise-btn"
              onClick={() => setScreen("final")}
            >
              SEE NEXT SURPRISE 💖
            </button>

          </div>

        </section>
      )}


      {/* =================================================
          FINAL SURPRISE (ANIMATION & VIDEO)
      ================================================= */}

      {screen === "final" && (
        <section className="final-screen">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← Back
          </button>

          <div className="final-card">

            <h1 className="forever-title">
              You Are My Forever ❤️
            </h1>

            <div className="final-video-wrapper">

              <video
                className="final-video"
                autoPlay 
                loop
                playsInline
                preload="auto"
              >
                <source
                  src="/birthday-video.mp4"
                  type="video/mp4"
                />

                Your browser does not support the video.
              </video>

            </div>

            <p className="final-message">
              Some memories are simply too special
              to be forgotten. 💙
            </p>

            <div className="final-hearts">
              💙 💙 💙
            </div>

          </div>

        </section>
      )}

    </div>
  );
}

export default App;            