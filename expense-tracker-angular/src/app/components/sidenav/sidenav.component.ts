import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { take } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  avatarSrc!: string;
  user!: User | null;
  userDisplayName!: string

  constructor(
    private authService: FirebaseAuthService
  ) { }

  async ngOnInit() {
    await this.authService.user$.pipe(take(1)).forEach((user: User | null) => this.user = user)
    if (null === this.user?.photoURL) {
      // Get photo from storage. Else return static value
    } else {
      this.avatarSrc = this.user?.photoURL!
    }

    if (null === this.user?.displayName) {
      this.userDisplayName = this.user.email?.split("@")[0]!
    } else {
      this.userDisplayName = this.user?.displayName!
    }
    
  }

}
