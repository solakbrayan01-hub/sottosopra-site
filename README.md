# Sottosopra · Officina Rigenerativa

Sito vetrina per l'azienda agricola Sottosopra. Versione multi-pagina.

## Struttura

```
sottosopra-site/
├── index.html          → Homepage
├── cassetta.html       → La Cassetta (prenotazione, FAQ, prezzi)
├── contatti.html       → Contatti, mappa, B2B
├── vercel.json         → Configurazione Vercel
├── README.md           → Questo file
└── shared/
    ├── style.css       → CSS comune (header, footer, bottoni, tipografia)
    ├── home.css        → CSS specifico homepage
    ├── cassetta.css    → CSS specifico cassetta
    ├── contatti.css    → CSS specifico contatti
    ├── main.js         → JS comune (cursore torcia, menu mobile)
    └── home.js         → JS specifico homepage (animazione + calendario)
```

## Deploy su Vercel

Il sito è già collegato a Vercel via GitHub. Per aggiornare:

1. Vai sul repo GitHub `sottosopra-site`
2. **Add file → Upload files**
3. Trascina TUTTO il contenuto della cartella (mantenendo la struttura `shared/`)
4. Commit changes
5. Vercel fa il deploy in ~30 secondi automaticamente

**Importante:** la cartella `shared/` deve essere caricata mantenendo il nome esatto e i file dentro. Su GitHub via web upload, trascina la cartella intera e GitHub la ricrea con tutti i file dentro.

## Pagine attive

- `/` → Homepage
- `/cassetta.html` → Pagina prodotto cassetta settimanale
- `/contatti.html` → Form contatti + mappa + B2B

## Pagine da fare (Fase 2)

- `/metodo.html` → Approfondimento 4 principi rigenerativi
- `/coltiviamo.html` → Catalogo completo prodotti
- `/diario.html` → Lista articoli del diario
- `/diario-articolo.html` → Template singolo articolo
- `/officina.html` → Storia azienda + prenota visita + vendita diretta + mercati

## Modificare il contenuto

I colori del brand sono in `shared/style.css`, tutti dentro `:root` in cima.

Per cambiare un testo: apri il file della pagina e modifica direttamente. Per cambiare lo stile dell'header/footer/bottoni in tutte le pagine in un colpo solo: modifica `shared/style.css`.

## Da fare in produzione

- [ ] Foto reali al posto delle illustrazioni SVG
- [ ] Form (cassetta, contatti, newsletter) collegati a un servizio (Formspree, Brevo, ecc.)
- [ ] Logo finale (rapa rossa decisa, da disegnare in versione vettoriale pulita)
- [ ] Privacy policy, cookie policy, impressum
- [ ] Mappa reale (Google Maps embed o Leaflet/OpenStreetMap)
- [ ] Articoli del Diario su pagine dedicate
- [ ] Meta tag Open Graph con immagine di anteprima

## Note tecniche

- Sito statico, nessun framework, nessun build step
- Font caricati da Google Fonts CDN (Fraunces, Inter, JetBrains Mono)
- Animazione hero: SVG nativo + ~80 righe di JS, no librerie
- Cursore torcia: solo desktop, disattivato su touch via `@media (hover: none)`
- Calendario circolare: SVG generato dinamicamente da array `products` in `home.js`
- Breakpoint mobile: 768px (tablet) e 480px (smartphone piccoli)
