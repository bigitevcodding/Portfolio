# Portfolio — Tévin Bouvet

Site : https://www.portfolio.sarl — BTS SIO option SISR, alternant infrastructure chez OPmobility.

## Architecture
- Site statique hébergé sur Vercel (déploiement à chaque commit sur `main`), DNS Cloudflare.
- `index.html` : structure seule, aucun script ni style en ligne.
- `css/site.css`, `js/app.js` : affichage. `js/admin.js` + `css/admin.css` : chargés seulement à l'ouverture du mode admin.
- `content.json` : tout le contenu (projets, veille, certifications), modifiable depuis le mode admin.
- Polices et bibliothèques (GSAP, Lenis) hébergées sur le site : aucune requête externe.

## Sécurité
- En-têtes HTTP (`vercel.json`) : CSP stricte (`script-src 'self'`), HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP.
- Contenu échappé avant affichage, liens filtrés (http, https, mailto, tel uniquement).
- Mode admin : code vérifié par PBKDF2-SHA256 (600 000 itérations), jeton GitHub chiffré AES-GCM dans le navigateur, attente croissante après chaque erreur, verrouillage après 20 min d'inactivité.
- Publication refusée si la version en ligne a changé depuis l'ouverture du brouillon.
- `/.well-known/security.txt` pour signaler une faille.
