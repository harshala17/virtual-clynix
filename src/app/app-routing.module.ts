import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookAppointmentComponent } from './appointments/book-appointment/book-appointment.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'auth/login', component: LoginComponent },
  { 
    path: 'appointment/book-appointment', 
    component: BookAppointmentComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'patient' } // Only patients can book appointments
  },
  { 
    path: 'doctor/doctor-dashboard', 
    component: DoctorDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'doctor' } // Only doctors can access this route
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
