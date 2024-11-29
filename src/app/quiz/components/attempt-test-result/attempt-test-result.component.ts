import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attempt-test-result',
  standalone: true,
  imports: [],
  templateUrl: './attempt-test-result.component.html',
  styleUrl: './attempt-test-result.component.css',
})
export class AttemptTestResultComponent implements OnInit {
  score: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.score = params['score'];
    });
  }
}
