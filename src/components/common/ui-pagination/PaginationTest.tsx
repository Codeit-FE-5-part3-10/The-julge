import { usePagination } from '@mantine/hooks';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { image } from './constant';
import styles from './Pagination.module.scss';
import { Dispatch, SetStateAction } from 'react';

const cx = classNames.bind(styles);

interface PaginationParams {
  total: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  siblings?: number;
  boundaries?: number;
}

export const PaginationTest = ({
  total,
  currentPage,
  setCurrentPage,
  siblings = 1,
  boundaries = 1,
}: PaginationParams) => {
  const pagination = usePagination({
    total,
    page: currentPage,
    siblings,
    boundaries,
  });

  const handleChange = (pageNumber: number) => {
    if (pageNumber !== 'dots') {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={cx('container')}>
      <button
        className={cx('arrow')}
        type="button"
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image
          width={20}
          height={20}
          src={currentPage === 1 ? image.leftGray.src : image.leftBlack.src}
          alt={currentPage === 1 ? image.leftGray.alt : image.leftBlack.alt}
        />
      </button>
      <div className={cx('numbers')}>
        {pagination.range.map((pageNumber, index) => (
          <button
            key={index}
            className={cx('number', {
              active: pageNumber === currentPage,
            })}
            type="button"
            onClick={() => handleChange(pageNumber)}
          >
            {typeof pageNumber === 'number' ? pageNumber : '...'}
          </button>
        ))}
      </div>
      <button
        className={cx('arrow')}
        type="button"
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === pagination.total}
      >
        <Image
          width={20}
          height={20}
          src={currentPage === pagination.total ? image.rightGray.src : image.rightBlack.src}
          alt={currentPage === pagination.total ? image.rightGray.alt : image.rightBlack.alt}
        />
      </button>
    </div>
  );
};

export default PaginationTest;
