import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user?: User; // Set as optional with `?`

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userId = 1; // Hardcoded for example; replace with actual ID
    this.userService.getUser(userId).subscribe(
      (user) => (this.user = user),
      (error) => console.error(error)
    );
  }
}
