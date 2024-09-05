import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../../interfaces/auth/login-response.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../interfaces/auth/user.interface';
import { AuthStatus } from '../../interfaces/auth/auth-status.enum';
import { CheckTokenResponse } from '../../interfaces/auth/check-token-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authUrl: string = environment.baseUrl

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  private http = inject(HttpClient);

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      // Restore user and token from localStorage
      this._currentUser.set(JSON.parse(storedUser));
      this._authStatus.set(AuthStatus.authenticated);
    } else {
      // Perform checkAuthStatus if no user is stored
      this.checkAuthStatus().subscribe();
    }

  }

  checkAuthStatus(): Observable<boolean>{
    const url = `${this.authUrl}/api/users/check-token`
    const token = localStorage.getItem("token");
    if(!token) {
      this.logout()
      return of(false)
    };

    const headers = new HttpHeaders().
      set("Authorization", `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, {headers})
      .pipe(
        map(({usuario, token}) => this.setAuthentication(usuario, token)),
        catchError(error => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false)
        })
      )
  }

  private setAuthentication(usuario: User, token:string): boolean {

    this._currentUser.set( usuario );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(usuario));

    return true;
  }

  login(usuario: string, pass: string): Observable<boolean>{
    const body = {usuario, pass};

    return this.http.post<LoginResponse>(`${this.authUrl}/login`, body)
      .pipe(
        map(({usuario, token}) => this.setAuthentication(usuario, token)),
        catchError(err => throwError(() => err.error.message))
      )
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  }
}
