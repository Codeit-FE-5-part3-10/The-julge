import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/router'; // useRouter 훅 임포트
import { UserItem } from '@/src/types/apis/user/getUser';
import styles from './ProfileCard.module.scss';
import { Button } from '@/src/components/common/ui-button/Button';

const cx = classNames.bind(styles);

interface ProfileCardProps {
  userData: UserItem;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  const router = useRouter(); // useRouter 훅 사용

  const handleClick = () => {
    router.push(`/user/${userData.id}/edit`); // '/edit' 경로로 이동
  };

  return (
    <section className={cx('profile-card')}>
      <div className={cx('profile-wrap')}>
        <div className={cx('profile-title')}>이름</div>
        <div className={cx('profile-name')}>{userData.name}</div>
        <div className={cx('profile-phone')}>{userData.email}</div>
        <div className={cx('profile-phone')}>
          <Image src="/images/ic-profile-phone.svg" alt="addressIcon" width={20} height={20} />
          {userData.phone}
        </div>
        <div className={cx('profile-address')}>
          <Image src="/images/ic-profile-address.svg" alt="Address Icon" width={20} height={20} />
          {userData.address}
        </div>
        <p>{userData.bio}</p>
        <div className={cx('btn')}>
          <Button color="white" width={169} onClick={handleClick}>
            편집하기
          </Button>
        </div>
      </div>
    </section>
  );
};
