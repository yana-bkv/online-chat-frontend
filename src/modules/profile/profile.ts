import AuthPageGuardService from "../guards/services/auth-page-guard.service";
import ToasterService from "../../shared/services/toaster.service";
import UsersApiService from "../users/services/users-api.service";
import LocalStorageService from "../../shared/services/storage.service";
import ProfileFormService from "./services/profile-form.service";

// SERVICES
const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService()
const usersApiService = new UsersApiService(toasterService, storageService)

// AUTH PAGE GUARD
const authPageGuardService = new AuthPageGuardService(usersApiService, storageService)
void authPageGuardService.init();

// PROFILE DATA
const nameInput: HTMLInputElement | null = document.querySelector('#nameInput');
const emailInput: HTMLInputElement | null  = document.querySelector('#emailInput')
const nameValidationFeedback: HTMLDivElement | null = document.querySelector('#nameInputValidationFeedback');
const editButton: HTMLButtonElement | null = document.querySelector("#editButton");
const cancelButton: HTMLButtonElement | null = document.querySelector("#cancelButton");
const submitButton: HTMLButtonElement | null = document.querySelector("#submitButton");

if (nameInput && emailInput && nameValidationFeedback && usersApiService && editButton && cancelButton && submitButton) {
    const profileData = new ProfileFormService(usersApiService, toasterService, nameInput, emailInput, nameValidationFeedback, editButton, cancelButton, submitButton)
    void profileData.init();
}
