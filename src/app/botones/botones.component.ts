import { Component, OnInit } from '@angular/core';
import { responseListarFinca } from '../models/responseListarFinca';
import { finca } from '../models/finca';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
  providers: [MessageService],
})
export class BotonesComponent implements OnInit {
  constructor(private router: Router, private service: ServiceService) {}
  spinnerVisible: boolean = false; // Inicialmente visible
  formularioVisible: boolean = true; // Inicialmente visible
  responseValidarUsuario!: responseListarFinca;
  messages: Message[] = [];
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
  seleccionarFinca = [this.finca];
  seleccionarFincaObjeto = this.finca;

  ngOnInit(): void {
    this.service.validarUsuarioSistema();
    this.validarListadoFinca();
  }

  mostrarSpinner(valor: boolean) {
    if (valor) {
      this.formularioVisible = false;
      this.spinnerVisible = true;
    } else {
      this.formularioVisible = true;
      this.spinnerVisible = false;
    }
  }

  validarListadoFinca() {
    this.mostrarSpinner(true);
    const idUsuario: string | null = localStorage.getItem('idUsuario'); // Por ejemplo, una función que podría devolver un string o null
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
          this.mostrarSpinner(false);
        } else {
          setTimeout(() => {
            this.responseValidarUsuario = JSON.parse(
              localStorage.getItem('infoUsuario')!
            );
            this.seleccionarFinca = this.responseValidarUsuario.listaResultado;
            if (this.seleccionarFinca.length > 0) {
              this.router.navigate(['/finca']);
              return;
            }
            this.router.navigate(['/registro-inicial']);
          }, 2000);
        }
      });
    }
  }
}
