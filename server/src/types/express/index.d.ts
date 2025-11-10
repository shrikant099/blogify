// src/types/express.ts
import { Request } from "express";

export interface UserPayload {
  _id: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest<T = any> extends Request {
  user: UserPayload;
  body: T;
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}
