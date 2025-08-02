import mongoose from 'mongoose';

export interface Post {
   _id: mongoose.Types.ObjectId;
   author: mongoose.Types.ObjectId;
   content: string;
   timestamp: Date;
}
