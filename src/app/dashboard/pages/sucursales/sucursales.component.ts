import { Component } from '@angular/core';
import { Sucursal } from '../../../interfaces/dashboard/sucursal.interface';
import { Empresa } from '../../../interfaces/dashboard/empresa.interface';
import { SucursalService } from '../../services/sucursal.service';
import { EmpresaService } from '../../services/empresa.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
})
export class SucursalesComponent {
  sucursalDialog: boolean = false;

  sucursales!: Sucursal[];

  sucursal!: Sucursal;

  selectedSucursales!: Sucursal[] | null;

  empresas!: Empresa[];

  selectedEmpresa!: Empresa | null;

  submitted: boolean = false;

  statuses: any[] = [];

  constructor(
    private sucursalService: SucursalService,
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadSucursales();
    this.loadEmpresas();

    this.statuses = [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false },
    ];
  }

  loadSucursales() {
    this.sucursalService.getSucursales().subscribe((data) => (this.sucursales = data));
  }

  loadEmpresas() {
    this.empresaService.getEmpresas().subscribe((data) => (this.empresas = data));
  }

  openNew() {
    this.sucursal = {} as Sucursal;
    this.selectedEmpresa = null; // Reset selected empresa
    this.submitted = false;
    this.sucursalDialog = true;
  }

  deleteSelectedSucursales() {
    this.confirmationService.confirm({
      message: '¿Seguro que desea borrar las sucursales seleccionadas?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        const idsToDelete = this.selectedSucursales
          ?.map(suc => suc.idSucursal)
          .filter((id): id is number => id !== undefined);

        if (idsToDelete && idsToDelete.length > 0) {
          idsToDelete.forEach(id => {
            this.sucursalService.deleteSucursal(id).subscribe(() => {
              this.sucursales = this.sucursales.filter(sucursal => sucursal.idSucursal !== id);
            });
          });

          this.selectedSucursales = null;
          this.messageService.add({
            severity: 'success',
            summary: '¡Exitoso!',
            detail: 'Sucursales borradas',
            life: 3000
          });
        }
      }
    });
  }

  editSucursal(sucursal: Sucursal) {
    this.sucursal = { ...sucursal };
    this.selectedEmpresa = sucursal.empresa; // Set the current empresa
    this.sucursalDialog = true;
  }

  deleteSucursal(sucursal: Sucursal) {
    this.confirmationService.confirm({
      message: `¿Seguro que desea borrar ${sucursal.nombreSucursal}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.sucursalService.deleteSucursal(sucursal.idSucursal!).subscribe(() => {
          this.sucursales = this.sucursales.filter(
            (val) => val.idSucursal !== sucursal.idSucursal
          );
          this.sucursal = {} as Sucursal;
          this.messageService.add({
            severity: 'success',
            summary: '¡Exitoso!',
            detail: 'Sucursal borrada',
            life: 3000
          });
        });
      }
    });
  }

  hideDialog() {
    this.sucursalDialog = false;
    this.submitted = false;
  }

  saveSucursal() {
    this.submitted = true;

    // Validate required fields
    if (!this.sucursal.nombreSucursal || !this.sucursal.nombreSucursal.trim()) {
      return;
    }

    if (!this.selectedEmpresa) {
      return;
    }

    if (this.sucursal.idSucursal) {
      // Update existing sucursal
      this.sucursal.empresa = this.selectedEmpresa;
      this.sucursalService.updateSucursal(this.sucursal).subscribe(() => {
        this.loadSucursales();
        this.messageService.add({
          severity: 'success',
          summary: '¡Exitoso!',
          detail: 'Sucursal actualizada',
          life: 3000
        });
      });
    } else {
      // Create new sucursal with selected empresa
      this.sucursal.empresa = this.selectedEmpresa;
      this.sucursalService.createSucursal(this.sucursal, this.selectedEmpresa.idEmpresa!).subscribe(() => {
        this.loadSucursales();
        this.messageService.add({
          severity: 'success',
          summary: '¡Exitoso!',
          detail: 'Sucursal creada',
          life: 3000
        });
      });
    }

    this.sucursalDialog = false;
    this.sucursal = {} as Sucursal;
  }

  filterGlobal(dt: any, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (dt && inputElement) {
      dt.filterGlobal(inputElement.value, 'contains');
    }
  }
}
