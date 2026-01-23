import {UsersProfileResponse} from "./users-api.types";

export interface UserContextServiceInterface {
    getUser(): UsersProfileResponse | null;
    setUser(userData: UsersProfileResponse | null): void;
    fetchUser(): Promise<UsersProfileResponse | null>;
    clearUser(): void;
    subscribe(callback: (userData: UsersProfileResponse | null) => void): () => void;
}