import client from '@/data';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import '@/styles/tailwind.css';
import '@/styles/global.css';
import Head from 'next/head';
import { Inter, VT323 } from 'next/font/google';

const vt323 = VT323({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-vt323',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <div className={`dark bg-background min-h-screen text-foreground ${vt323.variable} ${inter.variable}`}>
                <Head>
                    <title>📦 Packet Run</title>
                </Head>
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );
}