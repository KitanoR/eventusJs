import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evento } from '../../../interface/evento.interface';
import { EventosService } from '../../../services/eventos.service';
import { FileItem } from '../../../models/fire-item';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editarevento',
  templateUrl: './editarevento.component.html',
  styleUrls: ['./editarevento.component.css']
})
export class EditareventoComponent implements OnInit {
  forma: FormGroup;
  idEvento: string;
  // variables para la imagen
  estaSobreDropZone: boolean = false;
  permiteCargar: boolean = true;
  archivos: FileItem[] = [];

  gratis: boolean = true;
  precio: number;

  editarFoto: boolean = false;
  mostrarFoto: boolean = false;
  categorias: Observable<any[]>
  evento: any;
  constructor(public _eventoService: EventosService, public activate: ActivatedRoute, public router: Router) {
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
    this.activate.params.map(par => par.id).subscribe( p =>{
      this.idEvento = p;
       this._eventoService.getDetalleEvento(p).subscribe( data => {
         this.mostrarFoto = true;
         this.evento = data;
         console.log(data,'data');
         this.forma = new FormGroup({
           'nombre': new FormControl(data.nombre, [Validators.required, Validators.minLength(5)]),
           'sumario': new FormControl(data.sumario, Validators.required),
           'contenido': new FormControl(data.contenido, Validators.required),
           'lugar': new FormControl(data.lugar, Validators.required),
           'categoria': new FormControl(data.categoria, Validators.required),
           'inicio': new FormControl(data.inicio, Validators.required),
           'final': new FormControl(data.final, Validators.required),
           'gratis': new FormControl(data.gratis),
           'precio': new FormControl(data.precio, Validators.pattern('[0-9]*')),
         });
      });
    });
    this.categorias = this._eventoService.getCategoría();

  }

  ngOnInit() {
  }
  editarEvento(){
    let evento: any;
    evento = this.forma.value;
    evento.key =  this.idEvento;
    if(evento.precio > 0){
      evento.gratis = false;
    }
    if(this.editarFoto){
      this._eventoService.ingresarEvento(this.archivos, evento,true);
    }
    else{
      evento.imagen = this.evento.imagen;
      this._eventoService.updateEvento(evento);
    }
  }

}
