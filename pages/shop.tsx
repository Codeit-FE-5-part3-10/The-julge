import { ListNotice } from '@/src/components/common/feature-list-notice/ListNotice';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { DetailLayout } from '@/src/components/common/ui-detail-layout/DetailLayout';
import { Layout } from '@/src/layouts/global-layout/Layout';
import { ShopLayout } from '@/src/layouts/shop-layout/ShopLayout';

export default function Shop() {
  return (
    <Layout>
      <ShopLayout
        profile={
          false ? (
            <DetailLayout />
          ) : (
            <CardEmpty
              description="내 가게를 소개하고 공고도 등록해보세요"
              btnText="가게 등록하기"
              href="/shopEdit"
            />
          )
        }
        list={
          false ? (
            <ListNotice />
          ) : (
            <CardEmpty
              description="공고를 등록해보세요"
              btnText="공고 등록하기"
              href="/noticeEdit"
            />
          )
        }
      />
    </Layout>
  );
}
