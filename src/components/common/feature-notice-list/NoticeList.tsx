import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './NoticeList.module.scss';
import CardItem from '../cardItem/CardItem';

const cx = classNames.bind(styles);

interface CardItemProps {
  title: string;
  date: string;
  workhour: number;
  location: string;
  wage: number;
  imageUrl: string;
  originalWage: number;
  shopId?: string;
  noticeId?: string;
}

interface NoticeListProps {
  items: CardItemProps[];
}

export const NoticeList: React.FC<NoticeListProps> = ({ items }) => (
  <div className={cx('list')}>
    {items?.map((item, index) => (
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
);
