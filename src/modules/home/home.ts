import UsersApiService from "../users/services/users-api.service";
import LocalStorageService from "../../shared/services/storage.service";
import ToasterService from "../../shared/services/toaster.service";
import AuthPageGuardService from "../guards/services/auth-page-guard.service";
import NavbarComponent from "../navbar/ui/navbar.component";

const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService();
const usersApiService = new UsersApiService(toasterService, storageService);

const authPageGuardService = new AuthPageGuardService(usersApiService, storageService);
void authPageGuardService.init();