import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { take } from 'rxjs';
import { FirebaseAuthError } from 'src/app/models/FirebaseAuthError';
import { LoginData } from 'src/app/models/Login';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hide: boolean = true  //Boolean for password masking
  isLoading: boolean = true;
  isLoggingIn: boolean = false;
  isLoggedIn!: boolean
  errorMsg!: string

  constructor(
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: FirebaseAuthService,
    private _snackBar: MatSnackBar
  ) {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  ngOnInit(): void {
    this.authService.authState$.pipe(take(1)).forEach((u: User | null) => this.isLoggedIn = !!u)
      .then(() => {
        if (this.isLoggedIn) {
          this.router.navigateByUrl("/")
          this.isLoading = false;
        } else {
          this.createForm()
        }
      })
  }

  login() {
    this.isLoggingIn = true;
    let loginData: LoginData = {
      email: this.form.value["email"],
      password: this.form.value["password"]
    }
    this.authService.login(loginData)
      .then(() => this.router.navigateByUrl("/"))
      .catch((error: FirebaseAuthError) => {  //Handle login errors
        switch (error.code) {
          case "auth/user-not-found":
            this._snackBar.open(
              'User not found. Please sign up', 
              'Dismiss', {
              duration: 5000,
              verticalPosition: 'top'
            });
            this.form.controls['password'].reset();
            this.isLoggingIn = false;
            return null;
    
          case "auth/wrong-password":
            this._snackBar.open(
              'Wrong Password. Please try again', 
              'Dismiss', {
              duration: 5000,
              verticalPosition: 'top'
            })
            this.form.controls['password'].reset();
            this.isLoggingIn = false;
            return null;

          default:
            break;
        }
        return null;
      })
  }

  // Code for firebaseAuth UI
  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult){
    this.router.navigate(["/"]);
   }
    
  errorCallback(errorData: FirebaseUISignInFailure){
    console.log(errorData)
   }
  
  uiShownCallback() {
    console.log("UI is shown")
   }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.isLoading = false;
  }
  
  goBack(): void {this.location.back()}

}
