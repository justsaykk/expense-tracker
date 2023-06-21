import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, OnDestroy{
  @Input() avatarSize!: string;
  avatarSrc!: string;
  user!: User | null;
  user$!: Subscription;

  constructor(
    private authService: FirebaseAuthService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$.subscribe((user: User | null) => {
      this.user = user; 
      this.setAvatarSrc(user!);
    });
  }

  ngOnDestroy(): void {
      this.user$.unsubscribe()
  }

  async setAvatarSrc(u: User) {
    const url: string = await this.storageService.getDownloadURL(u.uid)

    switch (url) {
      case "E1":
        this.avatarSrc = "assets/profile_picture_placeholder.jpg"
        console.log("E1: file not found")
        break;
      
      case "E2":
        console.log("E2: Unauthorized. Access denied")
        break;
      
      case "E99":
        console.log("E99: Unknown error occured")
        break;

      default:
        this.avatarSrc = url
        break;
    }
  }
}
