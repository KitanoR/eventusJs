import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../../../interface/comentario.interface';
import { ComentariosService } from '../../../services/comentarios.service';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input()evento: string;
  comentarios: Observable<Comentario[]>;
  forma: FormGroup;
  constructor(public _comentarioService: ComentariosService) {
    this.forma = new FormGroup({
      'contenido': new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
    this.comentarios = this._comentarioService.getComentarios(this.evento);
    console.log(this.evento, 'datos de comentarios');
  }
  comentar(){
    let comentario: Comentario;
    comentario = this.forma.value;
    comentario.evento = this.evento;
    comentario.usuario = '1';
    comentario.fecha = '12/12/2017';
    this._comentarioService.inserComentario(comentario);
    
  }
}
