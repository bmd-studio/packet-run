import client from '@/data';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import '@/styles/tailwind.css';
import '@/styles/global.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <div className="dark bg-background min-h-screen text-foreground">
                <Head>
                    <title>📦 Packet Run</title>
                </Head>
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );
}