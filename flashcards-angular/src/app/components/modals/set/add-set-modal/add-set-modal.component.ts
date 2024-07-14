import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SetService } from 'src/app/services/set.service';

@Component({
  selector: 'app-add-set-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-set-modal.component.html',
  styleUrls: ['./add-set-modal.component.css']
})
export class AddSetModalComponent {
  @Output() onAdd = new EventEmitter(); 
  addSetForm!: FormGroup;
  constructor(
    public setService: SetService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.addSetForm = this.formBuilder.group({
      setName: ['', Validators.required],
      userId: [localStorage.getItem('userId')]
    });
  }

  addSet() {
    this.setService.addSet(this.addSetForm.value)
    .subscribe({
      next: (res) => {
        this.setService.showAddSetModal = false;
        this.onAdd.emit();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  closeAddModal() {
    this.setService.showAddSetModal = false;
  }
}
