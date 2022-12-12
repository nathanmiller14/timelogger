import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = "Nathan's Timelogger";
  showNavBar: boolean = false;
  currenturl: string ="";
  theurl: any;
  onlyWorkingEmail: string ="mill1492@kettering.edu";
  userSubmittedEmail: boolean = false;
  emailExists: boolean = false;
  showSignUpForm: boolean = false;
  showLoginForm: boolean = false;
  loggedIn: boolean = false;

  constructor(private router: Router) {
    if(this.theurl = "/timelogger")
    {
      this.showNavigationBar();
    }
    else if(this.theurl = "/")
    {
      this.hideNavBar();
    }
  }

  ngOnInit() : void
  {
  }

  hideNavBar()
  {
    this.showNavBar = false;
  }

  showNavigationBar()
  {
    this.showNavBar = true;
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

  logIn()
  {
    this.loggedIn = true;
  }

  logOut()
  {
    this.loggedIn = false;
    this.showLoginForm = false;
    this.showSignUpForm = false;
  }
}