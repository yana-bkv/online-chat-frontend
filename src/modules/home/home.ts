import UsersApiService from "../users/services/users-api.service";
import LocalStorageService from "../../shared/services/storage.service";
import ToasterService from "../../shared/services/toaster.service";
import AuthPageGuardService from "../guards/services/auth-page-guard.service";
import UserContextService from "../users/services/user-context.service";

const toasterService = new ToasterService(3000);
const storageService = new LocalStorageService();
const usersApiService = new UsersApiService(toasterService, storageService);
const userContextService = new UserContextService(storageService, usersApiService);

const authPageGuardService = new AuthPageGuardService(storageService, userContextService);
void authPageGuardService.init();