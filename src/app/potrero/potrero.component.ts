import { Component } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { finca } from '../models/finca';
import { Potrero } from '../models/potrero';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { crearPotrero } from '../models/crearPotrero';
import { ServiceService } from '../Service/service.service';
import { responseGenerico } from '../models/responseGenerico';
import { Router } from '@angular/router';
export interface Product {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-potrero',
  templateUrl: './potrero.component.html',
  styleUrls: ['./potrero.component.css'],
  providers: [MessageService],
})
export class PotreroComponent {
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
    codigoFinca: ['', [Validators.required]],
    nombrePotrero: ['', [Validators.required]],
    areaPotrero: ['', [Validators.required]],
    capacidadMaximaForraje: ['', [Validators.required]],
    capacidadMaximaAgua: ['', [Validators.required]],
    cupoMaximoAnimales: ['', [Validators.required]],
    codigoPasto: ['', [Validators.required]],
  });
  responseGenerico!: responseGenerico;
  seleccionarPotrero!: [Potrero];
  products!: Product[];
  items: MenuItem[] = [];
  stpe1: boolean = true;
  stpe4: boolean = false;
  stpe5: boolean = false;
  stpe6: boolean = false;
  spinnerVariable: boolean = false; // Inicialmente visible
  formularioVariable: boolean = true; // Inicialmente visible
  crearPotrero: crearPotrero = {
    nombrePotrero: '',
    areaPotrero: 0,
    capacidadMaximaForraje: 0,
    capacidadMaximaAgua: 0,
    cupoMaximoAnimales: 0,
    codigoPasto: 0,
    codigoFinca: '',
  };
  messages: Message[] = [];

  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.validarUsuarioSistema();
    this.finca = JSON.parse(localStorage.getItem('infoFinca')!);
    this.seleccionarPotrero = this.finca.potreros;
    console.log(this.finca);
    this.form.get('codigoFinca')?.setValue(this.finca.codigoFinca);
    this.form.get('codigoFinca')?.disable();
  }

  // validarStpe(numero: number) {
  //   numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
  //   numero == 4 ? (this.stpe4 = true) : (this.stpe4 = false);
  //   numero == 5 ? (this.stpe5 = true) : (this.stpe5 = false);
  //   numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  // }

  validarAreaTotal() {
    let suma = 0;
    const areaTotalFinca = this.finca.areaTotal;
    this.seleccionarPotrero.forEach((objeto) => {
      suma += objeto.areaPotrero;
    });
    const areaDisponible = this.finca.areaTotal - suma;
    const areaCalculadaPotrero =
      areaDisponible - this.form.get('areaPotrero')?.value;
    if (areaCalculadaPotrero < 0) {
      const miConstanteFormateada: string = new Intl.NumberFormat().format(
        areaDisponible
      );
      this.messages = [
        {
          severity: 'info',
          summary:
            'El Area del Potrero Disponible es de: ' + miConstanteFormateada,
          detail: '',
        },
      ];
      this.form.get('areaPotrero')?.setValue(null);
    }
  }

  registrarPotrero() {
    this.mostrarSpinner(true);
    this.crearPotrero.nombrePotrero = this.form.get('nombrePotrero')?.value;
    this.crearPotrero.areaPotrero = this.form.get('areaPotrero')?.value;
    this.crearPotrero.capacidadMaximaForraje = this.form.get(
      'capacidadMaximaForraje'
    )?.value;
    this.crearPotrero.capacidadMaximaAgua = this.form.get(
      'capacidadMaximaAgua'
    )?.value;
    this.crearPotrero.cupoMaximoAnimales =
      this.form.get('cupoMaximoAnimales')?.value;
    this.crearPotrero.codigoPasto = this.form.get('codigoPasto')?.value;
    this.crearPotrero.codigoFinca = this.finca.codigoFinca;
    this.form.get('codigoFinca')?.disable();

    this.service.crearPotrero(this.crearPotrero).subscribe((response) => {
      this.responseGenerico = JSON.parse(response);
      console.log(this.responseGenerico);
      if (this.responseGenerico.mensaje == '0') {
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'success',
            summary: 'Potrero Creado Correctamente',
            detail: '',
          },
        ];
        setTimeout(() => {
          this.router.navigate(['/botones']);
        }, 3000);
      } else {
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'info',
            summary: 'El ID del Potrero ya se Encuentra Registrado',
            detail: '',
          },
        ];
      }
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
