import { Component } from '@angular/core';
import { Empresa } from '../../../interfaces/dashboard/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
})
export class EmpresasComponent {
  empresaDialog: boolean = false;

  empresas!: Empresa[];

  empresa!: Empresa;

  selectedEmpresas!: Empresa[] | null;

  submitted: boolean = false;

  statuses: any[] = [];

  constructor(
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadEmpresas();

    this.statuses = [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ];
  }

  loadEmpresas() {
    this.empresaService.getEmpresas().subscribe((data) => (this.empresas = data));
  }

  openNew() {
    this.empresa = {} as Empresa;
    this.submitted = false;
    this.empresaDialog = true;
  }

  deleteSelectedEmpresas() {
    this.confirmationService.confirm({
      message: '¿Seguro que desea borrar las empresas seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        const idsToDelete = this.selectedEmpresas
          ?.map(emp => emp.idEmpresa)
          .filter((id): id is number => id !== undefined); // Filter out undefined values

        if (idsToDelete && idsToDelete.length > 0) {
          idsToDelete.forEach(id => {
            this.empresaService.deleteEmpresa(id).subscribe(() => {
              // Update local list after each deletion
              this.empresas = this.empresas.filter(empresa => empresa.idEmpresa !== id);
            });
          });

          this.selectedEmpresas = null;
          this.messageService.add({
            severity: 'success',
            summary: '¡Exitoso!',
            detail: 'Empresas borradas',
            life: 3000
          });
        }
      }
    });
  }



  editEmpresa(empresa: Empresa) {
    this.empresa = { ...empresa };
    this.empresaDialog = true;
  }

  deleteEmpresa(empresa: Empresa) {
    this.confirmationService.confirm({
      message: `¿Seguro que desea borrar ${empresa.nombreEmpresa}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.empresaService.deleteEmpresa(empresa.idEmpresa!).subscribe(() => {
          this.empresas = this.empresas.filter(
            (val) => val.idEmpresa !== empresa.idEmpresa
          );
          this.empresa = {} as Empresa;
          this.messageService.add({
            severity: 'success',
            summary: '¡Exitoso!',
            detail: 'Empresa borrada',
            life: 3000
          });
        });
      }
    });
  }

  hideDialog() {
    this.empresaDialog = false;
    this.submitted = false;
  }

  saveEmpresa() {
    this.submitted = true;

    if (this.empresa.nombreEmpresa.trim()) {
      if (this.empresa.idEmpresa) {
        this.empresaService.updateEmpresa(this.empresa).subscribe(() => {
          this.loadEmpresas();
          this.messageService.add({
            severity: 'success',
            summary: '¡Exitoso!',
            detail: 'Empresa actualizada',
            life: 3000
          });
        });
      } else {
        this.empresaService.createEmpresa(this.empresa).subscribe(() => {
          this.loadEmpresas();
          this.messageService.add({
            severity: 'success',
            summary: '¡Exitoso!',
            detail: 'Empresa creada',
            life: 3000
          });
        });
      }

      this.empresaDialog = false;
      this.empresa = {} as Empresa;
    }
  }

  filterGlobal(dt: any, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (dt && inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }
}

