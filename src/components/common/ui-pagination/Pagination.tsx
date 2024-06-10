import { usePagination } from '@mantine/hooks';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { image } from './constant';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

interface PaginationParams {
  initialPage?: number;
  page?: number;
  total: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}

export const Pagination = (params: PaginationParams) => {
  const { range, active, setPage, next, previous, first, last } = usePagination({ ...params });

  const handleChange = (pageNumber: any) => {
    if (pageNumber === 'dots') {
      return;
    }
    setPage(pageNumber);
  };

  return (
    <div className={cx('container')}>
      <button className={cx('arrow')} type="button" onClick={previous}>
        <Image
          width={20}
          height={20}
          src={active === 1 ? image.leftGray.src : image.leftBlack.src}
          alt={active === 1 ? image.leftGray.alt : image.leftBlack.alt}
        />
      </button>
      <div className={cx('numbers')}>
        {range.map((pageNumber, index) => (
          <button
            key={index}
            className={cx('number', {
              active: pageNumber === active,
            })}
            type="button"
            onClick={() => {
              handleChange(pageNumber);
            }}
          >
            {typeof pageNumber === 'number' ? pageNumber : '...'}
          </button>
        ))}
      </div>

      <button className={cx('arrow')} type="button" onClick={next}>
        <Image
          width={20}
          height={20}
          src={active === params.total ? image.rightGray.src : image.rightBlack.src}
          alt={active === params.total ? image.rightGray.alt : image.rightBlack.alt}
        />
      </button>
    </div>
  );
};
