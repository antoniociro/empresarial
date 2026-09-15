# Ciro Sandes Advocacia Estratégica — site institucional

Site estático (HTML/CSS/JS puro, sem dependências de build), com identidade
navy + dourado, tipografia Georgia nos títulos e efeito de iniciais
maiores nas palavras importantes dos cabeçalhos.

## Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Imagens pendentes

O HTML já referencia os caminhos abaixo — os cards e o header ficam com um
fundo neutro (gradiente) até essas imagens serem adicionadas, então nada
quebra visualmente enquanto isso:

- `assets/img/logo/ciro-sandes-logo.png` — logotipo "CIRO SANDES / ADVOCACIA ESTRATÉGICA"
- `assets/img/equipe/antonio-ciro-sandes.jpg` — foto do advogado (retrato)
- `assets/img/pilares/consultivo.jpg` — foto de fundo do card "Consultivo estratégico"
- `assets/img/pilares/contencioso.jpg` — foto de fundo do card "Contencioso judicial & arbitral"
- `assets/img/pilares/pareceres.jpg` — foto de fundo do card "Pareceres e notas técnicas"
- `assets/img/pilares/co-counseling.jpg` — foto de fundo do card "Co-counseling"

Basta salvar os arquivos com esses nomes exatos nessas pastas.

## Pendências de conteúdo

Busque por `[...]` no `index.html`:

- `OAB/SC [número]` (aparece no perfil do advogado e no rodapé)
- `[X] ANOS DE EXPERIÊNCIA` — preencher o tempo de atuação
- `[Título da publicação 1/2/3]` — publicações reais, se houver

## Cores e fonte

Definidas em `css/style.css`, no topo (`:root`):

- `--color-navy` / `--color-navy-2`: header (quando escuro), hero, footer
- `--color-gold` / `--color-gold-dark`: destaque (botões, bordas, links)
- `--color-cream`: fundo claro do header e de seções alternadas
- `--font-heading`: Georgia (títulos, marca) · `--font-base`: Raleway (corpo de texto)

## Efeito de iniciais maiores

Qualquer elemento com a classe `cap-initials` tem a primeira letra de cada
palavra "importante" (ignora conectivos como "de", "e", "da") aumentada via
`js/main.js` → função `applyCapInitials`. Já aplicado à marca, ao hero e aos
títulos de seção. Sem JavaScript, o texto continua legível normalmente,
apenas sem o destaque tipográfico.

## Formulário de contato

O formulário em `#contato` valida no client-side mas não envia e-mail ainda —
conecte a um serviço como Formspree, EmailJS ou seu próprio backend (ver
`js/main.js`).

## Próximos passos sugeridos

- Adicionar as imagens listadas acima
- Preencher número da OAB e anos de experiência
- Adicionar SEO (Open Graph, sitemap, schema.org LegalService)
