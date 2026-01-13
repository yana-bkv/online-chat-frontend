import 'bootstrap/dist/js/bootstrap.min.js';

import SignUpFormService from "./services/sign-up-form.service";
import ToasterService from "../../shared/services/toaster.service";

const signUpForm: HTMLFormElement | null = document.querySelector('#signUpForm');

const nameInput: HTMLInputElement | null = document.querySelector('#nameInput');
const emailInput: HTMLInputElement | null = document.querySelector('#emailInput');
const passwordInput: HTMLInputElement | null = document.querySelector('#passwordInput');
const confirmPasswordInput: HTMLInputElement | null = document.querySelector('#confirmPasswordInput');

const nameInvalidFeedback: HTMLDivElement | null = document.querySelector('#nameInvalidFeedback');
const emailInvalidFeedback: HTMLDivElement | null = document.querySelector('#emailInvalidFeedback');
const passwordInvalidFeedback: HTMLDivElement | null = document.querySelector('#passwordInvalidFeedback');
const confirmPasswordInvalidFeedback: HTMLDivElement | null = document.querySelector('#confirmPasswordInvalidFeedback');

if (nameInput && emailInput && passwordInput && confirmPasswordInput && signUpForm && nameInvalidFeedback && emailInvalidFeedback && passwordInvalidFeedback && confirmPasswordInvalidFeedback) {
    // const toasterService = new ToasterService(3000);

    const signInFormService = new SignUpFormService(signUpForm, nameInput, emailInput, passwordInput, confirmPasswordInput, nameInvalidFeedback, emailInvalidFeedback, passwordInvalidFeedback, confirmPasswordInvalidFeedback);
    void signInFormService.handleSubmitEvent();
    void signInFormService.handleEmailKeyUp();
    void signInFormService.handlePasswordKeyUp();
}