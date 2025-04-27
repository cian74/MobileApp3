import { Component, NgModule, OnInit } from '@angular/core';
import { StudySessionService } from '../services/study-session.service';
import { AuthService } from '../services/auth.service'; // Assuming you have a service for authentication
import { ChartData, ChartOptions, Chart} from 'chart.js';
import { IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,BarController } from 'chart.js';

Chart.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,BarController)

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar,
    IonHeader,BaseChartDirective,CommonModule
  ]
})
export class StatsPage implements OnInit {
  // Data for the bar chart
  studySessionChartData: ChartData<'bar'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Customize these labels based on your data (e.g., weeks)
    datasets: [
      {
        data: [0, 0, 0, 0], // Initial empty data, to be populated dynamically
        label: 'Study Sessions (Seconds)',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Seconds Studied',
        },
      },
    },
  };

  // Explicitly type the studySessions array
  studySessions: { name: string; value: number }[] = []; // <-- Make sure the type is explicitly declared

  constructor(
    private studySessionService: StudySessionService,
    private authService: AuthService // Inject the auth service to get current user
  ) {}

  ngOnInit() {
    this.loadStudySessions();
  }

  async loadStudySessions() {
    try {
      const userId = await this.authService.getCurrentUserId();

      if (!userId) {
        console.error('User not authenticated');
        return; // Exit early if userId is null or undefined
      }

      const sessions = await this.studySessionService.getStudySessions(userId);
      const weekData = this.aggregateStudySessionsByWeek(sessions);

      // Now the studySessions array is populated with the correct data type
      this.studySessions = weekData.map((value, index) => ({
        name: `Week ${index + 1}`,
        value,
      }));

      // Update the chart data with the aggregated week data
      this.studySessionChartData.datasets[0].data = weekData;
    } catch (error) {
      console.error('Error loading study sessions:', error);
    }
  }

  aggregateStudySessionsByWeek(sessions: any[]): number[] {
    const weekData = [0, 0, 0, 0]; // Example data for 4 weeks, adjust as needed

    sessions.forEach(session => {
      const weekIndex = this.getWeekIndex(session.timestamp); // Get week index for the session
      if (weekIndex >= 0 && weekIndex < 4) { // Ensure it's within the range
        weekData[weekIndex] += session.secondsStudied;
      }
    });

    return weekData;
  }

  getWeekIndex(timestamp: string): number {
    const date = new Date(timestamp);
    const currentDate = new Date();
    const diffInTime = currentDate.getTime() - date.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    const weekNumber = Math.floor(diffInDays / 7); // Week number

    return weekNumber < 4 ? weekNumber : -1; // Only consider the last 4 weeks for this example
  }
}
