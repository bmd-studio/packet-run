'use client';
import client from '@/data';
import { ApolloProvider } from '@apollo/client';
import '@/styles/tailwind.css';
import '@/styles/global.css';
import { Inter, VT323, Doto } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NFCReaderProvider } from '@/lib/useNFCReader';
import { MODE } from '@/config';

const vt323 = VT323({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-vt323',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const doto = Doto({
    subsets: ['latin'],
    variable: '--font-doto',
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
            <body className={`dark bg-background min-h-screen text-foreground ${vt323.variable} ${inter.variable} ${doto.variable} ${MODE === 'distributed' ? 'cursor-none' : ''}`}>
                <TooltipProvider>
                    <ApolloProvider client={client}>
                        <NFCReaderProvider>
                            {children}
                        </NFCReaderProvider>
                    </ApolloProvider>
                </TooltipProvider>
            </body>
        </html>
    );
} 
