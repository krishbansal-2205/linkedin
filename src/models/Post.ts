import mongoose, { Document, Schema } from 'mongoose';

export interface Post extends Document {
   author: mongoose.Types.ObjectId;
   content: string;
   timestamp: Date;
}

const PostSchema: Schema<Post> = new Schema({
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   content: {
      type: String,
      required: [true, 'Please provide content for your post'],
   },
   timestamp: {
      type: Date,
      default: Date.now,
   },
});

const PostModel =
   (mongoose.models.Post as mongoose.Model<Post>) ||
   mongoose.model<Post>('Post', PostSchema);

export default PostModel;
