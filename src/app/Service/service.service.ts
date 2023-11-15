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
import { crearActividades } from '../models/crearActividades';
import { crearPasto } from '../models/crearPasto';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // private url: string = 'http://192.168.0.17:8080/'; //ng serve --host 0.0.0.0
  // private url: string = 'http://localhost:8080/'; //ng serve --host 0.0.0.0
  // private url: string = 'http://18.224.16.162/'; //ng serve --host 0.0.0.0
  private url: string = 'http://192.168.0.20:8080/'; //ng serve --host 0.0.0.0

  constructor(private http: HttpClient, private router: Router) {}

  validarUsuarioSistema() {
    const infoUsuarioJSON = localStorage.getItem('infoUsuario');
    if (infoUsuarioJSON == null) {
      this.router.navigate(['/login']);
      return;
    }
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario == null) {
      this.router.navigate(['/login']);
      return;
    }
    const infoFinca = localStorage.getItem('infoFinca');
    if (infoFinca == null) {
      this.router.navigate(['/finca']);
      return;
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

  eliminarAnimal(UserId: string): Observable<any> {
    return this.http.delete(this.url + 'Huella/animal/' + UserId).pipe(
      catchError((err) => {
        if ([401, 403, 404].indexOf(err.status) !== 1) {
          this.router.navigateByUrl('/error');
        }
        return throwError(err);
      })
    );
  }

  eliminarPotrero(UserId: string): Observable<any> {
    return this.http.delete(this.url + 'Huella/potrero/' + UserId).pipe(
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

  listarPasto(): Observable<any> {
    return this.http.get(this.url + 'Huella/listarPastos').pipe(
      catchError((err) => {
        if ([401, 403, 404].indexOf(err.status) !== 1) {
          this.router.navigateByUrl('/error');
        }
        return throwError(err);
      })
    );
  }

  registrarActividad(page: crearActividades): Observable<any> {
    let direction = this.url + 'Huella/crearActividad';
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

  crearPasto(page: crearPasto): Observable<any> {
    let direction = this.url + 'Huella/crearPasto';
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

  listarPastoPorID(page: number): Observable<any> {
    return this.http.get(this.url + 'Huella/listarConfiguracion/' + page).pipe(
      catchError((err) => {
        if ([401, 403, 404].indexOf(err.status) !== 1) {
          this.router.navigateByUrl('/error');
        }
        return throwError(err);
      })
    );
  }

  listarActividades(
    fechaInicio: string,
    codigoPotrero: string,
    fechaFin: string
  ): Observable<any> {
    return this.http
      .get(
        this.url +
          'Huella/ListarActividades/?fechaInicio=' +
          fechaInicio +
          '&codigoPotrero=' +
          codigoPotrero +
          '&fechafin=' +
          fechaFin
      )
      .pipe(
        catchError((err) => {
          if ([401, 403, 404].indexOf(err.status) !== 1) {
            this.router.navigateByUrl('/error');
          }
          return throwError(err);
        })
      );
  }
}
