export interface IPostFormValues {
  post_title: string;
  post_text: string;
  post_image: string | null;
  user_id: string;
}

export interface IPost extends IPostFormValues {
  post_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IUserPosts {
  userPosts: IPost[];
  totalPosts: number;
}
