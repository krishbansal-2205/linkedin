'use client';

import { Post } from '@/types/Post';
import { formatTimestamp } from '@/lib/time';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface PostCardProps {
   post: Post;
}

export function PostCard({ post }: PostCardProps) {
   return (
      <div className='bg-card rounded-lg border shadow-sm mb-4 overflow-hidden'>
         <div className='p-6'>
            <div className='flex items-start space-x-4'>
               <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                     <Link
                        href={`/profile/${post.author._id}`}
                        className='font-semibold text-card-foreground hover:underline'
                     >
                        {post.author.name}
                     </Link>
                     <p className='text-xs text-muted-foreground'>
                        {formatTimestamp(post.timestamp)}
                     </p>
                  </div>
               </div>
            </div>
            <p className='mt-4 text-card-foreground whitespace-pre-wrap'>
               {post.content}
            </p>
         </div>
      </div>
   );
}
