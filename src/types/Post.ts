import mongoose from 'mongoose';

export interface Post {
   _id: mongoose.Types.ObjectId;
   author: {
      _id: mongoose.Types.ObjectId;
      name: string;
   };
   content: string;
   timestamp: Date;
}
