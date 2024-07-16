import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import happpyImage from "../../images/children-playing-tag.jpg";
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
            question: "Are they happy",
            Answer: "Yes",
          },
          {
            question: "Are they happy",
          },
          {
            question: "Are they happy",
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
  const [questions, setQuestions] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(null);

  useEffect(() => {
    const emotionFetch = explore.find((dir) => dir.category === groundPathID);
    if (emotionFetch) {
      const items = emotionFetch.items;
      const quiz = items.quiz;
      const questions = quiz.questions;
      setQuiz(quiz);
      setQuestions(questions);
      setCurrentQuestion(questions[0])
      setCurrentQuestionNumber(0)
    }
  }, []);
  
  useEffect(() => {
    if (quiz) {
      const updatedQuiz = questions[currentQuestionNumber];
      setCurrentQuestion(updatedQuiz);
    }
  }, [currentQuestionNumber]);

  function checkRightQuestionBound() {
    return currentQuestionNumber < quiz.length - 1;
  }
  function checkLeftQuestionBound() {
    return currentQuestionNumber > 0;
  }
  function previousQuestion() {
    if (checkLeftQuestionBound())
      setCurrentPageNumber((number) => (number = number - 1));
  }
  function nextQuestion() {
    if (checkRightQuestionBound())
      setCurrentPageNumber((number) => (number = number + 1));
  }

  function isCorrectAnswer(answer){
    
  }

  return (
    <div className={style.mainContent}>
      {currentQuestion ? (
        <>
          <div className={style.quizContainer}>
            <div className={style.quizTitle}>
                {currentQuestion.question}
            </div>
            <div className={style.quizContent}>
              <img className={style.quizImage} src={happpyImage}></img>
            </div>
            <div className={style.answerOptions}>
              <button className={style.answerOption} onClick={isCorrectAnswer}>0</button>
              <button className={style.answerOption} onClick={isCorrectAnswer}>1</button>
            </div>
            <div className={style.quizNavigation}>
              <button className={style.previousQuestion} onClick={previousQuestion}>
                prev
              </button>
              <button className={style.nextQuestion} onClick={nextQuestion}>
                next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
