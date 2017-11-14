import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../interface/evento.interface';
import { Comentario } from '../../../interface/comentario.interface';
import {Observable} from 'rxjs/Observable';
import { EventosService } from '../../../services/eventos.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-detalleslista',
  templateUrl: './detalleslista.component.html',
  styleUrls: ['./detalleslista.component.css']
})
export class DetalleslistaComponent implements OnInit {
  idEvento: string = null;
  evento: Evento;
  comentarios: Observable<Comentario[]>;
  constructor(public activateRoute: ActivatedRoute, public router: Router, public _eventosService: EventosService, public _comentarioService: ComentariosService) {

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

}
