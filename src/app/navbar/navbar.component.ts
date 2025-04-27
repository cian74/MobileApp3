import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabButton, IonTabBar, IonToolbar, IonTabs } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [IonTabs, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { }
