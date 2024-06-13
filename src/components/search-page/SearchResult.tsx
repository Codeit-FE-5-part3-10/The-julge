import classNames from 'classnames/bind';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styles from './SearchResult.module.scss';
import DropDown from '../noticeList-page/ui-allNotices/DropDown';
import FilterButton from '../noticeList-page/ui-allNotices/FilterButton';
import { NoticeList } from '../common/feature-notice-list/NoticeList';
import { PaginationTest } from '../common/ui-pagination/PaginationTest';
import { FilterData } from '../noticeList-page/ui-filter/Filter';
import { formatDate } from '@/src/utils/formatDateTime';
import { GetNoticesRequest, GetNoticesResponse } from '@/src/types/apis/noticeTypes';
import { getNotice } from '@/src/apis/notices';

const cx = classNames.bind(styles);

export default function SearchResult() {
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [sortOption, setSortOption] = useState<'time' | 'pay' | 'hour' | 'shop'>('time'); // 기본 정렬 옵션을 'time'으로 설정
  const [filterData, setFilterData] = useState<FilterData>({
    selectedRegions: [],
    selectedDate: '',
  });
  const router = useRouter();
  const { keyword } = router.query;

  const handleApplyFilter = (filteredData: FilterData) => {
    setFilterData(filteredData);
  };

  const defaultRequestParams: GetNoticesRequest = {
    offset: (currentPage - 1) * 6,
    limit: 6,
    startsAtGte: filterData.selectedDate
      ? formatDate(new Date(filterData.selectedDate))
      : undefined,
    hourlyPayGte: filterData.wage,
    sort: sortOption,
  };

  let queryString = `?offset=${defaultRequestParams.offset}&limit=${defaultRequestParams.limit}&keyword=${keyword}&sort=${defaultRequestParams.sort}`;

  if (filterData.selectedRegions.length > 0) {
    const addressParams = filterData.selectedRegions
      .map((region) => `address=${encodeURIComponent(region)}`)
      .join('&');
    queryString += `&${addressParams}`;
  }

  if (filterData.selectedDate && defaultRequestParams.startsAtGte) {
    queryString += `&startsAtGte=${encodeURIComponent(defaultRequestParams.startsAtGte)}`;
  }

  if (filterData.wage && defaultRequestParams.hourlyPayGte) {
    queryString += `&hourlyPayGte=${defaultRequestParams.hourlyPayGte}`;
  }

  const { isLoading, error, data } = useQuery<GetNoticesResponse>({
    queryKey: ['notices', currentPage, sortOption, filterData, keyword], // 페이지 번호와 정렬 옵션을 queryKey에 포함
    queryFn: () => getNotice(queryString), // getNotices 함수 호출
  });

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

  const count = data?.count ?? 1;
  let totPage;
  if (count % 6) {
    totPage = count / 6 + 1;
  } else {
    totPage = count / 6;
  }

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
      <div>
        <div className={cx('titleFilter-container')}>
          <h1 className={cx('title')}>{keyword}에 대한 공고 목록</h1>
          <div className={cx('dropDownFilter-container')}>
            {/* DropDown 컴포넌트에 onSelectSortOption 콜백 함수 전달 */}
            <DropDown onSelectSortOption={handleSortOptionChange} selectedOption={sortOption} />
            <FilterButton onApply={handleApplyFilter} />
          </div>
        </div>
        {/* NoticeList에 정렬된 items 전달 */}
        {items.length > 0 ? (
          <>
            <NoticeList items={items} />
            <PaginationTest
              total={totPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <div className={cx('noResults')}>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
