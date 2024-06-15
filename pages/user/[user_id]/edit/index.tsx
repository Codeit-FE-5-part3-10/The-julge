import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserApplicationlist } from '@/src/apis/user';
import { Layout } from '@/src/layouts/feature-layout/Layout';
import { CardEmpty } from '@/src/components/common/ui-card-empty/CardEmpty';
import { ProfileCard } from '@/src/components/User-page/ui-profile-card/ProfileCard';
import { Section } from '@/src/layouts/section/Section';
import { useToken } from '@/src/utils/TokenProvider';
import UserApplicationTable from '@/src/components/User-page/ui-table/TableForCandidate';

export default function MyprofileEdit() {

  return (
    <div>
      <Layout>
      <Section
        title="내 프로필"
        content={}
            />
      </Layout>
    </div>
  );
}
