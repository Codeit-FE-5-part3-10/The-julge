import { getNotices, postNotice } from '@/src/apis/notices';
import CardItem from '@/src/components/common/cardItem/CardItem';
import PersonalNotices from '@/src/components/ui-personal-notices/PersonalNotices';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import ListLayout from '@/src/layouts/list-layout/ListLayout';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

export default function IndexPage() {
  const defaultRequestParams = {
    offset: 0,
    limit: 6,
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['notices'],
    queryFn: () => getNotices(defaultRequestParams),
  });

  const items = data?.items.map((item: any) => ({
    title: item.item.shop.item.name,
    date: item.item.startsAt,
    workhour: item.item.workhour,
    location: item.item.shop.item.address1,
    wage: item.item.shop.item.originalHourlyPay,
  }));

  return (
    <>
      <Layout>
        <PersonalNotices />
        {/* <NoticesList /> */}
        {items?.map((items, index) => (
          <CardItem
            key={index}
            title={items.title}
            date={items.date}
            time={items.workhour}
            location={items.location}
            wage={items.wage}
          />
        ))}
      </Layout>
    </>
  );
}
