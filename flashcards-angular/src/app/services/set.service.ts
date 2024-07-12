import { Injectable } from '@angular/core';
import { ApiPaths } from '../../api-paths';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  showAddSetModal = false;
  showDeleteSetConfirmationModal = false;
  showLearningFinishedModal = false;

  constructor(
    private http: HttpClient
  ) { }

  addSet(setObj: any) {
    return this.http.post<any>(`${ApiPaths.Sets}/addSet`, setObj);
  }

  getSetById(setId: string) {
    return this.http.get<any>(`${ApiPaths.Sets}/${setId}`);
  }

  getAllSetsByUserId(userId: string) {
    return this.http.get<any>(`${ApiPaths.Sets}/user/${userId}`);
  }

  getAllFlashcardsBySetId(setId: string) {
    return this.http.get<any>(`${ApiPaths.Sets}/${setId}/flashcards`);
  }

  updateSet(userId: string, setObj: any) {
    return this.http.put<any>(`${ApiPaths.Sets}/user/${userId}`, setObj);
  }

  deleteSet(setId: string) {
    return this.http.delete<any>(`${ApiPaths.Sets}/${setId}`);
  }

}
