import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { AppRootState } from '../../../m2-bll/store';
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
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const appStatus = useSelector<AppRootState, boolean>(state => state.app.status);
  const portionCount = pagesCount / portionSize;
  const [portionNumber, setPortionNumber] = useState<number>(one);
  const leftPortionPageNumber = (portionNumber - one) * portionSize + one;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.pagination}>
      <div className={s.buttonBlock}>
        <Button
          disabled={portionNumber <= one}
          className={s.button}
          onClick={() => setPortionNumber(portionNumber - one)}
        >
          Prev list
        </Button>

        <Button
          disabled={currentPage <= one || appStatus}
          className={s.button}
          onClick={() => onPageChanged(currentPage - one)}
        >
          Prev
        </Button>

        <Button
          disabled={currentPage >= pagesCount || appStatus}
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
      {/* <div className={s.text}> */}
      {/*  Current page: <span className={s.currentNumber}>{currentPage}</span> */}
      {/* </div> */}
      <div>
        <div className={s.pageBlock}>
          {pages
            .filter(
              page => page >= leftPortionPageNumber && page <= rightPortionPageNumber,
            )
            .map(page => (
              <button
                type="button"
                key={page}
                onClick={() => {
                  onPageChanged(page);
                }}
                disabled={appStatus}
                className={`${s.page} ${currentPage === page ? s.selectPage : ''}`}
              >
                {page}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
