import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../api-paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  loginService(loginObj: any) {
    return this.http.post<any>(`${ApiPaths.Auth}/login`, loginObj);
  }
  
  registerService(registerObj: any) {
    return this.http.post<any>(`${ApiPaths.Auth}/register`, registerObj);
  }
}