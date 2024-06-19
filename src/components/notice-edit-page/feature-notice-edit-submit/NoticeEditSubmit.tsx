import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useToken } from '@/src/utils/TokenProvider';
import { PostNoticeRequest } from '@/src/types/apis/notice/postNotice';
import { getShopSingleNotice, putNotice } from '@/src/apis/notices';
import { NoticeForm } from '@/src/components/common/ui-notice-form/NoticeForm';
import { convertToUtc, revertToLocalDateTime } from '@/src/utils/formatStartsAt';

export const NoticeEditSubmit: React.FC = () => {
  const { token } = useToken();
  const router = useRouter();
  const { shop_id: shopId, notice_id: noticeId } = router.query;
  const { data } = useQuery({
    queryKey: ['getShopSingleNotice', shopId, noticeId],
    queryFn: async () => {
      const response = await getShopSingleNotice(shopId, noticeId);
      return response;
    },
    enabled: !!shopId,
  });

  if (!data || !data.item) {
    return <div>No data</div>;
  }

  const { hourlyPay, startsAt, workhour, description } = data.item;

  const existingData = {
    hourlyPay,
    startsAt: revertToLocalDateTime(startsAt),
    workhour,
    description,
  };

  console.log(existingData);

  const onSubmit = async (formData: PostNoticeRequest) => {
    const startsAtRFC3339 = convertToUtc(formData.startsAt);
    const formDataToSubmit: PostNoticeRequest = {
      ...formData,
      startsAt: startsAtRFC3339,
    };

    if (typeof shopId === 'string' && typeof noticeId === 'string' && typeof token === 'string') {
      await putNotice(token, shopId, noticeId, formDataToSubmit);
      router.push(`/shops/${shopId}/notices/${noticeId}`);
    }
  };

  return <NoticeForm onSubmit={onSubmit} defaultValues={existingData} />;
};
