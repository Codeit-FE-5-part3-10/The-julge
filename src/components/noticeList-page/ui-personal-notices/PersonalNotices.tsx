import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@mantine/core';
import styles from './PersonalNotices.module.scss';
import CardItem from '../../common/cardItem/CardItem';
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

  useEffect(() => {
    if (userInfo && userInfo.address) {
      setUserAddress(userInfo.address);
    }
  }, [userInfo]);

  useEffect(() => {
    const container = containerRef.current; // container변수에 containerRef가 참조하는 DOM 요소 할당

    if (!container) return;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        // 스크롤 위치와 컨테이너의 가시 너비의 합이 전체 콘텐츠 너비와 같거나 더 큰지 확인
        // 조건이 참이면 컨테이너가 끝까지 스크롤된 상태. 그럼 처음으로
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 350; // 아니면 100픽셀씩 스크롤
      }
    }, 2000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
    // useEffect의 클린업 함수. 컴포넌트가 언마운트 되거나 useEffect가 다시 실행될 때 clearInterval을 호출
    // 이전 타이머 정리
  }, []);

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
      <div className={cx('title-container')}>
        <h1 className={cx('title')}>맞춤 공고</h1>
      </div>
      <div className={cx('noticesList-container')} ref={containerRef}>
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
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
