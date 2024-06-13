import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './NoticeList.module.scss';
import { CardItem } from '../cardItem/CardItem';

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

const MAX_ITEMS = 6; // 최대 저장할 요소 개수

export const NoticeList: React.FC<NoticeListProps> = ({ items }) => {
  const handleOnClick = (item: CardItemProps) => {
    const storedItems = JSON.parse(localStorage.getItem('recentItems') || '[]') as CardItemProps[];

    // 중복된 noticeId가 있는지 확인
    if (storedItems.some((storedItem) => storedItem.noticeId === item.noticeId)) {
      console.log('Item already exists in localStorage:', item);
      return; // 중복된 경우 저장하지 않고 종료
    }

    // 새로운 아이템을 배열의 맨 앞에 추가
    const newItems = [item, ...storedItems.slice(0, MAX_ITEMS - 1)];

    localStorage.setItem('recentItems', JSON.stringify(newItems));
    console.log('Item selected:', item);
  };

  return (
    <div className={cx('list')}>
      {items?.map((item, index) => (
        <Link
          href={`/shops/${item.shopId}/notices/${item.noticeId}`}
          key={index}
          onClick={() => handleOnClick(item)}
        >
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
};
