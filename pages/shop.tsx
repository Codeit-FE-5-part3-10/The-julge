import { NoticeList } from "@/src/components/common/feature-notice-list/NoticeList";
import { Post } from "@/src/components/common/ui-post-card/Post";
import { ProfileCard } from "@/src/components/common/ui-profile-card/ProfileCard";
import { Layout } from "@/src/layouts/global-layout/Layout";
import { ShopLayout } from "@/src/layouts/shop-layout/ShopLayout";

export default function Shop() {
  return (
    <Layout>
      <ShopLayout
        profile={
          false ? (
            <ProfileCard />
          ) : (
            <Post
              description={"내 가게를 소개하고 공고도 등록해보세요"}
              btnText={"가게 등록하기"}
              href={"/shopEdit"}
            />
          )
        }
        list={
          false ? (
            <NoticeList />
          ) : (
            <Post
              description={"공고를 등록해보세요"}
              btnText={"공고 등록하기"}
              href={"/noticeEdit"}
            />
          )
        }
      />
    </Layout>
  );
}
