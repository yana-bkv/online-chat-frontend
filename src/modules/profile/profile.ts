import AuthPageGuardService from "../guards/services/auth-page-guard.service";
import ToasterService from "../../shared/services/toaster.service";
import UsersApiService from "../users/services/users-api.service";
import LocalStorageService from "../../shared/services/storage.service";

const toasterApiService = new ToasterService(3000);
const usersApiService = new UsersApiService(toasterApiService)
const localStorageService = new LocalStorageService()

const authPageGuardService = new AuthPageGuardService(usersApiService, localStorageService)

void authPageGuardService.init();