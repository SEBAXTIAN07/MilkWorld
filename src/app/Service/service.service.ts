import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { crearPersona } from '../models/crearPersona';
import { responseCrearPersona } from '../models/responseCrearPersona';
import { finca } from '../models/finca';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private url: string = 'http://192.168.0.17:8080/';

  constructor(private http: HttpClient) {}

  registrarUsuario(page: crearPersona): Observable<any> {
    let direction = this.url + 'Huella/crearPersona';
    return this.http.post<any>(direction, page, {
      responseType: 'text' as 'json',
    });
  }

  validarUsuario(usuario: string): Observable<any> {
    console.log(usuario);
    return this.http.get(this.url + 'Huella/listarFinca/' + usuario);
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

}
