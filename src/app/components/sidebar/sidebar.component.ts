import { Component } from '@angular/core';
import { SumitModule } from '../../sumit.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
