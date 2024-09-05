import { LayoutService } from '../service/app.layout.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AppSidebarComponent } from '../sidebar/app.sidebar.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  constructor( public el: ElementRef) {}

  onMenuButtonClick() {
      this.layoutService.onMenuToggle();
  }

  onSearchClick() {
      this.layoutService.toggleSearchBar();
  }

  get logo() {
      const logo =
          this.layoutService.config().menuTheme === 'white' ||
          this.layoutService.config().menuTheme === 'orange'
              ? 'dark'
              : 'white';
      return logo;
  }

  onLogout() {
    this.authService.logout();
  }
}
