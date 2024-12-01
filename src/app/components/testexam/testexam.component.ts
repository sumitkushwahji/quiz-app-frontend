import { Component } from '@angular/core';
import { SumitModule } from '../../sumit.module';
import { Test2Service } from '../../services/test2.service';
import { QuestionService } from '../../services/question.service';
import { TestService } from '../../services/test.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-testexam',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './testexam.component.html',
  styleUrl: './testexam.component.css',
})
export class TestexamComponent {
  filters: { [key: string]: string } = {
    subject: '',
    topic: '',
    exam: '',
    difficulty: '',
    questionType: '',
  };
  difficulties: string[] = ['EASY', 'MEDIUM', 'HARD'];
  questionTypes: string[] = ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'];

  testDetails = {
    name: '',
    description: '',
    duration: 0, // Add duration here
  };

  numberOfRandomQuestions = 0;

  // Suggestions
  subjectSuggestions: string[] = [];
  topicSuggestions: string[] = [];
  examSuggestions: string[] = [];

  showSuggestions: { [key: string]: boolean } = {
    subject: false,
    topic: false,
    exam: false,
  };

  questions: any[] = [];
  selectedQuestions: { [key: number]: boolean } = {};

  // Getter to count the number of selected questions
  get selectedQuestionCount(): number {
    return Object.keys(this.selectedQuestions).filter(
      (key) => this.selectedQuestions[+key]
    ).length;
  }

  constructor(
    private questionService: QuestionService,
    private testService: TestService
  ) {}

  // Fetch subjects dynamically as the user types
  fetchSubjects(query: string) {
    if (query.length > 0) {
      this.questionService.getSubjects().subscribe((data) => {
        this.subjectSuggestions = data.filter((subject) =>
          subject.toLowerCase().includes(query.toLowerCase())
        );
        this.showSuggestions['subject'] = true;
      });
    } else {
      this.subjectSuggestions = [];
      this.showSuggestions['subject'] = false;
    }
  }

  // Fetch topics dynamically as the user types
  fetchTopics(query: string) {
    if (query.length > 0) {
      this.questionService.getTopics().subscribe((data) => {
        this.topicSuggestions = data.filter((topic) =>
          topic.toLowerCase().includes(query.toLowerCase())
        );
        this.showSuggestions['topic'] = true;
      });
    } else {
      this.topicSuggestions = [];
      this.showSuggestions['topic'] = false;
    }
  }

  // Fetch exams dynamically as the user types
  fetchExams(query: string) {
    if (query.length > 0) {
      this.questionService.getExams().subscribe((data) => {
        this.examSuggestions = data.filter((exam) =>
          exam.toLowerCase().includes(query.toLowerCase())
        );
        this.showSuggestions['exam'] = true;
      });
    } else {
      this.examSuggestions = [];
      this.showSuggestions['exam'] = false;
    }
  }

  // Hide suggestions dropdown (with a slight delay for click handling)
  hideSuggestions(field: string) {
    setTimeout(() => {
      this.showSuggestions[field] = false;
    }, 200);
  }

  // Select a suggestion and populate the corresponding field
  selectFilter(field: string, value: string) {
    this.filters[field] = value;
    this.hideSuggestions(field);
  }

  // Apply filters to fetch questions based on user input
  applyFilters() {
    this.questionService
      .getFilteredQuestions(this.filters)
      .subscribe((data) => {
        this.questions = data;
      });
  }

  // Fetch random questions based on filters
  selectRandomQuestions() {
    const { subject, topic, exam } = this.filters;
    this.questionService
      .getFilteredQuestions({
        subject,
        topic,
        exam,
        numberOfQuestions: this.numberOfRandomQuestions.toString(),
      })
      .subscribe((data) => {
        // Update the list of available questions
        this.questions = data;

        // Reset selected questions
        this.selectedQuestions = {};

        // Mark random questions as selected
        this.questions.forEach((question) => {
          this.selectedQuestions[question.id] = true; // Set the selected state to true
        });

        // You don't need to do anything for selectedQuestionCount because the getter will automatically reflect the count
      });
  }

  // Create a test using selected questions
  createTest() {
    if (
      !this.testDetails.name ||
      !this.testDetails.description ||
      !this.filters['subject'] ||
      !this.filters['topic'] ||
      !this.filters['exam'] ||
      !this.filters['difficulty']
    ) {
      alert('Please fill all the required fields!');
      return;
    }

    // Filter selected question objects (not just IDs)
    const selectedQuestionObjects = this.questions.filter(
      (question) => this.selectedQuestions[question.id]
    );

    // Construct the payload for the backend with full question objects and other fields
    const testPayload = {
      ...this.testDetails,
      duration: this.testDetails.duration, // Send duration to the backend
      questions: selectedQuestionObjects,
      difficulty: this.filters['difficulty'],
      subject: this.filters['subject'],
      topic: this.filters['topic'],
      exam: this.filters['exam'],
    };

    // Call backend to create the test
    this.testService.createTest(testPayload).subscribe(
      (response) => {
        alert('Test created successfully!');
      },
      (error) => {
        console.error('Error creating test:', error);
        alert('There was an error creating the test. Please try again.');
      }
    );
  }
}
