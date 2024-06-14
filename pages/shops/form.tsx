import { RegisterForm } from '@/src/components/shop-register-page/feature-form/RegisterForm';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function ShopRegisterForm() {
  return (
    <Layout isSticky isFooterHidden>
      <Section title="가게 정보" content={<RegisterForm />} gray />
    </Layout>
  );
}
