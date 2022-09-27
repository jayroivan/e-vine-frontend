import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DialogOverviewExampleDialog } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ProductoComponent } from '../producto/producto.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,
    CategoriaComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  bootstrap: [DialogOverviewExampleDialog],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CategoriaComponent]
})
export class DashboardModule { }
