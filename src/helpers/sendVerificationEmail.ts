import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/verificationEmail';

export async function sendVerificationEmail(
   email: string,
   username: string,
   verifyCode: string
): Promise<{ success: boolean; message: string }> {
   try {
      const data = await resend.emails.send({
         from: 'Linkedin <onboarding@resend.dev>',
         to: email,
         subject: 'Linkedin Verification Code',
         react: VerificationEmail({ username, email, otp: verifyCode }),
      });

      // The `resend.emails.send` method returns a response object that includes a `data` property on success
      // and an `error` property on failure. We check for the error property to determine success.
      if (data.error) {
         console.error('Resend API Error:', data.error);
         return {
            success: false,
            message: data.error.message || 'Error sending email via Resend.',
         };
      }

      return {
         success: true,
         message: 'Email sent successfully',
      };
   } catch (error) {
      // This catch block will handle network errors or other unexpected exceptions.
      console.error('Error sending email (exception):', error);
      return {
         success: false,
         message: 'An unexpected error occurred while trying to send the email.',
      };
   }
}
