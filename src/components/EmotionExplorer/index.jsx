import React, { useState, useEffect } from "react";

import happpyImage from "../../images/children-playing-tag.jpg";

import style from "./index.module.css";
import { useParams } from "react-router-dom";

export default function () {
  const { groundPathID } = useParams();

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
            {
            },
          ],
        },
        test: [
        ],
      },
    },
  ];

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
      const collectiveOfPages = exploreDir.pages
      
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
    if (checkRightPageBound())
      setCurrentPageNumber((number) => (number = number + 1));
  }

  return (
    <div className={style.mainContent}>
      {currentPage ? (
        <div className={style.pamphlet}>
          <div className={style.textContainer}>
            <h1 className={style.title}>{currentPage.title}</h1>
            <p className={style.text}>{currentPage.text}</p>
          </div>
          <div className={style.visualContainer}>
            <img
              className={style.image}
              src={happpyImage}
              alt="Image description"
            />
          </div>
          <button className={style.previousPage} onClick={flipPageBack}>
            prev
          </button>
          <button className={style.nextPage} onClick={flipPageOver}>
            next
          </button>
          <p className={style.pageNumber}>{currentPageNumber}</p>
        </div>
      ) : null}
    </div>
  );
}
