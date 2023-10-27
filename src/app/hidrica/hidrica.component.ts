import { Component } from '@angular/core';

@Component({
  selector: 'app-hidrica',
  templateUrl: './hidrica.component.html',
  styleUrls: ['./hidrica.component.css']
})
export class HidricaComponent {
  fechaHoy!: Date;

  constructor() {
    this.fechaHoy = new Date();
  }
}
