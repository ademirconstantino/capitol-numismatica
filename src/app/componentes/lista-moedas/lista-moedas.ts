import { Component, OnInit } from '@angular/core';
import { ICategoria, IMoeda } from '../moeda/moeda';
import { mockMoedas } from '../../mock-moedas';
import { Moeda } from '../moeda/moeda';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lista-moedas',
  imports: [Moeda, NgFor],
  templateUrl: './lista-moedas.html',
  styleUrl: './lista-moedas.css',
})
export class ListaMoedas implements OnInit {
  generos: ICategoria[] = [];
  moedasPorCategoria: Map<string, IMoeda[]> = new Map();

  ngOnInit() {
    // Build categories map
    const categoriasMap = new Map<string, ICategoria>();

    for (const m of mockMoedas) {
      const c = m.categoria;
      if (!categoriasMap.has(c.id)) {
        categoriasMap.set(c.id, { id: c.id, value: c.value, moedas: [] });
      }
      categoriasMap.get(c.id)!.moedas.push(m);
    }

    this.generos = Array.from(categoriasMap.values());
    for (const cat of this.generos) {
      this.moedasPorCategoria.set(cat.id, cat.moedas);
    }
  }
}
