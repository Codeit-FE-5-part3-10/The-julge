import React from 'react';
import { useRouter } from 'next/router';
import { useToken } from '@/src/utils/TokenProvider';
import type { PostNoticeRequest } from '@/src/types/apis/notice/postNotice';
import { postNotice } from '@/src/apis/notices';
import { NoticeForm } from '@/src/components/common/ui-notice-form/NoticeForm';
import { convertToUtc } from '@/src/utils/formatStartsAt';

export const NoticeRegisterSubmit: React.FC = () => {
  const { token } = useToken();
  const router = useRouter();
  const { shop_id: shopId } = router.query;

  const onSubmit = async (formData: PostNoticeRequest) => {
    const startsAtRFC3339 = convertToUtc(formData.startsAt);
    const formDataToSubmit: PostNoticeRequest = {
      hourlyPay: formData.hourlyPay,
      startsAt: startsAtRFC3339,
      workhour: formData.workhour,
      description: formData.description,
    };
    await postNotice(token, shopId, formDataToSubmit);
    router.push(`/shops/${shopId}`);
  };

  return <NoticeForm onSubmit={onSubmit} />;
};
