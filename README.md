# Ciro Sandes Advocacia Estratégica — site institucional

Site estático multi-página (HTML/CSS/JS puro, sem build/framework),
reproduzindo a arquitetura de informação, grid, ritmo editorial e
comportamento do site de referência (header transparente sobre o hero que
vira sólido ao rolar, botões achatados com cantos cortados, sem cards com
sombra/ícones-em-bolinha, seções com textura sutil alternando com seções
lisas), aplicados à identidade própria (Ciro Sandes Advocacia Estratégica).

## Estrutura de páginas

```
/                                          Home
/atuacao/                                  Áreas de atuação
/equipe/                                   Grid da equipe
/equipe/antonio-ciro-sandes-de-oliveira/   Perfil individual
/publicacoes/                              Publicações (grid completo)
/contato/                                  Contato (formulário, variante clara)
/privacidade/                              Política de Privacidade (stub, noindex)
```

Cada página é um `index.html` próprio (rotas "limpas" via pasta +
`index.html`), todas compartilhando `css/style.css` e `js/main.js` através de
caminhos **absolutos** (`/css/style.css`, `/assets/...`) — funciona ao servir
o projeto a partir da raiz de um domínio. Não há necessidade de build.

## Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` (sirva a partir da raiz do projeto, para
os caminhos `/css/...` e `/assets/...` resolverem).

## Imagens pendentes

O HTML já referencia os caminhos abaixo — enquanto não existirem, o layout
usa cores neutras no lugar e nada quebra visualmente:

- `assets/img/logo/ciro-sandes-logo.png` — logotipo, usado no header e no rodapé de todas as páginas
- `assets/img/equipe/antonio-ciro-sandes.jpg` — foto do advogado (retrato, proporção 4:5), usada em `/`, `/equipe/` e `/equipe/antonio-ciro-sandes-de-oliveira/`

Basta salvar os arquivos com esses nomes exatos nessas pastas.

## Pendências de conteúdo

Busque por `[...]` nos arquivos `.html`:

- `OAB/SC [número]` — perfil do advogado e rodapé de todas as páginas
- `[X] ANOS DE EXPERIÊNCIA` — homepage
- `[Título da publicação N]` — homepage e `/publicacoes/`
- `[Associação]/[Certificação]/[Reconhecimento]` — seção "Reconhecimentos e Associações" na homepage (placeholders neutros, sem logos fabricados)
- `[Graduação — instituição, ano]` / `[Português, ...]` — perfil individual em `/equipe/antonio-ciro-sandes-de-oliveira/`
- `https://seudominio.com.br/` — trocar pelo domínio real nas tags `canonical`/`og:url` de cada página

## Cores

Paleta em `css/style.css`, no topo (`:root`):

| Token | Uso | Hex |
|---|---|---|
| `--color-bg` | fundo principal (marfim) | `#F6F3ED` |
| `--color-bg-alt` | fundo alternado (seções "experiência"/"publicações"/page-hero) | `#EAE5DB` |
| `--color-white` | branco auxiliar (molduras, thumbs, formulário claro) | `#FCFBF8` |
| `--color-green` | verde institucional (header, hero, footer, contato, links, botões) | `#0C3C2F` |
| `--color-text` | texto principal | `#191918` |
| `--color-text-muted` | texto secundário | `#989590` |
| `--color-border` | bordas | `#DED9D0` |

Paleta fixa (não segue o dark mode do sistema — é uma marca, não um app).

## Tipografia

- `--font-base` (Raleway): usada em todo o corpo de texto e títulos de seção
- `--font-heading` (Georgia): reservada só para a marca "Ciro Sandes" no
  header/rodapé, com a inicial de cada palavra importante ampliada via
  `js/main.js` → `applyCapInitials` (classe `cap-initials`)

## Header

`--header-height: 110px` no desktop, `90px` em telas ≤860px, e
`--header-height-scrolled: 55px` ao rolar — fica transparente sobre a seção
escura no topo de cada página (`.hero` na home, `.page-hero` nas demais) e
passa a ter fundo verde sólido, controlado por `js/main.js`
(`updateHeaderState`, classe `is-scrolled`).

## Formulário de contato

Os formulários em `/` e `/contato/` validam no client-side (incluindo o
checkbox de consentimento LGPD, desmarcado por padrão) mas não enviam
e-mail ainda — conecte a um serviço como Formspree, EmailJS ou seu próprio
backend (ver `js/main.js`).

## Próximos passos sugeridos

- Adicionar o logotipo e a foto do advogado
- Preencher número da OAB, anos de experiência e domínio real
- Escrever o conteúdo completo de `/privacidade/`
- Ampliar `/equipe/` conforme novos profissionais entrarem (o grid já é responsivo a qualquer quantidade de perfis)
