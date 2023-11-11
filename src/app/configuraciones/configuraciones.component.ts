import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { crearPasto } from '../models/crearPasto';
import { responseGenerico } from '../models/responseGenerico';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css'],
  providers: [MessageService],
})
export class ConfiguracionesComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  spinnerVariable: boolean = false;
  formularioVariable: boolean = true;
  responseGenerico!: responseGenerico;
  crearPasto: crearPasto = {
    nombrePasto: '',
    configuracionConstantes: [
      {
        nombre: '',
        descripcion: '',
        valor: 0,
      },
    ],
  };
  messages: Message[] = [];

  public form: FormGroup = this.formBuilder.group({
    nombrePasto: ['', [Validators.required]],
    AguaMetro: ['', [Validators.required]],
    forrajeMetro: ['', [Validators.required]],
  });

  crearPastoFuncion() {
    if (!this.form.valid) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Valide Los Campos',
          detail: '',
        },
      ];
      return;
    }
    this.mostrarSpinner(true);
    this.crearPasto.nombrePasto = this.form.get('nombrePasto')?.value;
    this.crearPasto.configuracionConstantes[0].nombre = 'forrajeMetro';
    this.crearPasto.configuracionConstantes[0].descripcion =
      'Valor Usado para validar cuando forraje genera 1 metro de pasto';
    this.crearPasto.configuracionConstantes[0].valor =
      this.form.get('forrajeMetro')?.value;
    let nuevoObjeto = {
      nombre: 'AguaMetro',
      descripcion:
        'Valor Usado para valida cuanta agua se usa por 1 metro de pasto',
      valor: this.form.get('AguaMetro')?.value,
    };
    this.crearPasto.configuracionConstantes.push(nuevoObjeto);

    this.service.crearPasto(this.crearPasto).subscribe((response) => {
      this.responseGenerico = JSON.parse(response);

      if (this.responseGenerico.mensaje == '0') {
        this.messages = [
          {
            severity: 'success',
            summary: 'Tipo de Pasto Creado Correctamente',
            detail: '',
          },
        ];
        this.mostrarSpinner(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.form.reset();
        return;
      }
      if (this.responseGenerico.mensaje == '1') {
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'info',
            summary: 'EL Tipo de Pasto ya se Encuentra Registrado',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  mostrarSpinner(valor: boolean) {
    if (valor) {
      this.formularioVariable = false;
      this.spinnerVariable = true;
    } else {
      this.formularioVariable = true;
      this.spinnerVariable = false;
    }
  }
}
