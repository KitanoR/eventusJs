import { Component, OnInit , NgZone} from '@angular/core';
import { Usuario } from '../../../interface/usuario.interface';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  newUser: boolean = true; // to toggle login or signup form
  passReset: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, public router: Router) { }

  ngOnInit() {
    this.buildForm();

  }


  toggleForm(): void {
    this.newUser = !this.newUser;
  }
  signup(): void {
    let data = this.userForm.value
    this.auth.emailSignUp(data.email, data.password);
  }
  login(): void {
    let data = this.userForm.value
    this.auth.emailLogin(data.email, data.password)
      .then(() => {
        this.router.navigate(['/miseventos']);
        window.location.reload();
      });
  }
  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true)
  }
  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }
  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required':      'Correo es requerido.',
      'email':         'Debe ser un correo válido'
    },
    'password': {
      'required':      'La contraseña es requerida.',
      'pattern':       'Debe tener al menos una letra y un número.',
      'minlength':     'Debe tener más de 4 letras.',
      'maxlength':     'No debe ser menor de 40 letras.',
    }
  };

  /************************************* Métodos ************************************************/

}
