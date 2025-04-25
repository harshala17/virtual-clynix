import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'];
    const role = sessionStorage.getItem('role');

    if (this.authService.isLoggedIn() && role === expectedRole) {
      return true;
    }

    // Redirect to login or appropriate page
    this.router.navigate(['/auth/login']);
    return false;
  }
}
