import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from "./home/home.page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mobile-app';
}
