import Image from 'next/image';
import defaultImg from 'public/images/gom.png';
import groupIcon from 'public/images/group.svg';
import locationIcon from 'public/images/path11.svg';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import formatDateTime from 'src/utils/formatDateTime';
import styles from './cardItem.module.scss';
import UpIcon from './UpIcon';
import addHoursToTime from '@/src/utils/addHoursToTime';
import Link from 'next/link';
import { MIN_WAGE } from '@/src/constants/constant';

interface CardItemProps {
  date: string;
  time: number;
  wage: number;
  title: string;
  location: string;
  imageUrl?: string;
}

export default function CardItem({ title, date, time, location, wage, imageUrl }: CardItemProps) {
  const cx = classNames.bind(styles);
  const formattedWage = wage.toLocaleString(); // 천 단위 쉼표 추가
  const difference = wage - MIN_WAGE;
  const n = Math.ceil((difference / MIN_WAGE) * 100); // 최저 임금과 시급 비교해서 나온 %값
  const upIcon = n <= 49 ? '#ff8d72' : '#ff4040';
  const [iconColor, setIconColor] = useState('#ff4040');
  const [textColor, setTextColor] = useState('#ff8d72');
  const { formattedDate, formattedTime } = formatDateTime(date);
  const endTime = addHoursToTime(formattedTime, time);

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

  //TODO: 카드 클릭 시 해당 공고 상세 페이지로 이동하는 기능이 필요할 것 같습니다. (의진)
  return (
    <Link href={''} className={cx('container')}>
      <Image
        className={cx('img')}
        src={imageUrl || defaultImg}
        alt="공고 이미지"
        width={147}
        height={84}
      />
      <p className={cx('title')}>{title}</p>
      <div className={cx('container_dateTime')}>
        <Image className={cx('groupIcon')} src={groupIcon} alt="아이콘" />
        <div className={cx('container_text')}>
          <p className={cx('date')}>{formattedDate}</p>
          <p className={cx('time')}>
            {formattedTime}~{endTime}({time}시간)
          </p>
        </div>
      </div>
      <div className={cx('container_location')}>
        <Image className={cx('locationIcon')} src={locationIcon} alt="위치 아이콘" />
        <p className={cx('location')}>{location}</p>
      </div>
      <div className={cx('container_pay')}>
        <p className={cx('wage')}>{formattedWage}원</p>
        <div className={cx('container_compare')}>
          <p className={cx('compare')} style={{ color: textColor }}>
            기존 시급보다 {n}%
          </p>
          <UpIcon color={iconColor} />
        </div>
      </div>
    </Link>
  );
}
