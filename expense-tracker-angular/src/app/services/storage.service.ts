import { Injectable } from '@angular/core';
import { Storage, StorageReference, UploadResult, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FirebaseAuthService } from './firebase-auth.service';
import { firstValueFrom, take } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private authSvc: FirebaseAuthService,
  ) { }

  async uploadFile(file: File): Promise<string> { 
    let user: User | null = await firstValueFrom(this.authSvc.user$)
    if (!user) {return "user is null"}

    const storageRef: StorageReference = ref(this.storage, `images/${user?.uid}`);
    return (await uploadBytes(storageRef, file)).ref.fullPath;
   }

   async getDownloadURL(firebaseUID: string): Promise<string> {
    const fileRef: StorageReference = ref(this.storage, `images/${firebaseUID}`)
    const url: string = await getDownloadURL(fileRef)
      .then((url: string) => {return url})
      .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          return "E1";
        
        case 'storage/unauthorized':
          return "E2";

        default:
          return "E99"
      }
    })
    return url;
  }
}
