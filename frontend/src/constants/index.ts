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
