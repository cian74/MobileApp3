import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { 
  IonHeader, 
  IonContent, 
  IonBackButton, 
  IonToolbar, 
  IonButtons, 
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonDatetimeButton,
  IonModal,
  IonDatetime
} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.page.html',
  styleUrls: ['./assignments.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonContent,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonDatetimeButton,
    IonDatetime,
    IonBackButton
  ]
})
export class AssignmentsPage implements OnInit {
  moduleName: string = '';
  assignmentName: string = '';
  dueDate: string = '';

  assignments: any[] = [];

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.loadAssignments();
  }

  async addAssignment() {
    if (this.moduleName && this.assignmentName && this.dueDate) {
      await this.assignmentService.addAssignment(this.moduleName, this.assignmentName, this.dueDate);
      this.moduleName = '';
      this.assignmentName = '';
      this.dueDate = '';
      this.loadAssignments();
    } else {
      console.warn('All fields are required');
    }
  }

  async loadAssignments() {
    this.assignments = await this.assignmentService.getAssignments();
  }

  async deleteAssignment(id: string) {
    await this.assignmentService.deleteAssignment(id);
    this.loadAssignments();
  }
}
