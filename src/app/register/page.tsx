'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
   const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      bio: '',
   });
   //  const [name, setName] = useState<string>('');
   //  const [email, setEmail] = useState<string>('');
   //  const [password, setPassword] = useState<string>('');
   //  const [bio, setBio] = useState<string>('');
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await fetch('/api/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...form }),
      });
      if (res.ok) {
         router.push('/login');
      } else {
         // Handle error
      }
   };

   return (
      <div className='flex items-center justify-center h-screen'>
         <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-3xl font-bold text-center'>Register</h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
               <div>
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='name'
                  >
                     Name
                  </label>
                  <input
                     className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                     id='name'
                     type='text'
                     value={form.name}
                     onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                     }
                  />
               </div>
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
                  <label
                     className='block text-sm font-medium text-gray-700'
                     htmlFor='bio'
                  >
                     Bio
                  </label>
                  <textarea
                     className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                     id='bio'
                     value={form.bio}
                     onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
               </div>
               <div>
                  <button
                     className='w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                     type='submit'
                  >
                     Register
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
