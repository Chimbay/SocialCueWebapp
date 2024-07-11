import React, { useState, useEffect } from "react";

import style from "./index.module.css";

export default function () {
  const explore = [
    {
      learnID: "01",
      pages: [
        {
          title: "What is happiness?",
        },
        {},
      ],
    },
  ];

  const [explorer, setExplorer] = useState(null);

  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(null);

  // Fetch the explorer
  useEffect(() => {
    const explorerDir = explore.find((dir) => dir.learnID === "01");
    if (explorerDir) {
      const collectiveOfPages = explorerDir.pages;
      setExplorer(explorerDir);
      setPages(collectiveOfPages);
      setCurrentPage(collectiveOfPages[0]);
      setCurrentPageNumber(0);
    } else {
      console.error("Explorer with learnID '01' not found.");
    }
  }, []);

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
      <div className={style.pamphlet}>
        <div className={style.textContainer}>
          {currentPage && (
            <>
              <h1 className={style.title}>
                {currentPage.title}
              </h1>
              <p></p>
            </>
          )}
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
    </div>
  );
}
