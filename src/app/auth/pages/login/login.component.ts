import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)


  //TODO: Implement form [formGroup]="myForm" (ngSubmit)="login()" in html and call auth service on submit
  public myForm: FormGroup = this.fb.group({
    username: ["Hassan", [Validators.required, Validators.maxLength(12)]],//PRELOADED CREDENTIALS
    password: ["Mr.Password", [Validators.required, Validators.maxLength(100)]],//FOR TESTING
  })

  // login(){
  //   const {email, password} = this.myForm.value;

  //   this.authService.login(email, password)
  //   .subscribe({
  //     next: () => this.router.navigate(['/dashboard']),
  //     error: (message) => {Swal.fire('Error', message, 'error')}
  //   })
  // }
}
