import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getUser, GetUserResponse } from '@/src/apis/user';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { ProfileCard } from '@/src/components/User-page/ui-profile-card/ProfileCard';
import { Section } from '@/src/layouts/section/Section';
import { ListNotice } from '@/src/components/User-page/list-notice/ListNotice';
import { useToken } from '@/src/utils/TokenProvider';

const Myprofile = () => {
  const router = useRouter();
  const { user_id: userId } = router.query;
  const { userInfo } = useToken();

  const {
    data: userProfile,
    error,
    isLoading,
  } = useQuery<GetUserResponse>({
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
  const hasProfile = !!userProfileData.name;
  const hasShop = !!userProfileData.shop;

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
              href="/MyprofileEdit"
            />
          )
        }
      />
      {hasShop ? (
        <Section
          title="내 가게"
          content={
            <ListNotice
              params={{
                name: userProfileData.shop.name,
                location: userProfileData.shop.location,
                imageUrl: userProfileData.shop.imageUrl,
                originalWage: userProfileData.shop.originalWage,
              }}
              shopId={userProfileData.shop.id}
            />
          }
        />
      ) : (
        <Section
          title="내 가게"
          content={
            <CardEmpty
              description="아직 가게가 등록되지 않았습니다."
              btnText="가게 등록하기"
              href="/shopRegister"
            />
          }
        />
      )}
    </Layout>
  );
};

export default Myprofile;
