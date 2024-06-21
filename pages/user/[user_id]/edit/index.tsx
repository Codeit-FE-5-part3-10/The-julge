import React from 'react';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { UserInfoUpdateForm } from '@/src/components/User-page/user-edit/edit';

export default function MyprofileEdit() {
  return (
    <div>
      <Layout><UserInfoUpdateForm /></Layout>
    </div>
  );
}

/*
todo
  1.폼만들기
    유저 프로필 유
      쿼리클라 기존 저장된 프로필데이터 사용 있을때
    유저 프로필 무
      쿼리클라 기존 저장된 프로필데이터 사용 없을때
*/
