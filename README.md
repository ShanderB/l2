## Objetivo

Projeto feito para vaga Angular pleno da L2Code.

## Requisitos

Node.JS (^20.15.0)

## Iniciar o Projeto

- Execute o `npm i` e em seguida `npm start` para executar o projeto.<br>
- Por padrão será iniciado na porta `4200`.


## Frameworks, Ferramentas e Metodologias

- `Angular 18`
- `Angular 18 Routes`
- `Angular 18 Form`
- `TailwindCSS`
- `RxJs`
- `NxJs`
- `Estrutura Clean Code e Arquitetura SOLID`

## Guia

- O projeto inicia com 3 games mockados.

- Na parte inferior existe o botão de cadastrar novos games, que serão persistidos pela sessão.
- Não é permitido a inserção de valores não numéricos  nos campos de número. O campo de imagem existe mas por conveniência não é utilizado. Ao cadastrar um produto o código seleciona aleatoriamente uma imagem existente.

<br><br>

- Se clicado em `Enviar Produto`, será habilitado um botão toggle para selecionar os objetos para envio. Selecione-os e clique em `Finalizar Envio`.
- No topo da tela será exibido o resultado e, caso algum problema ocorra, será apresentado uma mensagem vermelha.

### Disclaimer
- Será calculado quais caixas devem ser utilizadas ao clicar no botão de finalizar. Inicialmente está funcional porém não todas as situações. Um exemplo é utilizar os games na medida `50x50x50, 40x40x40, 10x10x10`. O resultado deveria ser duas caixas de `50x50x50`. Eu consegui criar o código para cobrir essa situação, mas a maior parte das outras situações não funcionava. O mesmo ao contrário, quando arrumado as outras situações, não funcionava para múltiplas caixas.

- Para facilitar a codificação, crie um código de testes bem simples. Caso queira usar, é o arquivo `test`. Lá existe um simples guia de como utilizar.
- Seria mais prático utilizar um Jest ou Jasmine, mas devido ao tempo não fiz a criação disso mas utilizo a 4 anos.