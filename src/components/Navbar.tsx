'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import {
   Home,
   Users,
   Briefcase,
   MessageSquare,
   Bell,
   User,
} from 'lucide-react';

function Navbar() {
   const { data: session } = useSession();
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
      <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm'>
         <div className='container flex h-14 max-w-screen-2xl items-center'>
            <Link href='/' className='mx-6 flex items-center space-x-2'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-primary'
                  viewBox='0 0 24 24'
                  fill='currentColor'
               >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
               </svg>
               <span className='hidden font-bold sm:inline-block'>
                  LinkedIn
               </span>
            </Link>
            <nav className='flex flex-1 items-center justify-center space-x-6 text-sm font-medium'></nav>
            <div className='flex items-center justify-end space-x-4'>
               {isClient && !session?.user ? (
                  <>
                     <Link href='/login'>
                        <Button variant='ghost'>Login</Button>
                     </Link>
                     <Link href='/register'>
                        <Button className='mr-6'>Register</Button>
                     </Link>
                  </>
               ) : isClient && session?.user ? (
                  <>
                     <Link href={`/profile/${session.user._id}`}>
                        <Button
                           variant='ghost'
                           className='flex items-center space-x-2'
                        >
                           <User className='h-5 w-5' />
                           <span className='hidden sm:inline-block'>
                              Profile
                           </span>
                        </Button>
                     </Link>
                     <Button
                        onClick={() => signOut()}
                        variant='destructive'
                        className='mr-6'
                     >
                        Logout
                     </Button>
                  </>
               ) : null}
            </div>
         </div>
      </header>
   );
}

export default Navbar;
