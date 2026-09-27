import { useState, useRef, useEffect } from "react";
import FloatingEmojis from "./FloatingEmojis";
import "./App.css";

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
      BACK BUTTON HANDLER
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
        setScreen("gifts");
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
      ACTION HANDLERS
  ========================= */
  const startSurprise = () => {
    setScreen("question");
    setShowNoMessage(false);
    setNoStep(0);
  };

  const chooseYes = () => {
    setScreen("ready");
  };

  const chooseNo = () => {
    setShowNoMessage(true);
    setNoStep((previous) => (previous < 2 ? previous + 1 : previous));
  };

  const openGifts = () => {
    setScreen("gifts");
  };

  /* =========================
      QUIZ HANDLERS
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
      <FloatingEmojis />

      {/* WELCOME SCREEN */}
      {screen === "welcome" && (
        <section className="welcome-screen">
          <div className="welcome-card">
            <div className="gift-icon">🎁</div>
            <p className="subtitle">A little surprise for you...</p>
            <h1>Hey Birthday Girl! 🎂</h1>
            <p className="description">
              I made something special just for you.
              <br />
              Are you ready to see it? 👀
            </p>
            <button className="start-button" onClick={startSurprise}>
              Open Your Surprise 🎁
            </button>
          </div>
        </section>
      )}

      {/* QUESTION SCREEN */}
      {screen === "question" && (
        <section className="question-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="question-card">
            <div className="question-emoji">👀</div>
            <p className="question-small">Before we continue...</p>

            {!showNoMessage ? (
              <>
                <h1>
                  Are you ready
                  <br />
                  for your birthday surprise? 🎁
                </h1>
                <p className="question-description">
                  There might be a few little surprises waiting for you. ✨
                </p>
              </>
            ) : (
              <>
                {noStep === 1 && (
                  <>
                    <h1>Wait, you said no? 😭</h1>
                    <p className="question-description">
                      Are you really sure about that? 👀
                    </p>
                  </>
                )}
                {noStep >= 2 && (
                  <>
                    <h1>Don't you want your gift? 😡🎁</h1>
                    <p className="question-description">
                      Come on... give the surprise a chance! 🥺
                    </p>
                  </>
                )}
              </>
            )}

            <div className="answer-buttons">
              <button
                className={`yes-button ${noStep >= 2 ? "yes-big" : ""}`}
                onClick={chooseYes}
              >
                YES! 💙
              </button>

              {noStep < 2 && (
                <button className="no-button" onClick={chooseNo}>
                  NO 😭
                </button>
              )}
            </div>

            {showNoMessage && (
              <div className="no-message">
                {noStep === 1 && "The surprise is still waiting for you! 🎁"}
                {noStep >= 2 && "Okay okay... YES button is calling you! 😭💙"}
              </div>
            )}
          </div>
        </section>
      )}

      {/* READY SCREEN */}
      {screen === "ready" && (
        <section className="ready-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="ready-card">
            <div className="ready-emoji">🎉</div>
            <p className="question-small">That's the spirit! 💙</p>
            <h1>Happy Birthday Girl ! 🎈</h1>
            <p>
              Today is all about celebrating you. ✨
              <br />
              And I have a few surprises waiting...
            </p>
            <button className="start-button" onClick={openGifts}>
              OPEN YOUR GIFTS 🎁
            </button>
          </div>
        </section>
      )}

      {/* GIFTS SCREEN */}
      {screen === "gifts" && (
        <section className="gifts-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="gifts-card">
            <p className="question-small">A few things made just for you 💙</p>
            <h1>Birthday Treats for You 🎁</h1>
            <p className="gifts-subtitle">
              Pick whichever surprise you want to explore first. ✨
            </p>

            <div className="gift-options">
              <button className="gift-item" onClick={startQuiz}>
                <div className="gift-item-icon">💗</div>
                <h2>Birthday Quiz</h2>
                <p>Let's see how well you know me! 👀</p>
              </button>

              <button className="gift-item" onClick={() => setScreen("letter")}>
                <div className="gift-item-icon">💌</div>
                <h2>Birthday Wish</h2>
                <p>A few words from my heart. 💙</p>
              </button>

              <button className="gift-item" onClick={() => setScreen("journey")}>
                <div className="gift-item-icon">🐰</div>
                <h2>Your Picture</h2>
                <p>Some pictures that I have. ✨</p>
              </button>

              <button
                className="gift-item"
                onClick={() => setScreen("pre-final")}
              >
                <div className="gift-item-icon">🎁</div>
                <h2>Final Surprise</h2>
                <p>One last surprise waiting for you. 💙</p>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* QUIZ SCREEN */}
      {screen === "quiz" && (
        <section className="quiz-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="quiz-card">
            <div className="quiz-panda">
              <img src="/panda.png" alt="Cute panda" />
            </div>

            <p className="quiz-progress">
              💗 Question {currentQuizIndex + 1} of {quizQuestions.length}
            </p>

            <h1>{quizQuestions[currentQuizIndex].question}</h1>

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
                      <span
                        className="feedback-badge"
                        style={{ marginLeft: "auto", fontWeight: "bold" }}
                      >
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

      {/* QUIZ RESULT SCREEN */}
      {screen === "result" && (
        <section className="result-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="result-card">
            <div className="result-panda">
              <img src="/panda.png" alt="Cute panda" />
            </div>

            <p className="question-small">Quiz Complete! 🎉</p>
            <h1>You did it! 💙</h1>

            <p className="result-score">
              Your Score: {quizScore} / {quizQuestions.length} 💗
            </p>

            <p className="result-message">
              No matter what your score was, you are still an important part of
              my life and this is small gift for you . ✨
            </p>

            <button className="start-button" onClick={() => setScreen("gifts")}>
              BACK TO GIFTS 🎁
            </button>
          </div>
        </section>
      )}

      {/* LETTER SCREEN */}
      {screen === "letter" && (
        <section className="letter-screen">
          <button className="back-button" onClick={goBack}>
            ← Back
          </button>
          <div className="letter-card">
            <div className="letter-icon">💌</div>
            <p className="question-small">Some words that I wrote from my heart... 
              Please read this letter completely.
            </p>
            <h1>To My Bestie 💙</h1>
            Happy birthday my best friend and my bestie 🎉🥳🥳 Allah apko lambi Zindagi dai or hamesha Khush rakhai or kamiyabi ata karai or apkai naseeb achai ho ❤️🥰 or Allah apko buri nazar 🧿 SA or burai logo SA bachai ✨ or Dekho ma itni English nhi likho ga 😂 Dekho ap mere life ma wo hissa Jo bhot hi khobsarat ha ap Khali aik dost nhi ho best friend ho 💕🫀 or Sach ma ik ma bhot overthink karta ho likn ap phir mujha is Tarah samjhti ho 🤧 or AP ka sath har aik time har aik pal guzarta ha to koi na koi bat zarror yd karwa kar jata ha 🙈🫠 or Dekho hamarai bech ma larai bhi howi ha ab dosti ma larai na ho asa to achi bat nhi ha na phir wo dosti hi kia 😂😂 or AP mujha har problem ka solution Nikal daiti ho mujha support karti ho 🫶🏻🫶🏻 or mujha ap samjhti ho jaha ma galat hota ho ap mujha samjhati bhi ho ka ya galat ha 🤧🤧 or shukriya mere Zindagi ma anai ka or Bestie ban nai ka 🫀🥰 or apkai sath asai moments ha Jo ma kabhi nhi Bhool sakta 🙈🙈or sach ma ap jaisi dost qismat walo ki hi milti ha or mere itni care karna support karna ya sab 🫂💫 or Sach ma merai pass alfaz hi nhi ha ka tareef karo ku ka AP kabil e tareef ho alfaz khatam ho jai Gai likn apki tareef kabhi khatam nhi ho sakti ku AP itni achi Jo ho 🤗🤗 or ya sab Jo likha ha ya to Kuch bhi apkai barai ma bayan nhi kar sakta ma🥺  baqi Allah apko lambi Zindagi dai nazrai bad SA bachai or har Saal AP apni birthday isi Khushi ka sath enjoy karo 🫶🏻🫂🫀💕 or mujha asa koi quote hi nhi Mila Jo Tumhai define kar Sakai 🥰💕✨and once again happy birthday my bestie and choti muniii 🥰💕🫀🫶🏻💫🌸❤️❤️

            <div className="letter-content">
              <p>
                
              </p>
              <p className="letter-ending">
                Happy Birthday My Bestie! 🎂✨
                <br />
                Keep smiling and keep being you. 💙
              </p>
              <p className="letter-signature"> From Your Best Friend Subhan Ahmed 💙</p>
            </div>

            <button
              className="start-button"
              onClick={() => setScreen("gifts")}
              style={{ marginTop: "20px" }}
            >
              BACK TO GIFTS 🎁
            </button>
          </div>
        </section>
      )}

     {/* JOURNEY SCREEN */}
{screen === "journey" && (
  <section className="journey-screen">
    <button className="back-button" onClick={goBack}>
      ← Back
    </button>
    <div className="journey-card">
      <div className="journey-icon">📸</div>
      <p className="question-small">YOUR PICTURES...</p>
      <h1>Some Your Picture 🙈</h1>
      <p>Every picture has a different vibe 💙</p>

      <div className="polaroid-grid">
        <div className="polaroid-card">
          <div className="polaroid-img-wrapper">
            <img src="/journey1.jpg" alt="Memory 1" />
          </div>
        </div>

        <div className="polaroid-card">
          <div className="polaroid-img-wrapper">
            <img src="/journey2.jpg" alt="Memory 2" />
          </div>
        </div>

        <div className="polaroid-card">
          <div className="polaroid-img-wrapper">
            <img src="/journey3.jpg" alt="Memory 3" />
          </div>
        </div>

        <div className="polaroid-card">
          <div className="polaroid-img-wrapper">
            <img src="/journey4.jpg" alt="Memory 4" />
          </div>
        </div>

        <div className="polaroid-card">
          <div className="polaroid-img-wrapper">
            <img src="/journey5.jpg" alt="Memory 5" />
          </div>
        </div>

        <div className="polaroid-card">
          <div className="polaroid-img-wrapper">
            <img src="/journey6.jpg" alt="Memory 6" />
          </div>
        </div>
      </div>

      <button
        className="start-button"
        onClick={() => setScreen("gifts")}
        style={{ marginTop: "25px", width: "100%" }}
      >
        BACK TO GIFTS 🎁
      </button>
    </div>
  </section>
)}

      {/* PRE-FINAL SCREEN */}
{screen === "pre-final" && (
  <section className="pre-final-screen">
    <button className="back-button" onClick={goBack}>
      ← Back
    </button>
    <div className="pre-final-card">
      <div className="pre-final-icon">✨</div>
      <p className="question-small">Before the final surprise, there’s a little surprise.. 💖</p>
      <h1>A Small Special Moment ✨</h1>
      <p className="pre-final-description">
        Before you open the final Surprise, I have a few more words just for you.
        <br />
      </p>
      Dear my equsite Adina 🩷, You're the best person of my life I ever had...You mean beyond words to me, having you in my life feels like pleasure and lucky!!🎀 You're having kindest heart and beautiful smile which makes your personality even more attractive and special..on this special day i wish you achieve your every dream and blessed with the one who literally cares for you and love you sm that you feels your every day a blessing, lots of prayers for you my bestie 🫶🏻🥰 
                YOUR'S BFF..Subhan Ahmed!!🤍 😊💙

      {/* Video Box Placeholder */}
      <div className="photo-placeholder-box">
        <video
          src="/special-video.mp4"
          autoPlay
          loop
          playsInline
          controls
          preload="metadata"
          className="special-video-player"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML =
              "<div class='photo-placeholder-text'>🎥 Place your video at <b>public/special-video.mp4</b></div>";
          }}
        />
      </div>

      <button
        className="see-surprise-btn"
        onClick={() => setScreen("final")}
      >
        SEE THE FINAL SURPRISE 💖
      </button>
    </div>
  </section>
)}

      {/* FINAL SURPRISE SCREEN */}
      {screen === "final" && (
        <FinalVideoSection goBack={goBack} />
      )}
    </div>
  );
}

