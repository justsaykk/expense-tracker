import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  user$!: Subscription;
  user!: User | null;
  userDisplayName!: string;

  constructor(
    private authService: FirebaseAuthService,
    ) {}

  async ngOnInit() {
    this.user$ = this.authService.user$.subscribe((user: User | null) => {
      this.user = user; 
      this.setUserData(user!);
    });
  }

  async setUserData(user: User) {
    if (!user.displayName) {
      this.userDisplayName = user.email?.split('@')[0]!;
    } else {
      this.userDisplayName = user?.displayName!;
    }
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
