import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-traslado',
  templateUrl: './traslado.component.html',
  styleUrls: ['./traslado.component.css'],
  providers: [MessageService],
})
export class TrasladoComponent {
  stpe6: boolean = true; // Inicialmente visible

  constructor(public messageService: MessageService) {}

  ngOnInit() {}
 
  validarStpe(numero: number) {
    console.log(numero);
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }

}
