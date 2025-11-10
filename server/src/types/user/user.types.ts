export enum ROLE {
    USER = "user",
    ADMIN = "admin"
}
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: ROLE;
    resetOtp?: number | null;
    resetOtpExpiry?: Date | null;
    isOtpVerified?: boolean;
    googleId: string;

}