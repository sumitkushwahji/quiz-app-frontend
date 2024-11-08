import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  score: number = 0;
  totalQuestions: number = 0;
  correctAnswers: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.score = +params['score'];
      // You may want to set totalQuestions and correctAnswers based on the actual results.
    });
  }
}
