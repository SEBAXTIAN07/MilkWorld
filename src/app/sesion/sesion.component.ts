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
  spinnerVisible: boolean = false; 
  formularioVisible: boolean = true; 
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
          if (this.responseValidarUsuario.mensaje == '1') {
            this.messages = [
              {
                severity: 'success',
                summary: 'Iniciado Sesión',
                detail: '',
              },
            ];
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                summary: 'El Usuario No está Registrado',
                detail: '',
              },
            ];
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }    
  }
}
