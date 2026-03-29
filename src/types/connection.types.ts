export interface Connection {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  about?: string;
  photoUrl?: string;
  skills?: string[];
  age?: number;
  gender?: string;
}

export interface ConnectionResponse {
  message: string;
  data: Connection[];
}
