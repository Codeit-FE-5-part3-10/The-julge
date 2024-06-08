import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './DetailShop.module.scss';
import locationIcon from '@/public/images/card-location-red.svg';
import { Button } from '../ui-button/Button';

const cx = classNames.bind(styles);

interface DetailShopProps {
  shop: { name: string; address1: string; description: string; imageUrl: string };
}

export const DetailShop: React.FC<{ shop: DetailShopProps['shop'] }> = ({
  shop: { name, address1, description, imageUrl },
}) => (
  <div className={cx('container')}>
    <div className={cx('image')} style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className={cx('info')}>
      <p className={cx('label')}>식당</p>
      <p className={cx('name')}>{name}</p>
      <div className={cx('box')}>
        <Image className={cx('icon')} src={locationIcon} alt="주소 아이콘" />
        <p className={cx('address1')}>{address1}</p>
      </div>
      <p className={cx('description')}>{description}</p>
    </div>
    <div className={cx('buttons')}>
      <Button text="편집하기" color="white" to="/shopEdit" />
      <Button text="공고 등록하기" color="primary" to="/NoticeEdit" />
    </div>
  </div>
);
