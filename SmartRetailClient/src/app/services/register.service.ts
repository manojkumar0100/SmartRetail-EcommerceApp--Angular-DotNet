import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) { }


  onregister(firstname:string,lastname:string,email:string,password:string,phonenumber:string ,callback: (response: string) => void) : void
  {
     const body = {firstName : firstname,lastName : lastname,email:email,password:password,phoneNumber : phonenumber };
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

     this.http.post<string>(`${this.apiendpoint}/api/Auth/Register`,body,{headers}).subscribe(
      response => {


        if (response === 'Email Already Exists' || response === 'PhoneNumber Already Exists' || response === 'Registration Failed') {
          callback(response);
        }
else{

        console.log(response);
        localStorage.setItem('authToken',response);

        

        this.http.post<string>(`${this.apiendpoint}/api/Auth/User`,response,{headers}).subscribe(
          response =>
          {
            console.log(response);
            localStorage.setItem('username',response);
            localStorage.setItem('isLoggedin',"true");
            callback(response);
            //this.usernameSubject.next(response); // Update BehaviorSubject
          },
          error =>
          {
            console.log(error);
            callback('Error');
          }
          
          
        )


      }},
      error => {
        console.error('Error:', error);
        callback('Error');
      }
    
     );

  }



}
