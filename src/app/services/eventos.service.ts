import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { Evento } from '../interface/evento.interface';
import {Http, Headers} from '@angular/http';
import { FileItem } from '../models/fire-item';
import * as firebase from 'firebase';

@Injectable()
export class EventosService {
  eventoUrl: string = 'https://heroesapp-2cd04.firebaseio.com/Evento';
  private CarpetaImagenes:string = 'img';
  constructor(public db: AngularFireDatabase, public http: Http) {

  }
  updateEvento(id: string, evento: Evento){
    let eventoRef = this.db.list('Evento');
    eventoRef.update(id, evento);
  }
  insertEvento(evento: Evento){
    let eventRef = this.db.list('Evento').push(evento);
  }
  ingresarEvento( archivos: FileItem[], evento: Evento ){
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
          this.insertEvento(evento);
        }
      )
      return;
    }
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

}
