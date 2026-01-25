import 'bootstrap/dist/js/bootstrap.min.js';
import './declare.d';
import NavbarComponent from "./modules/navbar/ui/navbar.component";
import ToasterService from "./shared/services/toaster.service";
import LocalStorageService from "./shared/services/storage.service";
import UsersApiService from "./modules/users/services/users-api.service";
import UserContextService from "./modules/users/services/user-context.service";

// SERVICES
const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService()
const usersApiService = new UsersApiService(toasterService, storageService)
const userContextService = new UserContextService(storageService, usersApiService);

// NAVBAR
const headerEl: HTMLElement | null  = document.querySelector('header');
const navbarComponent = new NavbarComponent(headerEl, usersApiService, storageService, userContextService);
if (headerEl) {
    navbarComponent.render()
}

// SHOW TOASTER TO JUST LOGGED IN USER
const loginSuccess = storageService.getFromStorage('loginSuccess');

if (loginSuccess) {
    toasterService.showSuccess('Welcome back!');
    storageService.removeFromStorage('loginSuccess');
}

// CONTEXT SERVICE
const accessToken = storageService.getFromStorage('accessToken');
if (accessToken) {
    userContextService.fetchUser();
}