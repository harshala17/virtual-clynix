import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private roleSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('role')); // Initialize with stored role

  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(() => of([])),
      map(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          sessionStorage.setItem('role', user.role);  // Store the role in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(user)); // Save user data
          this.roleSubject.next(user.role); // Update the BehaviorSubject
          return user;
        }
        return null;
      })
    );
  }

  getUser(): User | null {
    const userJson = sessionStorage.getItem('user'); // Use sessionStorage for consistency
    return userJson ? JSON.parse(userJson) : null;
  }
  
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  isLoggedIn(): boolean {
    return !!this.getUser(); // Check if user exists in sessionStorage
  }

  logout(): void {
    sessionStorage.removeItem('user'); // Consistent with sessionStorage
    sessionStorage.removeItem('role'); // Remove role as well
    this.roleSubject.next(null); // Update BehaviorSubject on logout
    this.router.navigate(['/auth/login']); // Redirect to login page
  }
}
