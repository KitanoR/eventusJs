import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import { Evento } from '../../interface/evento.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<Evento[]>;

  constructor(public db: AngularFireDatabase) {
    this.items = this.db.list(`Evento`).valueChanges();
  }

  ngOnInit() {
  }

}
