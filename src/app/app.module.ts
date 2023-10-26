import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './inicio/incio.component';
import { AppRoutingModule } from './app-routing.module';
import { StyleClassModule } from 'primeng/styleclass';
import { RegisterComponent } from './register/register.component';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { SesionComponent } from './sesion/sesion.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { SpinnerComponent } from './spinner/spinner.component';
import { BotonesComponent } from './botones/botones.component';
import { FincaComponent } from './finca/finca.component';
import { StepsModule } from 'primeng/steps';
import {InputNumberModule} from 'primeng/inputnumber';
import { FooterComponent } from './footer/footer.component';
import { RegistroInicialComponent } from './registro-inicial/registro-inicial.component';
import {TableModule} from 'primeng/table';
import { PotreroComponent } from './potrero/potrero.component';
import { AnimalComponent } from './animal/animal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SesionComponent,
    SpinnerComponent,
    BotonesComponent,
    FincaComponent,
    FooterComponent,
    RegistroInicialComponent,
    PotreroComponent,
    AnimalComponent,
  ],

  imports: [
    BrowserModule,
    ButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StyleClassModule,
    ImageModule,
    InputTextModule,
    PasswordModule,
    SidebarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    StepsModule,
    InputNumberModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
