import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../interface/usuario.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

import AuthProvider = firebase.auth.AuthProvider;
@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }
  loginSocial(proveedor: string){
    let provider;
    if(proveedor == "google"){
    }
  }

  logout(){

  }

  registroUsuario(usuario:Usuario){
    let usuarioRef = this.db.list('Usuarios');
    usuarioRef.push(usuario);
  }
  login(){

  }

} // fin de la clase auth service
