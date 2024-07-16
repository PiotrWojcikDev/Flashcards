import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../api-paths';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isUserLoggedIn: boolean = false;


  constructor(
    private http: HttpClient
  ) { 
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    this.isUserLoggedIn = !!localStorage.getItem('userId');
  }

  login(userId: string) {
    localStorage.setItem('userId', userId);
    this.isUserLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('userId');
    this.isUserLoggedIn = false;
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${ApiPaths.Auth}/login`, loginObj);
  }
  
  registerService(registerObj: any) {
    return this.http.post<any>(`${ApiPaths.Auth}/register`, registerObj);
  }
}