export const mockTracks = [
    {
      id: 'algoritmos-portugol',
      step: '01',
      title: 'Algoritmos',
      lang: 'Portugol',
      description: 'Lógica sequencial, variáveis, condicionais e laços de repetição sem complicação sintática.',
      progress: 50,
      lessons: [
        { id: 101, title: '1. Variáveis e Tipos de Dados', duration: '10 min', type: 'Múltipla Escolha', status: 'completed' },
        { id: 102, title: '2. Entrada e Saída (leia / escreva)', duration: '12 min', type: 'Algoritmo Prático', status: 'completed' },
        { id: 103, title: '3. Estrutura Condicional (se / senao)', duration: '15 min', type: 'Algoritmo Prático', status: 'current' },
        { id: 104, title: '4. Escolha / Caso (switch)', duration: '12 min', type: 'Múltipla Escolha', status: 'locked' },
        { id: 105, title: '5. Laço de Repetição (para / enquanto)', duration: '20 min', type: 'Algoritmo Prático', status: 'locked' },
        { id: 106, title: '6. Vetores Unidimensionais', duration: '25 min', type: 'Algoritmo Prático', status: 'locked' },
      ]
    },
    {
      id: 'linguagem-c',
      step: '02',
      title: 'Linguagem de Programação',
      lang: 'Linguagem C',
      description: 'Transição para sintaxe real em C, tipagem estática, funções, arrays e introdução a ponteiros.',
      progress: 15,
      lessons: [
        { id: 201, title: '1. Estrutura Base (main, stdio.h, printf/scanf)', duration: '15 min', type: 'Algoritmo Prático', status: 'completed' },
        { id: 202, title: '2. Operadores Lógicos e Condicionais em C', duration: '15 min', type: 'Múltipla Escolha', status: 'current' },
        { id: 203, title: '3. Modularização e Funções', duration: '20 min', type: 'Algoritmo Prático', status: 'locked' },
        { id: 204, title: '4. Ponteiros e Endereços de Memória', duration: '30 min', type: 'Algoritmo Prático', status: 'locked' },
      ]
    },
    {
      id: 'ed-basica-c',
      step: '03',
      title: 'Estruturas de Dados Básicas',
      lang: 'Linguagem C',
      description: 'Structs, alocação dinâmica (malloc/free), pilhas, filas e listas encadeadas.',
      progress: 0,
      lessons: [
        { id: 301, title: '1. Structs e Tipos Abstratos de Dados', duration: '18 min', type: 'Múltipla Escolha', status: 'current' },
        { id: 302, title: '2. Alocação Dinâmica (malloc, calloc, free)', duration: '25 min', type: 'Algoritmo Prático', status: 'locked' },
        { id: 303, title: '3. Pilhas (LIFO) na Prática', duration: '25 min', type: 'Algoritmo Prático', status: 'locked' },
        { id: 304, title: '4. Filas (FIFO) e Listas Encadeadas', duration: '30 min', type: 'Algoritmo Prático', status: 'locked' },
      ]
    },
    {
      id: 'ed-avancada',
      step: '04',
      title: 'Estruturas de Dados Avançadas',
      lang: 'Estrutura Inicial',
      description: 'Árvores binárias, balanceamento, grafos e noções de complexidade Big-O.',
      progress: 0,
      lessons: [
        { id: 401, title: '1. Noções de Complexidade (Notação Big-O)', duration: '15 min', type: 'Múltipla Escolha', status: 'current' },
        { id: 402, title: '2. Árvores Binárias de Busca', duration: '25 min', type: 'Algoritmo Prático', status: 'locked' },
        { id: 403, title: '3. Introdução a Grafos', duration: '30 min', type: 'Múltipla Escolha', status: 'locked' },
      ]
    }
  ];
  
  export const mockSavedCards = [
    {
      id: 'card-1',
      track: 'Algoritmos',
      lang: 'Portugol',
      type: 'Múltipla Escolha',
      title: 'Atribuição e Tipos de Variáveis',
      date: 'Concluído recentemente',
      difficulty: 'Fácil',
      questionSummary: 'Qual tipo de dado em Portugol deve ser usado para armazenar a média final 8.5 de um aluno?',
      userAnswer: 'real media = 8.5',
      takeaway: 'Números com casas decimais exigem o tipo "real" (equivalente ao float/double em C), enquanto "inteiro" armazena apenas valores sem vírgula.'
    },
    {
      id: 'card-2',
      track: 'Algoritmos',
      lang: 'Portugol',
      type: 'Algoritmo Inteiro',
      title: 'Calculadora de Média Simples',
      date: 'Concluído recentemente',
      difficulty: 'Médio',
      questionSummary: 'Ler duas notas do aluno, calcular a média aritmética e exibir o resultado na tela.',
      userAnswer: `programa {\n  funcao inicio() {\n    real n1, n2, media\n    leia(n1, n2)\n    media = (n1 + n2) / 2\n    escreva("Média: ", media)\n  }\n}`,
      takeaway: 'O uso de parênteses em (n1 + n2) é obrigatório para garantir a precedência da soma antes da divisão por 2.'
    },
    {
      id: 'card-3',
      track: 'Linguagem de Programação',
      lang: 'Linguagem C',
      type: 'Algoritmo Inteiro',
      title: 'Leitura Formatada com scanf',
      date: 'Revisão recomendada',
      difficulty: 'Médio',
      questionSummary: 'Ler um número inteiro digitado pelo usuário e armazená-lo no endereço de memória da variável.',
      userAnswer: `#include <stdio.h>\n\nint main() {\n  int idade;\n  scanf("%d", &idade);\n  printf("Idade: %d", idade);\n  return 0;\n}`,
      takeaway: 'Em C, o operador "&" no scanf é indispensável para passar o endereço de memória da variável onde o valor será guardado.'
    }
  ];