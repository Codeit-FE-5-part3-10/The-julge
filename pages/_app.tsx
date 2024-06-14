import '@mantine/core/styles.css';
import '@/src/styles/reset.css';
import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { theme } from '../theme';
import { TokenProvider } from '@/src/utils/TokenProvider';

export default function App({ Component, pageProps }: any) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <RecoilRoot>
      <MantineProvider theme={theme}>
        <Head>
          <title>Mantine Template</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <TokenProvider>
              <Component {...pageProps} />
            </TokenProvider>
          </HydrationBoundary>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MantineProvider>
    </RecoilRoot>
  );
}
