import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

export function decodeToken(token: string): string {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined");
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { email: string };
    return decoded.email;
}



export function generateOtpToken(email: string) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined");
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
}
