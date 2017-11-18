import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../../../interface/comentario.interface';
import { ComentariosService } from '../../../services/comentarios.service';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CanguardService } from '../../../services/canguard.service';

declare const $: any;
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input()evento: string;
  comentarios: Observable<Comentario[]>;
  forma: FormGroup;
  formaEditar: FormGroup;
  comentarioSeleccionado: Comentario;
  logueado: boolean = false;
  constructor(public _comentarioService: ComentariosService , public guard: CanguardService) {
    this.logueado = this.guard.isLoggedIn();
    this.forma = new FormGroup({
      'contenido': new FormControl('', Validators.required)
    });
    this.formaEditar = new FormGroup({
      'contenido': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.comentarios = this._comentarioService.getComentarios(this.evento);
  }
  comentar(){
    let comentario: Comentario;
    comentario = this.forma.value;
    comentario.evento = this.evento;
    comentario.usuario = '1';
    comentario.fecha = '12/12/2017';
    this.forma.reset({contenido: ''});
    this._comentarioService.inserComentario(comentario);

  }
  eliminarComentario(id: string){
    this.forma.reset({contenido: ''});
    this._comentarioService.eliminarComentario(id);
  }
  abrirModalEditar(comentario: Comentario){
      this.comentarioSeleccionado = comentario;
      $('#exampleModal').modal();
      this.formaEditar.setValue({contenido: comentario.contenido});
  }
  editarComentario(){
    this.comentarioSeleccionado.contenido = this.formaEditar.value.contenido;
    this._comentarioService.editarComentario(this.comentarioSeleccionado);
    setTimeout(() => {this.cerrarModal()} , 100);
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
}
