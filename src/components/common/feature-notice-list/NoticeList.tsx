import classNames from 'classnames/bind';
import React from 'react';
import styles from './NoticeList.module.scss';
import { NoticeCard } from '../ui-notice-card/NoticeCard';
import CardItem from '../cardItem/CardItem';

const cx = classNames.bind(styles);

interface CardItemProps {
  title: string;
  date: string;
  workhour: number;
  location: string;
  wage: number;
  imageUrl: string;
}

interface NoticeListProps {
  items: CardItemProps[];
}

export const NoticeList: React.FC<NoticeListProps> = ({ items }) => (
  <div className={cx('container')}>
    {items?.map((item, index) => (
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
);
