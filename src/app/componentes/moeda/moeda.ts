import { Component, input } from '@angular/core';

@Component({
  selector: 'app-moeda',
  imports: [],
  templateUrl: './moeda.html',
  styleUrl: './moeda.css',
})
export class Moeda {
  moeda = input.required<IMoeda>();

  alternarFavorito() {
    this.moeda().favorito = !this.moeda().favorito;
  }
}

export interface IMoeda {
  nome: string;
  pais: string;
  ano: number | string;
  metal: string;
  condicao?: string;
  favorito: boolean;
  categoria: ICategoria;
  imagem?: string;
}

export interface ICategoria {
  id: string;
  value: string;
  moedas: IMoeda[];
}
