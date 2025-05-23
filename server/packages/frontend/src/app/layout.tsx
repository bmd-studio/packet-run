'use client';
import client from '@/data';
import { ApolloProvider } from '@apollo/client';
import '@/styles/tailwind.css';
import '@/styles/global.css';
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>📦 Packet Run</title>
            </head>
            <body className={`dark bg-background min-h-screen text-foreground ${vt323.variable} ${inter.variable}`}>
                <ApolloProvider client={client}>
                    {children}
                </ApolloProvider>
            </body>
        </html>
    );
} 