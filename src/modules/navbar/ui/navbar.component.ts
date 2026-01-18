import {UsersApiServiceInterface} from "../../users/services/users-api.types";
import LocalStorageService, {StorageServiceInterface} from "../../../shared/services/storage.service";

export interface NavbarComponentInterface {
    render: () => void
}

export default class NavbarComponent implements NavbarComponentInterface {
    private navEl: HTMLElement | null = null
    private divEl: HTMLDivElement | null = null
    private logoEl: HTMLAnchorElement | null = null
    private buttonEl: HTMLButtonElement | null = null
    private spanEl: HTMLSpanElement | null = null
    private collapseDiv: HTMLDivElement | null = null
    private ulEl: HTMLUListElement | null = null
    private signInLinkEl: HTMLAnchorElement | null = null
    private signInButtonEl: HTMLButtonElement | null = null

    private headerEl: HTMLElement | null = null

    constructor(headerEl: HTMLElement | null = null, private userApiService: UsersApiServiceInterface, private localStorage: StorageServiceInterface) {
        this.headerEl = headerEl
    }

    async render() {
        this.createNavEl();
        this.createContainerDivEL();
        this.createButtonEl()
        this.createLogoEl();
        this.createSpanEl();
        this.createCollapseDiv();
        this.createUlEl();
        this.createSignInLinkEl();
        this.createSignInButtonEl();

        if (this.headerEl && this.navEl && this.divEl && this.logoEl && this.buttonEl && this.spanEl && this.collapseDiv && this.ulEl && this.signInLinkEl && this.signInButtonEl) {
            this.navEl.appendChild(this.divEl);
            this.divEl.appendChild(this.logoEl)
            this.divEl.appendChild(this.buttonEl);
            this.buttonEl.appendChild(this.spanEl);
            this.divEl.appendChild(this.collapseDiv);
            this.collapseDiv.appendChild(this.ulEl);
            this.collapseDiv.appendChild(this.signInLinkEl);

            const userProfile = await this.userApiService.profile();

            if (userProfile) {
                const dropdownEl = this.createDropdownEl(userProfile.name);
                this.signInLinkEl.appendChild(dropdownEl);
            } else {
                this.signInLinkEl.appendChild(this.signInButtonEl)
            }

            this.headerEl.appendChild(this.navEl);
        }
    }

    private createNavEl() {
        const navEl = document.createElement('nav')
        navEl.className = 'navbar navbar-expand-lg bg-body-tertiary'

        this.navEl = navEl
    }

    private createContainerDivEL() {
        const divEl = document.createElement('div');
        divEl.className = 'container-fluid'

        this.divEl = divEl
    }

    private createLogoEl() {
        const logoEl = document.createElement('a')
        logoEl.className = 'navbar-brand';
        logoEl.href = '/'
        logoEl.innerText = 'Online Chat';

        this.logoEl = logoEl
    }

    private createButtonEl() {
        const buttonEl = document.createElement('button');
        buttonEl.className = 'navbar-toggler';
        buttonEl.type = 'button';
        buttonEl.dataset.bsToggle = 'collapse';
        buttonEl.dataset.bsTarget = '#navBarSupportedContent';
        buttonEl.setAttribute('aria-controls','navbarSupportContent');
        buttonEl.setAttribute('aria-expanded','false');

        this.buttonEl = buttonEl
    }

    private createSpanEl() {
        const spanEl = document.createElement('span');
        spanEl.className = 'navbar-toggler-icon';

        this.spanEl = spanEl
    }

    private createCollapseDiv() {
        const collapseDiv = document.createElement('div');
        collapseDiv.className = 'collapse navbar-collapse';
        collapseDiv.id = 'navbarSupportedContent';

        this.collapseDiv = collapseDiv
    }

    private createUlEl() {
        const ulEl = document.createElement('ul');
        ulEl.className = 'navbar-nav me-auto mb-2 mb-lg-0';

        this.ulEl = ulEl
    }

    private createSignInLinkEl() {
        const signInLinkEl = document.createElement('a');
        signInLinkEl.href = '/sign-in';

        this.signInLinkEl = signInLinkEl
    }

    private createSignInButtonEl() {
        const signInButtonEl = document.createElement('button');
        signInButtonEl.className = 'btn btn-outline-success';
        signInButtonEl.type = 'submit';
        signInButtonEl.innerText = 'Sign in';

        this.signInButtonEl = signInButtonEl
    }

    private createDropdownEl(username: string | null) {
        // <div class="btn-group">
        // <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        //     Right-aligned menu
        // </button>
        // <ul class="dropdown-menu dropdown-menu-end">
        // <li><a class="dropdown-item" href="#">Menu item</a></li>
        // <li><a class="dropdown-item" href="#">Menu item</a></li>
        // <li><a class="dropdown-item" href="#">Menu item</a></li>
        // </ul>
        // </div>
        const dropdownDiv = document.createElement('div')
        dropdownDiv.className = 'btn-group';

        const buttonEl = document.createElement('button');
        buttonEl.className = 'btn btn-secondary dropdown-toggle';
        buttonEl.type = 'button'
        buttonEl.dataset.bsToggle = 'dropdown';
        buttonEl.setAttribute('aria-expanded','false');
        buttonEl.innerText = username || 'Guest'

        const ulEl = document.createElement('ul');
        ulEl.className = 'dropdown-menu dropdown-menu-end';

        const liEl1 = document.createElement('li')
        const aEl1 = document.createElement('a');
        aEl1.className = 'dropdown-item';
        aEl1.innerText = 'Profile';
        aEl1.href = '/profile'

        const liEl2 = document.createElement('li')
        const aEl2 = document.createElement('a');
        aEl2.className = 'dropdown-item';
        aEl2.innerText = 'Logout';
        aEl2.addEventListener('click', () => {this.logout()})

        dropdownDiv.appendChild(buttonEl)
        dropdownDiv.appendChild(ulEl)
        ulEl.appendChild(liEl1)
        ulEl.appendChild(liEl2)

        liEl1.appendChild(aEl1)
        liEl2.appendChild(aEl2)

        return dropdownDiv
    }

    private logout() {
        this.localStorage.removeFromStorage('accessToken')
        window.location.reload();
    }
}