import {UsersApiServiceInterface} from "../../users/services/users-api.types";

export default class ProfileFormService {
    constructor(
        private apiService: UsersApiServiceInterface,

        private nameInput: HTMLInputElement,
        private emailInput: HTMLInputElement
    ) {
    }

    async init() {
        const userProfile = await this.apiService.profile();
        if (userProfile) {
            this.nameInput.value = userProfile.name || '';
            this.emailInput.value = userProfile.email || '';
        }
    }
}
