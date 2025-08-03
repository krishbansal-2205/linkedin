'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export default function Login() {
   const [form, setForm] = useState({
      email: '',
      password: '',
   });
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await signIn('credentials', {
         redirect: false,
         email: form.email,
         password: form.password,
      });

      if (res?.error) {
         if (res.error === 'CredentialsSignin') {
            toast('Login Failed', {
               description: 'Incorrect username or password',
            });
         } else {
            toast.error('Error', {
               description: res.error,
            });
         }
      }

      if (res?.url) {
         router.replace('/');
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
                     value={form.email}
                     onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                     }
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
                     value={form.password}
                     onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                     }
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
