import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isFlipped = false;
  userRole: 'doctor' | 'patient'| '' = '';

  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.userRole = 'patient'; // Reset role on flip
  }

  selectRole(role: string) {
    // this.us  erRole = '';
  }
}
