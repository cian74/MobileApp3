import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
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

  getCurrentUserId(): string | null {
    const user: User | null = this.auth.currentUser; // Get the current user
    return user ? user.uid : null;
  }

  listenForAuthChanges() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User signed in:', user.uid);
      } else {
        console.log('No user is signed in');
      }
    });
  }

}
