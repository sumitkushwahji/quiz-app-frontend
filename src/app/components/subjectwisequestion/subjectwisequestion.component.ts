import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { SumitModule } from '../../sumit.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjectwisequestion',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './subjectwisequestion.component.html',
  styleUrls: ['./subjectwisequestion.component.css'],
})
export class SubjectwisequestionComponent implements OnInit {
  subjects: any[] = []; // Array to hold fetched subjects

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.getSubjects().subscribe(
      (data) => {
        this.subjects = data; // Assign the fetched data to subjects array
        console.log(data);
        console.log(this.subjects);
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }
  // Triggered when a subject is clicked
  onSubjectClick(subject: any): void {
    // Navigate to the new component with the selected subject's ID
    this.router.navigate(['/quiz', subject, '', '']);
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
