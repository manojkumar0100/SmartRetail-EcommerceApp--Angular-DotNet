import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminloginService } from '../admin-dashboard/services/adminlogin.service';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from '../utils/validation';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  showLoginErrorModal: boolean = false;

  loginError: string | null = null; // To track whether email or password failed


  constructor(private loginservice : AdminloginService,private router : Router){}


  loginForm: FormGroup = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"),
          Validators.maxLength(20)
        ],
      )
    });
    login_submitted = false;

    get f_login(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
      }

      onLoginSubmit(): void {
        this.login_submitted = true;
    
        if (this.loginForm.invalid) {
          return;
        }
    
        this.loginservice.onlogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value, (response: string) => {
          //console.log("HUID");
          if (response === 'Email Not Matched' || response === 'Password Not Matched') {
            this.loginError = response;
            this.showModal();
            console.log(response);
          } else {
            //console.log("HUID");
            this.router.navigate(['/adminlogin-loading']);
            //this.router.navigate(['']);
            // Handle successful login
          }
        });
      }

      ViewLoginPassword() {
        var type = document.getElementById('loginPassword')?.getAttribute('type') === 'password' ? 'text' : 'password';
        document.getElementById('loginPassword')?.setAttribute('type', type);
        document.getElementById('toggleLoginPassword')?.classList.toggle('fa-eye');
      }


      showModal() {
        this.showLoginErrorModal = true;
        document.getElementById('form-container')!.style.opacity = '0.4';
        
      }
    
      hideModal(event?: MouseEvent) {
        if (event) {
          const target = event.target as HTMLElement;
          if (target.classList.contains('modal')) {
            // Close only if clicked outside the modal content
            this.showLoginErrorModal = false;
          }
        } else {
          this.showLoginErrorModal = false;
        }
        document.getElementById('form-container')!.style.opacity = '1';
      }

}
