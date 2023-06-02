import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { DocumentReference } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SignUpData } from 'src/app/models/SignUp';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn!: boolean
  isLoading: boolean = false;
  isInitialized: boolean = false;
  hide: boolean = true; //Password masking

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private authService: FirebaseAuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private firestoreService: FirestoreService,
  ) {}

  async ngOnInit(): Promise<void> {
      await this.authService.authState$.pipe(take(1)).forEach((u: User | null) => {this.isLoggedIn = !!u})
      if (this.isLoggedIn) {
        this.router.navigateByUrl("/")
      }
      this.form = this.createForm();
      this.isInitialized = true;
  }

  async signup() {
    this.isLoading = true;
    let user: UserCredential | null = null;
    let signUpData: SignUpData = {
      firstName: this.form.value["firstName"],
      lastName: this.form.value["lastName"],
      email: this.form.value["email"],
      password: this.form.value["password"]
    }

    try {
      user = await this.authService.signUp(signUpData)
      this.isLoading = false;
      this.router.navigateByUrl("/")
    } catch (error: any) {
      switch (error["code"]) {
        case "auth/weak-password":
          this._snackBar.open("Weak Password", 'Dismiss', {verticalPosition: 'top'})
          this.form.controls['password'].reset();
          break;
        
        case "auth/email-already-in-use":
          this._snackBar.open("Email in use", 'Dismiss', {verticalPosition: 'top'})
          this.form.controls['email'].reset();
          this.form.controls['password'].reset();
          break;

        default:
          break;
      }
    }

    let userData = {
      uid: user?.user.uid!,
      email: user?.user.email!,
      firstName: signUpData.firstName,
      lastName: signUpData.lastName
    }

    let docRef: DocumentReference = await this.firestoreService.createNewUser(userData)
    if (docRef) {
      this.isLoading = false;
      this.router.navigateByUrl("/")
    }

    this._snackBar.open("Something went wrong. Please try again later", "Dismiss", {
      verticalPosition: 'top',
      duration: 10000
    })
  }

  createForm() {
    return this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }


  goBack(): void {this.location.back()}
}
