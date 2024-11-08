import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  selectedOptions: { [key: number]: number | null } = {};
  disabledOptions: { [key: number]: { [optionId: number]: boolean } } = {};
  subject: string = '';
  topic: string = '';
  exam: string = '';

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.paramMap.subscribe((params) => {
      this.subject = params.get('subject')!;
      this.topic = params.get('topic')!;
      this.exam = params.get('exam')!;

      // Fetch questions based on parameters
      this.fetchQuestions();
    });
  }

  fetchQuestions(): void {
    if (this.subject || this.topic || this.exam) {
      // If there are parameters, fetch based on them
      this.fetchQuestionsByParams();
    } else {
      // If no parameters, fetch all questions
      this.fetchAllQuestions();
    }
  }

  fetchQuestionsByParams(): void {
    if (this.subject && this.topic && this.exam) {
      this.fetchQuestionsBySubjectTopicExam(
        this.subject,
        this.topic,
        this.exam
      );
    } else if (this.subject && this.topic) {
      this.fetchQuestionsBySubjectTopic(this.subject, this.topic);
    } else if (this.subject && this.exam) {
      this.fetchQuestionsBySubjectExam(this.subject, this.exam);
    } else if (this.topic && this.exam) {
      this.fetchQuestionsByTopicExam(this.topic, this.exam);
    } else if (this.subject) {
      this.fetchQuestionsBySubject(this.subject);
    } else if (this.topic) {
      this.fetchQuestionsByTopic(this.topic);
    } else if (this.exam) {
      this.fetchQuestionsByExam(this.exam);
    }
  }

  fetchAllQuestions(): void {
    // Fetch all questions when no parameters are passed
    this.questionService.getAllQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  fetchQuestionsBySubject(subject: string): void {
    this.questionService
      .getQuestionsBySubject(subject)
      .subscribe((questions) => {
        this.questions = questions;
      });
  }

  fetchQuestionsByTopic(topic: string): void {
    this.questionService.getQuestionsByTopic(topic).subscribe((questions) => {
      this.questions = questions;
    });
  }

  fetchQuestionsByExam(exam: string): void {
    this.questionService.getQuestionsByExam(exam).subscribe((questions) => {
      this.questions = questions;
    });
  }

  fetchQuestionsBySubjectTopic(subject: string, topic: string): void {
    this.questionService
      .getQuestionsBySubjectTopic(subject, topic)
      .subscribe((questions) => {
        this.questions = questions;
      });
  }

  fetchQuestionsBySubjectExam(subject: string, exam: string): void {
    this.questionService
      .getQuestionsBySubjectExam(subject, exam)
      .subscribe((questions) => {
        this.questions = questions;
      });
  }

  fetchQuestionsByTopicExam(topic: string, exam: string): void {
    this.questionService
      .getQuestionsByTopicExam(topic, exam)
      .subscribe((questions) => {
        this.questions = questions;
      });
  }

  fetchQuestionsBySubjectTopicExam(
    subject: string,
    topic: string,
    exam: string
  ): void {
    this.questionService
      .getQuestionsBySubjectTopicExam(subject, topic, exam)
      .subscribe((questions) => {
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
