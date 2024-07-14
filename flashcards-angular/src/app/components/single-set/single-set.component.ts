import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SetService } from 'src/app/services/set.service';
import { DeleteSetConfirmationModalComponent } from '../modals/set/delete-set-confirmation-modal/delete-set-confirmation-modal.component';
import { UpdateSetModalComponent } from '../modals/set/update-set-modal/update-set-modal.component';

@Component({
  selector: 'app-single-set',
  standalone: true,
  imports: [
    CommonModule, 
    UpdateSetModalComponent,
    DeleteSetConfirmationModalComponent
  ],
  templateUrl: './single-set.component.html',
  styleUrls: ['./single-set.component.css'],
  providers: [SetService]
})
export class SingleSetComponent {
  @Input() setObj: any;
  @Output() onUpdate = new EventEmitter<void>(); 
  @Output() onDelete = new EventEmitter<void>(); 
  @Output() onDeleteCancel = new EventEmitter<void>(); 

  constructor(
    public setService: SetService,
    private router: Router
  ) {}

  navigateToSetDetails(setId: number) {
    this.router.navigate(['/sets', setId, 'flashcards']);
  }

  updateSet() {
    this.setService.showUpdateSetModal = true;
  }

  deleteSet() {
    this.setService.showDeleteSetConfirmationModal = true;
  }

  deleteCancelAction() {
    this.setService.showDeleteSetConfirmationModal = false;
  }
}
