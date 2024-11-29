import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionType } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'], // Fixed styleUrl to styleUrls
})
export class QuestionDetailComponent implements OnInit {
  testId!: number; // Test ID to associate the question with
  question: Question = {
    id: 0,
    text: '',
    explanation: '',
    subject: '',
    topic: '',
    exam: '',
    questionType: QuestionType.MULTIPLE_CHOICE, // Default question type
    difficulty: 'Medium', // Default difficulty
    options: [],
  };

  questionTypes = Object.values(QuestionType); // List of question types

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get testId from the route parameters
    this.testId = +this.route.snapshot.paramMap.get('testId')!;
    const questionId = this.route.snapshot.paramMap.get('id');

    // If a question ID exists, fetch the question details
    if (questionId) {
      this.questionService.getQuestionById(+questionId).subscribe((data) => {
        this.question = data;
      });
    }
  }

  addOption(): void {
    // Add a new option with default values
    this.question.options.push({ id: 0, text: '', isCorrect: false });
  }

  removeOption(index: number): void {
    // Remove the option at the specified index
    this.question.options.splice(index, 1);
  }

  saveQuestion(): void {
    // Save or update the question based on its ID
    if (this.question.id) {
      this.questionService
        .updateQuestion(this.question.id, this.question)
        .subscribe(() => {
          this.router.navigate(['/tests', this.testId, 'questions']);
        });
    } else {
      this.questionService
        .createQuestion(this.testId, this.question)
        .subscribe(() => {
          this.router.navigate(['/tests', this.testId, 'questions']);
        });
    }
  }
}
