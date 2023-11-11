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

interface Generica {
  nombreRaza: string;
  codigoRaza: string;
}
@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
  providers: [MessageService],
})
export class AnimalComponent {
  messages: Message[] = [];
  stpe6: boolean = true; 
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

  public form: FormGroup = this.formBuilder.group({
    nombreAnimal: ['', [Validators.required]],
    potrero: ['', [Validators.required]],
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
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }

  validarCampos() {
    if (this.form.get('potrero')?.valid) {
      this.botonCrear = true;
      this.form.get('raza')?.enable();
      this.form.get('nombreAnimal')?.enable();
      this.form.get('numeroCrotal')?.enable();
      this.form.get('fechaNacimiento')?.enable();
      this.form.get('numeroPartos')?.enable();
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
    } else {
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
        setTimeout(() => {
          this.router.navigate(['/botones']);
        }, 3000);
      } else {
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'info',
            summary: 'EL Numero de Cotral ya se Encuentra Registrado',
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
