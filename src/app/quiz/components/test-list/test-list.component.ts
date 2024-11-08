import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { Router } from '@angular/router';

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

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.testService.getTests().subscribe((tests) => {
      this.tests = tests;
    });
  }

  viewTest(testId: number): void {
    this.router.navigate(['quiz/test', testId]);
  }

  createTest(): void {
    this.router.navigate(['quiz/test/create']); // Updated route for creating a new test
  }
}
