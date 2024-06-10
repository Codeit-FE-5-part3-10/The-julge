import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './DetailNotice.module.scss';
import locationIcon from '@/public/images/card-location-red.svg';
import watchIcon from '@/public/images/card-time-red.svg';
import { Button } from '../../common/ui-button/Button';
import { MIN_WAGE } from '@/src/constants/constant';
import UpIcon from './UpIcon';

const cx = classNames.bind(styles);

interface DetailNoticeProps {
  params: {
    hourlyPay: number;
    startsAt: Date;
    workhour: number;
    description: string;
    closed: boolean;
    address1: string;
    imageUrl: string;
  };
}

export const DetailNotice: React.FC<{ params: DetailNoticeProps['params'] }> = ({
  params: { hourlyPay, startsAt, workhour, description, closed, address1, imageUrl },
}) => {
  const difference = hourlyPay - MIN_WAGE;
  const n = Math.ceil((difference / MIN_WAGE) * 100); // 최저 임금과 시급 비교해서 나온 %값
  const upIcon = n <= 49 ? '#ff8d72' : '#ff4040';
  const [iconColor, setIconColor] = useState('#ff4040');
  const [textColor, setTextColor] = useState('#ff8d72');

  useEffect(() => {
    //업 아이콘 색상변경
    const updateColors = () => {
      if (window.matchMedia('(min-width:768px)').matches) {
        setIconColor('white');
        setTextColor('white');
      } else {
        setIconColor(upIcon);
        setTextColor(n >= 50 ? '#ff4040' : '#ff8d72');
      }
    };
    updateColors();

    // 창 크기 변경 이벤트 리스너 추가
    window.addEventListener('resize', updateColors);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', updateColors);
    };
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('image')} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={cx('info')}>
        <p className={cx('label')}>시급</p>
        <div>
          <p className={cx('name')}>{hourlyPay}</p>
          <div className={cx('container_compare')}>
            <p className={cx('compare')} style={{ color: textColor }}>
              기존 시급보다 {n}%
            </p>
            <UpIcon color={iconColor} />
          </div>
        </div>
        <div className={cx('box')}>
          <Image className={cx('icon')} src={watchIcon} alt="시계 아이콘" />
          <p className={cx('address1')}>{address1}</p>
        </div>
        <div className={cx('box')}>
          <Image className={cx('icon')} src={locationIcon} alt="주소 아이콘" />
          <p className={cx('address1')}>{address1}</p>
        </div>
        <p className={cx('description')}>{description}</p>
      </div>
      <div className={cx('buttons')}>
        <Button text="편집하기" color="white" to="/NoticeEdit" />
      </div>
    </div>
  );
};
