import UsersApiService from "../../users/services/users-api.service";
import LocalStorageService from "../../../shared/services/storage.service";

export interface AuthPageGuardServiceInterface {
    init(): void;
}

export default class AuthPageGuardService implements AuthPageGuardServiceInterface {
    constructor (
       private apiService: UsersApiService,
       private storageService: LocalStorageService,
    ) {}

    async init() {
        const data = await this.getProfile()

        if (!data) {
            this.storageService.removeFromStorage('accessToken');
            this.storageService.addToStorage('from', location.pathname)
            location.href = '/sign-in'
        }
    }

    private async getProfile() {
        try {
            return await this.apiService.profile()

        } catch  (error) {
            if (error) {
                console.error(error);
            }
        }
    }
}

