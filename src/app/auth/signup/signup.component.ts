import { Component } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  userData = { username: '', email: '', password: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Signup successful. You can now log in.';
        this.router.navigate(['/login']);
      },
      error: (err) => (this.errorMessage = 'Signup failed.'),
    });
  }
}
