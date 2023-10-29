import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut, UserCredential} from '@angular/fire/auth';
import { Login } from '../models/login.class';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }
  async login(credentials: Login){
    try {
      return new Promise((resolve, reject)=>{
        signInWithEmailAndPassword(this.auth, credentials.username, credentials.password).then((user)=>{
          resolve(user);
        });
      });

    } catch (e) {
      return null;
    }
  } 
}
