import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { SumitModule } from '../../sumit.module';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-fileupload',
  standalone: true,
  imports: [SumitModule, MatOptionModule],
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.css',
})
export class FileuploadComponent {
  questionForms: FormGroup[] = []; // Store multiple extracted questions
  questionTypes = ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'];
  difficulties = ['EASY', 'MEDIUM', 'HARD'];
  subjects = [
    'General Aptitude ',
    'Engineering Mathematics',
    'Computer Science',
  ];

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {}

  // Handle PDF Upload
  uploadFile(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.questionService.uploadPdf(formData).subscribe((questions: any[]) => {
      this.initializeForms(questions);
    });
  }

  // Initialize Form for Each Extracted Question
  initializeForms(questions: any[]) {
    this.questionForms = questions.map((q) =>
      this.fb.group({
        subject: ['Computer Science', Validators.required],
        topic: ['General'],
        exam: ['Nielit'],
        text: [q.text, Validators.required],
        explanation: ['NA'],
        questionType: ['MULTIPLE_CHOICE', Validators.required],
        difficulty: ['MEDIUM', Validators.required],
        options: this.fb.array(
          q.options.map((opt: any) =>
            this.fb.group({
              text: [opt.text, Validators.required],
              isCorrect: [false],
            })
          )
        ),
      })
    );
  }

  // Get Options for a Question Form
  getOptions(form: FormGroup): FormArray {
    return form.get('options') as FormArray;
  }

  // Add Option to a Question Form
  addOption(form: FormGroup): void {
    this.getOptions(form).push(
      this.fb.group({ text: ['', Validators.required], isCorrect: [false] })
    );
  }

  // Remove Option from a Question Form
  removeOption(form: FormGroup, index: number): void {
    this.getOptions(form).removeAt(index);
  }

  // Save All Questions
  saveAllQuestions(): void {
    const questionsToSave = this.questionForms.map((form) => form.value);
    this.questionService
      .saveAllQuestions(questionsToSave)
      .subscribe((response) => {
        console.log('Questions saved successfully:', response);
      });
  }
}
