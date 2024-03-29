import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { departamentos } from '../models/departamentos';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { municipio } from '../models/municipio';
import { responseDepartamento } from '../models/responseDepartamento';
import { finca } from '../models/finca';
import { responseValidarUsuario } from '../models/responseValidarUsuario';
import { responseCrearPersona } from '../models/responseCrearPersona';
import { Router } from '@angular/router';
import { pasto } from '../models/pasto';
import { pastoLista } from '../models/pastoLista';

interface Generica {
  name: string;
  code: string;
}

interface GenericaNumber {
  name: string;
  code: number;
}

@Component({
  selector: 'app-registro-inicial',
  templateUrl: './registro-inicial.component.html',
  styleUrls: ['./registro-inicial.component.css'],
  providers: [MessageService],
})
export class RegistroInicialComponent implements OnInit {
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
  cities: Generica[] | undefined;
  tipoOrdeno: Generica[] | undefined;
  suplementos: Generica[] | undefined;
  raza: Generica[] | undefined;
  items: MenuItem[] = [];
  stpe1: boolean = true;
  stpe2: boolean = false;
  stpe3: boolean = false;
  stpe4: boolean = false;
  stpe5: boolean = false;
  stpe6: boolean = false;
  spinnerVariable: boolean = false;
  formularioVariable: boolean = false;
  municipioCampo: boolean = true;
  departamentos!: departamentos[];
  pasto!: pasto[];
  pastoSeleccionado!: pasto;
  pastoLista!: pastoLista;
  municipios: municipio[] = [];
  messages: Message[] = [];
  responseDepartamentos!: responseDepartamento;
  seleccionarmunicipios!: municipio;
  seleccionarDepartamentos!: departamentos;
  seleccionartipoOrdeno!: Generica;
  seleccionartiSuplemento!: Generica;
  seleccionarRaza!: GenericaNumber;
  responseCrearPersona!: responseCrearPersona;
  boton: boolean = false;
  validarFecha = '';

