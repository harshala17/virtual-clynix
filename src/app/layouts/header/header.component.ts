import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  role: string | null = null;

  constructor(private authService: AuthService,private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.roleChange();
  }
  
  roleChange(){
    this.authService.role$.subscribe(role => {
      this.role = role;
      console.log('Role updated in HeaderComponent:', this.role);
      this.cdr.detectChanges(); // ✅ force UI to update
    });

  }

  onLogout(): void {
    this.authService.logout();
    window.location.href = '/home';  // Redirect to the home page after logout
  }
}
