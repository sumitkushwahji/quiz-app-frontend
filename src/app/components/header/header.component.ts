import { Component } from '@angular/core';
import { SumitModule } from '../../sumit.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
