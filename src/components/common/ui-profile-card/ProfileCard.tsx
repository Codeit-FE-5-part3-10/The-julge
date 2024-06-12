import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { UserItem } from '@/src/types/apis/user/getUser';
import styles from './ProfileCard.module.scss';
import { Button } from '@/src/components/common/ui-button/Button';

const cx = classNames.bind(styles);

interface TProfileCardProps {
  userData: UserItem;
}

export const ProfileCard: React.FC<TProfileCardProps> = ({ userData }) => (
  <section className={cx('profile-card')}>
    <div className={cx('profile-wrap')}>
      <div className={cx('profile-title')}>이름</div>
      <div className={cx('profile-name')}>{userData.name}</div>
      <div className={cx('profile-phone')}>
        <Image src="/images/ic-profile-address.svg" alt="addressIcon" width={20} height={20}/>
        {userData.phone}
      </div>
      <div className={cx('profile-address')}>
        <Image src="/images/ic-profile-phone.svg" alt="Address Icon" width={20} height={20} />
        {userData.address}
      </div>
      <p>{userData.bio}</p>
      <Button text="편집하기" color="white" width={169} to="null" />
    </div>
  </section>
);
