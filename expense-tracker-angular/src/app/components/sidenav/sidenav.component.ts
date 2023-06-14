import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  avatarSrc!: string;
  user$!: Subscription;
  user!: User | null;
  userDisplayName!: string;

  constructor(private authService: FirebaseAuthService) {}

  async ngOnInit() {
    this.user$ = this.authService.user$.subscribe((user: User | null) => {
      this.user = user; 
      this.setUserData();
    });
  }

  setUserData() {
    if (!this.user?.photoURL) {
      // Get photo from storage. Else return static value
    } else {
      this.avatarSrc = this.user?.photoURL!;
    }
    if (!this.user?.displayName) {
      this.userDisplayName = this.user?.email?.split('@')[0]!;
    } else {
      this.userDisplayName = this.user?.displayName!;
    }
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }
}
