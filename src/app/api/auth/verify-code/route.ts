import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   await dbConnect();

   try {
      const { email, verifyCode } = await request.json();
      const decodedEmail = decodeURIComponent(email); //used to get undecoded username

      const user = await UserModel.findOne({ email: decodedEmail });
      if (!user) {
         return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 400 }
         );
      }

      const isCodeValid = user.verifyCode === verifyCode;
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

      if (!isCodeValid || !isCodeNotExpired) {
         return NextResponse.json(
            { success: false, message: 'Invalid verification code' },
            { status: 400 }
         );
      }

      user.isVerified = true;
      await user.save();

      return NextResponse.json(
         { success: true, message: 'User verified successfully' },
         { status: 200 }
      );
   } catch (error: any) {
      console.error('Error verifying user', error);
      return Response.json(
         { success: false, message: 'Error verifying user' },
         { status: 500 }
      );
   }
}
