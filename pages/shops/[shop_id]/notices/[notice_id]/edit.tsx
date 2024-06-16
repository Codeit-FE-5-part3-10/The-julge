import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';
import { getShopSingleNotice } from '@/src/apis/notices';
import { NoticeRegisterForm } from '@/src/components/notice-edit-page/feature-form/NoticeRegisterForm';

export default function NoticeEdit() {
  const router = useRouter();
  const { shop_id: shopId, notice_id: noticeId } = router.query;

  const { data } = useQuery({
    queryKey: ['getShopSingleNotice', shopId, noticeId],
    queryFn: async () => {
      const response = await getShopSingleNotice(shopId, noticeId);
      return response;
    },
    enabled: !!shopId,
  });

  if (!data || !data.item) {
    return <div>No data</div>;
  }

  const { hourlyPay, startsAt, workhour, description } = data.item;

  const existingData = {
    hourlyPay,
    startsAt,
    workhour,
    description,
  };

  return (
    <Layout isSticky isFooterHidden>
      <Section
        title="가게 정보"
        content={
          <NoticeRegisterForm
            isUpdate
            existingData={existingData}
            shopId={shopId}
            noticeId={noticeId}
          />
        }
        gray
      />
    </Layout>
  );
}
