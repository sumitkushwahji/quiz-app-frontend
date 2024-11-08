import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css',
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  testId!: number;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestionsByTestId(this.testId).subscribe(
      (data) => (this.questions = data),
      (error) => console.error('Error loading questions', error)
    );
  }

  addQuestion(): void {
    this.router.navigate(['/test', this.testId, 'questions', 'create']);
  }

  editQuestion(questionId: number): void {
    this.router.navigate([
      '/test',
      this.testId,
      'questions',
      questionId,
      'edit',
    ]);
  }

  deleteQuestion(questionId: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(questionId).subscribe(() => {
        this.loadQuestions();
      });
    }
  }
}
