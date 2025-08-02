import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export async function GET(
   req: NextRequest,
   { params }: { params: { userId: string } }
) {
   await dbConnect();
   try {
      const posts = await Post.find({ author: params.userId }).populate(
         'author',
         'name'
      );
      return NextResponse.json({ success: true, data: posts }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json(
         { success: false, error: error.message },
         { status: 400 }
      );
   }
}
