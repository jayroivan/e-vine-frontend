import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DialogOverviewExampleDialog } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ProductoComponent } from '../producto/producto.component';
import { CarritoComponent } from '../carrito/carrito.component';
import { ModificarComponent } from '../producto/modificar/modificar.component';
import { OrdenComponent } from '../orden/orden.component';
import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog,
    CategoriaComponent,
    ProductoComponent,
    CarritoComponent,
    ModificarComponent,
    OrdenComponent,
    ProfileComponent,
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
