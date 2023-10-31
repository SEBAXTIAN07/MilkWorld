import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'],
  providers: [MessageService],

})
export class AnimalComponent {
  stpe6: boolean = true; // Inicialmente visible

  constructor(public messageService: MessageService) {}

  ngOnInit() {}
 
  validarStpe(numero: number) {
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }
}
