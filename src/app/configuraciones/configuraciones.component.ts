import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css'],
  providers: [MessageService],
})
export class ConfiguracionesComponent {
  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {}
  spinnerVariable: boolean = false; // Inicialmente visible
  formularioVariable: boolean = true; // Inicialmente visible

  messages: Message[] = [];

  public form: FormGroup = this.formBuilder.group({
    nombreAnimal: ['', [Validators.required]],
    potrero: ['', [Validators.required]],
    numeroCrotal: ['', [Validators.required]],
    numeroPartos: ['', [Validators.required]],
    raza: ['', [Validators.required]],
    codigoRaza: ['', [Validators.required]],
    nombreRaza: ['', [Validators.required]],
    interest: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),
  });
}
