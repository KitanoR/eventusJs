/**
 * Created by PC on 9/11/2017.
 */
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MiseventosComponent } from './components/miseventos/miseventos.component';
import { ParticipandoComponent } from './components/participando/participando.component';
import { DetalleslistaComponent } from './components/listar/detalleslista/detalleslista.component';
import { NuevoeventoComponent } from './components/miseventos/nuevoevento/nuevoevento.component';
import { EditareventoComponent } from './components/miseventos/editarevento/editarevento.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { CanactivateService } from './services/canactivate.service';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'miseventos', component: MiseventosComponent,
  canActivate: [CanactivateService]},
  { path: 'participando', component: ParticipandoComponent,
  canActivate: [CanactivateService]},
  { path: 'detalle/:id', component: DetalleslistaComponent },
  { path: 'nuevo', component: NuevoeventoComponent,
  canActivate: [CanactivateService]},
  { path: 'editarevento/:id', component: EditareventoComponent,
  canActivate: [CanactivateService]},
  { path: 'registro', component: RegistroComponent },
  { path: '**' , pathMatch: 'full' , redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(app_routes);
