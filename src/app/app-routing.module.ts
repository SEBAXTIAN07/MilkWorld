import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './inicio/incio.component';
import { RegisterComponent } from './register/register.component';
import { SesionComponent } from './sesion/sesion.component';
import { BotonesComponent } from './botones/botones.component';
import { FincaComponent } from './finca/finca.component';
import { RegistroInicialComponent } from './registro-inicial/registro-inicial.component';
import { PotreroComponent } from './potrero/potrero.component';
import { AnimalComponent } from './animal/animal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sesion', component: SesionComponent },
  { path: 'botones', component: BotonesComponent },
  { path: 'registro-inicial', component: RegistroInicialComponent },
  { path: 'finca', component: FincaComponent },
  { path: 'potrero', component: PotreroComponent },
  { path: 'animal', component: AnimalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
