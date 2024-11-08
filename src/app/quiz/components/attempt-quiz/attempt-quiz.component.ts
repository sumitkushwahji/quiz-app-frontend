import { Component, OnInit } from '@angular/core';
import { AttemptService } from '../../services/attempt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Attempt } from '../../models/attempt.model';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attempt-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attempt-quiz.component.html',
  styleUrls: ['./attempt-quiz.component.css'],
})
export class AttemptQuizComponent implements OnInit {
  questions: Question[] = [];
  attempt: Attempt = { testId: 0, answers: [] };
  timer: number = 0; // In seconds
  selectedOptions: { [key: number]: number } = {}; // Store selected options

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
      this.attempt.testId = testId; // Set testId in attempt
    });
  }

  startTimer(): void {
    // Set the timer here, e.g., for 30 minutes
    this.timer = 30 * 60; // 30 minutes
    const interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(interval);
        this.submitAnswers(); // Automatically submit on timer end
      }
    }, 1000);
  }

  onOptionSelect(questionId: number, optionId: number): void {
    this.selectedOptions[questionId] = optionId; // Store the selected option for the question
  }

  submitAnswers(): void {
    this.attempt.answers = this.questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: this.selectedOptions[q.id] || -1, // Get selected option ID or -1 if not selected
    }));

    this.attemptService.submitAttempt(this.attempt).subscribe((result) => {
      // Navigate to result component or display result
      this.router.navigate(['/result'], {
        queryParams: { score: result.score },
      });
    });
  }
}
