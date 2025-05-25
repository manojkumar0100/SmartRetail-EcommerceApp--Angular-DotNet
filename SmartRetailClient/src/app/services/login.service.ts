import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiendpoint = environment.apiendpoint;
  constructor(private http: HttpClient) {}

  onlogin(email: string, password: string, callback: (response: string) => void): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: email, password: password };

    this.http.post<string>(`${this.apiendpoint}/api/Auth/Login`, body, { headers }).subscribe(
      response => {
        if (response === 'Email Not Matched' || response === 'Password Not Matched') {
          callback(response);
        } else {
          localStorage.setItem('authToken', response);

          this.http.post<string>(`${this.apiendpoint}/api/Auth/User`, response, { headers }).subscribe(
            username => {
              localStorage.setItem('username', username);
              localStorage.setItem('isLoggedin', "true");
              callback(response);
            },
            error => {
              console.error('Error:', error);
              callback('Error');
            }
          );
        }
      },
      error => {
        console.error('Error:', error);
        callback('Error');
      }
    );
  }
}