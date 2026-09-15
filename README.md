# Ciro Sandes Advocacia Estratégica — site institucional

Site estático (HTML/CSS/JS puro, sem dependências de build), estruturado para
ficar próximo do site de referência (header transparente sobre o hero,
botões achatados com cantos cortados, sem cards com sombra, seções com
textura sutil alternando com seções lisas).

## Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Imagens pendentes

O HTML já referencia os caminhos abaixo — enquanto não existirem, o layout
usa cores neutras no lugar e nada quebra visualmente:

- `assets/img/logo/ciro-sandes-logo.png` — logotipo, usado no header e no rodapé
- `assets/img/equipe/antonio-ciro-sandes.jpg` — foto do advogado (retrato, ideal proporção 4:5)

Basta salvar os arquivos com esses nomes exatos nessas pastas.

## Pendências de conteúdo

Busque por `[...]` no `index.html`:

- `OAB/SC [número]` (aparece no perfil do advogado e no rodapé)
- `[X] ANOS DE EXPERIÊNCIA` — preencher o tempo de atuação
- `[Título da publicação 1/2/3]` — publicações reais, se houver

## Cores

Paleta em `css/style.css`, no topo (`:root`):

| Token | Uso | Hex |
|---|---|---|
| `--color-bg` | fundo principal (marfim) | `#F6F3ED` |
| `--color-bg-alt` | fundo alternado (seções "experiência"/"publicações") | `#EAE5DB` |
| `--color-white` | branco auxiliar (cartões, molduras) | `#FCFBF8` |
| `--color-green` | verde institucional (header, hero, footer, contato, links) | `#0C3C2F` |
| `--color-text` | texto principal | `#191918` |
| `--color-text-muted` | texto secundário | `#989590` |
| `--color-border` | bordas | `#DED9D0` |

## Tipografia

- `--font-base` (Raleway): usada em quase todo o site, como no site de referência
- `--font-heading` (Georgia): reservada só para a marca "Ciro Sandes" no
  header/rodapé, com a inicial de cada palavra importante ampliada via
  `js/main.js` → `applyCapInitials` (classe `cap-initials`)

## Header

Fica transparente sobre o hero e passa a ter fundo verde sólido ao rolar a
página — controlado por `js/main.js` (`updateHeaderState`, classe
`is-scrolled`).

## Formulário de contato

O formulário em `#contato` valida no client-side mas não envia e-mail ainda —
conecte a um serviço como Formspree, EmailJS ou seu próprio backend (ver
`js/main.js`).

## Próximos passos sugeridos

- Adicionar o logotipo e a foto do advogado
- Preencher número da OAB e anos de experiência
- Adicionar SEO (Open Graph, sitemap, schema.org LegalService)
