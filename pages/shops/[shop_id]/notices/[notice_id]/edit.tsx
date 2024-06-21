import { NoticeEditSubmit } from '@/src/components/notice-edit-page/feature-notice-edit-submit/NoticeEditSubmit';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function NoticeEdit() {
  return (
    <Layout isSticky isFooterHidden>
      <Section title="가게 정보" content={<NoticeEditSubmit />} gray />
    </Layout>
  );
}
