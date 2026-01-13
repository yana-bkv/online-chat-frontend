import {StorageServiceInterface} from "../../../shared/services/storage.service";
import {UsersApiServiceInterface} from "../../users/services/users-api.types";

export default class SignInFormService {
    constructor(
        private signInForm: HTMLFormElement,
        private emailInput: HTMLInputElement,
        private emailInvalidFeedback: HTMLDivElement,
        private passwordInput: HTMLInputElement,
        private passwordInvalidFeedback: HTMLDivElement,
        private storageService: StorageServiceInterface,
        private apiService: UsersApiServiceInterface
        ) {}

    async handleSubmitEvent() {
        this.signInForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            void this.login();
        })
    }

    async handleEmailKeyUp() {
        this.emailInput?.addEventListener('keyup', async (e) => {
            e.preventDefault();
            this.removeEmailInvalidFeedback();
        })
    }

    async handlePasswordKeyUp() {
        this.passwordInput?.addEventListener('keyup', async (e) => {
            e.preventDefault();
            this.removePasswordInvalidFeedback();
        })
    }

    async login() {

        try {
            const email = this.emailInput.value.trim();
            const password = this.passwordInput.value.trim();
            let hasErrors = false;

            if (!email) {
                this.addEmailInvalidFeedback();
                hasErrors = true;
            }

            if (!password) {
                this.addPasswordInvalidFeedback();
                hasErrors = true;
            }

            if (hasErrors) {
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

    private addEmailInvalidFeedback() {
        this.emailInput.classList.add('is-invalid');
        this.emailInvalidFeedback.innerText = 'Please provide a valid email.'
    }

    private addPasswordInvalidFeedback() {
        this.passwordInput.classList.add('is-invalid');
        this.passwordInvalidFeedback.innerText = 'Please provide a valid password.'
    }

    private removeEmailInvalidFeedback() {
        this.emailInput.classList.remove('is-invalid');
        this.emailInvalidFeedback.innerText = ''
    }

    private removePasswordInvalidFeedback() {
        this.passwordInput.classList.remove('is-invalid');
        this.passwordInvalidFeedback.innerText = ''
    }
}