import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import Validation from '../utils/validation';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('exampleModalCenter') exampleModalCenter!: ElementRef;
  showLoginErrorModal = false;

  loginError: string | null = null; // To track whether email or password failed

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  login_submitted = false;

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phonenumber: new FormControl(''),
  });
  signup_submitted = false;

  constructor(private formBuilder: FormBuilder, private loginservice: LoginService, private registerservice: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ],
      ]
    });

    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"),
          Validators.maxLength(20)
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      acceptTerms: ['', [Validators.required]]
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  get f_login(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLoginSubmit(): void {
    this.login_submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginservice.onlogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value, (response: string) => {
      if (response === 'Email Not Matched' || response === 'Password Not Matched') {
        this.loginError = response;
        this.showModal();
        console.log(response);
      } else {
        this.router.navigate(['/login-loading']);
        //this.router.navigate(['']);
        // Handle successful login
      }
    });
  }

  get f_signup(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSignupSubmit(): void {
    this.signup_submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const firstName = this.signupForm.get('firstName')?.value;
    const lastName = this.signupForm.get('lastName')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const phoneNumber = this.signupForm.get('phonenumber')?.value;

    this.registerservice.onregister(firstName, lastName, email, password, phoneNumber, (response: string) => {
      if (response === 'Email Already Exists' || response === 'PhoneNumber Already Exists' || response === 'Registration Failed') {
        this.loginError = response;
       
        this.showModal();
        console.log(response);
      } else {
        this.router.navigate(['']);
        // Handle successful login
      }
  })
  ;
}

  LoginToggle = () => {
    document.getElementById('loginForm')?.classList.add('active');
    document.getElementById('signupForm')?.classList.remove('active');
    document.getElementById('loginToggle')?.classList.replace('btn-outline-secondary', 'btn-primary');
    document.getElementById('signupToggle')?.classList.replace('btn-primary', 'btn-outline-secondary');
  };

  SignupToggle = () => {
    document.getElementById('signupForm')?.classList.add('active');
    document.getElementById('loginForm')?.classList.remove('active');
    document.getElementById('signupToggle')?.classList.replace('btn-outline-secondary', 'btn-primary');
    document.getElementById('loginToggle')?.classList.replace('btn-primary', 'btn-outline-secondary');
  };

  ViewLoginPassword() {
    var type = document.getElementById('loginPassword')?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById('loginPassword')?.setAttribute('type', type);
    document.getElementById('toggleLoginPassword')?.classList.toggle('fa-eye');
  }

  ViewSignupPassword() {
    var type = document.getElementById('signupPassword')?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById('signupPassword')?.setAttribute('type', type);
    document.getElementById('toggleSignupPassword')?.classList.toggle('fa-eye');
  }

  ViewConfirmPassword() {
    var type = document.getElementById('signupConfirmPassword')?.getAttribute('type') === 'password' ? 'text' : 'password';
    document.getElementById('signupConfirmPassword')?.setAttribute('type', type);
    document.getElementById('toggleConfirmPassword')?.classList.toggle('fa-eye');
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
