import { Component, OnInit } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { RouterModule } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  subjects: string[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.questionService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }
}
