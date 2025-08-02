import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'LinkedIn',
   description: 'A mini LinkedIn-like community platform',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en' suppressHydrationWarning>
         <AuthProvider>
            <body className={inter.className}>
               <nav className='bg-white shadow-md'>
                  <div className='container mx-auto px-6 py-3'>
                     <div className='flex justify-between items-center'>
                        <Link
                           href='/'
                           className='text-2xl font-bold text-gray-800'
                        >
                           LinkedIn
                        </Link>
                        <div className='flex items-center'>
                           <Link href='/login' className='text-gray-800 mx-3'>
                              Login
                           </Link>
                           <Link
                              href='/register'
                              className='bg-blue-500 text-white px-4 py-2 rounded-md'
                           >
                              Register
                           </Link>
                        </div>
                     </div>
                  </div>
               </nav>
               <main className='container mx-auto px-6 py-8'>{children}</main>
               <Toaster />
            </body>
         </AuthProvider>
      </html>
   );
}
