import {UsersApiServiceInterface, UsersLoginResponse, UsersRegisterResponse} from "./users-api.types";
import {ToasterServiceInterface} from "../../../shared/services/toaster.service";
import axios, {AxiosError} from "axios";

export default class UsersApiService implements UsersApiServiceInterface {
    constructor(private toasterService: ToasterServiceInterface) {}

    async login(email:string, password: string): Promise<UsersLoginResponse | undefined> {
        try {
            const response = await axios.post<UsersLoginResponse>('http://localhost:3000/users/login', { email: email, password: password });
            return response.data
        }
        catch (error) {
            if (error instanceof AxiosError) {
                this.toasterService.showError(error?.response?.data?.message || 'Server error')
            } else {
                console.error(error);
                this.toasterService.showError('Error')

            }
        }
    }

    async register(name: string, email:string, password: string, confirmPassword: string): Promise<UsersRegisterResponse | undefined> {
        try {
            const response = await axios.post<UsersRegisterResponse>('http://localhost:3000/users/register', { name, email, password, confirmPassword });
            return response.data
        }
        catch (error) {
            if (error instanceof AxiosError) {
                this.toasterService.showError(error?.response?.data?.message || 'Server error')
            } else {
                console.error(error);
                this.toasterService.showError('Error')

            }
        }
    }
}