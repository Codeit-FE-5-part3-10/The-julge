import { ApplicationList } from '@/src/components/common/feature-application-list/ApplicationList';
import { ProfileCard } from '@/src/components/common/ui-profile-card/ProfileCard';
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
