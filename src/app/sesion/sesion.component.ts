import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { responseValidarUsuario } from '../models/responseValidarUsuario';

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
  spinnerVisible: boolean = false; // Inicialmente visible
  formularioVisible: boolean = true; // Inicialmente visible
  messages: Message[] = [];
  cities: City[] | undefined;
  selectTipoDocumento: City | undefined;
  responseValidarUsuario!: responseValidarUsuario;
  public form: FormGroup = this.formBuilder.group({
    cedula: ['', [Validators.required]],
    tipoDocumento: ['', [Validators.required]],
  });
  errorMesage = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.cities = [
      { name: '', code: '' },
      { name: 'CC', code: 'CC' },
      { name: 'NIT', code: 'NIT' },
      { name: 'PASAPORTE', code: 'PASAPORTE' },
      { name: 'CE', code: 'CE' },
    ];
  }

  volverInicio() {
    this.router.navigate(['/login']);
  }

  mostrarSpinner(valor: boolean) {
    if (valor) {
      this.formularioVisible = false;
      this.spinnerVisible = true;
    } else {
      this.formularioVisible = true;
      this.spinnerVisible = false;
    }
  }

  validarUsuario() {
    this.messages = [];
    if (this.form.valid) {
      this.mostrarSpinner(true);
      this.selectTipoDocumento = this.form.get('tipoDocumento')?.value;  
      this.service
        .validarUsuario(
          this.selectTipoDocumento?.name + this.form.get('cedula')?.value
        )
        .subscribe((response) => {
          this.responseValidarUsuario = response;
          console.log(this.responseValidarUsuario);
          if (this.responseValidarUsuario.mensaje == '1') {
            this.messages = [
              {
                severity: 'success',
                summary: 'El Usuario Logeado',
                detail: '',
              },
            ];
            localStorage.setItem(
              'idUsuario',
              this.selectTipoDocumento?.name + this.form.get('cedula')?.value
            );
            localStorage.setItem(
              'infoUsuario',
              JSON.stringify(this.responseValidarUsuario)
            );
            this.router.navigate(['/botones']);
          } else {
            this.messages = [
              {
                severity: 'info',
                summary: 'El Usuario No esta Registrado',
                detail: '',
              },
            ];
          }
          this.mostrarSpinner(false);
        });
    } else {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Digite los Campos Requeridos',
          detail: '',
        },
      ];
    }

    // this.mostrarOcultarSpinner();
    // this.responseCrearPersona = JSON.parse(response);
    // this.messages = [
    //   {
    //     severity: 'success',
    //     summary: 'El Usuario ya se Registro Correctamente',
    //     detail: '',
    //   },
    // ];
    // if ((this.responseCrearPersona.mensaje = '1')) {
    //   this.messages = [
    //     {
    //       severity: 'info',
    //       summary: 'El Usuario ya se Encuentra Registrado',
    //       detail: '',
    //     },
    //   ];
    // } else {
    //   this.messages = [
    //     {
    //       severity: 'success',
    //       summary: 'El Usuario ya se Registro Correctamente',
    //       detail: '',
    //     },
    //   ];
    // }
    // setTimeout(() => {
    //   this.router.navigate(['/botones']);
    // }, 3000);

    // setTimeout(() => {
    //   this.formularioVisible = !this.formularioVisible;
    //   this.spinnerVisible = !this.spinnerVisible;
    //   this.messages = [
    //     { severity: 'error', summary: 'Error Iniciando Sesion', detail: '' },
    //     {
    //       severity: 'info',
    //       summary: 'El Usuario No se Encuentra Registrado',
    //       detail: '',
    //     },
    //     {
    //       severity: 'warn',
    //       summary: 'Digite los Campos Requeridos',
    //       detail: '',
    //     },
    //   ];
    // }, 3000);
  }
}
