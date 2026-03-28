export interface FeedUser {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  photoUrl?: string;
  about?: string;
  skills?: string[];
  age?: number;
  gender?: string;
}

export interface FeedResponse {
  success: boolean;
  message: string;
  data: FeedUser[];
}
