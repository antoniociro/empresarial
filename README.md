# Ciro Sandes — Advocacia Estratégica

Site institucional redesenhado em HTML, CSS e JavaScript. Sete páginas, sem framework, sem compilação e sem dependências externas em tempo de execução.

## Abrir o site

1. Extraia o ZIP inteiro.
2. Abra `index.html` no navegador. Mantenha as pastas ao lado dele.

Os caminhos são relativos: a navegação também funciona diretamente pelos arquivos e em subpastas de hospedagem. Para uma prévia por servidor local, execute na pasta do projeto:

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000`. Para publicar, envie todo o conteúdo desta pasta para uma hospedagem de arquivos estáticos. Não é necessário executar npm, instalar pacotes ou fazer build.

## Arquivos

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Página inicial |
| `atuacao/index.html` | Quatro frentes de atuação e três áreas do direito |
| `equipe/index.html` | Apresentação do escritório |
| `equipe/antonio-ciro-sandes-de-oliveira/index.html` | Perfil do advogado |
| `publicacoes/index.html` | Espaço editorial com estado “em breve” |
| `contato/index.html` | Canais diretos e preparação de mensagem |
| `privacidade/index.html` | Funcionamento dos dados nesta versão |
| `css/style.css` | Identidade visual, componentes e regras responsivas |
| `js/main.js` | Navegação, animações, acordeões e formulário |
| `assets/img/architecture.svg` | Composição arquitetônica vetorial original |
| `assets/icons/favicon.svg` | Ícone da identidade visual |
| `assets/icons/skyline.svg` | Silhueta de cidade usada nos fundos escuros |
| `assets/img/equipe/` | Pasta da foto do advogado (`antonio-ciro-sandes.jpg`) |
| `assets/fonts/` | Fontes locais Liberation Sans e sua licença |

## O que foi alterado

- Nova composição editorial, com verde institucional, marfim e bege.
- Tipografia sem serifa, hierarquia mais clara e uso restrito de letras maiúsculas.
- Monograma CS em SVG e uma composição arquitetônica própria no início.
- Entrada de conteúdo, movimento ambiental, resposta sutil ao ponteiro, acordeões com altura animada e estados de hover/foco.
- Controle para pausar movimento, respeito a `prefers-reduced-motion` e suspensão da animação principal fora da tela/aba.
- Menu móvel com navegação por teclado, Escape, indicação de estado e gerenciamento de foco.
- Layouts para celular, tablet e desktop; campos com tamanho adequado no celular.
- Links internos e fontes locais, sem imagens quebradas, CDN, rastreamento ou pacotes de animação.
- Conteúdo provisório retirado da apresentação pública. Não foram criados números de experiência, credenciais, prêmios, retratos ou artigos fictícios.

## Editar a aparência

Os tokens estão no início de `css/style.css`, com a paleta Ciro Sandes:

| Variável | Função | Cor |
| --- | --- | --- |
| `--paper` | Fundo principal (marfim) | `#F6F3ED` |
| `--paper-deep` | Fundo alternativo (bege claro) | `#EAE5DB` |
| `--white` | Branco auxiliar | `#FCFBF8` |
| `--forest` | Verde institucional | `#0C3C2F` |
| `--forest-deep` | Verde mais escuro (hero, rodapé) | `#082923` |
| `--ink` | Texto principal | `#191918` |
| `--taupe` | Cinza/taupe auxiliar | `#989590` |
| `--line` / `--sage` | Bordas e acentos sobre fundo escuro | `#DED9D0` |
| `--muted` | Texto corrido secundário | `#6E6A63` (taupe escurecido para leitura) |

As demais tonalidades do CSS e do arco (`assets/img/architecture.svg`) foram derivadas dessa paleta.

## Logo, foto e fundos

- **Logo:** reproduzida em HTML/CSS (`.brand-type`), em serifa (Georgia), maiúsculas espaçadas e a inicial de cada palavra um tamanho acima, no formato do logotipo "CIRO SANDES / ADVOCACIA ESTRATÉGICA". É tipográfica para aparecer em marfim sobre o verde escuro.
- **Foto do advogado:** salve o arquivo como `assets/img/equipe/antonio-ciro-sandes.jpg`. Ela aparece na página inicial, em `equipe/` e no perfil. Enquanto o arquivo não existir, o painel mostra o monograma "CS".
- **Fundos:** hero e banners internos usam a silhueta de cidade (`assets/icons/skyline.svg`) e a hachura diagonal; as seções em bege usam a hachura discreta.
- **WhatsApp:** botão fixo no canto inferior direito de todas as páginas.

Os textos são HTML real, disponível antes da execução do JavaScript. Edite os arquivos de cada página. Cabeçalho e rodapé aparecem em todas as páginas; mantenha as alterações de marca e contatos consistentes entre elas.

## Contato: comportamento real

O site é estático e não tem servidor de envio.

- WhatsApp abre o canal do número já presente no material original.
- Telefone usa `tel:` e e-mail usa `mailto:`.
- O formulário valida campos e consentimento, prepara assunto e corpo e solicita a abertura do aplicativo de e-mail do visitante.
- O visitante revisa e confirma o envio no aplicativo. O site não anuncia “mensagem enviada”.
- Após preparar o texto, a opção “Copiar mensagem” permite usá-lo em outro aplicativo. Os campos não são apagados.
- Nenhum dado do formulário é gravado em cookies, `localStorage`, banco de dados ou enviado para um endpoint pelo código do site.

Para envio automático dentro da página, será necessário conectar um serviço/backend e ajustar o texto de privacidade ao tratamento efetivamente realizado.

## Conteúdo ainda não fornecido

O arquivo original não continha logotipo final, fotografia do advogado, número de inscrição da OAB, formação, anos de experiência ou artigos reais. A nova versão usa identidade tipográfica e composição vetorial no lugar de imagens ausentes; publicações ficam sinalizadas como “em breve”.

Adicione os dados profissionais confirmados e os materiais definitivos antes da divulgação pública. Os contatos e o endereço foram preservados conforme o arquivo recebido, sem verificação externa. As informações de privacidade descrevem o comportamento deste código; complemente-as com as práticas efetivas do escritório e da hospedagem.

As páginas de publicações e privacidade mantêm `noindex,follow` enquanto o conteúdo definitivo é revisado. Não há domínio fictício nas tags canonical/og:url; configure esses metadados quando o domínio final for conhecido.

## Verificação desta entrega

- Sintaxe de JavaScript verificada com `node --check`.
- Arquivos e destinos locais das sete páginas verificados, incluindo âncoras, fontes e SVGs.
- Identificadores únicos, um título principal por página e associação entre campos e rótulos conferidos.
- As sete páginas foram abertas no Chromium em 1440px e 390px: sem erros de JavaScript, sem arquivos ausentes (exceto a foto, ainda não fornecida), sem conteúdo invisível após a rolagem e sem rolagem horizontal. O espaço da foto foi testado com uma imagem provisória. Não foi feita uma certificação formal de acessibilidade ou de desempenho.

## Fontes e recursos

Liberation Sans está distribuída junto ao projeto sob SIL Open Font License 1.1. O aviso de direitos autorais e a licença completa estão em `assets/fonts/LICENSE.txt`. Os demais elementos gráficos desta versão foram construídos em SVG/CSS; não há imagens de banco externas.
