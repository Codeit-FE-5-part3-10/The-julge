import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getUser, GetUserResponse } from '@/src/apis/user';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { MyprofileLayout } from '@/src/layouts/myprofile-layout/MyprofileLayout';
import { ProfileCard } from '@/src/components/User-page/ui-profile-card/ProfileCard';
import { Section } from '@/src/layouts/section/Section';
import { ListApplication } from '@/src/components/User-page/list-notice/ListNotice';
import { useToken } from '@/src/utils/TokenProvider';

export default function Myprofile() {
  const router = useRouter();
  const { user_id: userId } = router.query;
  const { userInfo } = useToken();

  const { data: userProfile, error, isLoading } = useQuery<GetUserResponse>({
    queryKey: ['getUser', userInfo?.id],
    queryFn: async () => {
      if (userInfo && userInfo.id) {
        const response = await getUser(userInfo.id);
        return response;
      }
      throw new Error('User ID is not defined');
    },
    enabled: !!userInfo?.id,
  });

  if (typeof userId !== 'string') {
    return <div>Invalid user ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!userProfile || !userProfile.item) {
    return <div>No data</div>;
  }

  const userProfileData = userProfile.item ?? {};
  const usershop = userProfile.item.shop ?? {};

  function hasKey(obj: object, key: string) {
    if (typeof obj === 'object') {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    return false;
  }

  const hasProfile = hasKey(userProfileData, 'name');
  const hasNotices = userProfile.item.shop !== undefined;

  return (
    <Layout>
      <MyprofileLayout
        profile={
          hasProfile ? (
            <Section
              title="내 가게"
              content={<ProfileCard userData={userProfileData} />}
            />
          ) : (
            <CardEmpty
              description="내 프로필을 등록하고 원하는 가게에 지원해보세요"
              btnText="내 프로필 등록하기"
              href="/MyprofileEdit"
            />
          )
        }
        list={
          hasProfile && hasNotices ? (
            <ListApplication />
          ) : hasProfile ? (
            <CardEmpty
              description="아직 신청 내역이 없어요."
              btnText="공고 보러가기"
              href="/list"
            />
          ) : null
        }
      />
    </Layout>
  );
}
