import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    SucursalesComponent,
    EmpresasComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
