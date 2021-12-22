import React, { useState } from 'react';

import { Button } from '../common/CustomButton/Button';

import s from 'styles/Pagination.module.css';

type PaginationPropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize: number;
};

export const Pagination: React.FC<PaginationPropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize,
}) => {
  const one = 1;
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i + one) {
    pages.push(i);
  }
  const portionCount = pagesCount / portionSize;
  const [portionNumber, setPortionNumber] = useState<number>(one);
  const leftPortionPageNumber = (portionNumber - one) * portionSize + one;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.pagination}>
      <div>
        <Button
          disabled={portionNumber <= one}
          className={s.button}
          onClick={() => setPortionNumber(portionNumber - one)}
        >
          Prev list
        </Button>

        <Button
          disabled={currentPage <= one}
          className={s.button}
          onClick={() => onPageChanged(currentPage - one)}
        >
          Prev
        </Button>

        <Button
          disabled={currentPage >= pagesCount}
          className={s.button}
          onClick={() => onPageChanged(currentPage + one)}
        >
          Next
        </Button>

        <Button
          disabled={portionCount <= portionNumber}
          className={s.button}
          onClick={() => setPortionNumber(portionNumber + one)}
        >
          Next list
        </Button>
      </div>
      <div className={s.text}>
        Current page: <span className={s.currentNumber}>{currentPage}</span>
      </div>
      <div>
        {pages
          .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
          .map(page => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <span
              key={page}
              onClick={() => {
                onPageChanged(page);
              }}
              className={`${s.page} ${currentPage === page ? s.selectPage : ''}`}
            >
              {page}
            </span>
          ))}
      </div>
    </div>
  );
};
