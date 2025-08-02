'use client';

import { useState, useEffect } from 'react';
import { formatTimestamp } from '@/lib/time';
import Link from 'next/link';
import { User } from '@/models/User';
import { Post } from '@/types/Post';

export default function Home() {
   const [posts, setPosts] = useState<Post[] | []>([]);
   const [content, setContent] = useState('');
   const [user, setUser] = useState<User>();

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }
      fetchPosts();
   }, []);

   const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.data.reverse());
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) {
         alert('You must be logged in to post.');
         return;
      }
      if (!content.trim()) {
         alert('Post content cannot be empty.');
         return;
      }
      const res = await fetch('/api/posts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ content, author: user._id }),
      });
      if (res.ok) {
         setContent('');
         fetchPosts();
      } else {
         // Handle error
      }
   };

   return (
      <div className='max-w-2xl mx-auto'>
         <h1 className='text-3xl font-bold my-8'>Public Post Feed</h1>
         {user && (
            <form onSubmit={handleSubmit} className='mb-8'>
               <textarea
                  className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
               />
               <button
                  className='w-full px-4 py-2 mt-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  type='submit'
               >
                  Post
               </button>
            </form>
         )}
         <div>
            {posts.map((post) => (
               <div
                  key={post._id.toString()}
                  className='p-4 my-4 bg-white rounded-lg shadow-md'
               >
                  <p className='text-gray-800'>{post.content}</p>
                  <Link href={`/profile/${post.author._id}`}>
                     <p className='text-gray-600 text-sm mt-2'>
                        Posted by: {post.author._id.name} on{' '}
                        {formatTimestamp(post.timestamp)}
                     </p>
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
}
