'use client';

import { useState, useEffect } from 'react';
import { formatTimestamp } from '@/lib/time';
import { useParams } from 'next/navigation';
import { Post } from '@/types/Post';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { User } from '@/types/User';
import { toast } from 'sonner';

export default function Profile() {
   const [user, setUser] = useState<User>();
   const [posts, setPosts] = useState<Post[]>([]);
   const params = useParams();

   useEffect(() => {
      if (params.userId) {
         fetchUser();
         fetchPosts();
      }
   }, [params.userId]);

   const fetchUser = async () => {
      try {
         const res = await axios.get<ApiResponse>(
            `/api/users/${params.userId}`
         );
         setUser(res.data.user);
      } catch (error) {
         const err = error as AxiosError<ApiResponse>;
         toast.error('Error fetching user', {
            description: err.response?.data.message,
         });
         setUser(undefined);
      }
   };

   const fetchPosts = async () => {
      try {
         const res = await axios.get<ApiResponse>(
            `/api/posts/${params.userId}`
         );
         setPosts(res.data.data || []);
      } catch (error) {
         const err = error as AxiosError<ApiResponse>;
         toast.error('Error fetching posts', {
            description: err.response?.data.message,
         });
         setPosts([]);
      }
   };

   if (!user) {
      return <div>Loading...</div>;
   }

   return (
      <div className='max-w-2xl mx-auto'>
         <div className='p-8 bg-white rounded-lg shadow-md my-8'>
            <h1 className='text-3xl font-bold'>{user.name}</h1>
            <p className='text-gray-600 mt-2'>{user.bio}</p>
         </div>
         <h2 className='text-2xl font-bold my-8'>Posts</h2>
         <div>
            {posts.map((post) => (
               <div
                  key={post._id.toString()}
                  className='p-4 my-4 bg-white rounded-lg shadow-md'
               >
                  <p className='text-gray-800'>{post.content}</p>
                  <p className='text-gray-600 text-sm mt-2'>
                     Posted on {formatTimestamp(post.timestamp)}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
}
