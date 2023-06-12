import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { User } from '@angular/fire/auth';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  @Input() sidenav!: MatSidenav;
  avatarSrc!: string;
  user!: User | null;

  constructor(
    private authService: FirebaseAuthService,
    private router: Router
    ) { }

  async ngOnInit(): Promise<void> {
    await this.authService.user$.pipe(take(1)).forEach((user: User | null) => this.user = user)
    if (null === this.user?.photoURL) {
      // Get photo from storage. Else return static value
    }
    this.avatarSrc = this.user?.photoURL!
  }

  toggleSideNav() {
    this.sidenav.toggle()
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');    
  }
}
