import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { HomeComponent } from './pages/home/home.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      //dashboards here (pages)
      {path: 'home', component: HomeComponent},
      {path: 'sucursales', component: SucursalesComponent},
      {path: 'empresas', component: EmpresasComponent},
      {path: '**', redirectTo: "home"},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
