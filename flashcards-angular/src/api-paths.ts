import { environment } from './environments/environment';

export class ApiPaths {
     static Auth = `${environment.apiUrl}/auth`;
     static Sets = `${environment.apiUrl}/sets`;
     static Flashcards = `${environment.apiUrl}/flashcards`;
}
 