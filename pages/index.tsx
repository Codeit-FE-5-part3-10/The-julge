import { ApplicationList } from "@/src/component-common/feature-ApplicationList/ApplicationList";
import { Button } from "@/src/component-common/ui-button/Button";
import { GetApplicationsByShopByNotice } from "@/utils/getApplications";

export default function IndexPage() {
  return (
    <div>
      {/* <ApplicationList
        isOwnerPage={true}
        initialPage={1}
        siblings={1}
        boundaries={1}
        countPerPage={6}
      /> */}
      <Button size={"large"} color={"primary"}>
        로그인 하기
      </Button>
      <Button size={"large"} color={"white"}>
        로그인 하기
      </Button>
      <Button size={"large"} color={"gray"}>
        신청 불가
      </Button>
      <Button size={"medium"} color={"primary"} width={150}>
        로그인 하기
      </Button>
      <Button size={"medium"} color={"white"} width={150}>
        로그인 하기
      </Button>
      <Button size={"medium"} color={"gray"} width={150}>
        신청 불가
      </Button>
      <Button size={"small"} color={"primary"} width={82}>
        로그인 하기
      </Button>
      <Button size={"small"} color={"white"} width={82}>
        로그인 하기
      </Button>
      <Button size={"small"} color={"gray"} width={82}>
        신청 불가
      </Button>
    </div>
  );
}
