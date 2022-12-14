import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialFileInputModule } from 'ngx-material-file-input';

//Angular Material
import {MatMenuModule} from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,   
    MatProgressBarModule,
    MaterialFileInputModule,
    NgxPayPalModule,
  ],
  exports:[
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressBarModule,
    MaterialFileInputModule,
    NgxPayPalModule,
  ]
})
export class SharedModule { }
