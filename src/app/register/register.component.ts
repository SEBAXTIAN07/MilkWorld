import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { Message } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { crearPersona } from '../models/crearPersona';
import { responseCrearPersona } from '../models/responseCrearPersona';

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
  public form: FormGroup = this.formBuilder.group({
    numero_documento: ['', [Validators.required]],
    tipo_documento: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
  });
  cities: City[] | undefined;
  selectedCity: City | undefined;
  selectTipoDocumento: City | undefined;
  formularioVisible: boolean = true;
  spinnerVisible: boolean = false;
  messages: Message[] = [];

  crearPersona!: crearPersona;
  responseCrearPersona!: responseCrearPersona;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
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

    this.crearPersona = {
      tipo_documento: 'CC',
      numero_documento: 1073704700,
      nombres: 'Sebastian',
      apellidos: 'Forero Sanchez',
    };

    console.log(this.crearPersona);
  }

  volverInicio() {
    this.router.navigate(['/login']);
  }

  registroUsuario2() {
    console.log('nombres: ' + this.form.get('nombres')?.value);
    console.log('apellidos: ' + this.form.get('apellidos')?.value);
    console.log('cedula: ' + this.form.get('cedula')?.value);
    console.log(
      'tipo_documento: ' +
        JSON.stringify(this.form.get('tipo_documento')?.value)
    );
    console.log(
      'tipo_documento: ' + this.form.get('tipo_documento.code')?.value
    );

    this.selectTipoDocumento = this.form.get('tipo_documento')?.value;
    console.log('Name2: ' + this.selectTipoDocumento?.name);
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
        console.log(this.crearPersona);
        this.service
          .registrarUsuario(this.crearPersona)
          .subscribe((response) => {
            this.mostrarOcultarSpinner();
            this.responseCrearPersona = JSON.parse(response);
            console.log(response);
            console.log(response.mensaje);
            console.log(response.numeroTransaccion);
            console.log(response);
            console.log('P: ' + this.responseCrearPersona.mensaje);
            this.messages = [
              {
                severity: 'success',
                summary: 'El Usuario ya se Registro Correctamente',
                detail: '',
              },
            ];
            if ((this.responseCrearPersona.mensaje = '1')) {
              this.messages = [
                {
                  severity: 'info',
                  summary: 'El Usuario ya se Encuentra Registrado',
                  detail: '',
                },
              ];
            } else {
              this.messages = [
                {
                  severity: 'success',
                  summary: 'El Usuario ya se Registro Correctamente',
                  detail: '',
                },
              ];
            }
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
    }
    //TODO: Comienza el Servicio

    // setTimeout(() => {
    //   this.formularioVisible = !this.formularioVisible;
    //   this.spinnerVisible = !this.spinnerVisible;
    //   this.messages = [
    //     { severity: 'error', summary: 'Error Creando el Usuario', detail: '' },
    //     {
    //       severity: 'info',
    //       summary: 'El Usuario ya se Encuentra Registrado',
    //       detail: '',
    //     },
    //     {
    //       severity: 'warn',
    //       summary: 'Digite los Campos Requeridos',
    //       detail: '',
    //     },
    //   ];
    // }, 3000);
    // this.formularioVisible = !this.formularioVisible;
    // this.spinnerVisible = !this.spinnerVisible;
  }
}
