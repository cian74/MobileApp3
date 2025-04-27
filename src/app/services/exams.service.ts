import { Injectable } from '@angular/core';
import { db } from 'src/firebaseConfig'; // Assuming you've already configured Firestore
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private examsCollection = collection(db, 'exams'); // Firestore collection reference

  constructor() {}

  // Get all exams from Firestore
  async getExams(): Promise<any[]> {
    const examsSnapshot = await getDocs(this.examsCollection);
    return examsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Add an exam to Firestore
  async addExam(moduleName: string, examDate: string) {
    try {
      await addDoc(this.examsCollection, {
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
