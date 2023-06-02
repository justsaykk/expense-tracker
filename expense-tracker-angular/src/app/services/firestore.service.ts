import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { SignUpData } from '../models/SignUp';

type UserData = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
};

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private userProfileReference!: CollectionReference;

  constructor(private afs: Firestore) {
    this.userProfileReference = collection(this.afs, 'users');
  }

  async createNewUser(userData: UserData) {
    return await addDoc(this.userProfileReference, userData);
  }
}
