import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-moeda',
  imports: [],
  templateUrl: './moeda.html',
  styleUrl: './moeda.css',
})
export class Moeda {
  moeda = input.required<IMoeda>();
  favorito = input(false);

  alternarFavorito = output<IMoeda>();
  abrir = output<IMoeda>();
}

export interface IMoeda {
  id: number;
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
