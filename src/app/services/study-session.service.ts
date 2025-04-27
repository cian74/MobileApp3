import { Injectable } from '@angular/core';
import { db } from 'src/firebaseConfig'; // Firestore configuration
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'; // Firestore methods

@Injectable({
  providedIn: 'root',
})
export class StudySessionService {
  private studySessionsCollection = collection(db, 'users'); // users collection

  constructor() {}

  // Fetch study sessions for the current user
  async getStudySessions(userId: string): Promise<any[]> {
    const userDocRef = collection(this.studySessionsCollection, userId, 'studySessions');
    const sessionsSnapshot = await getDocs(userDocRef);

    // Process the sessions
    const sessions = sessionsSnapshot.docs.map(doc => doc.data());
    return sessions;
  }

  // Optionally add new study session to Firestore (if needed)
  async addStudySession(userId: string, secondsStudied: number) {
    const userDocRef = collection(this.studySessionsCollection, userId, 'studySessions');
    try {
      await addDoc(userDocRef, {
        secondsStudied,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error adding study session: ', error);
    }
  }
}
