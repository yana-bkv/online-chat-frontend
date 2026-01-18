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

if (nameInput && emailInput && usersApiService) {
    const profileData = new ProfileFormService(usersApiService, nameInput, emailInput)
    profileData.init();
}
