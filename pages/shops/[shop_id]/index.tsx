import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { DetailShop } from '@/src/components/shop-page/ui-detail-shop/DetailShop';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { getShop } from '@/src/apis/shops';
import { Section } from '@/src/layouts/section/Section';
import { ListNotice } from '@/src/components/shop-page/feature-list-notice/ListNotice';
import { getShopNotices } from '@/src/apis/notices';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';

export default function Shop() {
  const router = useRouter();
  const { shop_id: shopId } = router.query;
  const [isNotices, setIsNotices] = useState(false);

  if (typeof shopId !== 'string') {
    return <div>Invalid shop ID</div>;
  }

  // useQuery 한 번으로 두 개의 API 호출하기
  const { data, error, isLoading } = useQuery({
    queryKey: ['getShopAndNotices', shopId],
    queryFn: async () => {
      const [shopResponse, noticesResponse] = await Promise.all([
        getShop(shopId),
        getShopNotices(shopId, 1, 1),
      ]);
      return { shop: shopResponse, notices: noticesResponse };
    },
    enabled: !!shopId,
  });

  useEffect(() => {
    if (data && data.notices && data.notices.items) {
      setIsNotices(data.notices.items.length > 0);
    }
  }, [data]);

  // 데이터 로딩 및 에러 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data || !data.shop || !data.notices) {
    return <div>No data</div>;
  }

  const {
    name,
    address1: location,
    description,
    imageUrl,
    originalHourlyPay: originalWage,
  } = data.shop.item;
  const shops = { name, location, description, imageUrl, shopId };
  const notices = { name, location, imageUrl, originalWage, shopId };
  // Shop와 Notices 데이터가 모두 로드되면 컴포넌트 렌더링
  return (
    <Layout>
      <Section title="내 가게" content={<DetailShop shops={shops} />} />
      {isNotices ? (
        <Section title="등록한 공고" content={<ListNotice notices={notices} />} gray bottom />
      ) : (
        <Section
          title="내 가게"
          content={
            <CardEmpty
              description="공고를 등록해보세요"
              btnText="공고 등록하기"
              href={`/shops/${shopId}/notices/register`}
            />
          }
        />
      )}
    </Layout>
  );
}
