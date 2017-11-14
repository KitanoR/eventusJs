/**
 * Created by PC on 9/11/2017.
 */
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MiseventosComponent } from './components/miseventos/miseventos.component';
import { ParticipandoComponent } from './components/participando/participando.component';
import { DetalleslistaComponent } from './components/listar/detalleslista/detalleslista.component';
import { NuevoeventoComponent } from './components/miseventos/nuevoevento/nuevoevento.component';
const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'miseventos', component: MiseventosComponent },
  { path: 'participando', component: ParticipandoComponent },
  { path: 'detalle/:id', component: DetalleslistaComponent },
  { path: 'nuevo', component: NuevoeventoComponent },
  { path: '**' , pathMatch: 'full' , redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes);
