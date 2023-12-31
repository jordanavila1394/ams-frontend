//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';

//PrimeNg

//Models

//Services
import { LayoutService } from 'src/app/layout/service/app.layout.service';

//Store
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CompanyState } from 'src/app/stores/dropdown-select-company/dropdown-select-company.reducer';
import { AuthState } from 'src/app/stores/auth/authentication.reducer';

//Libraies
import * as moment from 'moment';

//Utils
import Formatter from 'src/app/utils/formatters';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ROUTES } from 'src/app/utils/constants';

@Component({
    templateUrl: './landing-home.component.html',
    styleUrls: ['./landing-home.component.scss'],
})
export class LandingHomeComponent implements OnInit, OnDestroy {
    authState$: Observable<AuthState>;

    //Language
    locale: string;

    //Utils
    formatter!: Formatter;

    //Store
    subscription: Subscription;
    companyState$: Observable<CompanyState>;

    //Variables
    currentUser: any;
    menuItems: any;
    loading: boolean;
    attendanceData: any;

    constructor(
        public layoutService: LayoutService,
        private attendanceService: AttendanceService,
        private store: Store<{ authState: AuthState }>,
    ) {
        //Init
        this.authState$ = store.select('authState');
        this.menuItems = [
            {
                label: 'Permesso',
                source: 'assets/icons/leave.png',
                linkRoute: ROUTES.ROUTE_PERMISSION_HOME,

                icon: 'pi pi-fw pi-check',
            },
            {
                label: 'Presenze',
                source: 'assets/icons/calendar.png',
                linkRoute: ROUTES.ROUTE_MYATTENDANCES_HOME,
                icon: 'pi pi-fw pi-refresh',
            },
            {
                label: 'Documenti',
                source: 'assets/icons/stamp.png',
                linkRoute: ROUTES.ROUTE_DOCUMENTS_HOME,
                icon: 'pi pi-fw pi-trash',
            },
            {
                label: 'Supporto',
                source: 'assets/icons/customer-service.png',
                icon: 'pi pi-fw pi-home',
            },
        ];
        this.formatter = new Formatter();
    }

    ngOnInit(): void {
        this.authState$.subscribe((authS) => {
            this.currentUser = authS?.user || '';
            this.loadServices(this.currentUser);
        });
        const layourServiceSubscription =
            this.layoutService.configUpdate$.subscribe(() => {
                this.loadServices(this.currentUser);
            });
        if (this.subscription) {
            this.subscription.add(layourServiceSubscription);
        }
    }

    loadServices(currentUser) {
        const attendanceServiceSubscription = this.attendanceService
            .getAttendanceByUser(currentUser.id)
            .subscribe((data) => {
                this.attendanceData = data;
                this.loading = false;
            });
        if (this.subscription && attendanceServiceSubscription)
            this.subscription.add(attendanceServiceSubscription);
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
