'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Login() {
   const [form, setForm] = useState({
      email: '',
      password: '',
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      const res = await signIn('credentials', {
         redirect: false,
         email: form.email,
         password: form.password,
      });

      setIsSubmitting(false);

      if (res?.error) {
         if (res.error === 'CredentialsSignin') {
            toast.error('Login Failed', {
               description: 'Incorrect email or password. Please try again.',
            });
         } else {
            toast.error('Error', {
               description: res.error,
            });
         }
      } else if (res?.url) {
         toast.success('Login Successful', {
            description: 'Welcome back! You are being redirected.',
         });
         router.replace('/');
      }
   };

   return (
      <div className='w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]'>
         <div className='flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[350px] gap-6'>
               <div className='grid gap-2 text-center'>
                  <h1 className='text-3xl font-bold'>Login</h1>
                  <p className='text-balance text-muted-foreground'>
                     Enter your email below to login to your account
                  </p>
               </div>
               <form onSubmit={handleSubmit} className='grid gap-4'>
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
                     <div className='flex items-center'>
                        <Label htmlFor='password'>Password</Label>
                     </div>
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
                  <Button
                     type='submit'
                     className='w-full'
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
               </form>
               <div className='mt-4 text-center text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link href='/register' className='underline'>
                     Sign up
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
               <h2 className='text-3xl font-bold'>Welcome Back to LinkedIn</h2>
               <p className='text-muted-foreground mt-2'>
                  Your professional community is just a click away.
               </p>
            </div>
         </div>
      </div>
   );
}
