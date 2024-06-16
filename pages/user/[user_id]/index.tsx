import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserApplicationlist } from '@/src/apis/user';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { ProfileCard } from '@/src/components/User-page/ui-profile-card/ProfileCard';
import { Section } from '@/src/layouts/section/Section';
import { useToken } from '@/src/utils/TokenProvider';
import UserApplicationTable from '@/src/components/User-page/ui-table/TableForCandidate';

const Myprofile = () => {
  const router = useRouter();
  const { user_id: userId } = router.query;
  const { userInfo } = useToken();

  const {
    data: userProfile,
    error: profileError,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ['userData'], // 고유한 쿼리 키 지정
    queryFn: async () => {
      if (userInfo && userInfo.id) {
        const response = await getUser(userInfo.id);
        return response;
      }
      throw new Error('User ID is not defined');
    },
    enabled: !!userInfo?.id,
  });

  const {
    data: userApplication,
    error: applicationError,
    isLoading: applicationLoading,
  } = useQuery({
    queryKey: ['userApplyList'], // 다른 고유한 쿼리 키 사용
    queryFn: async () => {
      const tempToken = localStorage.getItem('token');
      if (userInfo && userInfo.id) {
        const response = await getUserApplicationlist(userInfo.id, tempToken, 0, 50);
        return response;
      }
      throw new Error('User ID is not defined');
    },
  });

  if (typeof userId !== 'string') {
    return <div>Invalid user ID</div>;
  }

  if (profileLoading && applicationLoading) {
    return <div>Loading...</div>;
  }

  if (profileError || applicationError) {
    return <div>Error loading user data</div>;
  }

  if (!userProfile || !userProfile.item) {
    return <div>No data</div>;
  }

  const userProfileData = userProfile.item ?? {};
  const hasProfile = !!userProfileData.name;
  const hasShop = userApplication?.data?.count !== 0;
  const userApplicationData = userApplication?.data;

  console.log(userApplication?.data.count);

  // console.log(userApplication)

  return (
    <Layout>
      <Section
        title="내 프로필"
        content={
          hasProfile ? (
            <ProfileCard userData={userProfileData} />
          ) : (
            <CardEmpty
              description="내 프로필을 등록하고 원하는 가게에 지원해보세요"
              btnText="내 프로필 등록하기"
              href={`/user/${userInfo?.id}/edit`}
            />
          )
        }
      />
      {hasShop ? (
        <Section
          title="신청 내역"
          content={<UserApplicationTable userApplicationData={userApplicationData} />}
        />
      ) : (
        <Section
          title="신청 내역"
          content={
            <CardEmpty description="아직 신청 내역이 없어요." btnText="공고 보러가기" href="/" />
          }
        />
      )}
    </Layout>
  );
};

export default Myprofile;
