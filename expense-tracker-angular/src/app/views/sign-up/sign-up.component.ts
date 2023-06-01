import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

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
  ) {}

  async ngOnInit(): Promise<void> {
      await this.authService.authState$.pipe(take(1)).forEach((u: User | null) => {this.isLoggedIn = !!u})
      if (this.isLoggedIn) {
        this.router.navigateByUrl("/")
      }
      this.createForm();
      this.isInitialized = true;
  }

  signup() {

  }

  createForm() {
    this.form = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    })
  }


  goBack(): void {this.location.back()}
}
