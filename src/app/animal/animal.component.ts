import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { finca } from '../models/finca';
import { Potrero } from '../models/potrero';
import { ServiceService } from '../Service/service.service';
import { responseGenerico } from '../models/responseGenerico';
import { animalesLista } from '../models/animalesLista';
import { potreroCodigo } from '../models/potreroCodigo';
import { Router } from '@angular/router';
import { animales } from '../models/animales';
import { responseListarFinca } from '../models/responseListarFinca';

interface Generica {
  nombreRaza: string;
  codigoRaza: string;
}
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
  providers: [MessageService],
})
export class AnimalComponent {
  rowIndex: number = 0;
  messages: Message[] = [];
  stpe6: boolean = false;
  Tabla: boolean = false;
  Seleccion: boolean = true;
  botonCrear: boolean = false;
  raza: Generica[] | undefined;
  responseGenerico!: responseGenerico;
  spinnerVariable: boolean = false;
  formularioVariable: boolean = true;
  boton: boolean = false;
  animalesLista: animalesLista = {
    codigoPotrero: '',
    numeroCrotal: '',
    nombreAnimal: '',
    fechaNacimiento: '',
    numeroPartos: 0,
    raza: {
      codigoRaza: 0,
      nombreRaza: '',
    },
  };

  seleccionarPotrero!: [Potrero];
  seleccionarPotreroVisualizar!: potreroCodigo;
  seleccionarAnimalesVisualizar!: animales[];
  responseValidarUsuario!: responseListarFinca;
  potreroSeleccionado!: potreroCodigo;
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
  seleccionarFincaObjeto = this.finca;

