import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
   name: string;
   email: string;
   password: string;
   bio: string;
   verifyCode: string;
   verifyCodeExpiry: Date;
   isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
   name: {
      type: String,
      required: [true, 'Please provide your name'],
   },
   email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Please provide a password'],
   },
   bio: {
      type: String,
      maxlength: [200, 'Bio cannot be more than 200 characters'],
   },
   verifyCode: {
      type: String,
      required: [true, 'Verify Code is required'],
   },
   verifyCodeExpiry: {
      type: Date,
      required: [true, 'Verify Code Expiry is required'],
   },
   isVerified: {
      type: Boolean,
      default: false,
   },
});

const UserModel =
   (mongoose.models.User as mongoose.Model<User>) ||
   mongoose.model<User>('User', UserSchema);

export default UserModel;
