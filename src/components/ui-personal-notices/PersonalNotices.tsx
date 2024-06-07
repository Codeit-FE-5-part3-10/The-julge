import classNames from 'classnames/bind';
import styles from './PersonalNotices.module.scss';
import CardItem from '../common/cardItem/CardItem';
import { getNotices, postNotice } from '@/src/api/notices';
import { useMutation, useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

export default function PersonalNotices() {
  const { isPending, error, data } = useQuery({
    queryKey: ['notices'],
    queryFn: () => getNotices(),
  });

  const items = data?.items.map((item: any) => ({
    title: item.item.shop.item.name,
    date: item.item.startsAt,
    workhour: item.item.workhour,
    location: item.item.shop.item.address1,
    wage: item.item.shop.item.originalHourlyPay,
  }));

  return (
    <div className={cx('container')}>
      <h1 className={cx('title')}>맞춤 공고</h1>
      <div className={cx('noticesList-container')}>
        {items?.map((items, index) => (
          <CardItem
            key={index}
            title={items.title}
            date={items.date}
            time={items.workhour}
            location={items.location}
            wage={items.wage}
          />
        ))}
      </div>
    </div>
  );
}
