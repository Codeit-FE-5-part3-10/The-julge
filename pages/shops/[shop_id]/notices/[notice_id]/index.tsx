import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { getShopSingleNotice } from '@/src/apis/notices';
import { Section } from '@/src/layouts/section/Section';
import { DetailNotice } from '@/src/components/notice-page/ui-detail-notice/DetailNotice';

export default function Notice() {
  const router = useRouter();
  const { shop_id: shopId, notice_id: noticeId } = router.query;

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
      <Section title={data.item.shop.item.name} content={<DetailNotice params={notice} />} gray />
    </Layout>
  );
}
