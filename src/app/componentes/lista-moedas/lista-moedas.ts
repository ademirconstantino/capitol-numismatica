import { Component, computed, effect, signal } from '@angular/core';
import { ICategoria, IMoeda, Moeda } from '../moeda/moeda';
import { categorias, mockMoedas } from '../../mock-moedas';

type Ordenacao = 'ano-asc' | 'ano-desc' | 'nome' | 'pais';

const CHAVE_FAVORITOS = 'capitol-favoritos';

@Component({
  selector: 'app-lista-moedas',
  imports: [Moeda],
  templateUrl: './lista-moedas.html',
  styleUrl: './lista-moedas.css',
  host: { '(document:keydown.escape)': 'fecharDetalhe()' },
})
export class ListaMoedas {
  readonly categorias = Object.values(categorias);
  readonly totalMoedas = mockMoedas.length;
  readonly totalPaises = new Set(mockMoedas.map((m) => m.pais)).size;
  readonly maisAntiga = Math.min(...mockMoedas.map((m) => Number(m.ano)));

  busca = signal('');
  categoriaAtiva = signal<string>('todas');
  ordenacao = signal<Ordenacao>('ano-asc');
  soFavoritos = signal(false);
  favoritos = signal<Set<number>>(this.carregarFavoritos());
  selecionada = signal<IMoeda | null>(null);

  moedasFiltradas = computed(() => {
    const termo = normalizar(this.busca().trim());
    const categoria = this.categoriaAtiva();
    const favoritos = this.favoritos();

    return mockMoedas
      .filter((m) => categoria === 'todas' || m.categoria.id === categoria)
      .filter((m) => !this.soFavoritos() || favoritos.has(m.id))
      .filter(
        (m) =>
          !termo ||
          normalizar(`${m.nome} ${m.pais} ${m.ano} ${m.metal}`).includes(termo),
      )
      .sort(comparador(this.ordenacao()));
  });

  /** Moedas agrupadas por continente, na ordem das categorias. */
  grupos = computed<ICategoria[]>(() =>
    this.categorias
      .map((c) => ({ ...c, moedas: this.moedasFiltradas().filter((m) => m.categoria.id === c.id) }))
      .filter((c) => c.moedas.length > 0),
  );

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([...this.favoritos()]));
      } catch {
        // armazenamento indisponível: favoritos valem só para esta visita
      }
    });
  }

  contarCategoria(id: string) {
    return id === 'todas'
      ? mockMoedas.length
      : mockMoedas.filter((m) => m.categoria.id === id).length;
  }

  alternarFavorito(moeda: IMoeda) {
    this.favoritos.update((atual) => {
      const novo = new Set(atual);
      novo.has(moeda.id) ? novo.delete(moeda.id) : novo.add(moeda.id);
      return novo;
    });
  }

  limparFiltros() {
    this.busca.set('');
    this.categoriaAtiva.set('todas');
    this.soFavoritos.set(false);
  }

  abrirDetalhe(moeda: IMoeda) {
    this.selecionada.set(moeda);
  }

  fecharDetalhe() {
    this.selecionada.set(null);
  }

  private carregarFavoritos(): Set<number> {
    try {
      return new Set(JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) ?? '[]'));
    } catch {
      return new Set();
    }
  }
}

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function comparador(ordem: Ordenacao) {
  return (a: IMoeda, b: IMoeda) => {
    switch (ordem) {
      case 'ano-asc':
        return Number(a.ano) - Number(b.ano);
      case 'ano-desc':
        return Number(b.ano) - Number(a.ano);
      case 'nome':
        return a.nome.localeCompare(b.nome, 'pt-BR', { numeric: true });
      case 'pais':
        return a.pais.localeCompare(b.pais, 'pt-BR') || Number(a.ano) - Number(b.ano);
    }
  };
}
