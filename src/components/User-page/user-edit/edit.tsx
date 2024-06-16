import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './edit.module.scss';
import { useToken } from '@/src/utils/TokenProvider';
import { updateUser } from '@/src/apis/user';
import { UserInfo } from '@/src/types/apis/user/userInfo';
import { Button } from '@/src/components/common/ui-button/Button';

const cx = classNames.bind(styles);

const addresses = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구',
];

export function UserInfoUpdateForm() {
  const { userInfo, setUserInfo } = useToken();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        bio: userInfo.bio,
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
      const { id, email, type, name, phone, address, bio } = response.item;
      const newUserInfo = { id, email, type, name, phone, address, bio };
      if (setUserInfo) {
        setUserInfo(newUserInfo);
      } else {
        console.error('setUserInfo 함수가 정의되지 않았습니다.');
      }
      console.log('수정 요청 성공!', response.data);
      reset();
      router.push(`/user/${userInfo?.id}`);
    } catch (error) {
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
            {addresses.map((address) => (
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
      <Button type="submit" color="primary" width={351} className={cx('form-button')}>
        등록하기
      </Button>
    </form>
  );
}
