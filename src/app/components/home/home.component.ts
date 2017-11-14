import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import { Evento } from '../../interface/evento.interface';
import {Http, Headers} from '@angular/http';
import { EventosService } from '../../services/eventos.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any>;

  constructor(public db: AngularFireDatabase, public _eventoServicio: EventosService) {
    this.items = this._eventoServicio.getAllEventos();

  }
  ngOnInit() {
  }
}
