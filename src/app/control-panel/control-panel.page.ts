import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.page.html',
  styleUrls: ['./control-panel.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLinkWithHref]
})
export class ControlPanelPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
