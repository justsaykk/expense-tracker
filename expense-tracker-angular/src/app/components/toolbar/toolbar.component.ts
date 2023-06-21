import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy{
  @Input() sidenav!: MatSidenav;
  avatarSrc!: string;
  user!: User | null;
  user$!: Subscription;

  constructor(
    private authService: FirebaseAuthService,
    private router: Router
    ) { }

  async ngOnInit(): Promise<void> {
    this.user$ = this.authService.user$.subscribe((user: User | null) => this.user = user)
    if (null === this.user?.photoURL) {
      // Get photo from storage. Else return static value
    }
    this.avatarSrc = this.user?.photoURL!
  }

  ngOnDestroy(): void {
      this.user$.unsubscribe();
  }

  toggleSideNav() {
    this.sidenav.toggle()
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');    
  }
}
