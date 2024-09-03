import { LayoutService } from './service/app.layout.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AppSidebarComponent } from './app.sidebar.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    private layoutService = inject(LayoutService);
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
}
