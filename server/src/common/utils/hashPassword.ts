import bcrypt from "bcryptjs";

export const hashPassword = async function (password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword
}
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};