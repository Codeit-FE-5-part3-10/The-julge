import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/router';  // useRouter 훅 임포트
import { UserItem } from '@/src/types/apis/user/getUser';
import styles from './ProfileCard.module.scss';
import { Button } from '@/src/components/common/ui-button/Button';

const cx = classNames.bind(styles);

interface ProfileCardProps {
  userData: UserItem;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  const router = useRouter();  // useRouter 훅 사용

  const handleClick = () => {
    router.push('/edit');  // '/edit' 경로로 이동
  };

  return (
    <form>
    </form>
     className={cx('')}>
    </section>
  );
};

