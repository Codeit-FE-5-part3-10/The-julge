import React from 'react';
import classNames from 'classnames/bind';
import defaultImg from 'public/images/default.jpg';
import Image from 'next/image';
import styles from './DetailShop.module.scss';
import locationIcon from '@/public/images/card-location-red.svg';
import { Button } from '../../common/ui-button/Button';

const cx = classNames.bind(styles);

interface DetailShopProps {
  params: { name: string; location: string; description: string; imageUrl: string };
}

export const DetailShop: React.FC<{ params: DetailShopProps['params'] }> = ({
  params: { name, location, description, imageUrl },
}) => (
  <div className={cx('container')}>
    <div className={cx('image')}>
      <Image layout="fill" alt="가게 이미지" src={imageUrl} style={{ objectFit: 'cover' }} />
    </div>
    <div className={cx('info')}>
      <p className={cx('label')}>식당</p>
      <p className={cx('name')}>{name}</p>
      <div className={cx('box')}>
        <Image className={cx('icon')} src={locationIcon} alt="주소 아이콘" />
        <p className={cx('description', 'gray')}>{location}</p>
      </div>
      <p className={cx('description')}>{description}</p>
    </div>
    <div className={cx('buttons')}>
      <Button color="white" to="/shopEdit">
        편집하기
      </Button>
      <Button color="primary" to="/NoticeEdit">
        공고 등록하기
      </Button>
    </div>
  </div>
);
