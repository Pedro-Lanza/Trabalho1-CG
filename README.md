Grupo  -  Bruna Becker Legey
       -  Pedro Lanzarini

Para a visualização das questões basta executar os arquivos "trabalho.html" e "showcase.html"
cada um mostra o funcionamento para as respectivas questões:
  - trabalho.html:  1, 2, 3 & 5
  - showcase.html:  4 & 6

O arquivo trabalho.html apresenta o funcionamento dos modelos criados para as questões 1, 2, 3 e 5, além de exemplos de rotação, translação e animação.
O arquivo showcase.html apresenta o desenho referente à questão 4, em conjunto com a implementação de animação referente à questão 6,
o desenho em questão se inspira na criatura Angeling do MMORPG Ragnarok, uma slime com asas e uma auréola de forma angelical.

Ao arquivo WebGLShape2d foram adicionados os seguintes modelos:
  - WebGLPolygon:
      Modelo de desenho de poligonos, com implementação por algoritmo de Ear Clipping
  - WebGLLine:
      Modelo de desenho de linhas retas, fornecendo os dois pontos que devem ser interligados
  - WebGLRectangle:
      Modelo para desenho de retângulos, fornecendo vértice inicial (topo esquerda) junto da altura e largura
  - WebGLElipse:
      Modelo para desenho de uma elipse, fornecendo as coordenados do centro, largura, e altura
  - WebGLArc:
      Modelo referente a um semi-circulo, utilizado para compor o desenho para a questão 4
  - WebGLAngeling:
      Modelo referente à figura feita para a questão 4, composto por modelos de WebGLCircle e WebGLArc
  - WebGLAngelWing:
      Mo0delo referente à asa da criatura em questão, composta por modelos de WebGLCircle, WebGLElipse e WebGLLine, com funcionalidade de espelhagem

À função de desenho (draw()) da classe WebGLModel foram adicionadas as funcionalidades de rotação e translação dos objetos, para que realizasse as transformações
individualmente para cada figura conforme desejado, além de ser possível aplicar animação por meio de um contador de tempo nos parametros de translação.
As alterações são aplicadas diretamente a uniformes nos shaders, estabelecendo os valores respectivos para cada objeto de forma que apenas os vértices
pertencentes a eles sofram as alterações.
