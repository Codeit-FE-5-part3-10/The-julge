import classNames from 'classnames/bind';
import styles from './PersonalNotices.module.scss';
import CardItem from '../common/cardItem/CardItem';
import { getNotice } from '@/src/apis/notices';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

export default function PersonalNotices() {
  const defaultRequestParams = {
    offset: 0,
    limit: 6,
  };

  const containerRef = useRef<HTMLDivElement>(null); // 자동 스크롤을 위한 Ref

  const { isLoading, error, data } = useQuery({
    queryKey: ['notices'],
    queryFn: () => getNotice(defaultRequestParams),
  });

  const items =
    data?.items.map((item) => ({
      title: item.item.shop.item.name,
      date: item.item.startsAt.toString(),
      workhour: item.item.workhour,
      location: item.item.shop.item.address1,
      wage: item.item.shop.item.originalHourlyPay,
      imageUrl: item.item.shop.item.imageUrl,
    })) || [];

  const sortedItems = items
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6); // 맞춤 공고 비로그인 상태일때 마감일자 기준 정렬

  useEffect(() => {
    const container = containerRef.current; // container변수에 containerRef가 참조하는 DOM 요소 할당

    if (!container) return;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        // 스크롤 위치와 컨테이너의 가시 너비의 합이 전체 콘텐츠 너비와 같거나 더 큰지 확인
        // 조건이 참이면 컨테이너가 끝까지 스크롤된 상태. 그럼 처음으로
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 150; // 아니면 100픽셀씩 스크롤
      }
    }, 2000);

    return () => clearInterval(interval);
    // useEffect의 클린업 함수. 컴포넌트가 언마운트 되거나 useEffect가 다시 실행될 때 clearInterval을 호출
    // 이전 타이머 정리
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notices</div>;
  }

  return (
    <div className={cx('container')}>
      <div>
        <h1 className={cx('title')}>맞춤 공고</h1>
        <div className={cx('noticesList-container')} ref={containerRef}>
          {sortedItems.map((item, index) => (
            <CardItem
              key={index}
              title={item.title}
              date={item.date}
              time={item.workhour}
              location={item.location}
              wage={item.wage}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
