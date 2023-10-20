import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    tipoDocumento: [''],
  });
  cities: City[] | undefined;

  selectedCity: City | undefined;

  selectTipoDocumento: City | undefined;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cities = [
      { name: 'CC', code: 'CC' },
      { name: 'NIT', code: 'NIT' },
      { name: 'PASAPORTE', code: 'PASAPORTE' },
      { name: 'CE', code: 'CE' },
    ];
  }

  volverInicio() {
    this.router.navigate(['/login']);
  }

  registroUsuario() {
    if (this.form.valid) {
      console.log('nombres: ' + this.form.get('nombres')?.value);
      console.log('apellidos: ' + this.form.get('apellidos')?.value);
      console.log('cedula: ' + this.form.get('cedula')?.value);
      console.log(
        'tipoDocumento: ' +
          JSON.stringify(this.form.get('tipoDocumento')?.value)
      );
      console.log(
        'tipoDocumento: ' + this.form.get('tipoDocumento.code')?.value
      );

      this.selectTipoDocumento = this.form.get('tipoDocumento')?.value;
      console.log('Name2: '+this.selectTipoDocumento?.name);
      
    }
  }
}
