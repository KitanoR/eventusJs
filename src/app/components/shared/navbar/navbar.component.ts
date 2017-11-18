import { Component, OnInit } from '@angular/core';
import { CanguardService } from '../../../services/canguard.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logueado: boolean = false;
  constructor(public guard: CanguardService) {
    this.logueado = this.guard.isLoggedIn();
  }

  ngOnInit() {
  }
  cerrarSesion(){
    this.logueado = false;
    localStorage.clear();
  }

}
