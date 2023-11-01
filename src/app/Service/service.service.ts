import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { crearPersona } from '../models/crearPersona';
import { responseCrearPersona } from '../models/responseCrearPersona';
import { finca } from '../models/finca';
import { catchError } from 'rxjs/operators';
import { throwError as ObservablethrowError } from 'rxjs';
import { Router } from '@angular/router';
import { crearPotrero } from '../models/crearPotrero';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private url: string = 'http://192.168.0.17:8080/'; //ng serve --host 0.0.0.0

  constructor(private http: HttpClient, private router: Router) {}

  validarUsuarioSistema() {
    const infoUsuarioJSON = localStorage.getItem('infoUsuario');
    if (infoUsuarioJSON == null) {
      this.router.navigate(['/login']);
    }
    return 'OK';
  }

  registrarUsuario(page: crearPersona): Observable<any> {
    let direction = this.url + 'Huella/crearPersona';
    return this.http.post<any>(direction, page, {
      responseType: 'text' as 'json',
    });
  }

  validarUsuario(usuario: string): Observable<any> {
    return this.http.get(this.url + 'Huella/listarFinca/' + usuario).pipe(
      catchError((err) => {
        if ([401, 403, 404].indexOf(err.status) !== 1) {
          this.router.navigateByUrl('/error');
        }
        return throwError(err);
      })
    );
  }

  crearPotrero(page: crearPotrero): Observable<any> {
    let direction = this.url + 'Huella/crearPotrero';
    return this.http.post<any>(direction, page, {
      responseType: 'text' as 'json',
    });
  }

  consultarDepartamentoYMunicipio(): Observable<any> {
    return this.http.get(this.url + 'Huella/listarDepartamentos');
  }

  registrarFincaInicial(page: finca): Observable<any> {
    let direction = this.url + 'Huella/crearFinca';
    return this.http.post<any>(direction, page, {
      responseType: 'text' as 'json',
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return ObservablethrowError(error.message);
  }
}
