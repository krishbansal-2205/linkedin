import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'LinkedIn',
   description: 'A mini LinkedIn-like community platform',
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en' suppressHydrationWarning>
         <AuthProvider>
            <body className={inter.className}>
               <Navbar />
               <main className='container mx-auto px-6 py-8'>{children}</main>
               <Toaster />
            </body>
         </AuthProvider>
      </html>
   );
}
