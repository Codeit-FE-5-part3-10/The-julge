import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './UploadFile.module.scss';
import cameraIcon from '@/public/images/form-camera.svg';

const cx = classNames.bind(styles);

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  existingImageUrl?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, existingImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(existingImageUrl || null);

  useEffect(() => {
    setImageUrl(existingImageUrl || null);
  }, [existingImageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      onFileChange(event);
    }
  };

  return (
    <div className={cx('container')}>
      {imageUrl ? (
        <Image fill src={imageUrl} alt="Uploaded Image" className={cx('image')} />
      ) : (
        <div className={cx('box')}>
          <Image width={32} height={32} src={cameraIcon} alt="가게 기본 이미지" />
          <p>이미지 추가하기</p>
        </div>
      )}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        className={cx('file-input')}
      />
    </div>
  );
};
