import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) { }



  onlogin(email: string, password: string, callback: (response: string) => void): void {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { email: email, password: password };
      console.log(body);
  
      this.http.post<string>(`${this.apiendpoint}/api/Admin/Login`, body, { headers }).subscribe(
        response => {
          if (response === 'Email Not Matched' || response === 'Password Not Matched') {
            callback(response);
          } else {
            localStorage.setItem('adminauthToken', response);
            localStorage.setItem('adminisLoggedin', "true");
  
            // this.http.post<string>('http://localhost:59012/api/Admin/Login/Details', response, { headers }).subscribe(
              
            //   username => {
            //     localStorage.setItem('adminusername', username);
                
            //     console.log("IN User Details")
            //     callback(response);
            //   },
            //   error => {
            //     console.error('Error:', error);
            //     callback('Error');
            //   }
            // );
            callback(response)
          }
        },
        error => {
          console.error('Error:', error);
          callback('Error');
        }
      );
    }




}
