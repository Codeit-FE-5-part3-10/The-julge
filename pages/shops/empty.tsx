import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function ShopEmpty() {
  return (
    <Layout isSticky>
      <Section
        title="내 가게"
        content={
          <CardEmpty
            description="내 가게를 소개하고 공고도 등록해보세요"
            btnText="가게 등록하기"
            href="/shops/register"
          />
        }
      />
    </Layout>
  );
}
