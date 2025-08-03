import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export async function GET(
   req: NextRequest,
   context: { params: { userId: string } }
) {
   await dbConnect();
   try {
      const { userId } = await context.params;
      const posts = await Post.find({ author: userId }).populate(
         'author',
         'name'
      );
      return NextResponse.json(
         { success: true, message: 'Posts fetched successfully', data: posts },
         { status: 200 }
      );
   } catch (error: any) {
      return NextResponse.json(
         { success: false, message: error.message },
         { status: 400 }
      );
   }
}
