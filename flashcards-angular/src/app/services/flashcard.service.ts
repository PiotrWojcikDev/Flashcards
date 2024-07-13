import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../api-paths';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  showAddFlashcardModal = false;
  showUpdateFlashcardModal = false;
  showDeleteFlashcardConfirmationModal = false;
  
  constructor(
    private http: HttpClient
  ) { }



  addFlashcard(flashcardObj: any) {
    return this.http.post<any>(`${ApiPaths.Flashcards}/addFlashcard`, flashcardObj);
  }

  updateFlashcard(flashcardObj: any) {
    console.log(flashcardObj);
    return this.http.put<any>(`${ApiPaths.Flashcards}/${flashcardObj.flashcardId}`, flashcardObj);
  }

  deleteFlashcard(flashcardId: string) {
    return this.http.delete<any>(`${ApiPaths.Flashcards}/${flashcardId}`);
  }


  
}
