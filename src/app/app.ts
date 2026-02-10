import { Component, signal } from '@angular/core';
import { Cabecalho } from './componentes/cabecalho/cabecalho';
import { Rodape } from './componentes/rodape/rodape';
import { ListaMoedas } from './componentes/lista-moedas/lista-moedas';

@Component({
  selector: 'app-root',
  imports: [
    Cabecalho,
    ListaMoedas,
    Rodape
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('Capitol Numismatica');
}
