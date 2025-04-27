import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../services/exams.service'; // new service for exams
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
  IonDatetimeButton,
  IonDatetime,
  IonReorder,
  IonReorderGroup,
  IonList
} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
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
    IonDatetimeButton,
    IonDatetime,
    IonBackButton,
    IonReorder,
    IonReorderGroup,
    IonList
  ]
})
export class ExamsPage implements OnInit {
  moduleName: string = '';
  examDate: string = '';

  exams: any[] = [];

  constructor(private examsService: ExamsService) { }

  ngOnInit() {
    this.loadExams();
  }

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from', event.detail.from, 'to', event.detail.to);

    const from = event.detail.from;
    const to = event.detail.to;

    const movedItem = this.exams.splice(from, 1)[0];
    this.exams.splice(to, 0, movedItem);

    event.detail.complete();
  }

  async addExam() {
    if (this.moduleName && this.examDate) {
      await this.examsService.addExam(this.moduleName, this.examDate);
      this.moduleName = '';
      this.examDate = '';
      this.loadExams();
    } else {
      console.warn('All fields are required');
    }
  }

  async loadExams() {
    this.exams = await this.examsService.getExams();
  }

  async deleteExam(id: string) {
    await this.examsService.deleteExam(id);
    this.loadExams();
  }
}
