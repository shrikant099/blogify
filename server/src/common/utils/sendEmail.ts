

export const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);  // 5 min
    return { otp, expiresAt };
};
// transform email 
export async function transformEmail(email: string) {
    const [local, domain] = email.split("@");
    if (!domain) return email;

    if (local.length <= 4) {
        return `${local[0]}***@${domain}`;
    }

    const first = local.slice(0, 2);
    const lastTwo = local.slice(-2)
    const stars = "*".repeat(local.length - 3)
    return `${first}${stars}${lastTwo}@${domain}`

}

// send mail

import nodemailer, { Transporter } from "nodemailer";
import { config } from "dotenv";
config();

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

let transporter: Transporter | null = null;

const getTransporter = (): Transporter => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL as string,
                pass: process.env.EMAIL_PASSWORD as string,
            },
        });
    }
    return transporter;
};

export const sendMail = async ({ to, subject, html }: MailOptions): Promise<void> => {
    try {
        const transporter = getTransporter();

        await transporter.sendMail({
            from: `"My App" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });

  
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Email not sent");
    }
};
