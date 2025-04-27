import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service'; // Adjust path!
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, CommonModule, FormsModule]
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  //firestore function that leverages google auth
  //lets user use google auth method using firestores own popup 
  signupWithGoogle() {
    this.authService.googleSignup()
      .then((result) => {
        console.log('Google signup successful', result);
        this.router.navigate(['/control-panel']);
      })
      .catch((error) => {
        console.error('Google signup error', error);
      });
  }

  //traditional sign up method
  //password and email required to pass in
  signupWithEmailPassword() {
    if (this.email && this.password) {
      this.authService.emailSignup(this.email, this.password)
        .then((result) => {
          console.log('Email signup successful', result);
        })
        .catch((error) => {
          console.error('Email signup error', error);
        });
    } else {
      console.warn('Email and password are required');
    }
  }
}
