import {StorageServiceInterface} from "../../../shared/services/storage.service";
import {io, Socket} from "socket.io-client";

export class ChatService {
    socket: Socket | null = null

    constructor(
        private storageService: StorageServiceInterface
    ) {
    }

    connect() {
        const accessToken = this.storageService.getFromStorage('accessToken');

        this.socket = io('http://localhost:4000', {
            auth: {
                token: accessToken
            }
        })

        this.socket.on('connect', () => {
            console.log('Connected to chat server')
        })
    }
}