import LocalStorageService from "../../shared/services/storage.service";
import AuthPageGuardService from "../guards/services/auth-page-guard.service";
import {userContextService} from "../../shared/services/user-context.instance";

const storageService = new LocalStorageService();

const authPageGuardService = new AuthPageGuardService(storageService, userContextService);
void authPageGuardService.init();