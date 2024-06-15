import { NoticeRegisterForm } from '@/src/components/notice-edit-page/feature-form/NoticeRegisterForm';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function NoticeRegister() {
  return (
    <Layout isSticky isFooterHidden>
      <Section title="가게 정보" content={<NoticeRegisterForm />} gray />
    </Layout>
  );
}
