import classNames from 'classnames/bind';
import styles from 'src/components/noticeList-page/ui-allNotices/AllNotices.module.scss';
import { useEffect, useState } from 'react';
import { NoticeList } from '../../common/feature-notice-list/NoticeList';

const cx = classNames.bind(styles);

export function RecentNotice() {
  const [recentItems, setRecentItems] = useState([]); // 최근에 본 공고를 담을 상태

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('recentItems') || '[]'); // 로컬 스토리지에서 최근에 본 공고 가져오기
    setRecentItems(storedItems);
  }, []);

  return (
    <div className={cx('container')}>
      <div>
        {/* NoticeList에 정렬된 items 전달 */}
        <NoticeList items={recentItems} />
      </div>
    </div>
  );
}
