import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/Rx';

@Injectable()
export class ComentariosService {

  constructor(public db: AngularFireDatabase, public http: Http, public afs: AngularFirestore) {

  }
  getComentarios(id: string){
    return this.db.list(`Comentarios`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).mergeMap((tours:any) => {
      let comentarios: any;


      return Observable.forkJoin(

        tours.map((tour:any) => this.db
          .object(`/Usuarios/${tour.Usuario}/nombre`).valueChanges().first()
        ),
        (...values) => {
          tours.filter(b => b.evento == id).forEach((tour, index) => {
            tour.usuarioNombre = values[index];
          });
          return tours.filter(b => b.evento == id);
        }
      );
    });

  }
  inserComentario(comentario:any){
    console.log(comentario, 'Comentario nuevo');
    let comentarioRef = this.db.list('Comentarios').push(comentario);
  }

}
