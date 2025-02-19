import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { ChartData, ChartOptions } from 'chart.js';

import {
  Statistics,
  StatisticsService,
} from '../../services/statistics.service';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.css',
})
export class AdminStatisticsComponent implements OnInit {
  stats: Statistics = {
    questionCount: 0,
    testCount: 0,
    userCount: 0,
    questionsPerTest: 0,
    totalAttempts: 0,
    completedAttempts: 0,
    activeUsers: 0,
    averageTestScore: 0,
  };

  statsCards = [
    { title: 'Total Questions', value: 0 },
    { title: 'Total Tests', value: 0 },
    { title: 'Total Users', value: 0 },
    { title: 'Total Attempts', value: 0 },
    { title: 'Completed Attempts', value: 0 },
    { title: 'Active Users', value: 0 },
  ];

  // Chart.js Bar Chart options
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [
    'Question Count',
    'Test Count',
    'User Count',
    'Total Attempts',
    'Completed Attempts',
  ];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        label: 'Statistics',
        backgroundColor: '#3e95cd',
      },
    ],
  };

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    // Fetch statistics data
    this.statisticsService.getStatistics().subscribe((data: Statistics) => {
      this.stats = data;

      // Update statsCards with the fetched data
      this.statsCards = [
        { title: 'Total Questions', value: this.stats.questionCount },
        { title: 'Total Tests', value: this.stats.testCount },
        { title: 'Total Users', value: this.stats.userCount },
        { title: 'Total Attempts', value: this.stats.totalAttempts },
        { title: 'Completed Attempts', value: this.stats.completedAttempts },
        { title: 'Active Users', value: this.stats.activeUsers },
      ];

      // Update the chart data
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: [
              this.stats.questionCount,
              this.stats.testCount,
              this.stats.userCount,
              this.stats.totalAttempts,
              this.stats.completedAttempts,
            ],
            label: 'Statistics',
            backgroundColor: '#3e95cd',
          },
        ],
      };
    });
  }
}
