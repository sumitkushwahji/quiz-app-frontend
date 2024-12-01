import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { QuestionType } from '../../models/question-type.enum';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'], // Fixed typo: styleUrl -> styleUrls
})
export class QuizComponent implements OnInit {
  questions: any[] = []; // Array to hold questions fetched from the service
  selectedOptions: { [key: number]: number | null } = {}; // Track selected options
  disabledOptions: { [key: number]: { [optionId: number]: boolean } } = {}; // Track disabled options for incorrect answers

  // Filters from route parameters
  subject: string = '';
  topic: string = '';
  exam: string = '';
  selectedQuestionType: QuestionType = QuestionType.MULTIPLE_CHOICE; // Default question type

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters to fetch filters dynamically
    this.route.paramMap.subscribe((params) => {
      this.subject = params.get('subject') || ''; // Handle optional parameters
      this.topic = params.get('topic') || '';
      this.exam = params.get('exam') || '';
      this.fetchQuestions(); // Fetch questions with updated filters
    });
  }

  // Fetch questions with optional filters
  fetchQuestions(): void {
    this.questionService.getFilteredQuestions().subscribe({
      next: (questions) => {
        this.questions = questions; // Update questions array
      },
      error: (error) => {
        console.error('Error fetching questions:', error); // Log errors
      },
    });
  }

  // Handle option selection for a question
  selectOption(questionId: number, optionId: number, isCorrect: boolean): void {
    if (isCorrect) {
      this.selectedOptions[questionId] = optionId; // Correct option selected
    } else {
      // Disable incorrect option
      if (!this.disabledOptions[questionId]) {
        this.disabledOptions[questionId] = {};
      }
      this.disabledOptions[questionId][optionId] = true; // Mark option as disabled
      this.selectedOptions[questionId] = optionId; // Track the selected (incorrect) option
    }
  }

  // Check if a specific option is disabled for a question
  isDisabled(questionId: number, optionId: number): boolean {
    return (
      this.disabledOptions[questionId] &&
      this.disabledOptions[questionId][optionId]
    );
  }

  // Check if the selected option is correct for a question
  isCorrect(questionId: number): boolean | undefined {
    const selectedOptionId = this.selectedOptions[questionId];
    const question = this.questions.find((q) => q.id === questionId);
    const selectedOption = question?.options.find(
      (o: any) => o.id === selectedOptionId
    );
    return selectedOption?.isCorrect;
  }

  // Generate labels for options (e.g., A, B, C, D)
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // ASCII: A = 65, B = 66, etc.
  }

  // Handle changes in the selected question type
  onQuestionTypeChange(newType: QuestionType): void {
    this.selectedQuestionType = newType; // Update selected question type
    this.fetchQuestions(); // Re-fetch questions based on the new type
  }
}
