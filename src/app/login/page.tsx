'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await fetch('/api/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
         const data = await res.json();
         localStorage.setItem('user', JSON.stringify(data.data));
         router.push('/');
      } else {
         // Handle error
      }
   };

   return (
      <div className='flex items-center justify-center h-screen'>
         <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='email'
                  >
                     Email
                  </label>
                  <input
                     className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                     id='email'
                     type='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='password'
                  >
                     Password
                  </label>
                  <input
                     className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                     id='password'
                     type='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div>
                  <button
                     className='w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                     type='submit'
                  >
                     Login
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
