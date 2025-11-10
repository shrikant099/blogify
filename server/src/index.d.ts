// src/types/express/index.d.ts
import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    // existing user type ke saath merge karenge
    user?: {
      _id: string;
      email: string;
      role: string; // strictly string
    };
  }
}
