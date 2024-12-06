import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { SumitModule } from '../../sumit.module';
import { Router } from '@angular/router';
import { AttemptService } from '../../services/attempt.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css',
})
export class TestsComponent implements OnInit {
  tests: any[] = []; // List of all tests
  attemptedTestIds: number[] = []; // List of IDs of attempted tests

  constructor(
    private testService: TestService,
    private attemptService: AttemptService, // Inject AttemptService
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchAllTests(); // Fetch all tests
    this.fetchAttemptedTests(); // Fetch tests attempted by the user
  }

  fetchAllTests() {
    this.testService.getAllTests().subscribe((data: any[]) => {
      this.tests = data; // Store the tests
    });
  }

  fetchAttemptedTests() {
    const userId = environment.defaultUserId; // Replace with logic to get the current user's ID
    this.attemptService
      .getAttemptedTests(userId)
      .subscribe((data: number[]) => {
        this.attemptedTestIds = data; // Store attempted test IDs
      });
  }

  startAttempt(testId: number) {
    this.router.navigate(['/attempt', testId]);
  }

  isTestAttempted(testId: number): boolean {
    return this.attemptedTestIds.includes(testId);
  }
}
