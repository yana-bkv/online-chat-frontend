import 'bootstrap/dist/js/bootstrap.min.js';
import './declare.d';
import NavbarComponent from "./modules/navbar/ui/navbar.component";
import ToasterService from "./shared/services/toaster.service";
import LocalStorageService from "./shared/services/storage.service";
import UsersApiService from "./modules/users/services/users-api.service";

// SERVICES
const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService()
const usersApiService = new UsersApiService(toasterService, storageService)

// NAVBAR
const headerEl: HTMLElement | null  = document.querySelector('header');
const navbarComponent = new NavbarComponent(headerEl, usersApiService, storageService);
if (headerEl) {
    navbarComponent.render()
}