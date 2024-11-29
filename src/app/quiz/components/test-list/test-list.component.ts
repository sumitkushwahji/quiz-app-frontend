import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { SumitModule } from '../../../sumit.module';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
})
export class TestListComponent implements OnInit {
  tests: Test[] = [];
  errorMessage: string = '';

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit() {
    // Fetch all tests when the component is initialized
    this.testService
      .getTests()
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Failed to load tests. Please try again later.';
          console.error('Error fetching tests:', err);
          return of([]); // Return an empty array if the request fails
        })
      )
      .subscribe((tests) => {
        this.tests = tests;
        console.log('Tests:', tests);
      });
  }

  startTest(testId: number) {
    console.log('Starting test:', testId);
    // Navigate to the test-taking page and pass the test ID
    this.router.navigate(['/quiz/attempt-quiz', testId]);
  }
}
