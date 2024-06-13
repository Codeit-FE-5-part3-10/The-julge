import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@mantine/core';
import styles from './PersonalNotices.module.scss';
import { CardItem } from '../../common/cardItem/CardItem';
import { GetNoticesRequest, getNotice } from '@/src/apis/notices';
import { useToken } from '@/src/utils/TokenProvider';
import { GetNoticesResponse } from '@/src/types/apis/noticeTypes';

const cx = classNames.bind(styles);

export default function PersonalNotices() {
  const { userInfo } = useToken();
  const [userAddress, setUserAddress] = useState<string>('');
  const defaultRequestParams: GetNoticesRequest = {
    offset: 0,
    limit: 6,
  };

  const containerRef = useRef<HTMLDivElement>(null); // 자동 스크롤을 위한 Ref
  const itemRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const handleWidthCalculated = (width: number) => {
    setCardWidth(width); // CardItem 컴포넌트의 너비를 상태로 관리
  };
  const [scrollPosition, setScrollPosition] = useState<number>(0); // 스크롤 위치 상태 추가

  useEffect(() => {
    const container = containerRef.current; // container변수에 containerRef가 참조하는 DOM 요소 할당

    if (!container) return;
    // 새로고침 시 스크롤 위치 복원
    container.scrollLeft = scrollPosition;
    const interval = setInterval(() => {
      // // const scrollAmount =
      console.log('width:', cardWidth);
      console.log('container.scrollLeft: ', container.scrollLeft);
      console.log('container.clientWidth: ', container.clientWidth);
      console.log('container.scrollWidth: ', container.scrollWidth);

      if (container.scrollLeft + container.clientWidth + 1 >= container.scrollWidth) {
        // 스크롤 위치와 컨테이너의 가시 너비의 합이 전체 콘텐츠 너비와 같거나 더 큰지 확인
        // 조건이 참이면 컨테이너가 끝까지 스크롤된 상태. 그럼 처음으로
        container.scrollLeft = 0;
      } else {
        // container.scrollLeft += 100;
        container.scrollLeft += cardWidth;
      }
    }, 2000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
    // useEffect의 클린업 함수. 컴포넌트가 언마운트 되거나 useEffect가 다시 실행될 때 clearInterval을 호출
    // 이전 타이머 정리
  }, [cardWidth, scrollPosition]);

  useEffect(() => {
    if (userInfo && userInfo.address) {
      setUserAddress(userInfo.address);
    }
  }, [userInfo]);

  let queryString = `?offset=${defaultRequestParams.offset}&limit=${defaultRequestParams.limit}`;

  if (userAddress) {
    const addressParams = `address=${encodeURIComponent(userAddress)}`;
    queryString += `&${addressParams}`;
  }

  const { isLoading, error, data } = useQuery<GetNoticesResponse>({
    queryKey: ['notices', userAddress], // 주소가 변경될 때마다 쿼리 다시 실행
    queryFn: () => getNotice(queryString), // getNotices 함수 호출
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>API 전송 오류</div>;
  }

  const items =
    data?.items.map((item) => ({
      title: item.item.shop.item.name,
      date: item.item.startsAt.toString(),
      workhour: item.item.workhour,
      location: item.item.shop.item.address1,
      wage: item.item.hourlyPay,
      imageUrl: item.item.shop.item.imageUrl,
      originalWage: item.item.shop.item.originalHourlyPay,
      shopId: item.item.shop.item.id,
      noticeId: item.item.id,
    })) || [];

  return (
    <div className={cx('container')}>
      <div className={cx('section')}>
        <div className={cx('title-container')}>
          <h1 className={cx('title')}>맞춤 공고</h1>
        </div>
        <div className={cx('scroll-container')} ref={containerRef}>
          <div className={cx('noticesList-container')} ref={itemRef}>
            {items.map((item, index) => (
              <Link href={`/shops/${item.shopId}/notices/${item.noticeId}`} key={index}>
                <CardItem
                  title={item.title}
                  date={item.date}
                  time={item.workhour}
                  location={item.location}
                  wage={item.wage}
                  imageUrl={item.imageUrl}
                  originalWage={item.originalWage}
                  onWidthCalculated={handleWidthCalculated}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
