import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning-finished-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-finished-modal.component.html',
  styleUrls: ['./learning-finished-modal.component.css']
})
export class LearningFinishedModalComponent {

  constructor(private router: Router) {

  }

  continueLearning() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]); 
    });
  }
  moveToSets() {
    this.router.navigate(['/sets']);
  }
}
