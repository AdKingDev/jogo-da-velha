# ❌⭕ Jogo da Velha

Uma versão web do clássico **Jogo da Velha**, desenvolvida com **HTML, CSS e JavaScript**, em que o jogador enfrenta uma CPU capaz de analisar o tabuleiro antes de realizar sua jogada.

O projeto foi desenvolvido para praticar lógica de programação, manipulação do DOM, arrays, eventos e construção de regras de jogo.

## 🔗 Demonstração

[Acessar o Jogo da Velha](https://jogo-da-velha-five-bice.vercel.app/)

## 🎮 Sobre o projeto

O jogador utiliza **X** e disputa cada partida contra a CPU, representada por **O**.

O objetivo segue as regras tradicionais: formar uma sequência de três símbolos iguais em uma linha horizontal, vertical ou diagonal antes do adversário.

A aplicação possui:

* Partidas contra a CPU;
* Verificação automática de vitória;
* Detecção de empate;
* Placar entre jogador e computador;
* Alternância de quem inicia cada nova partida;
* Reinício após o fim da rodada;
* Feedback visual da próxima jogada disponível.

## 🧠 Lógica de vitória

As possibilidades de vitória são armazenadas em uma matriz com todas as combinações válidas do tabuleiro:

```javascript
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
```

Para verificar uma vitória, a aplicação percorre essas combinações e verifica se todas as posições possuem a marca do mesmo jogador.

Dessa forma, a mesma lógica pode ser utilizada tanto para o jogador quanto para a CPU.

## 🤖 Inteligência da CPU

A CPU segue uma pequena ordem de prioridades antes de realizar sua jogada.

### 1. Tentar vencer

Primeiro, ela procura uma combinação em que já possua duas marcações e exista uma terceira casa disponível.

### 2. Bloquear o jogador

Caso não consiga vencer naquele turno, a CPU procura uma possível vitória do jogador e ocupa a casa necessária para bloqueá-la.

### 3. Jogada aleatória

Se nenhuma das situações anteriores existir, uma das casas disponíveis é selecionada utilizando `Math.random()` e `Math.floor()`.

Essa lógica torna o adversário mais estratégico do que uma CPU baseada exclusivamente em escolhas aleatórias.

## 🔄 Sistema de turnos

Após cada jogada:

1. A marca é adicionada ao tabuleiro;
2. O sistema verifica se houve vitória;
3. Verifica se todas as casas foram preenchidas;
4. Caso a partida continue, o turno é alternado;
5. A CPU realiza sua jogada após um pequeno intervalo.

Ao iniciar uma nova rodada, o jogador inicial também é alternado entre **X** e **O**.

## 🏆 Placar

O projeto mantém a pontuação durante a sessão atual.

Quando o jogador vence:

```text
Jogador +1
```

Quando a CPU vence:

```text
CPU +1
```

Empates não alteram o placar.

Após o encerramento da rodada, uma tela apresenta o resultado e permite iniciar uma nova partida.

## 🎨 X e O com CSS

Os símbolos do tabuleiro não utilizam imagens.

O **X** e o **O** são construídos diretamente com CSS através de:

* `::before`;
* `::after`;
* `transform: rotate()`;
* `border-radius`;
* Posicionamento absoluto.

O tabuleiro também apresenta uma prévia transparente da marca que ocupará uma casa disponível ao passar o cursor sobre ela.

## 🛠️ Tecnologias

* **HTML5** — estrutura do tabuleiro e interface;
* **CSS3** — layout, símbolos, efeitos e tela de resultado;
* **JavaScript** — regras, turnos, CPU, placar e manipulação do DOM;
* **Vercel** — deploy da aplicação.

## 🧠 Conceitos praticados

Durante o desenvolvimento deste projeto, foram aplicados conceitos como:

* Arrays e arrays multidimensionais;
* Funções;
* Eventos;
* `addEventListener()`;
* NodeLists;
* Spread Operator;
* `.some()`;
* `.every()`;
* `.map()`;
* `.filter()`;
* `.indexOf()`;
* Estruturas condicionais;
* Operador ternário;
* `Math.random()`;
* `Math.floor()`;
* `setTimeout()`;
* Manipulação do DOM;
* `classList`;
* Controle de estado;
* CSS Grid;
* Pseudo-elementos;
* Seletores `:nth-child()`;
* Posicionamento;
* Transformações CSS.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por **Adriano Júnio**.
