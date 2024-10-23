import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent {
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {
    this.questionForm = this.fb.group({
      subject: ['', Validators.required], // Added subject
      topic: ['', Validators.required], // Added topic
      exam: [''], // Added exam (optional)
      text: ['', Validators.required],
      explanation: [''],
      options: this.fb.array([this.createOption()]), // Initialize with one option
    });
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false],
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    if (this.options.length > 1) {
      this.options.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      this.questionService
        .saveQuestion(this.questionForm.value)
        .subscribe((response) => {
          console.log('Question saved:', response);
          this.questionForm.reset();
        });
    }
  }
}
