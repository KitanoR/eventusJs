import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evento } from '../../../interface/evento.interface';
import { EventosService } from '../../../services/eventos.service';
import { FileItem } from '../../../models/fire-item';
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
  constructor(public _eventoService: EventosService) {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'sumario': new FormControl('', Validators.required),
      'contenido': new FormControl('', Validators.required),
      'lugar': new FormControl('', Validators.required),
      'inicio': new FormControl('', Validators.required),
      'final': new FormControl('', Validators.required),
      'gratis': new FormControl(''),
      'precio': new FormControl(''),
    });
  } // fin del constructor

  ngOnInit() {
  }
  guardarEvento(){

  }

}
