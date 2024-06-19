import { NoticeRegisterSubmit } from '@/src/components/notice-register-page/feature-notice-register-submit/NoticeRegisterSubmit';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function NoticeRegister() {
  return (
    <Layout isSticky isFooterHidden>
      <Section title="가게 정보" content={<NoticeRegisterSubmit />} gray />
    </Layout>
  );
}
