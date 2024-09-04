import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { map, Observable } from 'rxjs';
import { Empresa } from '../../interfaces/dashboard/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly baseUrl: string = `${environment.baseUrl}/api/empresas`;
  private http = inject(HttpClient)

  constructor() { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.baseUrl, empresa, { headers: this.getHeaders() });
  }

  updateEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.baseUrl}/${empresa.idEmpresa}`, empresa, { headers: this.getHeaders() });
  }

  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
