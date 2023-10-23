import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css'],
})
export class SesionComponent {
  public form: FormGroup = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    tipoDocumento: ['', [Validators.required]],
  });
  spinnerVisible: boolean = false; // Inicialmente visible
  formularioVisible: boolean = true; // Inicialmente visible
  messages: Message[] = [];
  cities: City[] | undefined;


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

  mostrarSpinner() {
    this.formularioVisible = !this.formularioVisible;
    this.spinnerVisible = !this.spinnerVisible;
    setTimeout(() => {
      this.formularioVisible = !this.formularioVisible;
      this.spinnerVisible = !this.spinnerVisible;
      this.messages = [
        { severity: 'error', summary: 'Error Iniciando Sesion', detail: '' },
        { severity: 'info', summary: 'El Usuario No se Encuentra Registrado', detail: '' },
        { severity: 'warn', summary: 'Digite los Campos Requeridos', detail: '' },
      ];
    }, 3000);
  }
}
