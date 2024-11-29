import { Component } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';
import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css',
})
export class CreateTestComponent {
  subject = '';
  topic = '';
  exam = '';
  numberOfQuestions = 5;
  createdTest?: Test;

  constructor(private testService: TestService) {}

  createTest() {
    this.testService
      .createRandomTest(
        this.subject,
        this.topic,
        this.exam,
        this.numberOfQuestions
      )
      .subscribe(
        (test: Test) => {
          this.createdTest = test;
          console.log('Test created successfully:', test);
        },
        (error) => {
          console.error('Failed to create test', error);
        }
      );
  }
}
