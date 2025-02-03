import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  imports: [DividerModule, ButtonModule, FormsModule, ToastModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  email!: string;
  password!: string;
  employees: Employee[] = []; // Store employee data
  errorMessage: string | null = null;

  constructor(private router: Router, private messageService: MessageService, private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<Employee[]>('/assets/employees.json').subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employee data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error loading employee data. Please try again later.' });
      }
    );
  }

  
  login() {
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = "Email and password are required.";
      return;
    }

    const employee = this.employees.find(emp => emp.email === this.email && emp.password === this.password);

    if (employee) {
      console.log('Login successful!');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful!' });
      this.router.navigate(['home']);
    } else {
      this.errorMessage = "Invalid email or password.";
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password.' });
    }
  }
}
interface Employee {
  email: string;
  password: string;
}
