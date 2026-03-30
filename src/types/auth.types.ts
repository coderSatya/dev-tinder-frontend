export interface LoginRequestData {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  success?: boolean;
  data?: {
    _id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    photoUrl?: string;
    about?: string;
    skills?: string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    age?: number;
    gender?: string;
  };
}

export interface SignupRequestData {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  photoUrl?: string;
  skills?: string[];
}

export interface SignupResponse {
  message: string;
  success?: boolean;
  data?: {
    _id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    photoUrl?: string;
    about?: string;
    skills?: string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    age?: number;
    gender?: string;
  };
}
