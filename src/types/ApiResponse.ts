import { Post } from './Post';
import { User } from './User';

export interface ApiResponse {
   success: boolean;
   message?: string;
   data?: Array<Post>;
   user?: User;
}
