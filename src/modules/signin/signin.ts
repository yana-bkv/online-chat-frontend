import 'bootstrap/dist/js/bootstrap.min.js';

import SignInFormService from "./services/sign-in-form.service";
import LocalStorageService from "../../shared/services/storage.service";
import UsersApiService from "../users/services/users-api.service";
import ToasterService from "../../shared/services/toaster.service";

const emailInput: HTMLInputElement | null = document.querySelector('#emailInput');
const passwordInput: HTMLInputElement | null = document.querySelector('#passwordInput');
const signInForm: HTMLFormElement | null = document.querySelector('#signInForm');

if (emailInput && passwordInput && signInForm) {
    const toasterService = new ToasterService();
    const apiService = new UsersApiService(toasterService);
    const storageService = new LocalStorageService();
    const signInFormService = new SignInFormService(signInForm, emailInput, passwordInput, storageService, apiService);
    void signInFormService.handleSubmitEvent();
}