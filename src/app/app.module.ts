import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { app_routing } from './routes.app';

// importación de componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MiseventosComponent } from './components/miseventos/miseventos.component';
import { ParticipandoComponent } from './components/participando/participando.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { NuevoeventoComponent } from './components/miseventos/nuevoevento/nuevoevento.component';
import { ListarComponent } from './components/listar/listar.component';
import { DetalleslistaComponent } from './components/listar/detalleslista/detalleslista.component';
import { ComentariosComponent } from './components/listar/comentarios/comentarios.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { JumbotronComponent } from './components/shared/jumbotron/jumbotron.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

// configuración firebase
import { Firebase } from './models/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// Services
import { AuthService } from './services/auth.service';
import { CanguardService } from './services/canguard.service';
import { CanactivateService } from './services/canactivate.service';
import { ComentariosService } from './services/comentarios.service';
import { EventosService } from './services/eventos.service';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { EditareventoComponent } from './components/miseventos/editarevento/editarevento.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MiseventosComponent,
    ParticipandoComponent,
    CarouselComponent,
    NuevoeventoComponent,
    ListarComponent,
    DetalleslistaComponent,
    ComentariosComponent,
    LoginComponent,
    RegistroComponent,
    JumbotronComponent,
    UsuariosComponent,
    NgDropFilesDirective,
    EditareventoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(Firebase.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    app_routing
  ],
  providers: [
    AuthService,
    CanactivateService,
    EventosService,
    ComentariosService,
    CanguardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
