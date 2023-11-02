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
import { animalesLista } from '../models/animalesLista';
import { transaladarAnimal } from '../models/transaladarAnimal';
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
    return this.http
      .post<any>(direction, page, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((err) => {
          if ([401, 403, 404].indexOf(err.status) !== 1) {
            this.router.navigateByUrl('/error');
          }
          return throwError(err);
        })
      );
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
    return this.http
      .post<any>(direction, page, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((err) => {
          if ([401, 403, 404].indexOf(err.status) !== 1) {
            this.router.navigateByUrl('/error');
          }
          return throwError(err);
        })
      );
  }

  consultarActividad(UserId: string): Observable<any> {
    return this.http.get(this.url + 'Huella/listarAnimales/' + UserId).pipe(
      catchError((err) => {
        if ([401, 403, 404].indexOf(err.status) !== 1) {
          this.router.navigateByUrl('/error');
        }
        return throwError(err);
      })
    );
  }

  crearAnimal(page: animalesLista): Observable<any> {
    let direction = this.url + 'Huella/crearAnimal';
    return this.http
      .post<any>(direction, page, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((err) => {
          if ([401, 403, 404].indexOf(err.status) !== 1) {
            this.router.navigateByUrl('/error');
          }
          return throwError(err);
        })
      );
  }

  trasladarAnimal(page: transaladarAnimal): Observable<any> {
    let direction = this.url + 'Huella/transaladarAnimal';
    return this.http
      .post<any>(direction, page, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((err) => {
          if ([401, 403, 404].indexOf(err.status) !== 1) {
            this.router.navigateByUrl('/error');
          }
          return throwError(err);
        })
      );
  }

  consultarDepartamentoYMunicipio(): Observable<any> {
    return this.http.get(this.url + 'Huella/listarDepartamentos').pipe(
      catchError((err) => {
        if ([401, 403, 404].indexOf(err.status) !== 1) {
          this.router.navigateByUrl('/error');
        }
        return throwError(err);
      })
    );
  }

  registrarFincaInicial(page: finca): Observable<any> {
    let direction = this.url + 'Huella/crearFinca';
    return this.http
      .post<any>(direction, page, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((err) => {
          if ([401, 403, 404].indexOf(err.status) !== 1) {
            this.router.navigateByUrl('/error');
          }
          return throwError(err);
        })
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return ObservablethrowError(error.message);
  }
}
