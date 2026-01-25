import 'bootstrap/dist/js/bootstrap.min.js';

import SignInFormService from "./services/sign-in-form.service";
import LocalStorageService from "../../shared/services/storage.service";
import UsersApiService from "../users/services/users-api.service";
import ToasterService from "../../shared/services/toaster.service";
import PublicPageGuardService from "../guards/services/public-page-guard.service";
import UserContextService from "../users/services/user-context.service";

const signInForm: HTMLFormElement | null = document.querySelector('#signInForm');

const emailInput: HTMLInputElement | null = document.querySelector('#emailInput');
const passwordInput: HTMLInputElement | null = document.querySelector('#passwordInput');
const emailInvalidFeedback: HTMLDivElement | null = document.querySelector('#emailInvalidFeedback');
const passwordInvalidFeedback: HTMLDivElement | null = document.querySelector('#passwordInvalidFeedback');

const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService();
const apiService = new UsersApiService(toasterService, storageService);
const userContextService = new UserContextService(storageService, apiService);

const publicPageGuardService = new PublicPageGuardService(userContextService, storageService);
void publicPageGuardService.init();

if (emailInput && passwordInput && signInForm && emailInvalidFeedback && passwordInvalidFeedback) {
    const signInFormService = new SignInFormService(storageService, apiService, toasterService,signInForm, emailInput, emailInvalidFeedback, passwordInput, passwordInvalidFeedback);
    void signInFormService.initEmailInputValue();

    void signInFormService.handleSubmitEvent();
    void signInFormService.handleEmailKeyUp();
    void signInFormService.handlePasswordKeyUp();
}