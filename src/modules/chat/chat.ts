import {ChatService} from "./services/chat.service";
import LocalStorageService from "../../shared/services/storage.service";

const storageService = new LocalStorageService()
const chatService = new ChatService(storageService)
chatService.connect();