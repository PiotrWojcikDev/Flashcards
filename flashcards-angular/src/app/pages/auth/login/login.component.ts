import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit{
  
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next: (res) => {
        localStorage.setItem('userId', res.userId);
        const userId = localStorage.getItem('userId');
        if (userId !== null && userId !== undefined) 
          this.router.navigate(['sets']);
        console.log("ok")

      },
      error: (err) => {
        console.log(err);
        console.log("nie ok")
        this.loginForm.reset();
        this.router.navigate(['login']);
    }});
  }
}
