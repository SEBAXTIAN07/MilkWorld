import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css'],
  providers: [MessageService],
})
export class FincaComponent implements OnInit {
  items: MenuItem[] = [];
  stpe1: boolean = true; // Inicialmente visible
  stpe2: boolean = false; // Inicialmente visible
  stpe3: boolean = false; // Inicialmente visible
  stpe4: boolean = false; // Inicialmente visible
  stpe5: boolean = false; // Inicialmente visible
  stpe6: boolean = false; // Inicialmente visible

  constructor(public messageService: MessageService) {}

  ngOnInit() {}

  validarStpe(numero: number) {
    console.log(numero);
    numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
    numero == 2 ? (this.stpe2 = true) : (this.stpe2 = false);
    numero == 3 ? (this.stpe3 = true) : (this.stpe3 = false);
    numero == 4 ? (this.stpe4 = true) : (this.stpe4 = false);
    numero == 5 ? (this.stpe5 = true) : (this.stpe5 = false);
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }

  
}
