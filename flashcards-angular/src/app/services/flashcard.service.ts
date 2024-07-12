import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../api-paths';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  showAddFlashcardModal = false;
  showDeleteFlashcardConfirmationModal = false;
  
  constructor(
    private http: HttpClient
  ) { }

  addFlashcard(flashcardObj: any) {
    return this.http.post<any>(`${ApiPaths.Flashcards}/addFlashcard`, flashcardObj);
  }

  deleteFlashcard(flashcardId: string) {
    return this.http.delete<any>(`${ApiPaths.Flashcards}/${flashcardId}`);
  }


  
}
