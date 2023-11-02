import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { finca } from '../models/finca';
import { Potrero } from '../models/potrero';
import { potreroCodigo } from '../models/potreroCodigo';
import { fincaCodigo } from '../models/fincacodigo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animalesLista } from '../models/animalesLista';
import { transaladarAnimal } from '../models/transaladarAnimal';
import { ServiceService } from '../Service/service.service';
import { responseGenerico } from '../models/responseGenerico';
import { Router } from '@angular/router';
import { responseValidarUsuario } from '../models/responseValidarUsuario';

@Component({
  selector: 'app-traslado',
  templateUrl: './traslado.component.html',
  styleUrls: ['./traslado.component.css'],
  providers: [MessageService],
})
export class TrasladoComponent {
  stpe6: boolean = true; // Inicialmente visible
  fechaHoy!: Date;
  messages: Message[] = [];
  spinnerVariable: boolean = false; // Inicialmente visible
  formularioVariable: boolean = true; // Inicialmente visible
  transaladarAnimal: transaladarAnimal = {
    fechaIngreso: '',
    pesoPromedio: '',
    codigoPotreroNuevo: '',
    codigoPotreroAntiguo: '',
    numeroCrotal: 0,
  };
  finca: fincaCodigo = {
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
        codigoPotrero: '',
        codigoPasto: 0,
        codigoFinca: '',
      },
    ],
  };
  public form: FormGroup = this.formBuilder.group({
    potreroNuevo: ['', [Validators.required]],
    PotreroActual: ['', [Validators.required]],
    pesoPromedio: ['', [Validators.required]],
    animal: ['', [Validators.required]],
  });
  seleccionarPotreroNuevo!: potreroCodigo[];
  seleccionarPotreroActual!: potreroCodigo[];
  seleccionarAnimal!: animalesLista[];
  responseGenerico!: responseValidarUsuario;

  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.fechaHoy = new Date();
  }

  ngOnInit() {
    this.form.get('potreroNuevo')?.disable();
    this.form.get('animal')?.disable();
    this.finca = JSON.parse(localStorage.getItem('infoFinca')!);
    this.seleccionarPotreroActual = this.finca.potreros;
    console.log(this.seleccionarPotreroActual);
  }

  validarStpe(numero: number) {
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }

  validarPotreroNuevo() {
    this.messages = [];
    const potreroCodigo = this.form.get('PotreroActual')?.value;
    this.seleccionarAnimal = potreroCodigo.animales;
    if (this.seleccionarAnimal.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: 'El Potrero No Cuenta Con Animales Registrados',
          detail: '',
        },
      ];
      this.form.get('potreroNuevo')?.disable();
      this.form.get('potreroNuevo')?.setValue(null);
      this.form.get('animal')?.disable();
      this.form.get('animal')?.setValue(null);

      return;
    }
    this.form.get('animal')?.enable();
    console.log(this.seleccionarAnimal);
    const validar = this.seleccionarPotreroActual.filter(
      (elemento) => elemento !== potreroCodigo
    );
    this.seleccionarPotreroNuevo = validar;
    this.form.get('potreroNuevo')?.enable();
    console.log(validar);
  }

  realizarTraslado() {
    if (!this.form.valid) {
      this.messages = [
        {
          severity: 'warn',
          summary: 'Valide los Campos',
          detail: '',
        },
      ];
    } else {
      this.mostrarSpinner(true);
      const potreroCodigoActual = this.form.get('PotreroActual')?.value;
      const potreroCodigoNuevo = this.form.get('potreroNuevo')?.value;
      const animal = this.form.get('animal')?.value;
      this.transaladarAnimal.codigoPotreroAntiguo =
        potreroCodigoActual.codigoPotrero;
      this.transaladarAnimal.codigoPotreroNuevo =
        potreroCodigoNuevo.codigoPotrero;
      this.transaladarAnimal.fechaIngreso = this.fechaHoy.toString();
      this.transaladarAnimal.numeroCrotal = animal.numeroCrotal;
      this.transaladarAnimal.pesoPromedio =
        this.form.get('pesoPromedio')?.value;
      this.service
        .trasladarAnimal(this.transaladarAnimal)
        .subscribe((response) => {
          console.log(response);
          this.responseGenerico = JSON.parse(response);
          console.log(this.responseGenerico.mensaje);
          console.log(this.responseGenerico.mensaje == '0');

          if (this.responseGenerico.mensaje == '0') {
            this.mostrarSpinner(false);
            this.messages = [
              {
                severity: 'success',
                summary: 'Animal Creado Correctamente',
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
                summary: 'EL Numero de Cotral ya se Encuentra Registrado',
                detail: '',
              },
            ];
          }
        });
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