  public form: FormGroup = this.formBuilder.group({
    nombreAnimal: ['', [Validators.required]],
    potrero: ['', [Validators.required]],
    potreroVisualizar: [''],
    numeroCrotal: ['', [Validators.required]],
    fechaNacimiento: new FormControl<Date | null>(null),
    numeroPartos: ['', [Validators.required]],
    raza: ['', [Validators.required]],
  });

  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.validarUsuarioSistema();
    this.form.get('raza')?.disable();
    this.form.get('nombreAnimal')?.disable();
    this.form.get('numeroCrotal')?.disable();
    this.form.get('fechaNacimiento')?.disable();
    this.form.get('numeroPartos')?.disable();
    this.finca = JSON.parse(localStorage.getItem('infoFinca')!);
    this.seleccionarPotrero = this.finca.potreros;
    this.raza = [
      { nombreRaza: 'Armoricaide', codigoRaza: '1' },
      { nombreRaza: 'Angler', codigoRaza: '2' },
      { nombreRaza: 'Bazadaise', codigoRaza: '3' },
      { nombreRaza: 'Bearnaise', codigoRaza: '4' },
      { nombreRaza: 'Bordelaise', codigoRaza: '5' },
      { nombreRaza: 'Corse', codigoRaza: '6' },
      { nombreRaza: 'Ferrandaise', codigoRaza: '7' },
      { nombreRaza: 'Holstein', codigoRaza: '8' },
    ];
  }

  validarStpe(numero: number) {
    this.messages = [];
    if (numero == 6) {
      this.stpe6 = true;
      this.Seleccion = false;
      return;
    }
    this.stpe6 = false;
    this.Seleccion = true;
  }

  validarCampos() {
    if (this.form.get('potrero')?.valid) {
      this.validarCapMaxAnimal();
    }
  }

  listarAnimales() {
    this.Tabla = false;
    this.messages = [];
    if (this.form.get('potreroVisualizar')?.valid) {
      this.seleccionarPotreroVisualizar =
        this.form.get('potreroVisualizar')?.value;
      if (this.seleccionarPotreroVisualizar.animales?.length! <= 0) {
        this.messages = [
          {
            severity: 'info',
            summary: 'El Potrero No Cuenta con Animales',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      this.seleccionarAnimalesVisualizar =
        this.seleccionarPotreroVisualizar.animales!;
      this.Tabla = true;

      console.log(this.seleccionarPotreroVisualizar.animales);
    }
  }

  validarCapMaxAnimal() {
    this.messages = [];
    if (this.form.get('potrero')?.valid) {
      this.seleccionarPotreroVisualizar = this.form.get('potrero')?.value;
      console.log(this.seleccionarPotreroVisualizar);
      console.log(this.seleccionarPotreroVisualizar.animales?.length);
      if (
        this.seleccionarPotreroVisualizar.animales?.length! <
        this.seleccionarPotreroVisualizar.cupoMaximoAnimales
      ) {
        this.botonCrear = true;
        this.form.get('raza')?.enable();
        this.form.get('nombreAnimal')?.enable();
        this.form.get('numeroCrotal')?.enable();
        this.form.get('fechaNacimiento')?.enable();
        this.form.get('numeroPartos')?.enable();
      } else {
        this.messages = [
          {
            severity: 'info',
            summary:
              'Capacidad Máxima de Animales (' +
              this.seleccionarPotreroVisualizar.cupoMaximoAnimales +
              ') del Potrero: (' +
              this.seleccionarPotreroVisualizar.nombrePotrero +
              ') Alcanzado',
            detail: '',
          },
        ];
        this.botonCrear = false;
        this.form.get('raza')?.disable();
        this.form.get('nombreAnimal')?.disable();
        this.form.get('numeroCrotal')?.disable();
        this.form.get('fechaNacimiento')?.disable();
        this.form.get('numeroPartos')?.disable();
        this.form.get('potrero')?.reset();
        this.ngOnInit;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  crearAnimal() {
    if (!this.form.valid) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Valide Los Campos',
          detail: '',
        },
      ];
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.messages = [];
    this.mostrarSpinner(true);
    this.potreroSeleccionado = this.form.get('potrero')?.value;
    this.animalesLista.codigoPotrero = this.potreroSeleccionado.codigoPotrero;
    this.animalesLista.numeroCrotal = this.form.get('numeroCrotal')?.value;
    this.animalesLista.nombreAnimal = this.form.get('nombreAnimal')?.value;
    this.animalesLista.numeroPartos = this.form.get('numeroPartos')?.value;
    this.animalesLista.raza = this.form.get('raza')?.value;

    const fechaCompleta = this.form.get('fechaNacimiento')?.value;

    if (fechaCompleta) {
      const fecha = new Date(fechaCompleta);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.animalesLista.fechaNacimiento = año + '-' + mes + '-' + dia;
    }
    this.service.crearAnimal(this.animalesLista).subscribe((response) => {
      this.responseGenerico = JSON.parse(response);

      if (this.responseGenerico.mensaje == '0') {
        this.boton = true;
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'success',
            summary: 'Animal Creado Correctamente',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.actualizarInformacion();
      } else {
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'info',
            summary: 'El Número de Cotral ya se Encuentra Registrado',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  validaFechaNacimiento() {
    this.messages = [];
    const fechaCompleta = this.form.get('fechaNacimiento')?.value;

    if (fechaCompleta) {
      const fecha = new Date(fechaCompleta);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.animalesLista.fechaNacimiento = año + '-' + mes + '-' + dia;
    }

    const fechaHoy: Date = new Date();

    const fechaSeleccionadaInicial: Date = new Date(
      this.animalesLista.fechaNacimiento
    );

    if (fechaSeleccionadaInicial > fechaHoy) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'La Fecha Inicial Seleccionada es Posterior al Día de Hoy.',
          detail: '',
        },
      ];
      this.form.get('fechaNacimiento')?.reset();
      this.animalesLista.fechaNacimiento = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
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

  eliminarAnimal(id: string) {
    console.log(id);
    this.service.eliminarAnimal(id).subscribe((response) => {
      this.responseGenerico = response;
      if (this.responseGenerico.mensaje == '0') {
        this.boton = true;
        this.mostrarSpinner(false);
        this.boton = true;
        this.messages = [
          {
            severity: 'success',
            summary: 'Animal Eliminado Correctamente',
            detail: '',
          },
        ];
        this.form.get('potreroVisualizar')?.disable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.actualizarInformacion();
      } else {
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'info',
            summary: 'El Animal No se Encuentra Registrado',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  actualizarInformacion() {
    this.mostrarSpinner(true);
    const idUsuario: string | null = localStorage.getItem('idUsuario');
    if (idUsuario !== null) {
      this.service.validarUsuario(idUsuario).subscribe((response) => {
        this.responseValidarUsuario = response;
        if (this.responseValidarUsuario.mensaje == '1') {
          setTimeout(() => {
            localStorage.setItem(
              'infoUsuario',
              JSON.stringify(this.responseValidarUsuario)
            );
          }, 1000);
        }
        const infoUsuarioJSON = localStorage.getItem('infoFinca');
        if (infoUsuarioJSON) {
          for (
            let i = 0;
            i < this.responseValidarUsuario.listaResultado.length;
            i++
          ) {
            this.seleccionarFincaObjeto = JSON.parse(
              localStorage.getItem('infoFinca')!
            );
            if (
              this.responseValidarUsuario.listaResultado[i].codigoFinca ==
              this.seleccionarFincaObjeto.codigoFinca
            ) {
              localStorage.setItem(
                'infoFinca',
                JSON.stringify(this.responseValidarUsuario.listaResultado[i])
              );
            }
          }
        }
        this.mostrarSpinner(false);
        this.ngOnInit();
        this.Tabla = false;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    }
  }
}
