import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, QuestionType } from '../../models/question.model';
import { TestService } from '../../services/test.service';
import { QuestionService } from '../../services/question.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-test-detail',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
})
export class TestDetailComponent implements OnInit {
  testForm: FormGroup;
  submitted = false;
  questions: Question[] = [];
  selectedQuestionIds: number[] = [];
  filter = { subject: '', topic: '', exam: '', questionType: undefined }; // filter definition
  filteredQuestions: Question[] = [];
  questionTypes = [
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.TRUE_FALSE,
    QuestionType.SHORT_ANSWER,
  ];

  subjects: string[] = [];
  topics: string[] = [];
  exams: string[] = [];

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private questionService: QuestionService,
    private router: Router
  ) {
    this.testForm = this.fb.group({
      testName: ['', Validators.required],
      description: [''],
      duration: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadFilterOptions(); // Load filter options on init
    this.loadQuestions(); // Load questions after filter options
  }

  get f() {
    return this.testForm.controls;
  }

  loadQuestions(): void {
    this.questionService.getFilteredQuestions(this.filter).subscribe({
      next: (data) => {
        this.questions = data;
        this.applyFilters(); // Apply filters to the questions
      },
      error: (error) => {
        console.error('Error loading questions:', error);
      },
    });
  }

  loadFilterOptions(): void {
    // Assuming getUniqueSubjects does not require any arguments
    this.questionService.getUniqueSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.loadUniqueTopicsAndExams(); // Load topics and exams after subjects
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
      },
    });
  }

  loadUniqueTopicsAndExams(): void {
    // Load unique topics based on selected subject
    if (this.filter.subject) {
      this.questionService.getUniqueTopics().subscribe({
        next: (topics) => (this.topics = topics),
        error: (error) => {
          console.error('Error loading topics:', error);
        },
      });
    }

    // Load exams without parameters
    this.questionService.getUniqueExams().subscribe({
      next: (exams) => (this.exams = exams),
      error: (error) => {
        console.error('Error loading exams:', error);
      },
    });
  }

  applyFilters(): void {
    this.filteredQuestions = this.questions.filter((q) => {
      return (
        (!this.filter.subject || q.subject === this.filter.subject) &&
        (!this.filter.topic || q.topic === this.filter.topic) &&
        (!this.filter.exam || q.exam === this.filter.exam) &&
        (!this.filter.questionType ||
          q.questionType === this.filter.questionType)
      );
    });
  }

  toggleQuestionSelection(questionId: number): void {
    const index = this.selectedQuestionIds.indexOf(questionId);
    if (index > -1) {
      this.selectedQuestionIds.splice(index, 1);
    } else {
      this.selectedQuestionIds.push(questionId);
    }
  }

  isSelected(questionId: number): boolean {
    return this.selectedQuestionIds.includes(questionId);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.testForm.invalid) {
      return;
    }

    const testData = {
      testName: this.f['testName'].value,
      description: this.f['description'].value,
      duration: this.f['duration'].value,
      questionIds: this.selectedQuestionIds,
    };

    this.testService.createTest(testData).subscribe({
      next: (response) => {
        console.log('Test created successfully:', response);
        this.router.navigate(['/tests', response.id, 'questions']);
      },
      error: (error) => {
        console.error('Error creating test:', error);
      },
    });
  }
}
