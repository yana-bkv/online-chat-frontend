export default class SignUpFormService {
    constructor(
        private signUpForm: HTMLFormElement,

        private nameInput: HTMLInputElement,
        private emailInput: HTMLInputElement,
        private passwordInput: HTMLInputElement,
        private confirmPasswordInput: HTMLInputElement,

        private nameInvalidFeedback: HTMLDivElement,
        private emailInvalidFeedback: HTMLDivElement,
        private passwordInvalidFeedback: HTMLDivElement,
        private confirmPasswordInvalidFeedback: HTMLDivElement,
    ) {}

    async handleSubmitEvent() {
        this.signUpForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            void this.login();
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

    async login() {

        try {
            // TODO сделать проверку regex и в целом разные ошибки под полями
            let hasErrors = false;

            const name = this.nameInput.value.trim();
            const email = this.emailInput.value.trim();
            const password = this.passwordInput.value.trim();
            const confirmPassword = this.confirmPasswordInput.value.trim();

            if (!name) {
                this.showValidationError(this.nameInput, this.nameInvalidFeedback, 'Name is invalid');
                hasErrors = true;
            }

            if (!email) {
                this.showValidationError(this.emailInput, this.emailInvalidFeedback, 'Email is invalid');
                hasErrors = true;
            }

            if (!password) {
                this.showValidationError(this.passwordInput, this.passwordInvalidFeedback, 'Password is invalid');
                hasErrors = true;
            }

            if (!confirmPassword) {
                this.showValidationError(this.confirmPasswordInput, this.confirmPasswordInvalidFeedback, 'Confirmed password is invalid');
                hasErrors = true;
            }

            if (hasErrors) {
                return
            }

            // const data = await this.apiService.login(email, password);

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