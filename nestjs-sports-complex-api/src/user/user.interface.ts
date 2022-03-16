export interface UserInterface {
    id: string;
    name: string;
    email: string;
    confirmationCode: string;
    passwordResetCode: string;
    verified: boolean;
}