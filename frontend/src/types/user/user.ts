export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    // add more fields if needed
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: User;
}