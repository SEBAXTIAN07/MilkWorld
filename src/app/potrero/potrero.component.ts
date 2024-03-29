import { Component } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { finca } from '../models/finca';
import { Potrero } from '../models/potrero';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { crearPotrero } from '../models/crearPotrero';
import { ServiceService } from '../Service/service.service';
import { responseGenerico } from '../models/responseGenerico';
import { Router } from '@angular/router';
import { pastoLista } from '../models/pastoLista';
import { pasto } from '../models/pasto';
import { responseListarFinca } from '../models/responseListarFinca';
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
  seleccionarFincaObjeto = this.finca;
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
  responseValidarUsuario!: responseListarFinca;
  seleccionarPotrero!: [Potrero];
  products!: Product[];
  items: MenuItem[] = [];
  stpe1: boolean = true;
  stpe4: boolean = false;
  stpe5: boolean = false;
  stpe6: boolean = false;
  boton: boolean = false;
  spinnerVariable: boolean = false;
  formularioVariable: boolean = true;
  pasto!: pasto[];
  pastoSeleccionado!: pasto;
  pastoLista!: pastoLista;
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
    this.form.get('codigoFinca')?.setValue(this.finca.codigoFinca);
    this.form.get('codigoFinca')?.disable();
    this.listarPasto();
  }

  listarPasto() {
    this.service.listarPasto().subscribe((response) => {
      this.pastoLista = response;
      this.pasto = this.pastoLista.listaResultado;
    });
  }
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
            'El Área del Potrero Disponible es de: ' + miConstanteFormateada,
          detail: '',
        },
      ];
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.pastoSeleccionado = this.form.get('codigoPasto')?.value;
    this.crearPotrero.codigoPasto = this.pastoSeleccionado.codigoPasto;
    this.crearPotrero.codigoFinca = this.finca.codigoFinca;
    this.form.get('codigoFinca')?.disable();

    this.service.crearPotrero(this.crearPotrero).subscribe((response) => {
      this.responseGenerico = JSON.parse(response);
      if (this.responseGenerico.mensaje == '0') {
        this.boton = true;
        this.mostrarSpinner(false);
        this.messages = [
          {
            severity: 'success',
            summary: 'Potrero Creado Correctamente',
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
            summary: 'El ID del Potrero ya se Encuentra Registrado',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.messages=[];
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

  eliminarPotrero(id: string) {
    this.mostrarSpinner(true);
    console.log('Codigo : ' + id);
    this.service.eliminarPotrero(id).subscribe((response) => {
      this.responseGenerico = response;
      console.log(this.responseGenerico.mensaje);
      this.mostrarSpinner(false);
      if (this.responseGenerico.mensaje == '2') {
        this.messages = [
          {
            severity: 'info',
            summary:
              'El Potrero Contiene Animales Por Favor Eliminarlos para Poder Continuar ',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (this.responseGenerico.mensaje == '1') {
        this.messages = [
          {
            severity: 'info',
            summary:
              'El Potrero no Existe en la BD, Contacte con el Administrador: ',
            detail: '',
          },
        ];
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (this.responseGenerico.mensaje == '0') {
        this.messages = [
          {
            severity: 'success',
            summary: 'El Potrero fue Eliminado Correctamente',
            detail: '',
          },
        ];
        // this.boton = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.actualizarInformacion();
      }
    });
  }

  formatearNumeroConPuntos(numero: number): string {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      });
    }
  }
}
