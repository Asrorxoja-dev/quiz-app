import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Puff } from "react-loader-spinner"; // Ensure correct import
import Result from "../components/Result";
import DarkMode from "./DarkMode";
import sun from '/public/assets/icon-sun-dark.svg';
import moon from '/public/assets/icon-moon-dark.svg';
import { Link } from "react-router-dom";

function Test({ questions: quiz }) {
  const { questions, title, color, icon } = quiz || {};

  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setLoading(false);
    }
  }, [questions]);

  if (!questions) {
    return null;
  }

  if (loading) {
    return (
      <div className="loading">
        <Puff
          visible={true}
          height="60"
          width="60"
          color="#313E51"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass="1"
        />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = questions[questionIndex].answer;

    if (selectedAnswer === null) {
      return toast.error("Please select an answer");
    } else {
      if (selectedAnswer === correctAnswer) {
        setAnswerStatus("correct");
        setCorrectAnswerCount(correctAnswerCount + 1);
      } else {
        setAnswerStatus("incorrect");
      }

      setShowNextButton(true);
      setStatusDisabled(true);
    }
  };

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setAnsweredQuestions(answeredQuestions + 1);
    setSelectedAnswer(null);
    setShowNextButton(false);
    setAnswerStatus(null);
    setStatusDisabled(false);
  };

  if (questionIndex === questions.length) {
    toast.success("Congratulations", {
      icon: "🎉",
    });
    return (
      <>
        <DarkMode />
        <Result
          title={title}
          color={color}
          icon={icon}
          correctAnswerCount={correctAnswerCount}
          questionsLength={questions.length}
        />
      </>
    );
  }

  return (
    <div className="test-container">
      <div className="test-content">
        <div className="nav">
          {title ? (
            <Link className="header-logo" to="/">
              <figure>
                <img
                  src={`../assets/icon-${title.toLowerCase()}.svg`}
                  alt="icon"
                />
              </figure>
              <span>{title}</span>
            </Link>
          ) : (
            <span></span>
          )}
        </div>
        <div className="dark-mode">
          <img className="sun" src={sun} alt="" />
          <DarkMode />
          <img className="moon" src={moon} alt="" />
        </div>
        <p className="test-description">
          Question {answeredQuestions} of {questions.length}
        </p>
        <h2 className="test-title">{questions[questionIndex].question}</h2>

        <div className="test-process-container">
          <div
            className="test-process"
            style={{
              width: (answeredQuestions / questions.length) * 100 + "%",
            }}
          ></div>
        </div>
      </div>
      <div className="test-questions">
        <form onSubmit={handleSubmit}>
          <ul className="test-list">
            {questions[questionIndex].options.map((option, index) => {
              const alphabet = String.fromCharCode(index + 65);
              let className = "";
              if (answerStatus === "correct" && option === selectedAnswer) {
                className = "correct";
              } else if (answerStatus === "incorrect") {
                if (option === selectedAnswer) {
                  className = "incorrect";
                }
                if (option === questions[questionIndex].answer) {
                  className = "correct";
                }
              }

              return (
                <li key={option}>
                  <label className={`test-label ${className}`}>
                    <span className="test-letter">{alphabet}</span>
                    <input
                      onChange={() => setSelectedAnswer(option)}
                      type="radio"
                      name="option"
                      disabled={statusDisabled}
                    />
                    <span className="test-text">{option}</span>

                    <img
                      className="test-icon-correct"
                      src="../assets/icon-correct.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <img
                      className="test-icon-incorrect"
                      src="../assets/icon-incorrect.svg"
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
          {!showNextButton && (
            <button className="btn test-btn">Submit Question</button>
          )}
          {showNextButton && (
            <button onClick={handleNextQuestion} className="btn test-btn">
              {questions.length === questionIndex + 1 ? "Finish" : "Next Question"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;
