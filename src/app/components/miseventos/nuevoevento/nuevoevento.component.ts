import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evento } from '../../../interface/evento.interface';
import { EventosService } from '../../../services/eventos.service';
import { FileItem } from '../../../models/fire-item';
import { Observable } from 'rxjs/observable';
import {Usuario} from '../../../interface/usuario.interface';

declare const $: any;
@Component({
  selector: 'app-nuevoevento',
  templateUrl: './nuevoevento.component.html',
  styleUrls: ['./nuevoevento.component.css']
})
export class NuevoeventoComponent implements OnInit {
  forma: FormGroup;

  // variables para la imagen
  estaSobreDropZone: boolean = false;
  permiteCargar: boolean = true;
  archivos: FileItem[] = [];

  gratis: boolean = true;
  precio: number;
  categorias: Observable<any[]>
  constructor(public _eventoService: EventosService) {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'sumario': new FormControl('', Validators.required),
      'contenido': new FormControl('', Validators.required),
      'lugar': new FormControl('', Validators.required),
      'categoria': new FormControl('', Validators.required),
      'inicio': new FormControl('', Validators.required),
      'final': new FormControl('', Validators.required),
      'gratis': new FormControl(''),
      'precio': new FormControl('', Validators.pattern('[0-9]*')),
    });
    this.categorias = this._eventoService.getCategoría();
  } // fin del constructor

  ngOnInit() {
  }
  guardarEvento(){
    $('#modalGuardar').modal();
    let usuario: any;
    usuario = JSON.parse(localStorage.getItem('usuario')) ;
    this.permiteCargar = false;
    let evento: Evento;
    evento = this.forma.value;
    evento.organizador  = usuario.uid;
    if(evento.precio > 0){
      evento.gratis = false;
    }
    this._eventoService.ingresarEvento(this.archivos, evento);
  }

}
