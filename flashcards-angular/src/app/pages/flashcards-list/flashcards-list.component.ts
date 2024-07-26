import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetService } from 'src/app/services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleFlashcardComponent } from 'src/app/components/single-flashcard/single-flashcard.component';
import { FormsModule } from '@angular/forms';
import { AddFlashcardModalComponent } from 'src/app/components/modals/flashcard/add-flashcard-modal/add-flashcard-modal.component';
import { FlashcardService } from 'src/app/services/flashcard.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-flashcards-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    NavbarComponent,
    SingleFlashcardComponent, 
    AddFlashcardModalComponent
  ],
  templateUrl: './flashcards-list.component.html',
  styleUrls: ['./flashcards-list.component.css'],
  providers: [SetService, FlashcardService]
})
export class FlashcardsListComponent {
  set: any = "";
  setFlashcards: Array<any> = [];
  filteredFlashcards: Array<any> = [];
  filterText: string = ''; 
  setId!: string;

  constructor(
    public flashcardService: FlashcardService, 
    private setService: SetService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.setId = params.get('setId') ?? '';
      this.getSetById(this.setId);
      this.getAllFlashcardsBySetId(this.setId);
    });
  }


  getSetById(setId: string) {
    this.setService.getSetById(setId).subscribe({
      next: (res) => {
        this.set = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAllFlashcardsBySetId(setId: string) {
    this.setService.getAllFlashcardsBySetId(setId).subscribe({
      next: (res) => {
        this.setFlashcards = res.sort(
          (a: { front: string; }, b: { front: string; }) => a.front.localeCompare(b.front)
        ); 
        this.filteredFlashcards = [...this.setFlashcards];
        console.log(this.setFlashcards);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  filterFlashcards() {
    this.filteredFlashcards = this.setFlashcards.filter(flashcard =>
      flashcard.front.toLowerCase().includes(this.filterText.toLowerCase()) ||
      flashcard.back.toLowerCase().includes(this.filterText.toLowerCase())
    );
    console.log(this.filteredFlashcards)
  }

  addFlashcard() {
    this.flashcardService.showAddFlashcardModal = true;
  }

  openLearnMode() {
    this.router.navigate(['/sets', this.setId, 'learn']);
  }
  

  refreshList() {
    this.getSetById(this.setId);
    this.getAllFlashcardsBySetId(this.setId);  
  }
}
