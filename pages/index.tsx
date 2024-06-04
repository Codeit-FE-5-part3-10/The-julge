import { ApplicationList } from "@/src/component-common/feature-ApplicationList/ApplicationList";
import { GetApplicationsByShopByNotice } from "@/utils/getApplications";

export default function IndexPage() {
  return (
    <div>
      <ApplicationList
        isOwnerPage={true}
        initialPage={1}
        siblings={1}
        boundaries={1}
        countPerPage={6}
      />
    </div>
  );
}
