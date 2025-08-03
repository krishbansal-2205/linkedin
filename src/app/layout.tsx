import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

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
         <body className={GeistSans.className}>
            <ThemeProvider
               attribute='class'
               defaultTheme='system'
               enableSystem
               disableTransitionOnChange
            >
               <AuthProvider>
                  <div className='relative flex min-h-screen w-full flex-col bg-background'>
                     <Navbar />
                     <main className='flex-1'>{children}</main>
                  </div>
                  <Toaster />
               </AuthProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
