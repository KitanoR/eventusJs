import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interface/evento.interface';
import { Observable } from 'rxjs/observable';
import { EventosService } from '../../services/eventos.service';
declare const $:any;
@Component({
  selector: 'app-miseventos',
  templateUrl: './miseventos.component.html',
  styleUrls: ['./miseventos.component.css']
})
export class MiseventosComponent implements OnInit {
  eventos: Observable<Evento[]>
  eventoSeleccionado: Evento;
  constructor(public _eventoService: EventosService) {
    let usuario: any = JSON.parse(localStorage.getItem('usuario'));
    this.eventos = this._eventoService.getMisEventos(usuario.uid);
  }

  ngOnInit() {
  }

  modalBorrar(evento: Evento){
    this.eventoSeleccionado = evento;
    $('#exampleModal').modal();
  }

  eliminarEvento(){
    this._eventoService.eliminarEvento(this.eventoSeleccionado);
    setTimeout( () => {this.cerrarModal()}, 100);
  }
  cerrarModal(){
    $('#exampleModal').modal('hide');
  }
}
