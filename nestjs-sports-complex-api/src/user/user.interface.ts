export interface UserInterface {
    id: string;
    name: string;
    email: string;
    role: string;
    confirmationCode: string;
    passwordResetCode: string;
    verified: boolean;
}