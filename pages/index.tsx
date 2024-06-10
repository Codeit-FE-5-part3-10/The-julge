import PersonalNotices from '@/src/components/ui-personal-notices/PersonalNotices';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import AllNotices from '@/src/components/ui-allNotices/AllNotices';

export default function IndexPage() {
  return (
    <>
      <Layout>
        <PersonalNotices />
        <AllNotices />
      </Layout>
    </>
  );
}
