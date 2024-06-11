import SearchResult from '@/src/components/search-page/SearchResult';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { Section } from '@/src/layouts/section/Section';

export default function search() {
  return (
    <Layout>
      <Section title={''} content={<SearchResult />} />
    </Layout>
  );
}
