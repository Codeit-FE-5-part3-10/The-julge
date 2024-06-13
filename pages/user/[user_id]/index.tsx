import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getUser } from '@/src/apis/user';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { MyprofileLayout } from '@/src/layouts/myprofile-layout/MyprofileLayout';
import { ProfileCard } from '@/src/components/User-page/ui-profile-card/ProfileCard';
import { Section } from '@/src/layouts/section/Section';
import { ListApplication } from '@/src/components/notice-page/feature-list-applications/ListApplications';
import { useToken } from '@/src/utils/TokenProvider';

export default function Myprofile() {
  const router = useRouter();
  const { user_id: userId } = router.query;
  const { userInfo } = useToken();
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const reqUserProfileData = await getUser(userInfo.id)
      setUserProfile(reqUserProfileData);
    };

    getProfile();
  }, [userProfile]);

  if (typeof userId !== 'string') {
    return <div>Invalid user ID</div>;
  }

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['getUser', userId],
  //   queryFn: async () => {
  //     const response = await getUser(userId);
  //     return response;
  //   },
  //   enabled: !!userId,
  // });

  // TODO: 로딩, 오류 처리
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading shop data</div>;
  // }

  // // 데이터와 data.item이 정의되어 있는지 확인
  // if (!data || !data.item) {
  //   return <div>No data</div>;
  // }

  // const {
  //   name,
  //   address1: location,
  //   description,
  //   imageUrl,
  //   originalHourlyPay: originalWage,
  // } = data.item;

  /*
TODO
- 로그인 완성 되면 아래 토큰 없을때 실행 코드 대체
- TableForCandidate 컴포넌트 오류 확인 후 추가
*/

  const userProfileData = userProfile?.item ?? {};
  const usershop = userProfile?.item.shop ?? {};

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function hasKey(obj: object, key: string) {
    if (typeof obj === 'object') {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
      return obj;
    }
  const hasProfile = hasKey(userProfile, 'name');
  const hasNotices = userProfile?.shop !== undefined;

  return (
    <Layout>
      <MyprofileLayout
        profile={
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
        //eslint-disable-next-line react/jsx-props-no-multi-spaces
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
