import {UsersApiServiceInterface} from "../../users/services/users-api.types";

export default class SignUpFormService {
    private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/;

    constructor(
        private signUpForm: HTMLFormElement,
        private apiService: UsersApiServiceInterface,

        private nameInput: HTMLInputElement,
        private emailInput: HTMLInputElement,
        private passwordInput: HTMLInputElement,
        private confirmedPasswordInput: HTMLInputElement,

        private nameInvalidFeedback: HTMLDivElement,
        private emailInvalidFeedback: HTMLDivElement,
        private passwordInvalidFeedback: HTMLDivElement,
        private confirmedPasswordInvalidFeedback: HTMLDivElement,
    ) {}

    async handleSubmitEvent() {
        this.signUpForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            void this.login();
        })
    }

    async handleNameKeyUp() {
        this.nameInput?.addEventListener('keyup', async (e) => {
            e.preventDefault();
            this.hideValidationError(this.nameInput, this.nameInvalidFeedback);
        })
    }

    async handleEmailKeyUp() {
        this.emailInput?.addEventListener('keyup', async (e) => {
            e.preventDefault();
            this.hideValidationError(this.emailInput, this.emailInvalidFeedback);
        })
    }

    async handlePasswordKeyUp() {
        this.passwordInput?.addEventListener('keyup', async (e) => {
            e.preventDefault();
            this.hideValidationError(this.passwordInput, this.passwordInvalidFeedback);
        })
    }

    async handleConfirmedPasswordKeyUp() {
        this.confirmedPasswordInput?.addEventListener('keyup', async (e) => {
            e.preventDefault();
            this.hideValidationError(this.confirmedPasswordInput, this.confirmedPasswordInvalidFeedback);
        })
    }

    async login() {

        try {
            let hasErrors = false;

            const name = this.nameInput.value.trim();
            const email = this.emailInput.value.trim();
            const password = this.passwordInput.value.trim();
            const confirmPassword = this.confirmedPasswordInput.value.trim();

            if (!name) {
                this.showValidationError(this.nameInput, this.nameInvalidFeedback, 'Name is invalid');
                hasErrors = true;
            }

            if (!email) {
                this.showValidationError(this.emailInput, this.emailInvalidFeedback, 'Please enter email');
                hasErrors = true;
            } else if (!email.match(this.emailRegex)) {
                this.showValidationError(this.emailInput, this.emailInvalidFeedback, 'Email is not valid');
                hasErrors = true;
            }

            if (!password) {
                this.showValidationError(this.passwordInput, this.passwordInvalidFeedback, 'Please enter password');
                hasErrors = true;
            }
            else if (!(password.length >= 8 && password.length <= 24)) {
                this.showValidationError(this.passwordInput, this.passwordInvalidFeedback, 'Password should be at least 8 characters and minimum 24');
                hasErrors = true;
            } else if (!password.match(this.passwordRegex)) {
                this.showValidationError(this.passwordInput, this.passwordInvalidFeedback, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character');
                hasErrors = true;
            }

            if (!password) {
                this.showValidationError(this.confirmedPasswordInput, this.confirmedPasswordInvalidFeedback, 'Please enter confirmed password');
                hasErrors = true;
            }
            else if (confirmPassword !== password) {
                this.showValidationError(this.confirmedPasswordInput, this.confirmedPasswordInvalidFeedback, 'Confirmed password and password do not match');
                hasErrors = true;
            }

            if (hasErrors) {
                return
            }

            const data = await this.apiService.register(name, email, password, confirmPassword);
            if (data?.email) {
                location.href = "/sign-in?email=" + data.email;
            }
        }
        catch (error: | Error | unknown) {
            console.error(error);
        }
    }

    private showValidationError(input: HTMLInputElement, div: HTMLDivElement, message: string) {
        input.classList.add('is-invalid');
        div.innerText = message;
    }

    private hideValidationError(input: HTMLInputElement, div: HTMLDivElement) {
        input.classList.remove('is-invalid');
        div.innerText = '';
    }
}