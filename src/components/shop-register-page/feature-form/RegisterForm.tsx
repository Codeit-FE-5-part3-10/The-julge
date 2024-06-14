import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './RegisterForm.module.scss';
import { postShopRequest } from '@/src/types/apis/shop/postShop';
import { ADDRESS, CATEGORY } from './constant';
import { postShop } from '@/src/apis/shops';
import { useToken } from '@/src/contexts/TokenProvider';
import { CustomSelect } from '../../common/feature-select/CustomSelect';
import { FileUpload } from '../feature-file-upload/UploadFile';
import { Button } from '../../common/ui-button/Button';

const cx = classNames.bind(styles);

// 숫자를 천 단위로 콤마를 추가하는 유틸리티 함수
const formatCurrency = (value: any) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const RegisterForm = () => {
  const { handleSubmit, control, setValue, watch } = useForm<postShopRequest>();
  const [imageName, setImageName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { token } = useToken();

  console.log(watch());

  const onSubmit = async (data: postShopRequest) => {
    try {
      // presignedURL 요청 및 획득
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/images`, {
        method: 'POST',
        body: JSON.stringify({ name: imageName }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image name to server');
      }
      const responseData = await response.json();
      const presignedUrl = responseData.item.url;

      // S3에 이미지를 업로드
      if (imageFile) {
        await uploadImageToS3(imageFile, presignedUrl);
      }

      // 나머지 데이터와 함께 가게 정보를 등록 (쿼리 파라미터 제외)
      const rawUrl = new URL(presignedUrl);
      const decodedUrl = `${rawUrl.origin}${rawUrl.pathname}`;
      postShop(token, { ...data, imageUrl: decodedUrl });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 이미지를 S3에 업로드하는 함수
  async function uploadImageToS3(file: File, presignedUrl: string) {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log('success!');
      if (!response.ok) {
        throw new Error('Failed to upload image to S3');
      }
    } catch (error) {
      console.error('Error uploading image to S3:', error);
    }
  }

  // 사용자가 이미지를 선택했을 때 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];
    if (file) {
      setImageName(file.name);
      setImageFile(file);
    }
  };

  return (
    <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx('box')}>
        <label htmlFor="name">가게 이름*</label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: '값을 입력해주세요' }}
          render={({ field }) => <input {...field} className={cx('input')} />}
        />
      </div>
      <div className={cx('box')}>
        <label htmlFor="category">분류*</label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: '값을 선택해주세요' }}
          render={({ field, fieldState: { error } }) => (
            <div className={cx('select-wrapper')}>
              <CustomSelect
                options={CATEGORY.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
                defaultOption="식당"
                {...field}
              />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box')}>
        <label htmlFor="address1">기본 주소*</label>
        <Controller
          name="address1"
          control={control}
          defaultValue=""
          rules={{ required: '값을 선택해주세요' }}
          render={({ field, fieldState: { error } }) => (
            <div className={cx('select-wrapper')}>
              <CustomSelect
                {...field}
                options={ADDRESS.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
                defaultOption="기본 주소"
              />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box')}>
        <label htmlFor="address2">상세 주소*</label>
        <Controller
          name="address2"
          control={control}
          defaultValue=""
          rules={{ required: '값을 입력해주세요' }}
          render={({ field }) => <input {...field} className={cx('input')} />}
        />
      </div>
      <div className={cx('box')}>
        <label htmlFor="originalHourlyPay">기본 시급*</label>
        <Controller
          name="originalHourlyPay"
          control={control}
          defaultValue={10000}
          rules={{
            required: '값을 입력해주세요',
            min: { value: 9000, message: '최저시급은 9,000원입니다.' },
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력 가능합니다.',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                type="text"
                {...field}
                value={formatCurrency(field.value)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, '');
                  field.onChange(rawValue);
                  setValue('originalHourlyPay', rawValue ? parseInt(rawValue) : 0);
                }}
                className={cx('input')}
              />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box')}>
        <label htmlFor="shopImage">가게 이미지</label>
        <FileUpload onFileChange={handleImageChange} />
      </div>
      <div className={cx('box')}>
        <label htmlFor="description">가게 설명*</label>
        <Controller
          name="description"
          control={control}
          defaultValue="입력"
          rules={{
            required: '값을 입력해주세요',
            maxLength: { value: 200, message: '설명은 200자 이내로 입력해주세요.' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <textarea {...field} rows={4} className={cx('textarea')} />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>

      <Button type="submit" color="primary">
        등록하기
      </Button>
    </form>
  );
};
