import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-update-set-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-set-modal.component.html',
  styleUrls: ['./update-set-modal.component.css']
})
export class UpdateSetModalComponent {
  @Input() setObj: any;
  @Output() onUpdate = new EventEmitter(); 
  updateSetForm!: FormGroup;

  constructor(
    public setService: SetService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.updateSetForm = this.formBuilder.group({
      setName: ['', Validators.required],
      setId: this.setObj.setId
    });
  }

  updateSet() {
    this.setService.updateSet(this.updateSetForm.value)
    .subscribe({
      next: (res) => {
        this.setService.showUpdateSetModal = false;
        this.onUpdate.emit();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  closeAddModal() {
    this.setService.showUpdateSetModal = false;
  }
}
