import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: ['/dashboard/home']
            },
            { separator: true },
            {
                label: 'Dashboards',
                icon: 'pi pi-th-large',
                items: [
                    {
                        label: 'Empresas',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/empresas']
                    },
                    {
                        label: 'Sucursales',
                        icon: 'pi pi-fw pi-list-check',
                        routerLink: ['/dashboard/sucursales']
                    },
                ]
            },
          ]
    }
}
