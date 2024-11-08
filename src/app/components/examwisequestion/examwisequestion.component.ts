import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { SumitModule } from '../../sumit.module';

@Component({
  selector: 'app-examwisequestion',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './examwisequestion.component.html',
  styleUrl: './examwisequestion.component.css',
})
export class ExamwisequestionComponent implements OnInit {
  exams: any[] = []; // Array to hold fetched exams

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.getExams().subscribe(
      (data) => {
        this.exams = data; // Assign the fetched data to exams array
        console.log(data);
        console.log(this.exams);
      },
      (error) => {
        console.error('Error fetching exams:', error);
      }
    );
  }
  // Triggered when a subject is clicked
  onExamClick(exam: any): void {
    // Navigate to the new component with the selected subject's ID
    this.router.navigate(['/quiz', '', '', exam]);
  }

  // Handle hover event to apply custom styles
  onHover(subject: any): void {
    subject.isHovered = true;
  }

  // Handle mouse leave event
  onLeave(subject: any): void {
    subject.isHovered = false;
  }
}
