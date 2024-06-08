// AllNotices.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import styles from './AllNotices.module.scss';
import { NoticeList } from '../common/feature-notice-list/NoticeList';
import DropDown from './DropDown';
import Filter from './Filter';
import { PaginationTest } from '../common/ui-pagination/PaginationTest';
import { getNotices, GetNoticesRequest } from '@/src/api/notices';

const cx = classNames.bind(styles);

export default function AllNotices() {
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [sortOption, setSortOption] = useState<'time' | 'pay' | 'hour' | 'shop'>('time'); // 기본 정렬 옵션을 'time'으로 설정

  const defaultRequestParams: GetNoticesRequest = {
    offset: (currentPage - 1) * 6,
    limit: 6,
    sort: sortOption,
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['notices', currentPage, sortOption], // 페이지 번호와 정렬 옵션을 queryKey에 포함
    queryFn: () => getNotices(defaultRequestParams), // getNotices 함수 호출
  });

  const items =
    data?.items.map((item) => ({
      title: item.item.shop.item.name,
      date: item.item.startsAt.toString(),
      workhour: item.item.workhour,
      location: item.item.shop.item.address1,
      wage: item.item.hourlyPay,
      imageUrl: item.item.shop.item.imageUrl,
    })) || [];

  const handleSortOptionChange = (option: 'time' | 'pay' | 'hour' | 'shop') => {
    setSortOption(option);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }

  if (error) {
    return <div>Error loading notices</div>; // 에러 상태 처리
  }

  return (
    <div className={cx('container')}>
      <div className={cx('titleFilter-container')}>
        <h1 className={cx('title')}>전체 공고</h1>
        <div className={cx('dropDownFilter-container')}>
          {/* DropDown 컴포넌트에 onSelectSortOption 콜백 함수 전달 */}
          <DropDown onSelectSortOption={handleSortOptionChange} selectedOption={sortOption} />
          <Filter />
        </div>
      </div>
      {/* NoticeList에 정렬된 items 전달 */}
      <NoticeList items={items} />
      <PaginationTest total={50} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
