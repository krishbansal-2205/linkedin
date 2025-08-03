'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function Register() {
   const [form, setForm] = useState({
      username: '',
      email: '',
      password: '',
      bio: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const res = await axios.post<ApiResponse>('/api/auth/signup', form);
         toast.success('Registration Successful', {
            description: res.data.message,
         });
         router.replace(`/verify/${form.email}`);
      } catch (error) {
         const err = error as AxiosError<ApiResponse>;
         toast.error('Registration Failed', {
            description:
               err.response?.data.message || 'An unexpected error occurred.',
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className='w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]'>
         <div className='flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[400px] gap-6'>
               <div className='grid gap-2 text-center'>
                  <h1 className='text-3xl font-bold'>Create an Account</h1>
                  <p className='text-balance text-muted-foreground'>
                     Join our professional network today.
                  </p>
               </div>
               <form onSubmit={handleSubmit} className='grid gap-4'>
                  <div className='grid gap-2'>
                     <Label htmlFor='username'>Full Name</Label>
                     <Input
                        id='username'
                        type='text'
                        placeholder='John Doe'
                        required
                        value={form.username}
                        onChange={(e) =>
                           setForm({ ...form, username: e.target.value })
                        }
                        disabled={isSubmitting}
                     />
                  </div>
                  <div className='grid gap-2'>
                     <Label htmlFor='email'>Email</Label>
                     <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        required
                        value={form.email}
                        onChange={(e) =>
                           setForm({ ...form, email: e.target.value })
                        }
                        disabled={isSubmitting}
                     />
                  </div>
                  <div className='grid gap-2'>
                     <Label htmlFor='password'>Password</Label>
                     <Input
                        id='password'
                        type='password'
                        required
                        value={form.password}
                        onChange={(e) =>
                           setForm({ ...form, password: e.target.value })
                        }
                        disabled={isSubmitting}
                     />
                  </div>
                  <div className='grid gap-2'>
                     <Label htmlFor='bio'>Bio</Label>
                     <Textarea
                        id='bio'
                        placeholder='Tell us a little about yourself'
                        value={form.bio}
                        onChange={(e) =>
                           setForm({ ...form, bio: e.target.value })
                        }
                        disabled={isSubmitting}
                     />
                  </div>
                  <Button
                     type='submit'
                     className='w-full'
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
               </form>
               <div className='mt-4 text-center text-sm'>
                  Already have an account?{' '}
                  <Link href='/login' className='underline'>
                     Log in
                  </Link>
               </div>
            </div>
         </div>
         <div className='hidden bg-muted lg:block'>
            <div className='flex flex-col items-center justify-center h-full text-center px-12'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-16 w-16 text-primary mb-4'
                  viewBox='0 0 24 24'
                  fill='currentColor'
               >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
               </svg>
               <h2 className='text-3xl font-bold'>
                  Join the Professional Community
               </h2>
               <p className='text-muted-foreground mt-2'>
                  Connect, share, and grow with professionals from around the
                  world.
               </p>
            </div>
         </div>
      </div>
   );
}
