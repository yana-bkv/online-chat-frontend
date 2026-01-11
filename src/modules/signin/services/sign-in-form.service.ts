import axios from "axios";

export default class SignInFormService {
    constructor(private submitBtn: HTMLButtonElement, private emailInput: HTMLInputElement, private passwordInput: HTMLInputElement) {}

    async handleSubmitEvent() {
        this.submitBtn?.addEventListener('click', async () => {
            const response = await this.login();
            console.log(response?.data);
        })
    }

    async login() {
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();

        if (!email || !password) {
            alert('Please fill in all fields');
            return
        }

        return axios.post('http://localhost:4000/users/login', { email: email, password: password });
    }
}