'use client';

import { User } from '@/types/User';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileHeaderProps {
   user: User | undefined;
   postCount: number;
   isLoading: boolean;
}

export function ProfileHeader({
   user,
   postCount,
   isLoading,
}: ProfileHeaderProps) {
   if (isLoading) {
      return <ProfileHeaderSkeleton />;
   }

   if (!user) {
      return (
         <div className='text-center py-16 bg-card rounded-lg border shadow-sm'>
            <h2 className='text-2xl font-semibold text-card-foreground'>
               User not found
            </h2>
            <p className='mt-2 text-muted-foreground'>
               Could not find the user you were looking for.
            </p>
         </div>
      );
   }

   return (
      <div className='bg-card rounded-lg border shadow-sm overflow-hidden'>
         <div
            className='h-32 bg-muted lg:h-48'
            style={{
               backgroundImage: `url(https://source.unsplash.com/random/1600x400?nature,water)`,
            }}
         ></div>
         <div className='px-6 pb-6 pt-2'>
            <div className='-mt-16 flex items-end space-x-5'>
               <Avatar className='h-32 w-32 border-4 border-card'>
                  <AvatarFallback className='text-4xl'>
                     {user.name.charAt(0)}
                  </AvatarFallback>
               </Avatar>
               <div className='pb-4'>
                  <h1 className='text-2xl font-bold text-card-foreground'>
                     {user.name}
                  </h1>
                  <p className='text-sm text-muted-foreground'>@{user.email}</p>
               </div>
            </div>
            <div className='mt-6'>
               <h2 className='font-semibold text-card-foreground'>About</h2>
               <p className='mt-2 text-sm text-muted-foreground'>
                  {user.bio || 'No bio provided.'}
               </p>
            </div>
            <div className='mt-6 border-t border-border pt-6'>
               <div className='flex justify-around'>
                  <div className='text-center'>
                     <p className='text-xl font-bold text-card-foreground'>
                        {postCount}
                     </p>
                     <p className='text-sm text-muted-foreground'>Posts</p>
                  </div>
                  <div className='text-center'>
                     <p className='text-xl font-bold text-card-foreground'>
                        XXXX
                     </p>
                     <p className='text-sm text-muted-foreground'>Followers</p>
                  </div>
                  <div className='text-center'>
                     <p className='text-xl font-bold text-card-foreground'>
                        XXX
                     </p>
                     <p className='text-sm text-muted-foreground'>Following</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

function ProfileHeaderSkeleton() {
   return (
      <div className='bg-card rounded-lg border shadow-sm overflow-hidden'>
         <Skeleton className='h-32 lg:h-48 w-full' />
         <div className='px-6 pb-6'>
            <div className='-mt-16 flex items-end space-x-5'>
               <Skeleton className='h-32 w-32 rounded-full border-4 border-card' />
               <div className='pb-4 space-y-2'>
                  <Skeleton className='h-6 w-40' />
                  <Skeleton className='h-4 w-32' />
               </div>
            </div>
            <div className='mt-6 space-y-2'>
               <Skeleton className='h-4 w-20' />
               <Skeleton className='h-4 w-full' />
               <Skeleton className='h-4 w-2/3' />
            </div>
            <div className='mt-6 border-t border-border pt-6'>
               <div className='flex justify-around'>
                  <div className='text-center space-y-2'>
                     <Skeleton className='h-6 w-12 mx-auto' />
                     <Skeleton className='h-4 w-16 mx-auto' />
                  </div>
                  <div className='text-center space-y-2'>
                     <Skeleton className='h-6 w-12 mx-auto' />
                     <Skeleton className='h-4 w-16 mx-auto' />
                  </div>
                  <div className='text-center space-y-2'>
                     <Skeleton className='h-6 w-12 mx-auto' />
                     <Skeleton className='h-4 w-16 mx-auto' />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
