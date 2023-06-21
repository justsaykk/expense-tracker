import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';

type UserData = {
  uid: string;
  email: string;
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private userProfileReference!: CollectionReference;

  constructor(private afs: Firestore) {
    this.userProfileReference = collection(this.afs, 'users');
  }

  async getUserDetails(uid: string) {
    const q = query(this.userProfileReference, where('uid', '==', uid))
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0].data()
    return {
      ...doc,
      profilePicture: ""
    }
  }


  async createNewUser(userData: UserData) {
    return await addDoc(this.userProfileReference, userData);
  }
}
