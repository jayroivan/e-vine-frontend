import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DialogOverviewExampleDialog } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  bootstrap: [DialogOverviewExampleDialog],
})
export class DashboardModule { }
