import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../../interfaces/dashboard/sucursal.interface';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {


  private readonly baseUrl: string = `${environment.baseUrl}/api/sucursales`;
  private http = inject(HttpClient)

  constructor() { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getSucursal(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createSucursal(sucursal: Sucursal, id: number): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${this.baseUrl}/empresa-exists/${id}`, sucursal, { headers: this.getHeaders() });
  }

  updateSucursal(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this.baseUrl}/${sucursal.idSucursal}`, sucursal, { headers: this.getHeaders() });
  }

  deleteSucursal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
