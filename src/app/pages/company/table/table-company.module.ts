import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableCompanyComponent } from './table-company.component';
import { TableCompanyRoutingModule } from './table-company-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DefaultAutocompleteModule } from 'src/app/shared/components/default-autocomplete/default-autocomplete.module';

@NgModule({
    imports: [
        CommonModule,
        TableCompanyRoutingModule,
        DefaultAutocompleteModule,
        DialogModule,
        ConfirmDialogModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
    ],
    declarations: [TableCompanyComponent],
})
export class TableCompanyModule {}