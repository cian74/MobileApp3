import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app);
  auth = getAuth(this.app);

  constructor() {}

  // Add new assignment
  async addAssignment(moduleName: string, assignmentName: string, dueDate: string) {
    const user = this.auth.currentUser;
    if (user) {
      //creates new doc in firestore
      const userAssignmentsRef = collection(this.db, 'users', user.uid, 'assignments');
      return await addDoc(userAssignmentsRef, {
        //assignment fields passed in by user
        moduleName,
        assignmentName,
        dueDate
      });
    } else {
      throw new Error('User not logged in');
    }
  }

  // Get all assignments for current user
  async getAssignments() {
    const user = this.auth.currentUser;
    if (user) {
      const userAssignmentsRef = collection(this.db, 'users', user.uid, 'assignments');
      //getDocs (firestore function that gets all docs in a collection)
      const querySnapshot = await getDocs(userAssignmentsRef);
      //maps through docs and returns doc data
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      throw new Error('User not logged in');
    }
  }

  // Delete an assignment by id
  async deleteAssignment(assignmentId: string) {
    const user = this.auth.currentUser;
    if (user) {
      const assignmentDocRef = doc(this.db, 'users', user.uid, 'assignments', assignmentId);
      return await deleteDoc(assignmentDocRef);
    } else {
      throw new Error('User not logged in');
    }
  }
}
