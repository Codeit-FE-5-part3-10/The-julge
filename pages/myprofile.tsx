import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@/src/apis/user';
import { getToken, transTokenUserId } from '@/src/apis/token';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { MyprofileLayout } from '@/src/layouts/myprofile-layout/MyprofileLayout';
import { TableForCandidate } from '@/src/components/common/ui-table/TableForCandidate';
import { ProfileCard } from '@/src/components/common/ui-profile-card/ProfileCard';

export default function Myprofile() {
  const [token, setToken] = useState<string | null>(null);
  const MINUTE = 1000 * 60;

  /*
TODO
- 로그인 완성 되면 아래 토큰 없을때 실행 코드 대체
- TableForCandidate 컴포넌트 오류 확인 후 추가
*/

  useEffect(() => {
    const fetchToken = async () => {
      if (!token) {
        // 토큰이 없을 때만 실행
        const result = await getToken('kk@test.com', 'password123');
        setToken(result.item.token);
      }
    };
    fetchToken();
  }, [token]);

  const {
    data: userId,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['userId'],
    queryFn: async () => {
      if (token) {
        return transTokenUserId(token);
      }
      return null;
    },
    enabled: !!token,
    staleTime: 1 * MINUTE,
    gcTime: 30 * MINUTE,
    retry: 3,
  });

  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (userId) {
        const result = await getUser(userId);
        return result;
      }
      return null;
    },
    enabled: !!userId,
    staleTime: 1 * MINUTE,
    gcTime: 30 * MINUTE,
    retry: 3,
  });

  const userProfileData = profileData?.item ?? {};

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function hasKey(obj: object, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  const hasProfile = hasKey(userProfileData, 'name');
  const hasNotices = userProfileData?.shop !== undefined;

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

        // list={
        //   hasProfile && hasNotices ? (
        //     <TableForCandidate applications={userProfileData.applications} />
        //   ) : hasProfile ? (
        //     <CardEmpty
        //       description="아직 신청 내역이 없어요."
        //       btnText="공고 보러가기"
        //       href="/list"
        //     />
        //   ) : null
        // }
      />
    </Layout>
  );
}
