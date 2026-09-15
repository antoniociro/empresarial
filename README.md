# Site institucional

Site estático (HTML/CSS/JS puro, sem dependências de build) inspirado na estrutura de
um site de escritório de advocacia clássico: header fixo, hero, pilares de atuação,
seção institucional, publicações, equipe e contato com botão flutuante de WhatsApp.

## Como rodar localmente

Abra `index.html` direto no navegador, ou sirva a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
```

## O que personalizar

Busque por `[...]` no `index.html` — são os pontos de conteúdo a substituir:

- `[Seu Escritório]` / `[Seu Nome]` — nome da marca (aparece no header, título, footer)
- Textos do hero, pilares, "sobre" e áreas de atuação
- Fotos: troque `.team-photo` / `.pub-thumb` (hoje são placeholders em CSS) por `<img>`
- Endereço, telefone, e-mail e link do WhatsApp (`wa.me/55...`) na seção de contato e no botão flutuante
- `assets/icons/favicon.svg` — iniciais e cores da marca

## Cores e fonte

Definidas em `css/style.css`, no topo, como CSS custom properties (`:root`):

- `--color-dark` / `--color-dark-2`: header, footer, seções escuras
- `--color-accent`: cor de destaque (botões, links, títulos)
- Fonte: [Raleway](https://fonts.google.com/specimen/Raleway) via Google Fonts

Troque essas variáveis para adaptar à identidade visual do seu negócio.

## Formulário de contato

O formulário em `#contato` valida no client-side mas não envia e-mail ainda — conecte a
um serviço como Formspree, EmailJS ou seu próprio backend (ver `js/main.js`).

## Próximos passos sugeridos

- Trocar placeholders de imagem por fotos reais (equipe, publicações)
- Criar páginas internas (ex: `atuacao.html`, `equipe.html`) se o conteúdo crescer
- Adicionar SEO (Open Graph, sitemap, schema.org LegalService) quando o domínio final estiver definido
