import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Observable } from 'rxjs/observable';
declare const  $:any;
@Component({
  selector: 'app-participando',
  templateUrl: './participando.component.html',
  styleUrls: ['./participando.component.css']
})
export class ParticipandoComponent implements OnInit {
  eventos: Observable<any[]>
  idEvento: string;
  constructor(public _eventoService: EventosService) {
    let usuario:any = JSON.parse(localStorage.getItem('usuario'));
    this.eventos = this._eventoService.getMisPartipaciones(usuario.uid);
  }

  ngOnInit() {
  }
  cerrarModal(){
    $("#exampleModal").modal('hide');
  }
  abrirModal(data:string){
    $("#exampleModal").modal();
    this.idEvento = data;
  }
  eliminar(){
    this._eventoService.salirParticipacion(this.idEvento);
    setTimeout( () => {
      this.cerrarModal()
    },100);
  }
}
