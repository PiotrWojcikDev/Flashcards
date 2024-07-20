const baseUrl = 'http://localhost:8080/api';

export class ApiPaths {
    static Auth = `${baseUrl}/auth`;
    static Sets = `${baseUrl}/sets`;
    static Flashcards = `${baseUrl}/flashcards`;
}
