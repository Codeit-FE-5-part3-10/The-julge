import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './RegisterForm.module.scss';
import { postShopRequest } from '@/src/types/apis/shop/postShop';
import { ADDRESS, CATEGORY } from './constant';
import { postShop, putShop } from '@/src/apis/shops';
import { useToken } from '@/src/contexts/TokenProvider';
import { CustomSelect } from '../../common/feature-select/CustomSelect';
import { FileUpload } from '../feature-file-upload/UploadFile';
import { Button } from '../../common/ui-button/Button';
import { formatCurrency } from '@/src/utils/formatCurrency';

const cx = classNames.bind(styles);

interface RegisterFormProps {
  isUpdate?: boolean;
  existingData?: postShopRequest;
  shopId?: string;
}

export const RegisterForm = ({ isUpdate = false, existingData, shopId }: RegisterFormProps) => {
  const { handleSubmit, control, setValue } = useForm<postShopRequest>({
    defaultValues: existingData || {
      name: '',
      category: '',
      address1: '',
      address2: '',
      description: '',
      imageUrl: '',
      originalHourlyPay: 10000,
    },
  });
  const [imageName, setImageName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { token } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (existingData) {
      Object.keys(existingData).forEach((key) => {
        setValue(key as keyof postShopRequest, existingData[key as keyof postShopRequest]);
      });
    }
  }, [existingData, setValue]);

  const onSubmit = async (data: postShopRequest) => {
    try {
      let presignedUrl = '';

      if (imageFile) {
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
        presignedUrl = responseData.item.url;

        await uploadImageToS3(imageFile, presignedUrl);
      }

      let rawUrl;

      if (isUpdate && imageFile) {
        rawUrl = new URL(presignedUrl);
        const decodedUrl = `${rawUrl.origin}${rawUrl.pathname}`;
        putShop(token, shopId, { ...data, imageUrl: decodedUrl });
        await router.push(`/shops/${shopId}`);
      } else if (isUpdate && !imageFile) {
        putShop(token, shopId, { ...data });
        await router.push(`/shops/${shopId}`);
      } else {
        rawUrl = new URL(presignedUrl);
        const decodedUrl = `${rawUrl.origin}${rawUrl.pathname}`;
        const response = await postShop(token, { ...data, imageUrl: decodedUrl });
        const freshShopId = response.item.id;
        await router.push(`/shops/${freshShopId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  async function uploadImageToS3(file: File, presignedUrl: string) {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to upload image to S3');
      }
    } catch (error) {
      console.error('Error uploading image to S3:', error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageName(e.target.files[0].name);
    setImageFile(e.target.files[0]);
  };

  return (
    <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx('box', 'name')}>
        <label htmlFor="name">가게 이름*</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: '값을 입력해주세요' }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input {...field} className={cx('input')} />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box', 'category')}>
        <label htmlFor="category">분류*</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: '값을 선택해주세요' }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <CustomSelect
                options={CATEGORY}
                value={field.value}
                onChange={field.onChange}
                defaultOption="식당"
              />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box', 'address1')}>
        <label htmlFor="address1">기본 주소*</label>
        <Controller
          name="address1"
          control={control}
          rules={{ required: '값을 선택해주세요' }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <CustomSelect
                options={ADDRESS}
                value={field.value}
                onChange={field.onChange}
                defaultOption="기본 주소"
              />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box', 'address2')}>
        <label htmlFor="address2">상세 주소*</label>
        <Controller
          name="address2"
          control={control}
          rules={{ required: '값을 입력해주세요' }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input {...field} className={cx('input')} />
              {error && <p className={cx('error')}>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className={cx('box', 'originalHourlyPay')}>
        <label htmlFor="originalHourlyPay">기본 시급*</label>
        <Controller
          name="originalHourlyPay"
          control={control}
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
      <div className={cx('box', 'imageUrl')}>
        <label htmlFor="shopImage">가게 이미지</label>
        <FileUpload existingImageUrl={existingData?.imageUrl} onFileChange={handleImageChange} />
      </div>
      <div className={cx('box', 'description')}>
        <label htmlFor="description">가게 설명*</label>
        <Controller
          name="description"
          control={control}
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

      <div className={cx('box', 'button')}>
        <Button type="submit" color="primary">
          {isUpdate ? '수정하기' : '등록하기'}
        </Button>
      </div>
    </form>
  );
};
