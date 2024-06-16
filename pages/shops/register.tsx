import { ShopRegisterForm } from '@/src/components/shop-edit-page/feature-form/ShopRegisterForm';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function ShopRegister() {
  return (
    <Layout isSticky isFooterHidden>
      <Section title="가게 정보" content={<ShopRegisterForm />} gray />
    </Layout>
  );
}
