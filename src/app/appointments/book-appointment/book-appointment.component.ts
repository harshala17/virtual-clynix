import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
onFileChange($event: Event,arg1: string) {
throw new Error('Method not implemented.');
}
  appointmentForm!:FormGroup
  departments = ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'General Medicine'];
  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      department: ['', Validators.required],
      doctor: [''],
      notes: ['']
    });
  }
  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      alert('Appointment booked successfully!');
      this.appointmentForm.reset();
    }
  }
}
