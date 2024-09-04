import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { map, Observable } from 'rxjs';
import { Empresa } from '../../interfaces/dashboard/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly baseUrl: string = `${environment.baseUrl}/empresas`;
  private http = inject(HttpClient)

  constructor() { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl);
  }

  getEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/${id}`);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.baseUrl, empresa);
  }

  updateEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.baseUrl}/${empresa.idEmpresa}`, empresa);
  }

  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
