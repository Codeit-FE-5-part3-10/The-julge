import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import formatDateTime from 'src/utils/formatDateTime';
import addHoursToTime from '@/src/utils/addHoursToTime';
import styles from './DetailNotice.module.scss';
import locationIcon from '@/public/images/card-location-red.svg';
import watchIcon from '@/public/images/card-time-red.svg';
import { Button } from '../../common/ui-button/Button';
import UpIcon from './UpIcon';

const cx = classNames.bind(styles);

interface DetailNoticeProps {
  params: {
    wage: number;
    originalWage: number;
    date: string;
    time: number;
    noticeDescription: string;
    shopDescription: string;
    location: string;
    imageUrl: string;
    closed: boolean;
  };
  shopId: string;
  noticeId: string;
}

export const DetailNotice: React.FC<DetailNoticeProps> = ({
  params: {
    wage,
    originalWage,
    date,
    time,
    noticeDescription,
    shopDescription,
    location,
    imageUrl,
  },
  shopId,
  noticeId,
}) => {
  const difference = wage - originalWage;
  const n = Math.ceil((difference / originalWage) * 100); // 최저 임금과 시급 비교해서 나온 %값
  const upIcon = n <= 49 ? '#ff8d72' : '#ff4040';
  const [iconColor, setIconColor] = useState('#ff4040');
  const [textColor, setTextColor] = useState('#ff8d72');
  const formattedWage = wage.toLocaleString();
  const { formattedDate, formattedTime } = formatDateTime(date);
  const newFormattedTime = addHoursToTime(formattedTime, time);

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
    <div className={cx('wrapper')}>
      <div className={cx('container_top')}>
        <div className={cx('image')} style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className={cx('info')}>
          <p className={cx('label')}>시급</p>
          <div className={cx('box')}>
            <p className={cx('name')}>{formattedWage}원</p>
            <div className={cx('container_compare')}>
              <p className={cx('compare')} style={{ color: textColor }}>
                기존 시급보다 {n}%
              </p>
              <UpIcon color={iconColor} />
            </div>
          </div>
          <div className={cx('box')}>
            <Image className={cx('icon')} src={watchIcon} alt="시계 아이콘" />
            <p className={cx('description', 'gray')}>{formattedDate}</p>
            <p className={cx('description', 'gray')}>
              {formattedTime}~{newFormattedTime}({time}시간)
            </p>
          </div>
          <div className={cx('box')}>
            <Image className={cx('icon')} src={locationIcon} alt="주소 아이콘" />
            <p className={cx('description', 'gray')}>{location}</p>
          </div>
          <p className={cx('description')}>{shopDescription}</p>
        </div>
        <div className={cx('buttons')}>
          <Button color="white" to={`/shops/${shopId}/notices/${noticeId}/edit`}>
            공고 편집하기
          </Button>
        </div>
      </div>
      <div className={cx('container_bottom')}>
        <h1 className={cx('description', 'head')}>공고 설명</h1>
        <p className={cx('description')}>{noticeDescription}</p>
      </div>
    </div>
  );
};
