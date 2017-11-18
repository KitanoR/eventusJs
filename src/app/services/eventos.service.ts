import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { Evento } from '../interface/evento.interface';
import {Http, Headers} from '@angular/http';
import { FileItem } from '../models/fire-item';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
declare const $: any;
@Injectable()
export class EventosService {
  eventoUrl: string = 'https://heroesapp-2cd04.firebaseio.com/Evento';
  private CarpetaImagenes:string = 'img';
  constructor(public db: AngularFireDatabase, public http: Http, public router: Router) {

  }
  updateEvento( evento: any){
    console.log(evento, 'edtar')
    let eventoRef = this.db.list('Evento');
    eventoRef.update(evento.key, evento);
    setTimeout(() => {
      $('#modalGuardar').modal('hide');
      $('.modal-backdrop').fadeOut("fast");
      this.router.navigate(['/miseventos']);
    },1500);

  }
  insertEvento(evento: Evento){
    let eventRef = this.db.list('Evento').push(evento);
    setTimeout(() => {
      $('#modalGuardar').modal('hide');
      this.router.navigate(['/miseventos']);
    },200);
  }
  ingresarEvento( archivos: FileItem[], evento: Evento, editar?: boolean ){
    console.log(archivos);
    let storageRef = firebase.storage().ref();
    for( let item of archivos){
      item.estaSubiendo = true;
      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CarpetaImagenes}/${item.nombreArchivo}`).put(item.archivo);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: any)=> item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes)*100,//el estado de la subida del archivo
        ( error ) => console.error("error al subir ",error),//
        () =>{
          item.url = uploadTask.snapshot.downloadURL;
          item.estaSubiendo = false;
          evento.imagen = item.url;
          if(editar){
            this.updateEvento(evento);
          }
          else {
            this.insertEvento(evento);
          }
        }
      )
      return;
    }
  }

  eliminarEvento(evento: any){
    let eventoRef = this.db.list('Evento').remove(evento.key);
  }

  getDetalleEvento(id:string){
    let url = `${this.eventoUrl}/${id}.json`;
    return this.http.get(url).map(
      res => res.json()
    );
  }
  getAllEventos(){
    return this.db.list(`Evento`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).mergeMap((tours:any) => {
      return Observable.forkJoin(
        tours.map((tour:any) => this.db
          .object(`/Usuarios/${tour.organizar}/nombre`).valueChanges().first()
        ),
        (...values) => {
          tours.forEach((tour, index) => { tour.Proveedor = values[index]; });
          return tours;
        }
      );
    });
  }
  getTopEventos(){

  }
  getCategoría(){
    return this.db.list('Categoria').valueChanges();
  }
  getMisEventos(key$: string){
    return this.db.list(`Evento`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).mergeMap((tours:any) => {
      return Observable.forkJoin(
        tours.map((tour:any) => this.db
          .object(`/Usuarios/${tour.organizador}/nombre`).valueChanges().first()
        ),
        (...values) => {
          tours.filter(b => b.organizador == key$).forEach((tour, index) => { tour.Proveedor = values[index];
          });
          return tours.filter(b => b.organizador == key$);
        }
      );
    });
  }
  getMisPartipaciones(key$: string){
    return this.db.list(`Participaciones`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).mergeMap((tours:any) => {
      return Observable.forkJoin(
        tours.map((tour:any) => this.db
          .object(`/Usuarios/${tour.usuario}/nombre`).valueChanges().first()
        ),
        (...values) => {
          tours.filter(b => b.usuario == key$).forEach((tour, index) => { tour.nombreUsuario = values[index];
          });
          return tours.filter(b => b.usuario == key$);
        }
      );
    });
  }
  insertMisPartipaciones(evento:any){
    let usuario: any = JSON.parse(localStorage.getItem('usuario'));
    let data = {
      usuario: usuario.uid,
      evento: evento
    }
    let participaciones = this.db.list('Participaciones').push(data);
  }
  salirParticipacion(id){
    this.db.list('Participaciones').remove(id);

  }

}
