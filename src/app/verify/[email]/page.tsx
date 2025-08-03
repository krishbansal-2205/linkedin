'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

export default function Verify() {
   const { email } = useParams();
   const [verifyCode, setVerifyCode] = useState('');
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const res = await axios.post<ApiResponse>('/api/auth/verify-code', {
            email,
            verifyCode: verifyCode,
         });
         toast(res.data.message);
         router.replace('/login');
      } catch (error) {
         console.error('Error verifying account', error);
         const err = error as AxiosError<ApiResponse>;
         toast('Error verifying account', {
            description: err.response?.data.message,
         });
      }
   };

   return (
      <div className='flex items-center justify-center h-screen'>
         <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-3xl font-bold text-center'>
               Verify your account
            </h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='email'
                  >
                     Verification Code
                  </label>
                  <input
                     className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                     id='verifyCode'
                     type='text'
                     value={verifyCode}
                     onChange={(e) => setVerifyCode(e.target.value)}
                  />
               </div>
               <div>
                  <button
                     className='w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                     type='submit'
                  >
                     Verify Account
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
