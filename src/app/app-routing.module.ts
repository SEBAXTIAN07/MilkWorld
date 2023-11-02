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
import { TrasladoComponent } from './traslado/traslado.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { HidricaComponent } from './hidrica/hidrica.component';
import { ErrorpaginaComponent } from './errorpagina/errorpagina.component';
import { SpinnerComponent } from './spinner/spinner.component';

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
  { path: 'traslado', component: TrasladoComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'huella-hidrica', component: HidricaComponent },
  { path: 'error', component: ErrorpaginaComponent },
  { path: 'spinner', component: SpinnerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
