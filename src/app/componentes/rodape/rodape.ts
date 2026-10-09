import { Component } from '@angular/core';
import { creditosImagens } from '../../creditos-imagens';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
  standalone: true
})
export class Rodape {
  readonly creditos = creditosImagens;
  readonly ano = new Date().getFullYear();
}
