import { getNotices, postNotice } from "@/src/apis/notice";
import { PostNoticeRequest } from "@/src/types/apis/noticeTypes";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function IndexPage() {

  const { isPending, error, data } =  useQuery({
    queryKey: ['notices'],
    queryFn: () => getNotices()
  })
  console.log('data',data?.items.map(item=> item.item.id))

  const {mutate} = useMutation({
    mutationKey: 'postNotice',
    mutationFn: (request:PostNoticeRequest) => postNotice(request)
  })
  return <div>asdf

    <button onClick={()=> mutate({
    shopId: "123",
    hourlyPay: 0,
    startsAt: 'string',
    workhour: 0,
    description: 'string'
})}> 버튼</button>
  </div>;
}
