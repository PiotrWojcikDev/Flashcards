import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-delete-set-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-set-confirmation-modal.component.html',
  styleUrls: ['./delete-set-confirmation-modal.component.css']
})
export class DeleteSetConfirmationModalComponent {
  @Input() setObj: any;
  @Output() onDelete = new EventEmitter(); 
  @Output() onDeleteCancel = new EventEmitter();
  
  constructor(public setService: SetService) { }

  deleteSet() {
    this.setService.deleteSet(this.setObj.setId).subscribe({
      next: (res) => {
        this.setService.showDeleteSetConfirmationModal = false;
        this.onDelete.emit();
        console.log("Set deleted successfully");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteCancelAction() {
    console.log("CANCEL");
    this.onDeleteCancel.emit();
    this.setService.showDeleteSetConfirmationModal=false;
  }
}
