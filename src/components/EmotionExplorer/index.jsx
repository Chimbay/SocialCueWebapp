import React, { useState, useEffect } from "react";

import happyImage from "../../images/readingFamily.png";
import icecreamFamily from "../../images/icecreamFamily.png";
import grandmaFamily from "../../images/grandmaFamily.png";
import bookBackground from "../../images/book-background.png";

import style from "./index.module.css";
import { useParams, useNavigate } from "react-router-dom";

const explore = [
  {
    category: "happy",
    items: {
      explorer: {
        pages: [
          {
            title: "What is happiness?",
            text: "Happiness is like a special kind of magic that makes your heart feel warm and your face light up with a big smile. Imagine you're sitting with a friend, sharing a story that makes you both laugh and feel connected. ",
            src: happyImage,
          },
          {
            title: "Happiness is fun!",
            text: "Happiness is found in those moments when you're enjoying a book together, feeling safe and loved. It’s the joy that comes from spending time with someone special, sharing fun and laughter.",
            src: grandmaFamily,
          },
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

export default function () {
  const { groundPathID } = useParams();
  const navigate = useNavigate();

  const [explorer, setExplorer] = useState(null);

  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(null);

  // Fetch the explorer
  useEffect(() => {
    const emotionFetch = explore.find((dir) => dir.category === groundPathID);
    if (emotionFetch) {
      const items = emotionFetch.items;
      const exploreDir = items.explorer;
      const collectiveOfPages = exploreDir.pages;

      setExplorer(exploreDir);
      setPages(collectiveOfPages);
      setCurrentPage(collectiveOfPages[0]);
      setCurrentPageNumber(0);
    } else {
      console.error("Explorer with learnID '01' not found.");
    }
  }, []);

  useEffect(() => {
    if (pages) {
      const updatedPage = pages[currentPageNumber];
      setCurrentPage(updatedPage);
    }
  }, [currentPageNumber]);

  function checkRightPageBound() {
    return currentPageNumber < pages.length - 1;
  }
  function checkLeftPageBound() {
    return currentPageNumber > 0;
  }
  function flipPageBack() {
    if (checkLeftPageBound())
      setCurrentPageNumber((number) => (number = number - 1));
  }
  function flipPageOver() {
    if (checkRightPageBound()) {
      setCurrentPageNumber((number) => (number = number + 1));
    } else {
      nextSection();
    }
  }
  function nextSection() {
    navigate(`/playground/quiz/${groundPathID}`);
  }

  return (
    <div className={style.mainContent}>
      {currentPage ? (
        <>
          <img className={style.bookBackground} src={bookBackground}></img>
          <div className={style.pamphlet}>
            <div className={style.textContainer}>
              <h1 className={style.title}>{currentPage.title}</h1>
              <p className={style.text}>{currentPage.text}</p>
            </div>
            <div className={style.visualContainer}></div>
            <button className={style.previousPage} onClick={flipPageBack}>
              prev
            </button>
            <button className={style.nextPage} onClick={flipPageOver}>
              next
            </button>
            <p className={style.pageNumber}>{currentPageNumber}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
