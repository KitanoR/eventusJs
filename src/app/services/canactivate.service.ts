import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CanguardService } from '../services/canguard.service';
@Injectable()
export class CanactivateService {

  constructor(private auth: CanguardService,
              private router: Router) { }
  canActivate(){
    if( this.auth.isLoggedIn() ){
      console.log(" el Guard Pasó! ");

      return true;
    }
    else{
      console.error("Bloqueado por el guard");
      this.router.navigate(['/home']);
      return false;
    }
  }

}
