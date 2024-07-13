import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthService]
})
export class RegistrationComponent {
  registrationForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [
        Validators.required, 
        Validators.pattern('[- +()0-9]{9,12}')
      ]],
      password: ['', [
        Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()+=<>?])[A-Za-z\d~!@#$%^&*()+=<>?]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
    }
    );
  }

  register() {
    
    this.authService.registerService(this.registrationForm.value)
    .subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        this.registrationForm.reset();
      }
    });
  }
}
