import 'bootstrap/dist/js/bootstrap.min.js';

import SignInFormService from "./services/sign-in-form.service";

const emailInput: HTMLInputElement | null = document.querySelector('#emailInput');
const passwordInput: HTMLInputElement | null = document.querySelector('#passwordInput');
const submitBtn: HTMLButtonElement | null = document.querySelector('#loginSubmit');

if (emailInput && passwordInput && submitBtn) {
    const signInFormService = new SignInFormService(submitBtn, emailInput, passwordInput);
    void signInFormService.handleSubmitEvent();
}