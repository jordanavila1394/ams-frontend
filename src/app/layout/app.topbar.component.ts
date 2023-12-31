import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from '../stores/auth/authentication.reducer';
import { logout } from '../stores/auth/authentication.actions';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../utils/constants';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    authState$: Observable<AuthState>;

    selectedCompany;

    companies: [];

    isVisibleMenuCompanies: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    redirectRoute: any;

    constructor(
        public layoutService: LayoutService,
        private companyService: CompanyService,
        private authService: AuthService,
        private store: Store<{ authState: AuthState }>,
    ) {
        this.authState$ = store.select('authState');
        const userRoles = this.authService.getRoles();

        if (
            userRoles.includes('ROLE_ADMIN') ||
            userRoles.includes('ROLE_MODERATOR')
        ) {
            this.isVisibleMenuCompanies = true;
            this.redirectRoute = ROUTES.ROUTE_DASHBOARD;
        } else {
            this.isVisibleMenuCompanies = false;
            this.redirectRoute = ROUTES.ROUTE_LANDING_HOME;
        }
    }

    loadServices() {
        this.companyService.getAllCompanies().subscribe((companies) => {
            this.companies = companies;
        });
    }
    OnClickLogout() {
        this.store.dispatch(logout());
    }
}
