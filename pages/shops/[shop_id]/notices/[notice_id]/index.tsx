import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { getShopSingleNotice } from '@/src/apis/notices';
import { Section } from '@/src/layouts/section/Section';
import { DetailNotice } from '@/src/components/notice-page/ui-detail-notice/DetailNotice';
import { ListApplication } from '@/src/components/notice-page/feature-list-applications/ListApplications';
import { ModalProvider } from '@/src/contexts/ModalContext';
import NoticeDetail from '@/src/components/detail-page/ui-noticeDetail-page/NoticeDetail';
import { useToken } from '@/src/utils/TokenProvider';
import { getUserItem } from '@/src/apis/user';

export default function Notice() {
  const router = useRouter();
  const { shop_id: shopId, notice_id: noticeId } = router.query;
  const [userType, setUserType] = useState('');
  const { userInfo } = useToken();
  const [myShopId, setMyShopId] = useState<string>();
  const [isMyShop, setIsMyShop] = useState<boolean>();
  useEffect(() => {
    if (userInfo?.type === 'employer') {
      setUserType('employer');
    } else if (userInfo?.type === 'employee') {
      setUserType('employee');
    } else {
      setUserType('');
    }

    if (shopId === myShopId) {
      setIsMyShop(true);
    } else {
      setIsMyShop(false);
    }
  }, [userInfo, myShopId]);

  if (typeof shopId !== 'string') {
    return <div>Invalid shop ID</div>;
  }

  if (typeof noticeId !== 'string') {
    return <div>Invalid notice ID</div>;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['getShopSingleNotice', shopId, noticeId],
    queryFn: async () => {
      const response = await getShopSingleNotice(shopId, noticeId);
      return response;
    },
    enabled: !!shopId && !!noticeId,
  });

  const userId = userInfo?.id;
  const { data: profileData } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (userId) {
        const result = await getUserItem(userId);
        setMyShopId(profileData?.item.shop?.item.id);
        return result;
      }
      return null;
    },
    enabled: !!userId,
  });

  // TODO: 로딩, 오류 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading shop data</div>;
  }

  // 데이터와 data.item이 정의되어 있는지 확인
  if (!data || !data.item) {
    return <div>No data</div>;
  }

  const { hourlyPay, startsAt, workhour, description: noticeDescription, closed } = data.item;
  const {
    address1,
    imageUrl,
    description: shopDescription,
    originalHourlyPay,
  } = data.item.shop.item;
  const notice = {
    wage: hourlyPay,
    originalWage: originalHourlyPay,
    date: startsAt.toString(),
    time: workhour,
    noticeDescription,
    shopDescription,
    closed,
    location: address1,
    imageUrl,
  };

  return (
    <Layout>
      {userType === 'employer' && isMyShop ? (
        <>
          <Section
            title={data.item.shop.item.name}
            content={<DetailNotice params={notice} />}
            gray
          />
          <ModalProvider>
            <Section title="신청자 목록" content={<ListApplication />} />
          </ModalProvider>
        </>
      ) : (
        <>
          <Section title="test" content={<NoticeDetail />}></Section>
        </>
      )}
    </Layout>
  );
}
