import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { app_routing } from './routes.app';

// importación de componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MiseventosComponent } from './components/miseventos/miseventos.component';
import { ParticipandoComponent } from './components/participando/participando.component';

// configuración firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Services
import { AuthService } from './services/auth.service';
import { CanactivateService } from './services/canactivate.service';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MiseventosComponent,
    ParticipandoComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    app_routing
  ],
  providers: [
    AuthService,
    CanactivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