  public form: FormGroup = this.formBuilder.group({
    id_persona: ['', [Validators.required]],
    codigoFinca: ['', [Validators.required]],
    nombreFinca: ['', [Validators.required]],
    numeroTelefono: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    municipio: ['', [Validators.required]],
    tipoOrdeño: ['', [Validators.required]],
    nombreVereda: ['', [Validators.required]],
    tipoOrdeno: ['', [Validators.required]],
    numeroOrdenoDiario: ['', [Validators.required]],
    areaTotal: ['', [Validators.required]],
    usoSuplemento: ['', [Validators.required]],
    nombrePotrero: ['', [Validators.required]],
    areaPotrero: ['', [Validators.required]],
    capacidadMaximaForraje: ['', [Validators.required]],
    capacidadMaximaAgua: ['', [Validators.required]],
    cupoMaximoAnimales: ['', [Validators.required]],
    codigoPasto: ['', [Validators.required]],
    nombreAnimal: ['', [Validators.required]],
    numeroCrotal: ['', [Validators.required]],
    fechaNacimiento: new FormControl<Date | null>(null),
    numeroPartos: ['', [Validators.required]],
    raza: ['', [Validators.required]],
    codigoRaza: ['', [Validators.required]],
    nombreRaza: ['', [Validators.required]],
    interest: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),
  });
  constructor(
    public messageService: MessageService,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  get interests() {
    return this.form.get('interest') as FormArray;
  }

  addInterest() {
    this.interests.push(this.formBuilder.control(''));
  }

  removeInterest(index: number) {
    this.interests.removeAt(index);
  }

  ngOnInit() {
    this.mostrarSpinner(true);
    this.service.validarUsuarioSistemaFinca();
    this.tipoOrdeno = [
      { name: 'MECÁNICO', code: 'MECANICO' },
      { name: 'MOVÍLES', code: 'MOVILES' },
      { name: 'MANUAL', code: 'MANUAL' },
    ];

    this.suplementos = [
      { name: 'Si', code: 'S' },
      { name: 'No', code: 'N' },
    ];

    this.raza = [
      { name: 'Armoricaide', code: '1' },
      { name: 'Angler', code: '2' },
      { name: 'Bazadaise', code: '3' },
      { name: 'Bearnaise', code: '4' },
      { name: 'Bordelaise', code: '5' },
      { name: 'Corse', code: '6' },
      { name: 'Ferrandaise', code: '7' },
      { name: 'Holstein', code: '8' },
    ];

    this.form.get('municipio')?.disable();
    this.service.consultarDepartamentoYMunicipio().subscribe((response) => {
      this.responseDepartamentos = response;
      this.departamentos = this.responseDepartamentos.listaResultado;
      this.mostrarSpinner(false);
    });

    this.listarPasto();
  }

  listarPasto() {
    this.service.listarPasto().subscribe((response) => {
      this.pastoLista = response;
      this.pasto = this.pastoLista.listaResultado;
    });
  }

  validarStpe(numero: number) {
    this.messages = [];
    if (numero == 2) {
      if (
        this.form.get('nombreFinca')?.valid &&
        this.form.get('numeroTelefono')?.valid &&
        this.form.get('departamento')?.valid &&
        this.form.get('municipio')?.valid
      ) {
        this.abrilModal(2);
      } else {
        this.messages = [
          {
            severity: 'warn',
            summary: 'Valide los Campos Requeridos',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (numero == 3) {
      if (
        this.form.get('nombreVereda')?.valid &&
        this.form.get('tipoOrdeno')?.valid &&
        this.form.get('numeroOrdenoDiario')?.valid
      ) {
        this.abrilModal(3);
      } else {
        this.messages = [
          {
            severity: 'warn',
            summary: 'Valide los Campos Requeridos',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (numero == 4) {
      if (
        this.form.get('areaTotal')?.valid &&
        this.form.get('usoSuplemento')?.valid
      ) {
        this.abrilModal(4);
      } else {
        this.messages = [
          {
            severity: 'warn',
            summary: 'Valide los Campos Requeridos',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (numero == 5) {
      if (
        this.form.get('nombrePotrero')?.valid &&
        this.form.get('areaPotrero')?.valid &&
        this.form.get('capacidadMaximaForraje')?.valid &&
        this.form.get('capacidadMaximaAgua')?.valid
      ) {
        this.abrilModal(5);
      } else {
        this.messages = [
          {
            severity: 'warn',
            summary: 'Valide los Campos Requeridos',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (numero == 6) {
      if (
        this.form.get('cupoMaximoAnimales')?.valid &&
        this.form.get('codigoPasto')?.valid &&
        this.form.get('codigoFinca')?.valid
      ) {
        this.abrilModal(6);
      } else {
        this.messages = [
          {
            severity: 'warn',
            summary: 'Valide los Campos Requeridos',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  abrilModal(numero: number) {
    numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
    numero == 2 ? (this.stpe2 = true) : (this.stpe2 = false);
    numero == 3 ? (this.stpe3 = true) : (this.stpe3 = false);
    numero == 4 ? (this.stpe4 = true) : (this.stpe4 = false);
    numero == 5 ? (this.stpe5 = true) : (this.stpe5 = false);
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);

    if (numero == 5) {
      this.form.get('fechaNacimiento')?.setValue(null);
      this.form.get('numeroPartos')?.setValue(null);
      this.form.get('nombreAnimal')?.setValue(null);
      this.form.get('numeroCrotal')?.setValue(null);
    }
  }

  visualizarMunicipio() {
    this.form.get('municipio')?.enable();
    this.municipioCampo = false;
    this.seleccionarDepartamentos = this.form.get('departamento')?.value;
    this.municipios! = this.seleccionarDepartamentos.listaMunicipios;
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

  validarAreaTotal() {
    if (
      this.form.get('areaTotal')?.value < this.form.get('areaPotrero')?.value
    ) {
      this.messages = [
        {
          severity: 'warn',
          summary:
            'El Área Total es de: ' +
            this.formatearNumeroConPuntos(this.form.get('areaTotal')?.value) +
            ' mts Valide el Área del Potrero',
          detail: '',
        },
      ];
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.form.get('areaPotrero')?.setValue(0);
    }
  }

  registroFincaInicialAnimales() {
    if (
      this.form.get('raza')?.valid &&
      this.form.get('numeroCrotal')?.valid &&
      this.form.get('nombreAnimal')?.valid &&
      this.form.get('fechaNacimiento')?.valid &&
      this.form.get('numeroPartos')?.valid
    ) {
      this.registrarFincaInicial();
    } else {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Valide los Campos Requeridos',
          detail: '',
        },
      ];
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  registrarFincaInicial() {
    if (
      this.form.get('cupoMaximoAnimales')?.valid &&
      this.form.get('codigoPasto')?.valid &&
      this.form.get('codigoFinca')?.valid
    ) {
    } else {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Valide los Campos Requeridos',
          detail: '',
        },
      ];
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.mostrarSpinner(true);
    this.boton = true;
    this.seleccionarmunicipios = this.form.get('municipio')?.value;
    this.finca.id_persona = localStorage.getItem('idUsuario') ?? '';
    this.finca.codigoFinca = this.form.get('codigoFinca')?.value.toString();
    this.finca.nombreFinca = this.form.get('nombreFinca')?.value;
    this.finca.numeroTelefono = this.form.get('numeroTelefono')?.value;
    this.finca.codigoDepartamento =
      this.seleccionarDepartamentos.codigoDepartamento;
    this.finca.codigoMunicipio = this.seleccionarmunicipios.codigoMunicipio;
    this.finca.nombreVereda = this.form.get('nombreVereda')?.value;
    this.seleccionartipoOrdeno = this.form.get('tipoOrdeno')?.value;
    this.finca.tipoOrdeno = this.seleccionartipoOrdeno.code;
    this.finca.numeroOrdenoDiario = this.form.get('numeroOrdenoDiario')?.value;
    this.finca.areaTotal = this.form.get('areaTotal')?.value;
    this.seleccionartiSuplemento = this.form.get('usoSuplemento')?.value;
    this.finca.usoSuplemento = this.seleccionartiSuplemento.code;
    this.finca.potreros[0].nombrePotrero =
      this.form.get('nombrePotrero')?.value;
    this.finca.potreros[0].areaPotrero = this.form.get('areaPotrero')?.value;
    this.finca.potreros[0].capacidadMaximaForraje = this.form.get(
      'capacidadMaximaForraje'
    )?.value;
    this.finca.potreros[0].capacidadMaximaAgua = this.form.get(
      'capacidadMaximaAgua'
    )?.value;
    this.pastoSeleccionado = this.form.get('codigoPasto')?.value;
    this.finca.potreros[0].codigoPasto = this.pastoSeleccionado.codigoPasto;
    this.finca.potreros[0].codigoFinca = this.form.get('codigoFinca')?.value;
    this.finca.potreros[0].cupoMaximoAnimales =
      this.form.get('cupoMaximoAnimales')?.value;
    if (this.form.get('nombreAnimal')?.valid) {
      this.finca.potreros[0].animales = [
        {
          numeroCrotal: '',
          nombreAnimal: '',
          fechaNacimiento: '',
          numeroPartos: 0,
          raza: { codigoRaza: 0, nombreRaza: '' },
        },
      ];
      if (
        this.finca &&
        this.finca.potreros &&
        this.finca.potreros[0] &&
        this.finca.potreros[0].animales
      ) {
        this.finca.potreros[0].animales[0].nombreAnimal =
          this.form.get('nombreAnimal')?.value;
        this.finca.potreros[0].animales[0].numeroCrotal =
          this.form.get('numeroCrotal')?.value;

        const fechaCompleta = this.form.get('fechaNacimiento')?.value;

        if (fechaCompleta) {
          const fecha = new Date(fechaCompleta);
          const dia = fecha.getDate();
          const mes = fecha.getMonth() + 1;
          const año = fecha.getFullYear();
          this.finca.potreros[0].animales[0].fechaNacimiento =
            año + '-' + mes + '-' + dia;
        }

        this.finca.potreros[0].animales[0].numeroPartos =
          this.form.get('numeroPartos')?.value;
        this.seleccionarRaza = this.form.get('raza')?.value;

        this.finca.potreros[0].animales[0].raza.codigoRaza =
          this.seleccionarRaza.code;
        this.finca.potreros[0].animales[0].raza.nombreRaza =
          this.seleccionarRaza.name;
      }
    }

    this.service.registrarFincaInicial(this.finca).subscribe((response) => {
      this.responseCrearPersona = JSON.parse(response);
      if (this.responseCrearPersona.mensaje == '0') {
        this.messages = [
          {
            severity: 'success',
            summary: 'La Finca se Creó Correctamente',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          localStorage.removeItem('infoFinca');
          this.router.navigate(['/botones']);
        }, 3000);
      } else {
        this.messages = [
          {
            severity: 'info',
            summary: 'La Finca ya se encuentra Creada',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.boton = false;
      }

      this.mostrarSpinner(false);
    });
  }

  formatearNumeroConPuntos(numero: number): string {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  validaFechaNacimiento() {
    this.messages = [];
    const fechaCompleta = this.form.get('fechaNacimiento')?.value;
    const ValidarFecha = '';
    if (fechaCompleta) {
      const fecha = new Date(fechaCompleta);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      this.validarFecha = año + '-' + mes + '-' + dia;
    }

    const fechaHoy: Date = new Date();

    const fechaSeleccionadaInicial: Date = new Date(this.validarFecha);

    if (fechaSeleccionadaInicial > fechaHoy) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'La Fecha Inicial Seleccionada es Posterior al Día de Hoy.',
          detail: '',
        },
      ];
      this.form.get('fechaNacimiento')?.reset();
      this.validarFecha = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  }
}
