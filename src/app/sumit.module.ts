import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, // For form handling
    HttpClientModule, // For making HTTP requests
    BrowserAnimationsModule, // Required for Angular Material animations
  ],
  exports: [],
})
export class SumitModule {}
