import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = { username: '', email: '', password: '' };

  constructor(private userService: UserService) {}

  login() {
    this.userService.login(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }
}
