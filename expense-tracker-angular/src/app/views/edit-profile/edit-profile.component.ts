import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  isInitialized: boolean = false;
  isLoading: boolean = false;
  form!: FormGroup;
  user$!: Subscription;
  user!: User;
  file!: File;
  fileName: string = 'No file selected';

  constructor(
    private authSvc: FirebaseAuthService,
    private firestoreSvc: FirestoreService,
    private storageService: StorageService,
    private location: Location,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
  ngOnInit(): void {
    this.user$ = this.authSvc.user$.subscribe(async (user: User | null) => {
      user ? await this.createForm(user) : this.router.navigateByUrl('/login');
      this.isInitialized = true;
    });
  }

  async createForm(user: User) {
    let doc: any = await this.firestoreSvc.getUserDetails(user.uid);
    this.form = new FormGroup({
      name: new FormControl(doc['name'], [Validators.required]),
      email: new FormControl(doc['email'], [Validators.required]),
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  async submit() {
    await this.storageService.uploadFile(this.file)
    await this.firestoreSvc.editUser()
    window.location.reload();
  }

  goBack() {
    this.location.back();
  }
}
