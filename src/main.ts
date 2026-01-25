import 'bootstrap/dist/js/bootstrap.min.js';
import './declare.d';
import 'shared/services/user-context.instance'
import NavbarComponent from "./modules/navbar/ui/navbar.component";
import ToasterService from "./shared/services/toaster.service";
import LocalStorageService from "./shared/services/storage.service";
import UsersApiService from "./modules/users/services/users-api.service";
import {userContextService} from "./shared/services/user-context.instance";

// SERVICES
const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService()
const usersApiService = new UsersApiService(toasterService, storageService)

// SHOW TOASTER TO JUST LOGGED IN USER
const loginSuccess = storageService.getFromStorage('loginSuccess');

if (loginSuccess) {
    toasterService.showSuccess('Welcome back!');
    storageService.removeFromStorage('loginSuccess');
}

// NAVBAR
const headerEl: HTMLElement | null  = document.querySelector('header');
const navbarComponent = new NavbarComponent(headerEl, usersApiService, storageService, userContextService);
if (headerEl) {
    navbarComponent.render()
}