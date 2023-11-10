import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  NombreFinca!: string;
  fechaHora!: Date;

  ngOnInit(): void {
    this.NombreFinca = localStorage.getItem('NombreFinca')!;
    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000);
  }

  private actualizarFechaHora() {
    this.fechaHora = new Date();
  }
}
