import UsersApiService from "../../users/services/users-api.service";
import LocalStorageService from "../../../shared/services/storage.service";

export interface PublicPageGuardServiceInterface {
    init(): void;
}

export default class PublicPageGuardService implements PublicPageGuardServiceInterface {
    constructor (
        private apiService: UsersApiService,
        private storageService: LocalStorageService,
    ) {}

    async init() {
        const data = await this.getProfile()

        if (data) {
            location.href = '/profile'
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

