'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
    const {data: session} = useSession();
   return (
      <nav className='bg-white shadow-md'>
         <div className='container mx-auto px-6 py-3'>
            <div className='flex justify-between items-center'>
               <Link href='/' className='text-2xl font-bold text-gray-800'>
                  LinkedIn
               </Link>
               {!session?.user ? (
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
               ) : (
                  <div className='flex items-center'>
                     <Link
                        href={`/profile/${session.user._id}`}
                        className='text-gray-800 mx-3 ml-8'
                     >
                        Profile
                     </Link>
                     <Button
                        onClick={() => signOut()}
                        className='bg-red-500 text-white px-4 py-2 rounded-md'
                     >
                        Logout
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
