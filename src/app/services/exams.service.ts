import { Injectable } from '@angular/core';
import { db } from 'src/firebaseConfig'; // Assuming you've already configured Firestore
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private examsCollection = collection(db, 'exams'); // Firestore collection reference

  constructor() {}

  private getCurrentUserId(): string {
    const user = getAuth().currentUser;
    if (user) {
      return user.uid; // Return the user UID
    }
    throw new Error('User is not authenticated');
  }

  // Get all exams from Firestore
  async getExams(): Promise<any[]> {
    const userId = this.getCurrentUserId(); // Get the current user's ID
    const examsQuery = query(this.examsCollection, where('userId', '==', userId)); // Query for exams by user ID
    const examsSnapshot = await getDocs(examsQuery);
    return examsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Add an exam to Firestore
  async addExam(moduleName: string, examDate: string) {
    try {
      const userId = this.getCurrentUserId(); // Get the current user's ID
      await addDoc(this.examsCollection, {
        userId, // Store user ID with the exam
        moduleName,
        examDate,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding exam: ", error);
    }
  }

  // Delete an exam from Firestore
  async deleteExam(id: string) {
    const examDoc = doc(db, 'exams', id); // Reference to the specific document
    try {
      await deleteDoc(examDoc);
    } catch (error) {
      console.error("Error deleting exam: ", error);
    }
  }
}
