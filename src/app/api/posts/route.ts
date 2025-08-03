import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { auth } from '@/auth';

export async function GET() {
   await dbConnect();
   try {
      const posts = await Post.find({}).populate('author', 'name');
      return NextResponse.json({ success: true, data: posts }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json(
         { success: false, error: error.message },
         { status: 400 }
      );
   }
}

export async function POST(req: NextRequest) {
   await dbConnect();
   try {
      const session = await auth();
      const user = session?.user;
      if (!session || !user) {
         return NextResponse.json(
            { success: false, message: 'You must be logged in to post' },
            { status: 401 }
         );
      }

      const author = user._id;
      const { content } = await req.json();
      if (!content || !content.trim()) {
         return NextResponse.json(
            { success: false, message: 'Content cannot be empty' },
            { status: 400 }
         );
      }

      const post = await Post.create({ content, author });
      return NextResponse.json(
         { success: true, message: 'Post created successfully', data: post },
         { status: 201 }
      );
   } catch (error: any) {
      return NextResponse.json(
         { success: false, message: error.message },
         { status: 400 }
      );
   }
}
