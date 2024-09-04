import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { HomeComponent } from './pages/home/home.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    SucursalesComponent,
    EmpresasComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
    TableModule,
		FileUploadModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
    TagModule,
    ConfirmDialogModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    ConfirmationService
  ]
})
export class DashboardModule { }
