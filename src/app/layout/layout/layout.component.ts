import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { SumitModule } from '../../sumit.module';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SumitModule, SidebarComponent, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  sidebarOpened: boolean = true;
  isMobileView: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
      this.sidebarOpened = !this.isMobileView;
    }
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Method to check if the current route is login or signup
  isAuthPage(): boolean {
    return (
      this.router.url === '/login' ||
      this.router.url === '/signup' ||
      this.router.url === '/'
    );
  }
}
