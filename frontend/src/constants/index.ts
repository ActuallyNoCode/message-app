export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  phoneCode: string;
  profilePicture?: string;
}

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface Chat {
  id: string;
  name: string;
  ownerId: string;
  adminIds: string[];
  profileImages: string[];
  messages: Message[];
}

export type MediaType =
  | "image/jpeg"
  | "video"
  | "audio/mp3"
  | "document"
  | "other";
export interface Message {
  id: string;
  content: string;
  status: string;
  media?: string;
  mediaType?: MediaType;
  createdAt: string;
  user: Partial<User>;
}
