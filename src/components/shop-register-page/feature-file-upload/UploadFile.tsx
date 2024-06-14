import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './UploadFile.module.scss';
import cameraIcon from '@/public/images/form-camera.svg';

const cx = classNames.bind(styles);

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  return (
    <div className={cx('container')}>
      {selectedFile ? (
        <Image
          fill
          src={URL.createObjectURL(selectedFile)}
          alt="Uploaded Image"
          className={cx('image')}
        />
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
