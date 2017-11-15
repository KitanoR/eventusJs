import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../interface/usuario.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';

import AuthProvider = firebase.auth.AuthProvider;
@Injectable()
export class AuthService {
  user: Observable<Usuario>;
  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore,
              public db: AngularFireDatabase) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if(user){
          console.log(user);
          return this.afs.doc<Usuario>(`users/${user.uid}`).valueChanges();
        }
        else{
          return Observable.of(null);
        }
      });
  }


  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user, 'es el usuario de respuesta');
        let data = {
          email: user.email,
          uid: user.uid
        }
        localStorage.setItem('usuario', JSON.stringify(data));
        return this.updateUserData(user) // if using firestore
      })
      .catch(error =>{
        console.log(error, 'error mensaje');
        this.handleError(error);
      }  );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        let data = {
          email: user.email,
          uid: user.uid
        };
        localStorage.setItem('usuario', JSON.stringify(data));

        return this.updateUserData(user) // if using firestore
      })
      .catch(error => alert(error)  );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('ada'))
      .catch((error) => this.handleError(error) )
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${user.uid}`);

    const data: Usuario = {
      uid: user.uid,
      correo: user.email || null,
      nombre: user.displayName || 'nameless user',
      foto: user.photoURL || 'https://goo.gl/Fz9nrQ'
    }

    return userRef.set(data)

  }
} // fin de la clase auth service
