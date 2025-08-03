import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   await dbConnect();
   try {
      const { username, email, password, bio } = await request.json();

      const existingUserVerifiedByUsername = await UserModel.findOne({
         name: username,
         isVerified: true,
      });

      if (existingUserVerifiedByUsername) {
         return NextResponse.json(
            { success: false, message: 'Username is already taken' },
            { status: 400 }
         );
      }

      const existingUserVerifiedByEmail = await UserModel.findOne({ email });
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      if (existingUserVerifiedByEmail) {
         if (existingUserVerifiedByEmail.isVerified) {
            return NextResponse.json(
               { success: false, message: 'Email is already taken' },
               { status: 400 }
            );
         } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            existingUserVerifiedByEmail.verifyCode = verifyCode;
            existingUserVerifiedByEmail.verifyCodeExpiry = expiryDate;
            existingUserVerifiedByEmail.password = hashedPassword;
            await existingUserVerifiedByEmail.save();
         }
      } else {
         const hashedPassword = await bcrypt.hash(password, 10);
         const expiryDate = new Date();
         expiryDate.setHours(expiryDate.getHours() + 1);

         const newUser = new UserModel({
            name: username,
            email,
            password: hashedPassword,
            bio,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
         });
         await newUser.save();
      }
      const emailResponse = await sendVerificationEmail(
         email,
         username,
         verifyCode
      );

      if (!emailResponse.success) {
         return NextResponse.json(
            { success: false, message: emailResponse.message },
            { status: 500 }
         );
      }

      return NextResponse.json(
         {
            success: true,
            message: 'User created successfully. Please verify your email',
         },
         { status: 200 }
      );
   } catch (error: any) {
      console.error('Error saving user to database', error);
      return NextResponse.json(
         { success: false, message: 'Error saving user to database' },
         { status: 500 }
      );
   }
}