// Final Video Component for Autoplay with Sound
function FinalVideoSection({ goBack }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay with sound failed, playing muted:", error);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, []);

  return (
    <section className="final-screen">
      <button className="back-button" onClick={goBack}>
        ← Back
      </button>
      <div className="final-card">
        <h1 className="forever-title">You Are My Forever Bestie And Bestfriend Ever ❤️</h1>
        <p className="final-message">
          
        </p>
        Ya Mere Taraf Sa Aik Chota Sa Gift Samjh Lo Ya Wish Samjh Lo Ku Ka Ap Koi Gift Kisi Sa Laiti Nhi Ho To Manai Phir Apkai Liya Ya Chota Sa Wish Ready Kia Ha Ku Ka Sabka Wish To Ata Ha Likn Mera Thora Alag Hona Chai Ha Na Bcz Ma Apka Malee BestFriend Jo Ho To Alag Sa Bhi Wish Hona Chai Ha Or Insahllah Mujha Pori Umeed Ha Kisi Na Aj Tk Is Tarah Ka Wish Ya Gift Nhi Dia Hoga Or Ya Mere Taraf Sa Chota Sa Gift And Birthday Wish Hope you Will Like It

        <div className="final-hearts">💙 💙 💙</div>

        <div className="final-video-wrapper">
          <video
            ref={videoRef}
            className="final-video"
            loop
            controls
            playsInline
            autoPlay
            preload="auto"
          >
            <source src="/birthday-video.mp4" type="video/mp4" />
            Your browser does not support the video.
          </video>
        </div>

      </div>
    </section>
  );
}

export default App;