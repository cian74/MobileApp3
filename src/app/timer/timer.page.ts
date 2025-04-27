import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { db } from 'src/firebaseConfig';
import { collection, addDoc} from 'firebase/firestore';
import { timestamp } from 'rxjs';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonButton, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TimerPage implements OnInit {
  //time taken as int in seconds
  timeRemaining: number = 20 * 60;
  minutes: string = '20';
  seconds: string = '00';
  timerInterval: any;
  isRunning: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      //setInterval set to 1000 (ms)
      this.timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
          this.updateTimeDisplay();
        } else {
          this.stopTimer();
        }
      }, 1000)
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timerInterval);
      this.isRunning = false;
    }
  }

  async stopTimer() {
    if (this.isRunning) {
      clearInterval(this.timerInterval);
      this.isRunning = false;

      const timeStudied = 20 * 60 - this.timeRemaining;
      if(timeStudied > 0) {
        await this.recordStudySession(timeStudied);
      }

      //TODO: update first variable to be adjustable
      this.timeRemaining = 20 * 60;
      this.updateTimeDisplay();
    }
  }

  async recordStudySession(secondsStudied: number) {
    try {
      const auth  = getAuth();
      const user = auth.currentUser;

      if(!user) {
        console.log("no user");
        return;
      }
      
      const studySessionCollection = collection(db, 'users', user.uid, 'studySessions');
      await addDoc(studySessionCollection, {
        //second in seconds as int
        secondsStudied: secondsStudied,
        //record date aswell- may use this
        timestamp: new Date().toISOString()
      });
    console.log('Study session recorded');
    } catch(error) {
      console.error('Error saving study session', error);
    }
  }

  resetTimer() {
    this.stopTimer();
  }

  updateTimeDisplay() {
    const minutesVal = Math.floor(this.timeRemaining / 60);
    const secondsVal = Math.floor(this.timeRemaining % 60);

    this.minutes = minutesVal < 10 ? '0' + minutesVal : minutesVal.toString();
    this.seconds = secondsVal < 10 ? '0' + secondsVal : secondsVal.toString();
  }

}
