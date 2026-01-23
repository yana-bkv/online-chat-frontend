import {UsersApiServiceInterface} from "../../users/services/users-api.types";
import {ToasterServiceInterface} from "../../../shared/services/toaster.service";

export default class ProfileFormService {
    private name: string = '';
    private email: string = '';

    constructor(
        private usersApiService: UsersApiServiceInterface,
        private toasterService: ToasterServiceInterface,

        private nameInput: HTMLInputElement,
        private emailInput: HTMLInputElement,

        private nameValidationFeedback: HTMLDivElement,

        private editButton: HTMLButtonElement,
        private cancelButton: HTMLButtonElement,
        private submitButton: HTMLButtonElement
    ) {
    }

    async init() {
        try {
            await this.initInputsData();
            this.handleStartEditingEvent();
            this.handleStopEditingEvent();
            this.handleSubmitEvent();
            this.addEventToNameKeyDownEvent();
        } catch (error: Error | unknown) {
            console.error(error)
        }
    }

    private async initInputsData() {
        await this.fetchProfileData()

        this.nameInput.defaultValue = this.name
        this.emailInput.defaultValue = this.email
    }

    private async fetchProfileData() {
        const userProfile = await this.usersApiService.profile();

        if (userProfile) {
            this.name = userProfile.name || ''
            this.email = userProfile.email || ''
        }
    }


    private async fetchUpdateProfile() {
        const trimmedName = this.nameInput.value.trim();
        if (!trimmedName) {
            this.nameInput.classList.add('is-invalid');
            this.nameValidationFeedback.innerText = 'Please enter name';
            return false
        }

        const response = await this.usersApiService.updateProfile(trimmedName);

        if (response?.message) {
            this.toasterService.showSuccess(response.message);
            return true
        }
    }

    private startEditing() {
        this.nameInput.readOnly = false;

        this.editButton.classList.add('hidden');
        this.cancelButton.classList.remove('hidden');
        this.submitButton.classList.remove('hidden');
    }

    private stopEditing() {
        this.nameInput.readOnly = true;
        this.nameInput.value = this.nameInput.defaultValue;

        this.editButton.classList.remove('hidden');
        this.cancelButton.classList.add('hidden');
        this.submitButton.classList.add('hidden');
    }

    private handleStartEditingEvent() {
        this.editButton.addEventListener('click', () => {
            this.startEditing()
        })
    }

    private handleStopEditingEvent() {
        this.cancelButton.addEventListener('click', () => {
            this.stopEditing()
        })
    }

    private handleSubmitEvent() {
        this.submitButton.addEventListener('click', async () => {
           const editedSuccessfully = await this.fetchUpdateProfile();

           if (!editedSuccessfully) {
               return
           }

           await this.initInputsData();
           this.stopEditing();
        })
    }

    private addEventToNameKeyDownEvent() {
        this.nameInput.addEventListener('keydown', async () => {
            this.nameInput.classList.remove('is-invalid');
            this.nameValidationFeedback.innerText = '';
        })
    }
}
