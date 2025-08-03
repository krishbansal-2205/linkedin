import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
   req: NextRequest,
   { params }: { params: { userId: string } }
) {
   await dbConnect();
   try {
      const { userId } = await params;
      const user = await User.findById(userId).select('-password');
      if (!user) {
         return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 404 }
         );
      }

      return NextResponse.json(
         { success: true, message: 'User fetched successfully', user: user },
         { status: 200 }
      );
   } catch (error: any) {
      return NextResponse.json(
         { success: false, message: error.message },
         { status: 400 }
      );
   }
}
