import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { respuestaGenericaActividades } from '../models/respuestaGenericaActividades';
import { objetoActividades } from '../models/objetoActividades';
import { actividadConsumo } from '../models/actividadConsumo';
import { listarActividadConsumo } from '../models/listarActividadConsumo';
import { Potrero } from '../models/potrero';
import { finca } from '../models/finca';

@Component({
  selector: 'app-hidrica',
  templateUrl: './hidrica.component.html',
  styleUrls: ['./hidrica.component.scss'],
  providers: [MessageService],
})
export class HidricaComponent implements OnInit {
  messages: Message[] = [];
  fechaHoy!: Date;
  objetoActividades!: [objetoActividades];
  actividadConsumo!: actividadConsumo[];
  respuestaGenericaActividades!: respuestaGenericaActividades;
  seleccionarPotrero!: [Potrero];
  spinnerVisible: boolean = false;
  formularioVisible1: boolean = true;
  formularioVisible2: boolean = false;
  fechaInicioAjustado: string = '';
  fechaFinalAjustado: string = '';
  finca: finca = {
    id_persona: '',
    codigoFinca: '',
    nombreFinca: '',
    numeroTelefono: 0,
    codigoDepartamento: 0,
    codigoMunicipio: 0,
    nombreVereda: '',
    tipoOrdeno: '',
    numeroOrdenoDiario: 0,
    areaTotal: 0,
    usoSuplemento: '',
    potreros: [
      {
        nombrePotrero: '',
        areaPotrero: 0,
        capacidadMaximaForraje: 0,
        capacidadMaximaAgua: 0,
        cupoMaximoAnimales: 0,
        codigoPasto: 0,
        codigoFinca: '',
      },
    ],
  };
  public form: FormGroup = this.formBuilder.group({
    potrero: ['', [Validators.required]],
    fechaInicial: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
  });

  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.fechaHoy = new Date();
  }

  ngOnInit(): void {
    this.service.validarUsuarioSistema();
    this.listarPotrero();
  }

  listarPotrero() {
    this.finca = JSON.parse(localStorage.getItem('infoFinca')!);
    this.seleccionarPotrero = this.finca.potreros;
  }

  listarActividades() {
    this.mostrarSpinner(true);
    this.formularioVisible2 = false;

    if (!this.form.valid) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Valide Los Campos',
          detail: '',
        },
      ];
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.mostrarSpinner(false);
      return;
    }

    const potrero = this.form.get('potrero')?.value;
    const fechaInicio = this.form.get('fechaInicial')?.value;

    if (fechaInicio) {
      const fecha = new Date(fechaInicio);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.fechaInicioAjustado = año + '-' + mes + '-' + dia;
    }
    const fechaFinal = this.form.get('fechaFinal')?.value;

    if (fechaFinal) {
      const fecha = new Date(fechaFinal);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.fechaFinalAjustado = año + '-' + mes + '-' + dia;
    }

    this.service
      .listarActividades(
        this.fechaInicioAjustado,
        potrero.codigoPotrero,
        this.fechaFinalAjustado
      )
      .subscribe((response) => {
        this.respuestaGenericaActividades = response;
        this.objetoActividades =
          this.respuestaGenericaActividades.objeto.listadoActividades;
        this.objetoActividades.reverse();
        this.mostrarSpinner(false);

        if (this.objetoActividades.length <= 0) {
          this.messages = [
            {
              severity: 'info',
              summary:
                'El Potrero no Contiene Actividades en el Rango de Fecha',
              detail: '',
            },
          ];
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        this.messages = [
          {
            severity: 'success',
            summary: 'Consulta Exitosa',
            detail: '',
          },
        ];
        this.formularioVisible2 = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  getObjectKeys(obj: any = []): string[] {
    return Object.values(obj);
  }

  mostrarSpinner(valor: boolean) {
    if (valor) {
      this.formularioVisible1 = false;
      this.spinnerVisible = true;
    } else {
      this.formularioVisible1 = true;
      this.spinnerVisible = false;
    }
  }
}
