import React, { useEffect, useState, useRef } from "react";
import style from "./index.module.css";
import happyImage from "../../images/readingFamily.png";
import icecreamFamily from "../../images/icecreamFamily.png";
import grandmaFamily from "../../images/grandmaFamily.png";

import { useParams } from "react-router-dom";
const explore = [
  {
    category: "happy",
    items: {
      explorer: {
        pages: [
          {
            title: "What is happiness?",
            text: "Happiness is like a special kind of magic that makes your heart feel warm and your face light up with a big smile. Imagine you just discovered a secret garden full of beautiful flowers or your favorite superhero gave you a high-five. That amazing, tingly feeling you get inside is called happiness.",
          },
          {},
        ],
      },
      quiz: {
        questions: [
          {
            question:
              "Today my mom took me to the playground and bought me my favorite ice cream. I felt very happy",
            answer: true,
            src: happyImage,
          },
          {
            question:
              "Today my brother read two of my favorite books to me. I love my brother, and I felt very happy",
            answer: true,
            src: icecreamFamily,
          },
          {
            question:
              "Today I visited my grandparents and swam in the lake with them. I felt very happy",
            answer: true,
            src: grandmaFamily,
          },
          {
            question: "Are they happy",
          },
        ],
      },
    },
  },
];

export default function EmotionQuiz() {
  const { groundPathID } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(null);
  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const emotionFetch = explore.find((dir) => dir.category === groundPathID);
    if (emotionFetch) {
      const items = emotionFetch.items;
      const quiz = items.quiz;
      const questions = quiz.questions;
      setQuiz(quiz);
      setQuestions(questions);
      setCurrentQuestion(questions[0]);
      setCurrentQuestionNumber(0);
    }
  }, []);

  useEffect(() => {
    if (quiz) {
      const updatedQuiz = questions[currentQuestionNumber];
      setCurrentQuestion(updatedQuiz);
    }
  }, [currentQuestionNumber]);

  function checkLeftQuestionBound() {
    return currentQuestionNumber > 0;
  }
  function checkRightQuestionBound() {
    return currentQuestionNumber < questions.length - 1;
  }
  function previousQuestion() {
    if (checkLeftQuestionBound())
      setCurrentQuestionNumber((number) => (number = number - 1));
  }
  function nextQuestion() {
    if (checkRightQuestionBound())
      setCurrentQuestionNumber((number) => (number = number + 1));
  }

  const isCorrectAnswer = (isCorrect) => {
    setAnswer(isCorrect ? "correct" : "incorrect");
    startTimer();
  };
  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setAnswer(null);
      }, 500); // Match the transition duration
    }, 2000);
  };

  return (
    <div className={style.mainContent}>
      {currentQuestion ? (
        <div className={style.quizContainer}>
          <div className={style.quizTitle}>{currentQuestion.question}</div>
          <div className={style.quizContent}>
            <img className={style.quizImage} src={currentQuestion.src}></img>
          </div>
          <div className={style.answerOptions}>
            <button
              className={style.answerOption}
              onClick={() => isCorrectAnswer(false)}
            >
              No.
            </button>
            <button
              className={style.answerOption}
              onClick={() => isCorrectAnswer(true)}
            >
              Yea!
            </button>
          </div>
          <div className={style.quizNavigation}>
            <button
              className={style.previousQuestion}
              onClick={previousQuestion}
            >
              prev
            </button>
            <button className={style.nextQuestion} onClick={nextQuestion}>
              next
            </button>
          </div>
          <div className={`answer ${visible ? "show" : ""}`}>
            {answer === "correct" && "Correct"}
            {answer === "incorrect" && "Incorrect"}
          </div>
        </div>
      ) : null}
    </div>
  );
}
