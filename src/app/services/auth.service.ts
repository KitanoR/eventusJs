import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }
  loginSocial(proveedor: string){
    let provider;
    if(proveedor == "google"){
    }
  }

  logout(){

  }

  registroUsuario(){

  }
  login(){

  }

} // fin de la clase auth service
