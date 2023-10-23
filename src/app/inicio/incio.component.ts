import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incio',
  templateUrl: './incio.component.html',
  styleUrls: ['./incio.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  registrarUsuario() {
    this.router.navigate(['/register']);
  }

  iniciarSesion() {
    this.router.navigate(['/sesion']);
  }
}
