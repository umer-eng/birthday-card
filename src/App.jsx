import { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("welcome");

  const [showNoMessage, setShowNoMessage] = useState(false);
  const [noStep, setNoStep] = useState(0);

  const [quizScore, setQuizScore] = useState(0);

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

      case "final":
        setScreen("gifts");
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
     QUIZ
  ========================= */

  const startQuiz = () => {
    setQuizScore(0);
    setScreen("quiz");
  };

  const answerQuiz = (correct) => {
    const newScore = correct
      ? quizScore + 1
      : quizScore;

    setQuizScore(newScore);
    setScreen("result");
  };


  return (
    <div className="birthday-app">

      {/* =================================================
          WELCOME SCREEN
      ================================================= */}

      {screen === "welcome" && (
        <section className="welcome-screen">

          <div className="floating-emoji emoji-1">
            💙
          </div>

          <div className="floating-emoji emoji-2">
            ✨
          </div>

          <div className="floating-emoji emoji-3">
            🎈
          </div>

          <div className="floating-emoji emoji-4">
            💫
          </div>

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

          <div className="question-particle particle-1">
            ✨
          </div>

          <div className="question-particle particle-2">
            💙
          </div>

          <div className="question-particle particle-3">
            🎀
          </div>

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
              Happy Birthday Baby! 🎈
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
                onClick={() => setScreen("final")}
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
          QUIZ SCREEN
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
              💗 Birthday Quiz
            </p>

            <h1>
              How well do you know me? 👀
            </h1>

            <p className="question-description">
              Choose the answer you think is correct! ✨
            </p>

            <div className="quiz-options">

              <button
                className="quiz-option"
                onClick={() => answerQuiz(true)}
              >
                💙 You know me really well
              </button>

              <button
                className="quiz-option"
                onClick={() => answerQuiz(false)}
              >
                😭 Maybe I need to give you hints
              </button>

              <button
                className="quiz-option"
                onClick={() => answerQuiz(false)}
              >
                😂 I'm just here for the fun
              </button>

            </div>

          </div>

        </section>
      )}


      {/* =================================================
          QUIZ RESULT
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
              Your Score: {quizScore} 💗
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
                — Your Best Friend Usman💙
              </p>

            </div>

          </div>

        </section>
      )}


      {/* =================================================
          JOURNEY SCREEN - 5 PHOTOS
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

              {/* PHOTO 1 */}

              <div className="journey-photo">
                <img
                  src="/journey1.jpg"
                  alt="Memory 01"
                />
              </div>


              {/* PHOTO 2 */}

              <div className="journey-photo">
                <img
                  src="/journey2.jpg"
                  alt="Memory 02"
                />
              </div>


              {/* PHOTO 3 */}

              <div className="journey-photo">
                <img
                  src="/journey3.jpg"
                  alt="Memory 03"
                />
              </div>


              {/* PHOTO 4 */}

              <div className="journey-photo">
                <img
                  src="/journey4.jpg"
                  alt="Memory 04"
                />
              </div>


              {/* PHOTO 5 */}

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
          FINAL SURPRISE
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
                muted
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