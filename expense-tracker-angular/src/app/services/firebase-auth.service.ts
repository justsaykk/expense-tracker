import { Injectable } from '@angular/core';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { LoginData } from '../models/Login';
import { FirebaseAuthError } from '../models/FirebaseAuthError';
import { SignUpData } from '../models/SignUp';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(
    private auth: Auth
  ) { }

  authState$ = authState(this.auth)
  user$ = user(this.auth)

  public logout() { this.auth.signOut() }

  public async login(data: LoginData) {
    return await signInWithEmailAndPassword(this.auth, data.email, data.password)
  }

  public async signUp(data: SignUpData) {
    return await createUserWithEmailAndPassword(this.auth, data.email, data.password)
  }
}
