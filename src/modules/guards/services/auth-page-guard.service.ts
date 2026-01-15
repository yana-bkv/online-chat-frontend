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
            location.href = '/sign-in'
        }
    }

    private async getProfile() {
        try {
            const accessToken = this.storageService.getFromStorage('accessToken');
            if (accessToken) {
                return await this.apiService.profile(accessToken)
            }

        } catch  (error) {
            if (error) {
                console.error(error);
            }
        }
    }
}

