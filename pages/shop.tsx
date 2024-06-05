import { NoticeList } from "@/src/components/common/feature-notice-list/NoticeList";
import { ProfileCard } from "@/src/components/common/ui-profile-card/ProfileCard";
import { Layout } from "@/src/layouts/global-layout/Layout";
import { ShopLayout } from "@/src/layouts/shop-layout/ShopLayout";

export default function Shop() {
  return (
    <Layout>
      <ShopLayout profile={<ProfileCard />} list={<NoticeList />} />
    </Layout>
  );
}
