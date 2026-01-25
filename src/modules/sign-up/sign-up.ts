import 'bootstrap/dist/js/bootstrap.min.js';

import SignUpFormService from "./services/sign-up-form.service";
import UsersApiService from "../users/services/users-api.service";
import ToasterService from "../../shared/services/toaster.service";
import PublicPageGuardService from "../guards/services/public-page-guard.service";
import LocalStorageService from "../../shared/services/storage.service";
import {userContextService} from "../../shared/services/user-context.instance";

const signUpForm: HTMLFormElement | null = document.querySelector('#signUpForm');

const nameInput: HTMLInputElement | null = document.querySelector('#nameInput');
const emailInput: HTMLInputElement | null = document.querySelector('#emailInput');
const passwordInput: HTMLInputElement | null = document.querySelector('#passwordInput');
const confirmPasswordInput: HTMLInputElement | null = document.querySelector('#confirmPasswordInput');

const nameInvalidFeedback: HTMLDivElement | null = document.querySelector('#nameInvalidFeedback');
const emailInvalidFeedback: HTMLDivElement | null = document.querySelector('#emailInvalidFeedback');
const passwordInvalidFeedback: HTMLDivElement | null = document.querySelector('#passwordInvalidFeedback');
const confirmPasswordInvalidFeedback: HTMLDivElement | null = document.querySelector('#confirmPasswordInvalidFeedback');

const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService();
const apiService = new UsersApiService(toasterService, storageService);

const publicPageGuardService = new PublicPageGuardService(userContextService, storageService);
void publicPageGuardService.init();

if (nameInput && emailInput && passwordInput && confirmPasswordInput && signUpForm && nameInvalidFeedback && emailInvalidFeedback && passwordInvalidFeedback && confirmPasswordInvalidFeedback) {
    const signInFormService = new SignUpFormService(signUpForm, apiService, nameInput, emailInput, passwordInput, confirmPasswordInput, nameInvalidFeedback, emailInvalidFeedback, passwordInvalidFeedback, confirmPasswordInvalidFeedback);
    void signInFormService.handleSubmitEvent();
    void signInFormService.handleNameKeyUp();
    void signInFormService.handleEmailKeyUp();
    void signInFormService.handlePasswordKeyUp();
    void signInFormService.handleConfirmedPasswordKeyUp();
}