import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css'],
})
export class SesionComponent {
  public form: FormGroup = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    tipoDocumento: ['', [Validators.required]],
  });

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  volverInicio() {
    this.router.navigate(['/login']);
  }
}
