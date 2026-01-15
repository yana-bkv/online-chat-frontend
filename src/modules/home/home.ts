import UsersApiService from "../users/services/users-api.service";
import LocalStorageService from "../../shared/services/storage.service";
import ToasterService from "../../shared/services/toaster.service";
import AuthPageGuardService from "../guards/services/auth-page-guard.service";

const toasterService = new ToasterService(3000);
const apiService = new UsersApiService(toasterService);
const storageService = new LocalStorageService();

const authPageGuardService = new AuthPageGuardService(apiService, storageService);
void authPageGuardService.init();