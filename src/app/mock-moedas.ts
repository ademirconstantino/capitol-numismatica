import { IMoeda } from './componentes/moeda/moeda';

export const mockMoedas: IMoeda[] = [
  {
    nome: 'Moeda Vaticano',
    pais: 'Vaticano | UE',
    ano: 1951,
    metal: 'Aluminio',
    condicao: 'Ótima',
    favorito: false,
    categoria: {
      id: 'europa',
      value: 'Europa',
      moedas: []
    },
    imagem: 'vatican.png'
  },
    {
    nome: '100 Lire',
    pais: 'Italia',
    ano: 1993,
    metal: 'Aço inoxidável',
    condicao: 'Ótima',
    favorito: false,
    categoria: {
      id: 'europa',
      value: 'Europa',
      moedas: []
    },
    imagem: 'lira100.png'
  },
    {
    nome: '10 centimes',
    pais: 'França',
    ano: 1977,
    metal: 'Cobre',
    condicao: 'Ótima',
    favorito: false,
    categoria: {
      id: 'europa',
      value: 'Europa',
      moedas: []
    },
    imagem: '20centimes.png'
  },
      {
    nome: '100 Pesetas',
    pais: 'Espanha',
    ano: 1994,
    metal: 'Aço inoxidável',
    condicao: 'Boa',
    favorito: false,
    categoria: {
      id: 'europa',
      value: 'Europa',
      moedas: []
    },
    imagem: '100pesetas.png'
  },
      {
    nome: '200 Lire',
    pais: 'Italia',
    ano: 1979,
    metal: 'Cobre',
    condicao: 'Ótima',
    favorito: false,
    categoria: {
      id: 'europa',
      value: 'Europa',
      moedas: []
    },
    imagem: '200lire.png'
  }
];
