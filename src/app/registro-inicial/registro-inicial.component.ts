import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { departamentos } from '../models/departamentos';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { municipio } from '../models/municipio';
import { responseDepartamento } from '../models/responseDepartamento';
import { finca } from '../models/finca';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-registro-inicial',
  templateUrl: './registro-inicial.component.html',
  styleUrls: ['./registro-inicial.component.css'],
  providers: [MessageService],
})
export class RegistroInicialComponent implements OnInit {
  cities: City[] | undefined;
  suplementos: City[] | undefined;
  raza: City[] | undefined;
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
    potreros : [{
      codigoPotrero: '',
  nombrePotrero: '',
  areaPotrero: 0,
  capacidadMaximaForraje: 0,
  capacidadMaximaAgua: 0,
  cupoMaximoAnimales: 0,
  codigoPasto: 0,
  codigoFinca: '',
  animales: [{
    numeroCrotal: '',
    nombreAnimal: '',
    fechaNacimiento: '',
    numeroPartos: 0,
    codigoPotrero: '',
    raza: [{codigoRaza: 0,
      nombreRaza: ''}]
  }]
    }]
  };
  responseDepartamentos!: responseDepartamento;
  seleccionarmunicipios!: municipio[];
  seleccionarDepartamentos!: departamentos;
  es: any;

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
  });
  constructor(
    public messageService: MessageService,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private config: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.cities = [
      { name: '', code: '' },
      { name: 'MECÁNICO', code: 'MECANICO' },
      { name: 'MOVÍLES', code: 'MOVILES' },
      { name: 'MANUAL', code: 'MANUAL' },
    ];

    this.suplementos = [
      { name: '', code: '' },
      { name: 'Si', code: 'S' },
      { name: 'No', code: 'N' },
    ];

    this.raza = [
      { name: '', code: '' },
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
    console.log('asdasd');
    this.mostrarSpinner(true);
    this.service.consultarDepartamentoYMunicipio().subscribe((response) => {
      this.responseDepartamentos = response;
      this.departamentos = this.responseDepartamentos.listaResultado;
      this.mostrarSpinner(false);
    });
  }

  validarStpe(numero: number) {
    numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
    numero == 2 ? (this.stpe2 = true) : (this.stpe2 = false);
    numero == 3 ? (this.stpe3 = true) : (this.stpe3 = false);
    numero == 4 ? (this.stpe4 = true) : (this.stpe4 = false);
    numero == 5 ? (this.stpe5 = true) : (this.stpe5 = false);
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }

  visualizarMunicipio() {
    this.form.get('municipio')?.enable();
    console.log(this.form.value);
    this.municipioCampo = false;
    this.seleccionarDepartamentos = this.form.get('departamento')?.value;
    this.municipios! = this.seleccionarDepartamentos.listaMunicipios;
  }

  valida() {
    console.log(this.form.get('municipio')?.value);
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

  registrarFincaInicial() {
    // this.finca.id_persona = this.form.get('id_persona')?.value;
    console.log(this.form.value);
    console.log(this.form.get('nombreFinca')?.value);
    console.log(this.form.get('nombreFinca')?.value.toString());
    // this.finca.codigoFinca = this.form.get('codigoFinca')?.value.toString();
    // this.finca.codigoFinca = '1';

    this.finca.nombreFinca =this.form.get('nombreFinca')?.value;
    this.finca.numeroTelefono = this.form.get('numeroTelefono')?.value;
    // this.finca.codigoDepartamento= this.form.get('')?.value;;
    this.finca.codigoDepartamento = 5;
    this.finca.codigoMunicipio = 1;
    this.finca.nombreVereda = this.form.get('nombreVereda')?.value;
    this.finca.tipoOrdeno = this.form.get('tipoOrdeno')?.value;
    this.finca.numeroOrdenoDiario = this.form.get('numeroOrdenoDiario')?.value;
    this.finca.areaTotal = this.form.get('areaTotal')?.value;
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
    // this.finca.potreros[0].codigoFinca= this.form.get('codigoFinca')?.value;
    // this.finca.potreros[0].codigoFinca= '1';
    this.finca.potreros[0].animales[0].nombreAnimal =
      this.form.get('nombreAnimal')?.value;
    this.finca.potreros[0].animales[0].numeroCrotal =
      this.form.get('numeroCrotal')?.value;
    this.finca.potreros[0].animales[0].fechaNacimiento =
      this.form.get('fechaNacimiento')?.value;
    this.finca.potreros[0].animales[0].numeroPartos =
      this.form.get('numeroPartos')?.value;
    this.finca.potreros[0].animales[0].raza[0].codigoRaza =
      this.form.get('codigoRaza')?.value;
    this.finca.potreros[0].animales[0].raza[0].nombreRaza =
      this.form.get('nombreRaza')?.value;
    console.log(this.finca);
    // this.finca.capacidadMaximaForraje
    // this.finca.capacidadMaximaAgua
    // this.finca.cupoMaximoAnimales
    // this.finca.
    // this.finca.
    // this.finca.
    // this.finca.

    // this.service
    //   .registrarFincaInicial(
    //     this.selectTipoDocumento?.name + this.form.get('cedula')?.value
    //   )
    //   .subscribe((response) => {
    //     this.responseValidarUsuario = response;
    //     console.log(this.responseValidarUsuario.mensaje);
    //     if (this.responseValidarUsuario.mensaje == '1') {
    //       this.messages = [
    //         {
    //           severity: 'success',
    //           summary: 'El Usuario Logeado',
    //           detail: '',
    //         },
    //       ];
    //       this.router.navigate(['/botones']);
    //     } else {
    //       this.messages = [
    //         {
    //           severity: 'info',
    //           summary: 'El Usuario No esta Registrado',
    //           detail: '',
    //         },
    //       ];
    //     }
    //     this.mostrarSpinner(false);
    //   });

    console.log(this.form.value);
  }
}
