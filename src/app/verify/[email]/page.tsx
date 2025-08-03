'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from '@/components/ui/button';
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

export default function Verify() {
   const { email } = useParams();
   const decodedEmail = decodeURIComponent(email as string);
   const [verifyCode, setVerifyCode] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const res = await axios.post<ApiResponse>('/api/auth/verify-code', {
            decodedEmail,
            verifyCode: verifyCode,
         });
         toast.success('Verification Successful', {
            description: res.data.message,
         });
         router.replace('/login');
      } catch (error) {
         console.error('Error verifying account', error);
         const err = error as AxiosError<ApiResponse>;
         toast.error('Verification Failed', {
            description:
               err.response?.data.message || 'An unexpected error occurred.',
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
         <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
               <h1 className='text-2xl font-semibold tracking-tight'>
                  Verify Your Account
               </h1>
               <p className='text-sm text-muted-foreground'>
                  Enter the 6-digit verification code sent to{' '}
                  <strong>{decodedEmail}</strong>.
               </p>
            </div>
            <form onSubmit={handleSubmit} className='grid gap-4'>
               <div className='grid gap-2'>
                  <Label htmlFor='verifyCode'>Verification Code</Label>
                  <InputOTP
                     maxLength={6}
                     value={verifyCode}
                     onChange={setVerifyCode}
                     disabled={isSubmitting}
                  >
                     <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                     </InputOTPGroup>
                  </InputOTP>
               </div>
               <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting || verifyCode.length < 6}
               >
                  {isSubmitting ? 'Verifying...' : 'Verify Account'}
               </Button>
            </form>
         </div>
      </div>
   );
}
