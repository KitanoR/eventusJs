import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../interface/evento.interface';
import { Comentario } from '../../../interface/comentario.interface';
import {Observable} from 'rxjs/Observable';
import { EventosService } from '../../../services/eventos.service';
import { CanguardService } from '../../../services/canguard.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
declare const $:any;
@Component({
  selector: 'app-detalleslista',
  templateUrl: './detalleslista.component.html',
  styleUrls: ['./detalleslista.component.css']
})
export class DetalleslistaComponent implements OnInit {
  idEvento: string = null;
  evento: Evento;
  comentarios: Observable<Comentario[]>;
  logueado: boolean = false;
  constructor(public activateRoute: ActivatedRoute,
              public guard: CanguardService,
              public router: Router, public _eventosService: EventosService,
              public _comentarioService: ComentariosService) {
    this.logueado = this.guard.isLoggedIn();
    this.activateRoute.params.map(par => par.id).subscribe( p => {
      this.idEvento = p;
      this.comentarios = this._comentarioService.getComentarios(this.idEvento);
      console.log(this.comentarios, 'datos de comentarios');
      this._eventosService.getDetalleEvento(this.idEvento).subscribe(
        r => {
          this.evento = r;
        }
      );

    });
  }

  ngOnInit() {
  }
  unirse(){
    $('#modalGuardar').modal();
    this._eventosService.insertMisPartipaciones(this.evento);
    setTimeout(() => {
      $('#modalGuardar').modal('hide');
      this.router.navigate(['/participando']);
    },2000);
  }
}
