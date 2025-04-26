import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../firebaseConfig'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app = initializeApp(firebaseConfig);
  auth = getAuth(this.app);

  constructor() {}

  // Sign up with Google
  googleSignup() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Sign up with Email and Password
  emailSignup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
