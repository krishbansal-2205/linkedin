import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

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
      const { content, author } = await req.json();
      const post = await Post.create({ content, author });
      return NextResponse.json({ success: true, data: post }, { status: 201 });
   } catch (error: any) {
      return NextResponse.json(
         { success: false, error: error.message },
         { status: 400 }
      );
   }
}
