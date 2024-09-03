import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      //dashboards here (pages)
      {path: 'sucursales', component: SucursalesComponent},
      {path: 'empresas', component: SucursalesComponent},
      {path: '**', redirectTo: "sucursales"},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
