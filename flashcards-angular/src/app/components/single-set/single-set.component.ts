import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SetService } from 'src/app/services/set.service';
import { DeleteSetConfirmationModalComponent } from '../modals/set/delete-set-confirmation-modal/delete-set-confirmation-modal.component';

@Component({
  selector: 'app-single-set',
  standalone: true,
  imports: [CommonModule, DeleteSetConfirmationModalComponent],
  templateUrl: './single-set.component.html',
  styleUrls: ['./single-set.component.css'],
  providers: [SetService]
})
export class SingleSetComponent {
  @Input() setObj: any;
  @Output() onDelete = new EventEmitter<void>(); 
  @Output() onDeleteCancel = new EventEmitter<void>(); 

  constructor(
    public setService: SetService,
    private router: Router
  ) {
  }

  navigateToSetDetails(setId: number) {
    this.router.navigate(['/sets', setId, 'flashcards']);
  }
  

  editSet(setId: number) {
    this.router.navigate(['/edit-set', setId]);
  }

  deleteSet(setObj: any) {
    console.log("Delete set" + JSON.stringify(setObj));
    this.setService.showDeleteSetConfirmationModal = true;
  }

  deleteCancelAction() {
    this.setService.showDeleteSetConfirmationModal = false;
  }
}
