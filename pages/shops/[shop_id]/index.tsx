import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ListNotice } from '@/src/components/shop-page/feature-list-notice/ListNotice';
import { DetailShop } from '@/src/components/shop-page/ui-detail-shop/DetailShop';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { getShop } from '@/src/apis/shops';
import { Section } from '@/src/layouts/section/Section';

export default function Shop() {
  const router = useRouter();
  const { shop_id: shopId } = router.query;

  if (typeof shopId !== 'string') {
    return <div>Invalid shop ID</div>;
  }

  // 자식인 DetailShop 에서 쓰는 데이터지만 ListNotice 에 넘겨줘야 하는 prop 때문에 여기서 요청
  const { data, error, isLoading } = useQuery({
    queryKey: ['getShops', shopId],
    queryFn: async () => {
      const response = await getShop(shopId);
      return response;
    },
    enabled: !!shopId,
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

  const {
    name,
    address1: location,
    description,
    imageUrl,
    originalHourlyPay: originalWage,
  } = data.item;

  return (
    <Layout>
      <Section
        title="내 가게"
        content={<DetailShop params={{ name, location, description, imageUrl }} />}
      />
      <Section
        title="등록한 공고"
        content={<ListNotice params={{ name, location, imageUrl, originalWage }} shopId={shopId} />}
        gray
        bottom
      />
    </Layout>
  );
}
