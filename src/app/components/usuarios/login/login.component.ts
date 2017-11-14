import { Component, OnInit, OnDestroy , NgZone} from '@angular/core';
import { Usuario } from '../../../interface/usuario.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  forma: FormGroup; //El formulario
  usuario: Usuario = {
    correo: '',
    password: ''
  };

  noExiste: boolean = false;
  loading:boolean = false;
  loadingGoogle: boolean = false;
  loadingFacebook: boolean = false;
  incorrecto:boolean = false;
  estado:number = -1;
  imagenUsuario: string = "";
  constructor(private  _usuarioService: AuthService, private router: Router, private zone: NgZone) {
    //Inicialización del formulario
    this.forma = new FormGroup({
      'correo': new FormControl(''),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    // Fin Inicialización formulario

    // Seteo de Validators Correo
    this.forma.controls['correo'].setValidators([
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]);
    //  Fin Seteo de Validators Correo
  }

  /*******************************Fin Constructor*************************************************/

  ngOnInit() {

  }
  ngOnDestroy(){
  }

  /************************************* Métodos ************************************************/

}
