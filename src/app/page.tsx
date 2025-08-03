'use client';

import { useCallback, useEffect, useState } from 'react';
import { Post } from '@/types/Post';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/ApiResponse';
import { CreatePostForm } from '@/components/CreatePostForm';
import { PostCard } from '@/components/PostCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
   const [posts, setPosts] = useState<Post[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const fetchPosts = useCallback(async () => {
      setIsLoading(true);
      try {
         const res = await axios.get<ApiResponse>('/api/posts');
         setPosts(res.data.data?.reverse() || []);
      } catch (error) {
         const err = error as AxiosError<ApiResponse>;
         toast.error(err.response?.data.message || 'Failed to fetch posts');
      } finally {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchPosts();
   }, [fetchPosts]);

   return (
      <main className='container max-w-3xl mx-auto py-8'>
         <CreatePostForm onPostCreated={fetchPosts} />

         <div className='space-y-4'>
            {isLoading ? (
               <PostFeedSkeleton />
            ) : posts.length > 0 ? (
               posts.map((post) => (
                  <PostCard key={post._id.toString()} post={post} />
               ))
            ) : (
               <EmptyFeed />
            )}
         </div>
      </main>
   );
}

function PostFeedSkeleton() {
   return (
      <div className='space-y-4'>
         {[...Array(3)].map((_, i) => (
            <div key={i} className='bg-card rounded-lg border shadow-sm p-6'>
               <div className='flex items-start space-x-4'>
                  <Skeleton className='h-12 w-12 rounded-full' />
                  <div className='flex-1 space-y-2'>
                     <Skeleton className='h-4 w-1/4' />
                     <Skeleton className='h-4 w-1/6' />
                  </div>
               </div>
               <div className='mt-4 space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
               </div>
            </div>
         ))}
      </div>
   );
}

function EmptyFeed() {
   return (
      <div className='text-center py-16 bg-card rounded-lg border shadow-sm'>
         <h2 className='text-2xl font-semibold text-card-foreground'>
            No posts yet
         </h2>
         <p className='mt-2 text-muted-foreground'>
            Be the first to share your thoughts!
         </p>
      </div>
   );
}
