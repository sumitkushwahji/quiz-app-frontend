import { Component } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { Test2Service } from '../../quiz/services/test2.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-testexam',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './testexam.component.html',
  styleUrl: './testexam.component.css',
})
export class TestexamComponent {
  test: any = {
    name: '',
    description: '',
    questionCount: 10,
    selectedQuestions: [],
    subject: '',
    topic: '',
    exam: '',
    difficulty: '', // difficulty will be passed as a string (or "" for 'Any')
  };

  filters: any = {
    subject: '',
    topic: '',
    exam: '',
    difficulty: '', // difficulty filter starts as empty
  };

  questions: any[] = [];

  constructor(
    private testService: Test2Service,
    private questionService: QuestionService
  ) {}

  // Fetch filtered questions based on the filters
  fetchQuestions() {
    this.questionService
      .getFilteredQuestions(this.filters)
      .subscribe((data) => {
        this.questions = data;
      });
  }

  // Toggle selection of questions
  toggleQuestionSelection(question: any) {
    const index = this.test.selectedQuestions.indexOf(question);
    if (index > -1) {
      this.test.selectedQuestions.splice(index, 1);
    } else {
      this.test.selectedQuestions.push(question);
    }
  }

  // On form submit, handle empty fields and prepare data for the backend
  onSubmit() {
    // Check for empty difficulty and convert it to null if necessary
    if (this.filters.difficulty === '') {
      this.filters.difficulty = null; // Send null instead of an empty string for "Any" difficulty
    }

    // Prepare the request body
    const requestBody = {
      ...this.test,
      selectedQuestions: this.test.selectedQuestions.map((q: any) => q.id),
      filters: this.filters, // include the filters in the request
    };

    // Call the service to create the test
    this.testService.createTest(requestBody).subscribe((response) => {
      alert('Test created successfully!');

      // Reset the form after successful submission
      this.test = {
        name: '',
        description: '',
        questionCount: 10,
        selectedQuestions: [],
        subject: '',
        topic: '',
        exam: '',
        difficulty: '', // Reset the difficulty as well
      };

      this.filters = {
        subject: '',
        topic: '',
        exam: '',
        difficulty: '', // Reset the difficulty filter
      };

      // Clear the questions
      this.questions = [];
    });
  }
}
