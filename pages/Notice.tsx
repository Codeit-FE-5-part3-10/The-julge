import { ListApplication } from '@/src/components/common/feature-list-applications/ListApplications';
import { DetailNotice } from '@/src/components/common/ui-detail-notice/DetailNotice';
import { Layout } from '@/src/layouts/global-layout/Layout';
import { NoticeLayout } from '@/src/layouts/notice-layout/NoticeLayout';

export default function Notice() {
  return (
    <div>
      <Layout>
        <NoticeLayout
          profile={<DetailNotice />}
          list={
            <ListApplication
              isOwnerPage
              initialPage={1}
              siblings={0}
              boundaries={1}
              countPerPage={5}
            />
          }
        />
      </Layout>
    </div>
  );
}
