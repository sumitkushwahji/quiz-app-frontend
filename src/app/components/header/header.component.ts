import { Component } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
