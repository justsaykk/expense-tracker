import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { DocumentReference } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SignUpData } from 'src/app/models/SignUp';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CustomValidators } from 'src/app/validators/match-validator.directive';

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
    private authService: FirebaseAuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private firestoreService: FirestoreService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authService.authState$.pipe(take(1)).forEach((u: User | null) => { this.isLoggedIn = !!u })
    if (this.isLoggedIn) {
      this.router.navigateByUrl("/dashboard")
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
      this.router.navigateByUrl("/dashboard")
    } catch (error: any) {
      switch (error["code"]) {
        case "auth/weak-password":
          this._snackBar.open("Weak Password", 'Dismiss', { verticalPosition: 'top' })
          this.form.controls['password'].reset();
          break;

        case "auth/email-already-in-use":
          this._snackBar.open("Email in use", 'Dismiss', { verticalPosition: 'top' })
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
    if (!docRef) {
      this._snackBar.open("Something went wrong. Please try again later", "Dismiss", {
        verticalPosition: 'top',
        duration: 10000
      })
      this.isLoading = false;
    }
    this.isLoading = false;
    this.router.navigateByUrl("/dashboard")
  }


  createForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      CustomValidators.MatchValidator("password", "confirmPassword")
    )
  }

  passwordMatchError(): boolean {
    return (
      this.form.errors?.['mismatch'] &&
      this.form.controls['confirmPassword'].dirty &&
      !this.form.controls['confirmPassword'].hasError('required')
    )
  }

  confirmErrorMatcher: ErrorStateMatcher = { // this weird object is needed to deal with angular material's problem
    isErrorState: (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      const controlInvalid = control?.touched && control.invalid;
      const formInvalid = control?.touched && this.form.get('password')?.touched && this.form.invalid
      return controlInvalid! || formInvalid!;
    }
  }

  goBack(): void { this.location.back() }
}