import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  startTimer(duration: number, callback: (timeLeft: number) => void) {
    let timeLeft = duration;
    const interval = setInterval(() => {
      timeLeft--;
      callback(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval); // Stop the timer when it reaches 0
      }
    }, 1000);
  }
}
