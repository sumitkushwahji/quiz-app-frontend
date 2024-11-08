import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };

  constructor(private userService: UserService) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }
}
