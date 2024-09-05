import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  public errorMessage: string = "";

  //TODO: Implement form [formGroup]="myForm" (ngSubmit)="login()" in html and call auth service on submit
  public myForm: FormGroup = this.fb.group({
    username: ["Hassan", [Validators.required, Validators.maxLength(12)]],//PRELOADED CREDENTIALS
    password: ["Mr.Password", [Validators.required, Validators.maxLength(100)]],//FOR TESTING
  })

  login(){
    const {username, password} = this.myForm.value;
    this.authService.login(username, password)
    .subscribe({
      next: () => this.router.navigate(['/dashboard/home']),
      error: (message) => {
        this.errorMessage = "Usuario o contraseña incorrectos. Por favor, intente nuevamente",
        console.error('Error', message);
      }
    })
  }
}
