export interface UsersApiServiceInterface {
    login(email: string, password: string): Promise<UsersLoginResponse | undefined>;
}

export interface UsersLoginResponse {
    accessToken: string;
    refreshToken: string;
}