import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionFormComponent } from './components/question-form/question-form.component';

import { SumitModule } from './sumit.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    QuestionFormComponent,

    SumitModule,
    SidebarComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quiz-app-frontend';
  sidebarOpened: boolean = true;
  isMobileView: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Initializing in browser...');
      this.checkScreenSize();
    } else {
      console.log('Not running in browser, skipping screen size check.');
    }
  }

  // Listen to window resize events to adjust the layout
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Window resized:', window.innerWidth);
      this.checkScreenSize();
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const screenWidth = window.innerWidth;
      console.log('Checking screen size:', screenWidth);
      this.isMobileView = screenWidth <= 768;

      if (this.isMobileView) {
        console.log('Mobile view detected, hiding sidebar.');
        this.sidebarOpened = false;
      } else {
        console.log('Desktop view detected, showing sidebar.');
        this.sidebarOpened = true;
      }
    }
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
    console.log('Sidebar toggled, now opened:', this.sidebarOpened);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
