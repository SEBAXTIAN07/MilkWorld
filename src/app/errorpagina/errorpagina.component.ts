import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-errorpagina',
  templateUrl: './errorpagina.component.html',
  styleUrls: ['./errorpagina.component.scss'],
})
export class ErrorpaginaComponent {
  parametro!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
   
  }
}
