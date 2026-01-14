export interface UsersApiServiceInterface {
    login(email: string, password: string): Promise<UsersLoginResponse | undefined>;
    register(name: string, email: string, password: string, confirmPassword: string): Promise<UsersRegisterResponse | undefined>;
}

export interface UsersLoginResponse {
    accessToken: string;
    refreshToken: string;
}


export interface UsersRegisterResponse {
    id: number;
    name: string;
    email: string;
}