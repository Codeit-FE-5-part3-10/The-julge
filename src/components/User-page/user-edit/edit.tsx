import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './edit.module.scss';
import { useToken } from '@/src/utils/TokenProvider';
import { updateUser } from '@/src/apis/user';
import { UserInfo } from '@/src/types/apis/user/userInfo';
import { Button } from '@/src/components/common/ui-button/Button';
import { ADDRESS } from '@/src/constants/constant';

const cx = classNames.bind(styles);

export function UserInfoUpdateForm() {
  const { userInfo, setUserInfo } = useToken();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: {
      name: '',
      phone: '',
      address: undefined,
      bio: '',
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name || '',
        phone: userInfo.phone || '',
        address: userInfo.address || undefined,
        bio: userInfo.bio || '',
      });
    }
  }, [userInfo, reset]);

  const onSubmit = async (formData: UserInfo) => {
    try {
      if (!userInfo || !userInfo.id) {
        console.error('사용자 정보가 유효하지 않습니다.');
        return;
      }
      const token = localStorage.getItem('token');
      const response = await updateUser(userInfo.id, token, formData);
      const { id, email, type, name, phone, address, bio } = response.item as UserInfo;
      const newUserInfo: UserInfo = { id, email, type, name, phone, address, bio };
      if (setUserInfo) {
        setUserInfo(newUserInfo);
      } else {
        // eslint-disable-next-line no-console
        console.error('setUserInfo 함수가 정의되지 않았습니다.');
      }
      // eslint-disable-next-line no-console
      console.log('수정 요청 성공!', response.item);
      reset();
      router.push(`/user/${userInfo?.id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('수정 요청 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
      <div className={cx('title')}>내 프로필</div>
      <div className={cx('wrap')}>
        <div className={cx('form-group')}>
          <label htmlFor="name" className={cx('form-label')}>
            이름
          </label>
          <input
            id="name"
            placeholder="입력"
            className={cx('form-control')}
            {...register('name', { required: '이름은 필수 항목입니다.' })}
          />
          {errors.name && <p className={cx('form-error')}>{errors.name.message}</p>}
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="phone" className={cx('form-label')}>
            연락처
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="입력"
            className={cx('form-control')}
            {...register('phone', { required: '전화번호는 필수 항목입니다.' })}
          />
          {errors.phone && <p className={cx('form-error')}>{errors.phone.message}</p>}
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="address" className={cx('form-label')}>
            선호지역
          </label>
          <select
            id="address"
            className={cx('form-select')}
            {...register('address', { required: '선호지역은 필수 항목입니다.' })}
          >
            <option value="">선호지역을 선택하세요</option>
            {ADDRESS.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
          {errors.address && <p className={cx('form-error')}>{errors.address.message}</p>}
        </div>

        <div className={cx('form-group', 'item4')}>
          <label htmlFor="bio" className={cx('form-label')}>
            소개
          </label>
          <textarea
            id="bio"
            placeholder="입력"
            className={cx('form-textarea')}
            {...register('bio', { required: '소개는 필수 항목입니다.' })}
          />
          {errors.bio && <p className={cx('form-error')}>{errors.bio.message}</p>}
        </div>
      </div>
      <Button type="submit" color="primary" width={351}>
        등록하기
      </Button>
    </form>
  );
}
