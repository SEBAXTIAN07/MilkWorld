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
  stpe1: boolean = true; // Inicialmente visible
  stpe2: boolean = false; // Inicialmente visible
  stpe3: boolean = false; // Inicialmente visible
  stpe4: boolean = false; // Inicialmente visible
  stpe5: boolean = false; // Inicialmente visible
  stpe6: boolean = false; // Inicialmente visible
  spinnerVariable: boolean = false; // Inicialmente visible
  formularioVariable: boolean = false; // Inicialmente visible
  municipioCampo: boolean = true; // Inicialmente visible
  departamentos!: departamentos[];
  municipios: municipio[] = [];
  messages: Message[] = [];
  responseDepartamentos!: responseDepartamento;
  seleccionarmunicipios!: municipio;
  seleccionarDepartamentos!: departamentos;
  seleccionartipoOrdeno!: Generica;
  seleccionartiSuplemento!: Generica;
  seleccionarRaza!: GenericaNumber;

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
    private config: PrimeNGConfig
  ) {}

  get interests() {
    return this.form.get('interest') as FormArray;
  }

  addInterest() {
    this.interests.push(this.formBuilder.control(''));
    console.log(this.form.get('interest'));
  }

  removeInterest(index: number) {
    this.interests.removeAt(index);
  }

  ngOnInit() {
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
    this.mostrarSpinner(true);
    //TODO: Produccion
    this.service.consultarDepartamentoYMunicipio().subscribe((response) => {
      this.responseDepartamentos = response;
      this.departamentos = this.responseDepartamentos.listaResultado;
      this.mostrarSpinner(false);
    });
    //TODO: Desarrollo
    // this.mostrarSpinner(false);
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
            'El Area Total es de: ' +
            this.form.get('areaTotal')?.value +
            ' Valide el Area del Potrero',
          detail: '',
        },
      ];
      this.form.get('areaPotrero')?.setValue(0);
    }
    }

  registrarFincaInicial() {
    //TODO:Validado
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
    this.finca.potreros[0].codigoPasto = this.form.get('codigoPasto')?.value;
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
        console.log('Validacion');
        this.finca.potreros[0].animales[0].nombreAnimal =
          this.form.get('nombreAnimal')?.value;
        this.finca.potreros[0].animales[0].nombreAnimal =
          this.form.get('nombreAnimal')?.value;
        this.finca.potreros[0].animales[0].nombreAnimal =
          this.form.get('nombreAnimal')?.value;
        this.finca.potreros[0].animales[0].numeroCrotal =
          this.form.get('numeroCrotal')?.value;
        this.finca.potreros[0].animales[0].fechaNacimiento =
          this.form.get('fechaNacimiento')?.value;
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
      console.log(response);
      // this.responseValidarUsuario = response;
      // console.log(this.responseValidarUsuario.mensaje);
      // if (this.responseValidarUsuario.mensaje == '1') {
      //   this.messages = [
      //     {
      //       severity: 'success',
      //       summary: 'El Usuario Logeado',
      //       detail: '',
      //     },
      //   ];
        // this.router.navigate(['/botones']);
      // } else {
      //   this.messages = [
      //     {
      //       severity: 'info',
      //       summary: 'El Usuario No esta Registrado',
      //       detail: '',
      //     },
      //   ];
      // }
      // this.mostrarSpinner(false);
    });
    console.log(this.finca);
  }
}
