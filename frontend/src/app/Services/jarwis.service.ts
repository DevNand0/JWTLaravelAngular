import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http: HttpClient) { }
  url: string = 'http://localhost:8000';
  
  signUp(data){
    return this.http.post(`${this.url}/api/signup`,data);
  }

  login(data){
    return this.http.post(`${this.url}/api/login`,data);
  }

  sendPasswordResetLink(data){
    return this.http.post(`${this.url}/api/sendPasswordLink`,data);
  }

  changePassword(data){
    return this.http.post(`${this.url}/api/resetPassword`,data);
  }

}
