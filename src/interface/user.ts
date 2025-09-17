export interface IUserSignup {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export interface IUSer extends IUserSignup {
  user_id: string;
  is_club_member: boolean;
  created_at: Date;
  updated_at: Date;
}
