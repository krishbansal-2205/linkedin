import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/verificationEmail';

export async function sendVerificationEmail(
   email: string,
   username: string,
   verifyCode: string
): Promise<{ success: boolean; message: string }> {
   try {
      await resend.emails.send({
         from: 'Linkedin <onboarding@resend.dev>',
         to: email,
         subject: 'Linkedin Verification Code',
         react: VerificationEmail({ username, email, otp: verifyCode }),
      });
      return {
         success: true,
         message: 'Email sent successfully',
      };
   } catch (error) {
      console.error('Error sending email', error);
      return {
         success: false,
         message: 'Error sending email',
      };
   }
}
