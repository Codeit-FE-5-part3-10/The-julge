import { ApplicationList } from '@/src/components/common/feature-list-application/ListApplication';
import { ProfileCard } from '@/src/components/common/ui-profile-layout/ProfileCard';
import { ApplicationLayout } from '@/src/layouts/application-layout/ApplicationLayout';
import { Layout } from '@/src/layouts/global-layout/Layout';

export default function Application() {
  return (
    <div>
      <Layout>
        <ApplicationLayout
          profile={<ProfileCard />}
          list={
            <ApplicationList
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
