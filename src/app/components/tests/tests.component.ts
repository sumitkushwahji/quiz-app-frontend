import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { SumitModule } from '../../sumit.module';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [SumitModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css',
})
export class TestsComponent implements OnInit {
  test: any; // To store the single test data
  tests: any[] = []; // To store the list of tests

  constructor(private testService: TestService) {}

  ngOnInit() {
    this.fetchAllTests(); // Fetch the list of tests on component initialization
  }

  fetchAllTests() {
    this.testService.getAllTests().subscribe((data: any[]) => {
      this.tests = data; // Store the list of tests
    });
  }

  fetchTestById(id: number) {
    this.testService.getTestById(id).subscribe((data: any) => {
      this.test = data; // Store the specific test data
    });
  }
}
