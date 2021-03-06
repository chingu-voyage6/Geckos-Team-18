import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordHidden: boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  signup() {
    return this.auth
      .emailSignUp(this.email.value, this.password.value)
      .then(() => this.afterSignIn());
  }

  signin() {
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then(() => this.afterSignIn());
  }

  anonymousSignIn() {
    return this.auth.anonymousSignIn().then(() => this.afterSignIn());
  }

  googleSignIn() {
    return this.auth.googleSignIn().then(() => this.afterSignIn());
  }

  githubSignIn() {
    return this.auth.githubSignIn().then(() => this.afterSignIn());
  }

  facebookSignIn() {
    return this.auth.facebookSignIn().then(() => this.afterSignIn());
  }

  twitterSignIn() {
    return this.auth.twitterSignIn().then(() => this.afterSignIn());
  }

  getEmailErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'You must enter a value'
      : this.password.hasError('pattern')
        ? 'Password must be between 6 and 24 characters and contain at least one number'
        : '';
  }

  afterSignIn() {
    this.router.navigate(['/collections']);
  }
}
