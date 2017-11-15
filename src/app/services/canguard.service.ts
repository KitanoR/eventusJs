import { Injectable } from '@angular/core';

@Injectable()
export class CanguardService {

  constructor() { }
  isLoggedIn(){
    if(localStorage.getItem('usuario')){
      console.log(localStorage.getItem('usuario'))
      return true;
    }
    else
      return false;
  }
}
