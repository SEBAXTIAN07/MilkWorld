import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { Message } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { crearPersona } from '../models/crearPersona';
import { responseCrearPersona } from '../models/responseCrearPersona';
import { responseValidarUsuario } from '../models/responseValidarUsuario';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  cities: City[] | undefined;
  selectedCity: City | undefined;
  selectTipoDocumento: City | undefined;
  formularioVisible: boolean = true;
  spinnerVisible: boolean = false;
  messages: Message[] = [];
  crearPersona!: crearPersona;
  responseCrearPersona!: responseCrearPersona;
  responseValidarUsuario!: responseValidarUsuario;

  public form: FormGroup = this.formBuilder.group({
    numero_documento: ['', [Validators.required]],
    tipo_documento: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    // this.service.validarUsuarioSistema();
    this.cities = [
      { name: '', code: '' },
      { name: 'CC', code: 'CC' },
      { name: 'NIT', code: 'NIT' },
      { name: 'PASAPORTE', code: 'PASAPORTE' },
      { name: 'CE', code: 'CE' },
    ];

    this.crearPersona = {
      tipo_documento: 'CC',
      numero_documento: 1073704700,
      nombres: 'Sebastian',
      apellidos: 'Forero Sanchez',
    };
  }

  volverInicio() {
    this.router.navigate(['/login']);
  }

  registroUsuario2() {
    this.selectTipoDocumento = this.form.get('tipo_documento')?.value;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  mostrarOcultarSpinner() {
    this.formularioVisible = !this.formularioVisible;
    this.spinnerVisible = !this.spinnerVisible;
  }

  registrarUsuario() {
    try {
      this.mostrarOcultarSpinner();
      this.messages = [];
      if (this.form.valid) {
        this.selectTipoDocumento = this.form.get('tipo_documento')?.value;
        this.crearPersona.tipo_documento = this.selectTipoDocumento?.code!;
        this.crearPersona.numero_documento = parseInt(
          this.form.get('numero_documento')?.value
        );
        this.crearPersona.nombres = this.form.get('nombres')?.value;
        this.crearPersona.apellidos = this.form.get('apellidos')?.value;
        this.service
          .registrarUsuario(this.crearPersona)
          .subscribe((response) => {
            this.mostrarOcultarSpinner();
            this.responseCrearPersona = JSON.parse(response);
            if (this.responseCrearPersona.mensaje == '1') {
              this.messages = [
                {
                  severity: 'info',
                  summary: 'El Usuario ya se Encuentra Registrado',
                  detail: '',
                },
              ];
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              this.messages = [
                {
                  severity: 'success',
                  summary: 'El Usuario ya se Registro Correctamente',
                  detail: '',
                },
              ];
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            this.validarUsuario();
            setTimeout(() => {
              this.router.navigate(['/botones']);
            }, 3000);
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
    } catch (error) {
      this.mostrarOcultarSpinner();
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

  validarUsuario() {
    this.service
      .validarUsuario(
        this.selectTipoDocumento?.name +
          this.form.get('numero_documento')?.value
      )
      .subscribe((response) => {
        this.responseValidarUsuario = response;
        if (this.responseValidarUsuario.mensaje == '1') {
          localStorage.setItem(
            'idUsuario',
            this.selectTipoDocumento?.name +
              this.form.get('numero_documento')?.value
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
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
}
