import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AttemptService } from '../../services/attempt.service';
import { SumitModule } from '../../sumit.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-attempt',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css'],
})
export class AttemptComponent implements OnInit, OnDestroy {
  attempt: any = {}; // Holds the entire attempt object
  selectedAnswers: { [key: number]: number | null } = {}; // Track selected options by question ID
  remainingTime: number = 0; // Time remaining in seconds
  timerInterval: any; // Reference to the interval for the timer

  constructor(
    private route: ActivatedRoute,
    private attemptService: AttemptService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const testId = +this.route.snapshot.params['id']; // Get the test ID from the route
    this.startAttempt(testId); // Start a new attempt
  }

  ngOnDestroy(): void {
    // Clear the timer when the component is destroyed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  /**
   * Starts a new attempt for a given test ID and initializes the timer.
   */
  startAttempt(testId: number): void {
    this.attemptService
      .startAttempt(environment.defaultUserId, testId)
      .subscribe({
        next: (data: any) => {
          this.attempt = data;

          this.remainingTime = data.test.duration * 60; // Set the duration in seconds

          // Start the countdown timer
          this.startTimer();

          // Initialize selectedAnswers for each question with null (no selection)
          this.attempt.test.questions.forEach((question: any) => {
            this.selectedAnswers[question.id] = null;
          });
        },
        error: (error) => {
          console.error('Error starting attempt:', error);
        },
      });
  }

  /**
   * Starts the countdown timer.
   */
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.submitAttempt(); // Automatically submit the test when time runs out
      }
    }, 1000);
  }

  /**
   * Handles the selection of an answer for a specific question.
   */
  selectAnswer(questionId: number, optionId: number): void {
    this.selectedAnswers[questionId] = optionId; // Store the selected option ID
  }

  /**
   * Submits the user's answers to the backend API.
   */
  submitAttempt(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Stop the timer when submitting
    }

    console.log(this.attempt);

    const attemptId = this.attempt.id;
    console.log(attemptId);

    // Create an array to hold the observables for each answer submission
    const answerSubmitObservables = [] as any[];

    // Submit each selected answer
    Object.entries(this.selectedAnswers).forEach(([questionId, optionId]) => {
      if (optionId !== null) {
        const submitObservable = this.attemptService
          .submitAnswer(attemptId, +questionId, optionId.toString()) // Convert optionId to string
          .pipe(
            catchError((error) => {
              console.error(
                `Error submitting answer for question ${questionId}:`,
                error
              );
              return of(null); // Continue even if there's an error
            })
          );

        answerSubmitObservables.push(submitObservable);
      }
    });

    // Wait for all answers to be submitted before ending the attempt
    forkJoin(answerSubmitObservables).subscribe({
      next: () => {
        console.log('All answers submitted.');

        // After submitting all answers, fetch the final score
        this.attemptService.endAttempt(attemptId).subscribe({
          next: (score) => {
            alert(`Your test is completed! Your score is: ${score}`);
            this.router.navigate(['/result', attemptId]); // Navigate to the result page
          },
          error: (error) => {
            console.error('Error ending attempt and fetching score:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error submitting answers:', error);
      },
    });
  }

  /**
   * Formats the remaining time as mm:ss for display.
   */
  formatTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
