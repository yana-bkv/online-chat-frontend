import LocalStorageService from "../../../shared/services/storage.service";
import UserContextService from "../../users/services/user-context.service";

export interface PublicPageGuardServiceInterface {
    init(): void;
}

export default class PublicPageGuardService implements PublicPageGuardServiceInterface {
    constructor (
        private userContextService: UserContextService,
        private storageService: LocalStorageService,
    ) {}

    async init() {
        await this.userContextService.fetchUser();

        if (this.userContextService.isAuthenticated()) {
            location.href = '/profile'
        }
        else {
            this.storageService.removeFromStorage('accessToken');
        }
    }
}

