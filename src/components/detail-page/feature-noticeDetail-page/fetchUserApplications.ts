import { getUserApplication } from '@/src/apis/user';
import { GetUserItem } from '@/src/utils/TokenProvider';

interface FetchUserApplicationsProps {
  userInfo: GetUserItem | null;
  token: string | null;
  noticeId: string;
  setApplicationId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsApply: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

// 유저의 공고 지원목록
export async function fetchUserApplications({
  userInfo,
  token,
  noticeId,
  setApplicationId,
  setIsApply,
}: FetchUserApplicationsProps): Promise<void> {
  try {
    if (userInfo?.id && token) {
      const result = await getUserApplication(userInfo.id, token);
      const appliedApplication = result.items.find((item) =>
        item.item.notice.item.id.includes(noticeId)
      );
      if (appliedApplication) {
        if (appliedApplication.item.status !== 'canceled') {
          setApplicationId(appliedApplication.item.id);
          setIsApply(true);
        } else {
          setIsApply(false);
        }
      } else {
        setIsApply(false);
      }
    }
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error; // 에러를 호출자에게 전파
  }
}
