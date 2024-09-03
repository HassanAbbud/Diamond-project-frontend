import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';



@NgModule({
  declarations: [
    SucursalesComponent,
    EmpresasComponent
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
