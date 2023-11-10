import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { registroActividades } from '../models/registroActividades';
import { animalCalculadoDTOS } from '../models/animalCalculadoDTOS';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finca } from '../models/finca';
import { Potrero } from '../models/potrero';
import { potreroCodigo } from '../models/potreroCodigo';
import { crearActividades } from '../models/crearActividades';
import { responseGenerico } from '../models/responseGenerico';
import { Router } from '@angular/router';
interface Column {
  field: string;
  header: string;
}

export interface Product {
  id?: string;
  name?: string;
}
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
  providers: [MessageService],
})
export class ActividadesComponent implements OnInit {
  products!: Product[];
  fechaHoy!: Date;
  cols!: Column[];
  items: MenuItem[] = [];
  registroActividades!: registroActividades;
  seleccionarActividades!: [animalCalculadoDTOS];
  seleccionarPotrero!: [Potrero];
  consultaActividad!: potreroCodigo;
  formularioVisible1: boolean = true;
  formularioVisible2: boolean = false;
  formularioVisible3: boolean = false;
  advertenciaHuellaVerde1: boolean = false;
  advertenciaHuellaVerde2: boolean = false;
  advertenciaHuellaAzul1: boolean = false;
  advertenciaHuellaAzul2: boolean = false;
  advertenciaRegistroLeche: boolean = false;
  spinnerVisible: boolean = false;
  campoLeche: boolean = false;
  responseGenerico!: responseGenerico;
  messages: Message[] = [];
  crearActividades: crearActividades = {
    codigoPotrero: '',
    tipoActividad: '',
    fechaInicio: '',
    fechaFinal: '',
    usuarioLoggeado: '',
    actividadConsumo: {
      totalPromedioAguaCalculadaSistema: 0,
      totalPromedioLecheCalculadaSistema: 0,
      totalPromedioForrajeCalculadaSistema: 0,
      totalPromedioAgua: 0,
      totalPromedioLeche: 0,
      totalPromedioForraje: 0,
      totalConsumoDirecto: 0,
      totalConsumoServicio: 0,
      totalConsumoIndirecto: 0,
      totalAreaUsada: 0,
      totalConsumoAguaProduccion: 0,
      totalConsumoForrajeProduccion: 0,
      totalHuellaVerde: 0,
      totalHuellaAzul: 0,
      totalHuellaHidrica: 0,
    },
  };

