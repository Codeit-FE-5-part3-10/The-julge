import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';
import { getShop } from '@/src/apis/shops';
import { ShopRegisterForm } from '@/src/components/shop-edit-page/feature-form/ShopRegisterForm';

export default function ShopEdit() {
  const router = useRouter();
  const { shop_id: shopId } = router.query;

  if (typeof shopId !== 'string') {
    return <div>Invalid shop ID</div>;
  }

  const { data } = useQuery({
    queryKey: ['getShops', shopId],
    queryFn: async () => {
      const response = await getShop(shopId);
      return response;
    },
    enabled: !!shopId,
  });

  if (!data || !data.item) {
    return <div>No data</div>;
  }

  const { name, category, address1, address2, description, imageUrl, originalHourlyPay } =
    data.item;

  const existingData = {
    name,
    category,
    address1,
    address2,
    description,
    imageUrl,
    originalHourlyPay,
  };

  return (
    <Layout isSticky isFooterHidden>
      <Section
        title="가게 정보"
        content={<ShopRegisterForm isUpdate existingData={existingData} shopId={shopId} />}
        gray
      />
    </Layout>
  );
}
