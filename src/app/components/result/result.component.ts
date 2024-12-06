import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from '../../services/attempt.service';
import { SumitModule } from '../../sumit.module';

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionId: number;
  questionText: string;
  userAnswer: number | string | null; // Handle string type for userAnswer
  correctAnswer: number;
  userAnswerText: string; // Display user's selected answer text
  correctAnswerText: string; // Display correct answer text
  explanation: string;
  options: Option[];
}

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  score: number = 0;
  result: Question[] = []; // Store the fetched results
  showReview = false;

  constructor(
    private route: ActivatedRoute,
    private attemptService: AttemptService
  ) {}

  ngOnInit(): void {
    const attemptId = +this.route.snapshot.params['id'];
    this.getScore(attemptId);
    this.fetchResult(attemptId);
  }

  getScore(attemptId: number): void {
    this.attemptService.endAttempt(attemptId).subscribe({
      next: (score: number) => {
        this.score = score; // Assign the score from API response
      },
      error: (error) => {
        console.error('Error fetching score:', error);
      },
    });
  }

  fetchResult(attemptId: number): void {
    this.attemptService.getAttemptReview(attemptId).subscribe({
      next: (data: Question[]) => {
        console.log('API Result:', data);
        this.result = data.map((question: Question) => {
          const userAnswer = question.userAnswer
            ? +question.userAnswer // Convert to number if it's a string
            : null;

          return {
            ...question,
            userAnswerText: this.getUserAnswerText(
              userAnswer,
              question.options
            ),
            correctAnswerText: this.getCorrectAnswerText(
              question.correctAnswer,
              question.options
            ),
          };
        });
      },
      error: (error) => {
        console.error('Error fetching result:', error);
      },
    });
  }

  getUserAnswerText(
    userAnswerId: number | string | null,
    options: Option[]
  ): string {
    console.log('User Answer ID:', userAnswerId);
    console.log('Options:', options);
    if (!userAnswerId) return 'No answer selected';

    // Ensure userAnswerId is converted to a number
    const selectedOption = options.find(
      (option) => option.id === +userAnswerId
    );
    return selectedOption ? selectedOption.text : 'Invalid answer ID';
  }

  getCorrectAnswerText(correctAnswerId: number, options: Option[]): string {
    const correctOption = options.find(
      (option) => option.id === correctAnswerId
    );
    return correctOption ? correctOption.text : 'Correct answer not available';
  }

  toggleReview(): void {
    this.showReview = !this.showReview;
  }
}
