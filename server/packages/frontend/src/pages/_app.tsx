import client from '@/data';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import '@/styles/tailwind.css';
import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}