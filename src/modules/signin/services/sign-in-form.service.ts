import {StorageServiceInterface} from "../../../shared/services/storage.service";
import {UsersApiServiceInterface} from "../../users/services/users-api.types";
import {ToasterServiceInterface} from "../../../shared/services/toaster.service";

export default class SignInFormService {
    constructor(
        private storageService: StorageServiceInterface,
        private apiService: UsersApiServiceInterface,
        private toasterService: ToasterServiceInterface,

        private signInForm: HTMLFormElement,
        private emailInput: HTMLInputElement,
        private emailInvalidFeedback: HTMLDivElement,
        private passwordInput: HTMLInputElement,
        private passwordInvalidFeedback: HTMLDivElement,
        ) {}

    initEmailInputValue() {
        const params = new URLSearchParams(location.search);
        const paramEmail = params?.get('email');
        if (paramEmail) {
            this.emailInput.value = paramEmail;
            this.toasterService.showSuccess("User had registered successfully! Enter password to continue.")
        }
    }

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
                this.storageService.addToStorage('loginSuccess', 'true');

                const from = this.storageService.getFromStorage('from');
                this.storageService.removeFromStorage('from');
                location.href = from || '/';
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