  public form: FormGroup = this.formBuilder.group({
    nombreFinca: ['', [Validators.required]],
    tipoActividad: ['', [Validators.required]],
    nombrePotrero: ['', [Validators.required]],
    totalForrajePromedio: ['', [Validators.required]],
    areaPotrero: ['', [Validators.required]],
    litrosAproximados: ['', [Validators.required]],
    totalLechePromedio: ['', [Validators.required]],
    consumoDirecto: ['', [Validators.required]],
    consumoIndirecto: ['', [Validators.required]],
    consumoAgua: ['', [Validators.required]],
    totalAguaPromedio: ['', [Validators.required]],
    potrero: ['', [Validators.required]],
    lecheProducida: ['', [Validators.required]],
    aguaGastada: ['', [Validators.required]],
    comidaGastada: ['', [Validators.required]],
    consumoServicio: ['', [Validators.required]],
    fechaInicial: ['', [Validators.required]],
    fechaFinal: ['', [Validators.required]],
  });
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
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router
  ) {
    this.fechaHoy = new Date();
  }
  ngOnInit(): void {
    this.service.validarUsuarioSistema();
    this.form.get('totalAguaPromedio')?.disable();
    this.form.get('areaPotrero')?.disable();
    this.form.get('litrosAproximados')?.disable();
    this.finca = JSON.parse(localStorage.getItem('infoFinca')!);
    this.seleccionarPotrero = this.finca.potreros;
    this.form.get('nombreFinca')?.disable();
    this.form.get('tipoActividad')?.disable();
    this.form.get('tipoActividad')?.setValue('GENERAL');
    this.form.get('nombreFinca')?.setValue(this.finca.nombreFinca);
    this.form.get('aguaGastada')?.disable();
    this.form.get('comidaGastada')?.disable();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Nombre' },
    ];

    this.products = [
      { id: '1', name: 'Finca 1' },
      { id: '6', name: 'Finca 2' },
    ];
  }

  consultarActividad() {
    this.messages = [];
    this.formularioVisible1 = false;
    this.formularioVisible2 = false;
    this.formularioVisible3 = false;
    this.campoLeche = false;
    this.spinnerVisible = true;
    this.consultaActividad = this.form.get('potrero')?.value;
    this.service
      .consultarActividad(this.consultaActividad.codigoPotrero)
      // .consultarActividad('6001f559-35ab-404b-a730-66d998ca0c7b')
      .subscribe((response) => {
        this.form.get('nombreFinca')?.disable();
        this.registroActividades = response;
        this.form.get('nombrePotrero')?.setValue(this.finca.nombreFinca);
        this.seleccionarActividades =
          this.registroActividades.objeto.animalCalculadoDTOS;

        if (this.registroActividades.objeto.animalCalculadoDTOS.length <= 0) {
          this.messages = [
            {
              severity: 'info',
              summary: 'El Potrero No Cuenta Con Animales Registrados',
              detail: '',
            },
          ];
          this.formularioVisible1 = true;
          this.formularioVisible2 = false;
          this.spinnerVisible = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const palabraABuscar = 'lactante';
          let palabraEncontrada = false;

          this.registroActividades.objeto.animalCalculadoDTOS.forEach(
            (objeto) => {
              if (
                Object.values(objeto).some(
                  (valor) =>
                    typeof valor === 'string' && valor.includes(palabraABuscar)
                )
              ) {
                palabraEncontrada = true;
              }
            }
          );

          if (palabraEncontrada) {
            this.campoLeche = true;
          }
          this.formularioVisible1 = true;
          this.formularioVisible2 = true;
          this.spinnerVisible = false;
        }
      });
  }

  validarHuellaAzul() {
    if (
      this.registroActividades.objeto.totalAguaPromedio >
      this.form.get('consumoDirecto')?.value
    ) {
      this.advertenciaHuellaAzul2 = true;
    } else {
      this.advertenciaHuellaAzul2 = false;
    }
    const forrajemas5 = this.registroActividades.objeto.totalAguaPromedio + 5;
    if (forrajemas5 < this.form.get('consumoDirecto')?.value) {
      this.advertenciaHuellaAzul1 = true;
    } else {
      this.advertenciaHuellaAzul1 = false;
    }
    this.sumarTotalAgua();
  }
  validarHuellaVerde() {
    if (
      this.registroActividades.objeto.totalForrajePromedio >
      this.form.get('totalForrajePromedio')?.value
    ) {
      this.advertenciaHuellaVerde2 = true;
    } else {
      this.advertenciaHuellaVerde2 = false;
    }
    const forrajemas5 =
      this.registroActividades.objeto.totalForrajePromedio + 5;
    if (forrajemas5 < this.form.get('totalForrajePromedio')?.value) {
      this.advertenciaHuellaVerde1 = true;
    } else {
      this.advertenciaHuellaVerde1 = false;
    }
    const forrajeMetro = 5; //Kg por Metro(1)
    const metrosPromedio =
      this.form.get('totalForrajePromedio')?.value / forrajeMetro;
    this.form.get('areaPotrero')?.setValue(metrosPromedio);
    const LitrosAguaMetro = 6; //L por Metro(1)
    const LitrosConsumido = metrosPromedio * LitrosAguaMetro;
    this.form.get('litrosAproximados')?.setValue(LitrosConsumido);
  }
  validarProduccion() {
    const lechePorLitroAgua = 3; //Litros de Agua
    const consumoAgua =
      this.form.get('lecheProducida')?.value * lechePorLitroAgua;
    this.form.get('aguaGastada')?.setValue(consumoAgua);
    const metroPorLitroAgua = 6;
    const metroAgua = consumoAgua / metroPorLitroAgua;
    const forrajePorMetro = 25;
    const forraje = metroAgua * forrajePorMetro;
    this.form.get('comidaGastada')?.setValue(forraje);
  }

  activarTabla() {
    this.formularioVisible3 = !this.formularioVisible3;
  }

  sumarTotalAgua() {
    const suma =
      this.form.get('consumoDirecto')?.value +
      this.form.get('consumoIndirecto')?.value +
      this.form.get('consumoServicio')?.value;
    this.form.get('totalAguaPromedio')?.setValue(suma);
  }

  registrarActiviad() {
    this.mostrarSpinner(true);
    this.crearActividades.codigoPotrero = this.consultaActividad.codigoPotrero;
    this.crearActividades.tipoActividad = this.form.get('tipoActividad')?.value;
    const fechaInicio = this.form.get('fechaInicial')?.value;

    if (fechaInicio) {
      const fecha = new Date(fechaInicio);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.crearActividades.fechaInicio = año + '-' + mes + '-' + dia;
    }
    const fechaFinal = this.form.get('fechaFinal')?.value;

    if (fechaFinal) {
      const fecha = new Date(fechaFinal);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.crearActividades.fechaFinal = año + '-' + mes + '-' + dia;
    }
    const idUsuario: string | null = localStorage.getItem('idUsuario'); // Por ejemplo, una función que podría devolver un string o null
    if (idUsuario !== null) {
      this.crearActividades.usuarioLoggeado = idUsuario;
    }
    this.crearActividades.actividadConsumo.totalPromedioAguaCalculadaSistema =
      this.registroActividades.objeto.totalAguaPromedio;
    this.crearActividades.actividadConsumo.totalPromedioLecheCalculadaSistema =
      this.registroActividades.objeto.totalLechePromedio;
    this.crearActividades.actividadConsumo.totalPromedioForrajeCalculadaSistema =
      this.registroActividades.objeto.totalForrajePromedio;
    this.crearActividades.actividadConsumo.totalPromedioAgua =
      this.form.get('totalAguaPromedio')?.value;
    this.crearActividades.actividadConsumo.totalPromedioLeche =
      this.form.get('lecheProducida')?.value;
    this.crearActividades.actividadConsumo.totalPromedioForraje = this.form.get(
      'totalForrajePromedio'
    )?.value;
    this.crearActividades.actividadConsumo.totalConsumoDirecto =
      this.form.get('consumoDirecto')?.value;
    this.crearActividades.actividadConsumo.totalConsumoServicio =
      this.form.get('consumoServicio')?.value;
    this.crearActividades.actividadConsumo.totalConsumoIndirecto =
      this.form.get('consumoIndirecto')?.value;
    this.crearActividades.actividadConsumo.totalAreaUsada =
      this.form.get('areaPotrero')?.value; //Area Utilizada del Potrero
    this.crearActividades.actividadConsumo.totalConsumoAguaProduccion =
      this.form.get('aguaGastada')?.value;
    this.crearActividades.actividadConsumo.totalConsumoForrajeProduccion =
      this.form.get('comidaGastada')?.value;
    this.crearActividades.actividadConsumo.totalHuellaVerde = this.form.get(
      'totalForrajePromedio'
    )?.value;
    this.crearActividades.actividadConsumo.totalHuellaAzul =
      this.form.get('totalAguaPromedio')?.value;
    this.crearActividades.actividadConsumo.totalHuellaHidrica =
      this.form.get('lecheProducida')?.value;
    this.service
      .registrarActividad(this.crearActividades)
      .subscribe((response) => {
        this.responseGenerico = JSON.parse(response);
        if (this.responseGenerico.mensaje == '0') {
          this.mostrarSpinner(false);
          this.messages = [
            {
              severity: 'success',
              summary: 'Actividad Creada Correctamente',
              detail: '',
            },
          ];
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.form.reset();
          this.formularioVisible1 = true;
          this.formularioVisible2 = false;
          this.formularioVisible3 = false;
          this.campoLeche = false;
          this.ngOnInit();
          // setTimeout(() => {
          //   this.router.navigate(['/actividades']);
          // }, 3000);
        } else {
          this.mostrarSpinner(false);
          this.messages = [
            {
              severity: 'info',
              summary: 'Error Creando el registro',
              detail: '',
            },
          ];
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
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
