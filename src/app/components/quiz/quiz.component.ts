import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  selectedOptions: { [key: number]: number | null } = {}; // Tracks the selected option for each question
  disabledOptions: { [key: number]: { [optionId: number]: boolean } } = {}; // Tracks disabled options

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions(): void {
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  selectOption(questionId: number, optionId: number, isCorrect: boolean): void {
    if (isCorrect) {
      this.selectedOptions[questionId] = optionId;
    } else {
      if (!this.disabledOptions[questionId]) {
        this.disabledOptions[questionId] = {};
      }
      this.disabledOptions[questionId][optionId] = true;
      this.selectedOptions[questionId] = optionId; // Track incorrect selection
    }
  }

  isDisabled(questionId: number, optionId: number): boolean {
    return (
      this.disabledOptions[questionId] &&
      this.disabledOptions[questionId][optionId]
    );
  }

  isCorrect(questionId: number): boolean | undefined {
    const selectedOptionId = this.selectedOptions[questionId];
    const selectedOption = this.questions
      .find((q) => q.id === questionId)
      ?.options.find((o: any) => o.id === selectedOptionId);
    return selectedOption?.isCorrect;
  }

  // Helper to generate option labels: A, B, C, D
  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // 'A' corresponds to 65 in ASCII, 'B' is 66, etc.
  }
}
