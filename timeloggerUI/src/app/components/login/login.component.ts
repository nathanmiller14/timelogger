import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  userSubmittedEmail = false;
  onlyWorkingEmail = 'mill1492@kettering.edu';
  emailExists = false;
  showSignUpForm = false;
  showLoginForm = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(term: string)
  {
    if(term == this.onlyWorkingEmail)
    {
      this.userSubmittedEmail = true;
      this.emailExists = true;
      this.showSignUpForm = false;
      this.showLoginForm = true;
    }
    else
    {
      this.userSubmittedEmail = true;
      this.emailExists = false;
      this.showLoginForm = false;
      this.showSignUpForm = true;
    }
  }
}