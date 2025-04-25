import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isFlipped = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  selectedFiles: { photo?: File; certificate?: File; license?: File } = {};
  
  role: 'doctor' | 'patient' | '' = '';

  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      gender: [''],
      age: [''],
    });
  }
  
  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.role = 'patient'; // Reset role on flip
  }

  showRegister() {
    this.isFlipped = true;
  }
  
onLoginSubmit() {
  const { email, password } = this.loginForm.value;
  
  this.authService.login(email, password).subscribe(user => {
    console.log(user);
    
    if (user) {
      // Perform login logic (e.g., API call)
  const role = user.role; // Get role from user credentials
  sessionStorage.setItem('role', role); // Store role in sessionStorage

  if (role === 'doctor') {
    this.router.navigate(['/doctor/doctor-dashboard']);
  } else if (role === 'patient') {
    this.router.navigate(['/appointment/book-appointment']);
  }
}
  });
}

  
onRegisterSubmit() {
  if (this.registerForm.valid) {
    const newUser: User = this.registerForm.value;

    this.authService.register(newUser).subscribe({
      next: (res) => {
        console.log('User registered:', res);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
      }
    });
  }
}

  
  onFileChange(event: any, type: 'photo' | 'certificate' | 'license') {
    this.selectedFiles[type] = event.target.files[0];
  }
}
