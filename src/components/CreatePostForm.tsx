'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useSession } from 'next-auth/react';

interface CreatePostFormProps {
   onPostCreated: () => void;
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
   const [content, setContent] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { data: session } = useSession();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const res = await axios.post<ApiResponse>('/api/posts', { content });
         setContent('');
         toast.success(res.data.message);
         onPostCreated();
      } catch (error) {
         const err = error as AxiosError<ApiResponse>;
         toast.error(err.response?.data.message || 'Failed to create post');
      } finally {
         setIsSubmitting(false);
      }
   };

   if (!session?.user) {
      return null;
   }

   return (
      <div className='bg-card p-4 rounded-lg shadow-md mb-8'>
         <form onSubmit={handleSubmit}>
            <Textarea
               className='w-full p-3 border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder={`What's on your mind, ${session.user.name}?`}
               disabled={isSubmitting}
            />
            <div className='flex justify-end mt-4'>
               <Button type='submit' disabled={isSubmitting || !content.trim()}>
                  {isSubmitting ? 'Posting...' : 'Post'}
               </Button>
            </div>
         </form>
      </div>
   );
}
