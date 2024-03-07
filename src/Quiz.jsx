import React, { useState } from "react";
import { resultInitalState } from "./Constant";
import AnswerTimerContainer from "./AnswerTimerContainer";

export default function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [showResultTimer, setShowResultTimer] = useState(true);
  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onclickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowResultTimer(false);
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswer: prev.wrongAnswer + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setTimeout(() => {
      setShowResultTimer(true);
    });
  };
  const tryagain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };

  const handletimeout = () => {
    setAnswer(false);
    onclickNext(false);
    setShowResultTimer(false);
  };

  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);
    if (e.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const getAnswerUI = () => {
    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }
  };

  return (
    <div className="container">
      <div className="quiz-box">
        {!showResult ? (
          <>
            {showResultTimer && (
              <AnswerTimerContainer duration={12} onTimeUp={handletimeout} />
            )}

            <div className="q">
              <span className="active-quetion-no">{currentQuestion + 1}</span>
              <span className="total-quetion">/{questions.length}</span>
            </div>
            <h2>{question}</h2>
            {getAnswerUI()}
            <ul>
              {choices.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => onAnswerClick(answer, index)}
                  className={answerIdx === index ? "selected-answer" : null}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="footer">
              <button
                className="btn"
                onClick={() => onclickNext(answer)}
                disabled={answerIdx === null && !inputAnswer}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div>
            <h3>Result</h3>
            <p>
              Total Qusetions:<span> {questions.length}</span>
            </p>
            <p>
              Correct Answer:<span> {result.correctAnswer}</span>
            </p>
            <p>
              Wrong Answer:<span> {result.wrongAnswer}</span>
            </p>
            <p>
              Total Score:<span> {result.score}</span>
            </p>
            <button className="btn" onClick={tryagain}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
