import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { crearPersona } from '../models/crearPersona';
import { responseCrearPersona } from '../models/responseCrearPersona';

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
}
