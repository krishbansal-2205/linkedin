'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Post } from '@/types/Post';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { User } from '@/types/User';
import { toast } from 'sonner';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PostCard } from '@/components/PostCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Profile() {
   const [user, setUser] = useState<User>();
   const [posts, setPosts] = useState<Post[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const params = useParams();

   useEffect(() => {
      const fetchUserData = async () => {
         setIsLoading(true);
         try {
            const userRes = await axios.get<ApiResponse>(
               `/api/users/${params.userId}`
            );
            setUser(userRes.data.user);

            const postsRes = await axios.get<ApiResponse>(
               `/api/posts/${params.userId}`
            );
            setPosts(postsRes.data.data || []);
         } catch (error) {
            const err = error as AxiosError<ApiResponse>;
            toast.error('Error fetching profile data', {
               description:
                  err.response?.data.message || 'Could not fetch user data.',
            });
            setUser(undefined);
            setPosts([]);
         } finally {
            setIsLoading(false);
         }
      };

      if (params.userId) {
         fetchUserData();
      }
   }, [params.userId]);

   return (
      <main className='container max-w-4xl mx-auto py-8'>
         <ProfileHeader
            user={user}
            postCount={posts.length}
            isLoading={isLoading}
         />
         <div className='mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Posts</h2>
            {isLoading ? (
               <PostFeedSkeleton />
            ) : posts.length > 0 ? (
               <div className='space-y-4'>
                  {posts.map((post) => (
                     <PostCard key={post._id.toString()} post={post} />
                  ))}
               </div>
            ) : (
               <EmptyProfileFeed />
            )}
         </div>
      </main>
   );
}

function PostFeedSkeleton() {
   return (
      <div className='space-y-4'>
         {[...Array(2)].map((_, i) => (
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

function EmptyProfileFeed() {
   return (
      <div className='text-center py-16 bg-card rounded-lg border shadow-sm'>
         <h2 className='text-2xl font-semibold text-card-foreground'>
            No posts yet
         </h2>
         <p className='mt-2 text-muted-foreground'>
            This user hasn&apos;t shared any posts.
         </p>
      </div>
   );
}
