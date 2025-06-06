import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SumitModule } from '../../sumit.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';
  hidePassword: any;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/dashboard']), // Redirect after login
      error: (err) => (this.errorMessage = 'Invalid credentials'),
    });
  }
}
