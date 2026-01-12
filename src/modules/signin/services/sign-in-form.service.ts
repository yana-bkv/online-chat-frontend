import {StorageServiceInterface} from "../../../shared/services/storage.service";
import {UsersApiServiceInterface} from "../../users/services/users-api.types";

export default class SignInFormService {
    constructor(
        private signInForm: HTMLFormElement,
        private emailInput: HTMLInputElement,
        private passwordInput: HTMLInputElement,
        private storageService: StorageServiceInterface,
        private apiService: UsersApiServiceInterface
        ) {}

    async handleSubmitEvent() {
        this.signInForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            void this.login();
        })
    }

    async login() {
        try {
            const email = this.emailInput.value.trim();
            const password = this.passwordInput.value.trim();

            if (!email || !password) {
                alert('Please fill in all fields');
                return
            }

            const data = await this.apiService.login(email, password);

            if (data?.accessToken) {
                this.storageService.addToStorage('accessToken', data.accessToken)
            }

        }
        catch (error: | Error | unknown) {
            console.error(error);
        }
    }
}