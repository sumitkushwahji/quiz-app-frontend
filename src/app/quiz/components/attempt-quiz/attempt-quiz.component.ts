import { Component, OnInit } from '@angular/core';
import { AttemptService } from '../../services/attempt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Attempt } from '../../models/attempt.model';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-attempt-quiz',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './attempt-quiz.component.html',
  styleUrls: ['./attempt-quiz.component.css'],
})
export class AttemptQuizComponent implements OnInit {
  questions: Question[] = [];
  attempt: Attempt = { testId: 0, answers: [] };
  timer: number = 0; // Timer in seconds
  selectedOptions: { [key: number]: number } = {}; // Store selected options for each question

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private attemptService: AttemptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const testId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions(testId);
    this.startTimer();
  }

  loadQuestions(testId: number): void {
    this.questionService.getQuestionsByTestId(testId).subscribe((questions) => {
      this.questions = questions;
      this.attempt.testId = testId; // Set testId in the attempt object
    });
  }

  startTimer(): void {
    this.timer = 30 * 60; // 30 minutes
    const interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(interval);
        this.submitAnswers(); // Auto-submit when the timer runs out
      }
    }, 1000);
  }

  onOptionSelect(questionId: number, optionId: number): void {
    this.selectedOptions[questionId] = optionId;
  }

  submitAnswers(): void {
    this.attempt.answers = this.questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: this.selectedOptions[q.id] || -1,
    }));

    this.attemptService.submitAttempt(this.attempt).subscribe((result) => {
      this.router.navigate(['/result'], {
        queryParams: { score: result.score },
      });
    });
  }
}
