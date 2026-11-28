/* Portfolio de Tévin Bouvet — site */
/* ==========================================================================
   ✏️  CONFIG — TOUT CE QUE TU MODIFIES EST ICI
   --------------------------------------------------------------------------
   UNE CASE = un objet { ... } dans la liste "items" d'une catégorie.

   Champs disponibles (tous facultatifs sauf title) :
     title : 'Titre de la case'
     text  : 'Texte affiché sous le titre'
     image : 'img/mon-image.jpg'        ← image de la case + couverture
     year  : '2026'
     tags  : ['VMware', 'Cisco']
     meta  : [['Année','2026'], ['Rôle','Apprenti'], ['Outils','ESXi']]
     blocks: [                           ← contenu de la page qui s'ouvre au clic
       { label: 'Contexte', text: 'Ton texte. Sépare les paragraphes par \n\n' },
       { label: 'Schéma',   image: 'img/schema.png', caption: 'Légende' },
       { label: 'Outils',   list: ['ESXi', 'vCenter'] },
       { label: 'Commandes',code: 'Get-VM | Move-VM -Destination ...' }
     ]
   Si "blocks" est absent, la page affiche un modèle vide à remplir.

   ➕ Ajouter une case : copie une ligne { title: 'Title', ... }, colle-la.
   ➖ Supprimer une case : efface sa ligne.
   ========================================================================== */
const CONFIG = {
  site: {
    firstName: 'Tévin',
    lastName:  'Bouvet',
    eyebrow:   '',
    tagline:   'BTS SIO SISR — Alternant chez OPmobility',
    sub:       'Infrastructure, réseaux & cybersécurité',
    // Entoure un mot d'*étoiles* pour le mettre en orange
    statement: "Je construis, j'administre et je *sécurise* des infrastructures. Alternant chez OPmobility, futur *ingénieur* *cybersécurité.*",
    email:     'ton.email@exemple.com',                         // ← à remplacer
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ton-profil' }, // ← à remplacer
      { label: 'GitHub',   href: 'https://github.com/ton-pseudo' },          // ← à remplacer
      { label: 'CV',       href: 'cv.pdf' }                                  // ← mets cv.pdf à côté du fichier
    ],
    footerLeft:  '© 2026 Tévin Bouvet',
    footerRight: 'BTS SIO — SISR'
  },

  categories: [
    { id: 'entreprise', num: '01', title: 'En entreprise', sub: 'Missions en alternance',
      items: [
        { title: 'Déplacer le cœur de réseau sans coupure',
          text: "Déplacement des deux switchs cœur d'un centre de R&D vers une baie voisine, pendant la pause de midi, sans aucune interruption.",
          image: 'img/schema-deplacement-core.svg',
          tags: ['Réseau', 'Datacenter', 'Continuité de service'],
          meta: [['Cadre', 'Alternance OPmobility'], ['Créneau', 'Pause de midi'], ['Coupure', 'Aucune']],
          blocks: [
            { label: 'Contexte', text: "Le cœur du réseau du centre de R&D repose sur deux switchs cœur. Tous les switchs d'accès s'y raccordent et l'ensemble des VLAN y transite : s'ils s'arrêtent, tout le réseau du site tombe.\n\nIls devaient être déplacés dans une baie voisine du datacenter. Or des machines de R&D tournent en continu sur le réseau : une coupure pouvait interrompre des essais et entraîner des pertes financières importantes." },
            { label: 'Pourquoi c\'est critique', image: 'img/schema-role-core.svg', caption: 'Tout le trafic du site passe par les deux switchs cœur.' },
            { label: 'Objectif', text: "Installer les deux switchs cœur dans la baie voisine sans interrompre ni les VLAN ni les switchs raccordés, dans le créneau de la pause de midi.\n\nL'atout : chaque switch possède deux alimentations. Une seule suffit à le faire fonctionner, ce qui rend le déplacement possible à chaud." },
            { label: 'Déroulement', text: "1. Retrait de la tablette rack qui portait les deux switchs.\n2. Débranchement d'une des deux alimentations de chaque switch : il continue de tourner sur la seconde.\n3. Déplacement des switchs dans la baie voisine, câbles réseau toujours connectés grâce à leur longueur et à leur redondance.\n4. Branchement de l'alimentation libre sur la multiprise (PDU) de la nouvelle baie.\n5. Bascule de la seconde alimentation vers la nouvelle baie." },
            { label: 'Les étapes en schéma', image: 'img/schema-deplacement-core.svg', caption: 'À chaque instant, chaque switch garde au moins une alimentation active.' },
            { label: 'Vérifications et résultat', text: "Contrôle de chaque réseau et sous-réseau (VLAN), état des switchs vérifié : tous les voyants au vert.\n\nDéplacement terminé pendant la pause de midi, sans aucune coupure ni problème constaté. Les machines de R&D ont continué de fonctionner normalement." },
            { label: 'Compétences', list: ['Gestion du patrimoine informatique', 'Continuité de service', 'Redondance électrique', 'Travail en équipe', 'Intervention en datacenter'] },
            { label: 'Ce que j\'ajouterais', text: "Un plan de retour arrière écrit avant de commencer, un ping continu vers quelques équipements clés pendant le déplacement pour prouver l'absence de coupure, un relevé de l'état des switchs avant et après, et la mise à jour du plan de baie." }
          ] },
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' }
      ]
    },
    { id: 'bts', num: '02', title: 'BTS SIO', sub: 'Réalisations scolaires',
      items: [
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' }
      ]
    },
    { id: 'perso', num: '03', title: 'Projets perso', sub: 'Homelab & expérimentations',
      items: [
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' }
      ]
    },
    { id: 'passions', num: '04', title: 'Passions', sub: "Ce que j'aime", cols: 4, unit: 'passion',
      items: [
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' },
        { title: 'Title', text: 'Écris ce que tu veux ici.' }
      ]
    }
  ],

  /* Page « Certifications » (lien en haut à droite, page marron) — statut : Obtenu | En préparation | Objectif */
  /* ===== PAGE VEILLE (onglet beige) : modifiable en mode admin ===== */
  veille: {
    subject: "L'intelligence artificielle en entreprise",
    intro: "Je suis l'arrivée de l'IA générative dans les entreprises : ce qu'elle apporte, les risques qu'elle crée pour la sécurité et les données, et le cadre légal qui l'encadre.",
    method: "À compléter : tes outils (alertes, agrégateur RSS, réseaux), le temps que tu y passes chaque semaine, et comment tu choisis une source fiable.",
    articles: [
      { date: 'Avril 2024', cat: 'Cybersécurité', title: "L'ANSSI publie ses recommandations pour sécuriser un système d'IA générative", source: 'ANSSI',
        url: 'https://cyber.gouv.fr/sites/default/files/document/Recommandations_de_s%C3%A9curit%C3%A9_pour_un_syst%C3%A8me_d_IA_g%C3%A9n%C3%A9rative.pdf',
        points: ["Un guide pour sécuriser un système d'IA générative à chaque étape : entraînement, déploiement, utilisation.", "Risques principaux : données d'entraînement empoisonnées, fuite d'informations sensibles, détournement du modèle par des requêtes malveillantes.", "Conseils : cloisonner le système, maîtriser les données utilisées et ne pas laisser l'IA agir seule sur des actions critiques."],
        impact: "Un assistant IA interne doit être traité comme un service sensible : analyse de risques, droits limités, journalisation.",
        avis: "À compléter : ton avis en une ou deux phrases." },
      { date: 'Avril 2024', cat: 'IA · RGPD', title: "La CNIL publie ses premières recommandations sur le développement des systèmes d'IA", source: 'CNIL',
        url: 'https://www.cnil.fr/fr/ia-la-cnil-publie-ses-premieres-recommandations-sur-le-developpement-des-systemes-dintelligence',
        points: ["Des fiches pratiques pour appliquer le RGPD quand on conçoit un système d'IA.", "Il faut un objectif précis, une base légale, et limiter les données personnelles utilisées.", "Message de la CNIL : le RGPD n'empêche pas l'innovation, il lui donne un cadre."],
        impact: "Avant de confier des données de l'entreprise à une IA, il faut vérifier qu'on en a le droit et associer le DPO.",
        avis: "À compléter : ton avis en une ou deux phrases." }
    ],
    sources: [
      { label: "ANSSI : sécurité des systèmes d'IA générative (PDF)", url: 'https://cyber.gouv.fr/sites/default/files/document/Recommandations_de_s%C3%A9curit%C3%A9_pour_un_syst%C3%A8me_d_IA_g%C3%A9n%C3%A9rative.pdf' },
      { label: "ANSSI et BSI : assistants de programmation basés sur l'IA", url: 'https://cyber.gouv.fr/actualites/lanssi-et-le-bsi-publient-leurs-recommandations-de-securite-concernant-les-assistants-de-programmation-bases-sur-lia/' },
      { label: "CNIL : recommandations sur les systèmes d'IA", url: 'https://www.cnil.fr/fr/ia-la-cnil-publie-ses-premieres-recommandations-sur-le-developpement-des-systemes-dintelligence' },
      { label: 'CNIL : liste de vérification IA et RGPD (PDF)', url: 'https://www.cnil.fr/sites/default/files/2025-07/ia_liste_de_verification.pdf' },
      { label: "Commission européenne : cadre réglementaire de l'IA (AI Act)", url: 'https://digital-strategy.ec.europa.eu/fr/policies/regulatory-framework-ai' },
      { label: 'Le Monde Informatique', url: 'https://www.lemondeinformatique.fr/' },
      { label: 'CERT-FR : alertes et avis de sécurité', url: 'https://www.cert.ssi.gouv.fr/' }
    ],
    doc: '', docLabel: 'Ma présentation (PDF)', table: 'docs/veille-sources.xlsx'
  },
  certs: {
    title: 'Certifications',
    intro: 'Les certifications que je prépare et celles que je vise, pour valider mes compétences en réseau, cloud et sécurité.',
    items: [
      { name: 'Cisco CCNA', issuer: 'Cisco', date: '', status: 'Objectif', text: 'Réseaux, routage, commutation, VLAN et sécurité de base.' },
      { name: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: '', status: 'En préparation', text: 'Fondamentaux du cloud et des services Azure.' },
      { name: 'Azure Administrator (AZ-104)', issuer: 'Microsoft', date: '', status: 'Objectif', text: 'Administration d\'Azure : identités, réseau, stockage, calcul.' }
    ]
  },

  /* Page « Info » (lien en haut à droite) */
  info: {
    headline: 'Étudiant, alternant, futur <span class="serif accent">ingénieur</span>.',
    facts: [['Formation', 'BTS SIO — SISR'], ['Entreprise', 'OPmobility'], ['Objectif', "École d'ingénieur"], ['Domaine', 'Cybersécurité']],
    blocks: [
      { label: 'Ma vidéo', video: '', caption: 'Mon parcours, pourquoi l\'informatique, le sport… en quelques minutes.' },
      { label: 'À propos', text: 'Écris ici ta présentation.' },
      { label: 'Parcours', text: 'Écris ici ton parcours.' },
      { label: 'Compétences', list: ['Ajoute', 'tes', 'compétences'] }
    ]
  }
};

/* ==========================================================================
   CODE DU SITE — pas besoin d'y toucher
   ========================================================================== */
const $ = (s, c = document) => c.querySelector(s);
let S = CONFIG.site;
const root = document.documentElement;
// Tout texte venant du contenu est échappé avant d'être inséré dans la page (protection contre l'injection de code)
const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
// Adresse sûre : seuls http(s), mailto, tel et les chemins du site sont acceptés (jamais « javascript: »)
const safeUrl = u => { u = String(u ?? '').trim(); const m = /^([a-z][a-z0-9+.-]*):/i.exec(u); return esc(m && !/^(https?|mailto|tel)$/i.test(m[1]) ? '#' : u); };
const isExt = u => /^https?:\/\//i.test(String(u ?? '').trim());
const extAttrs = u => isExt(u) ? ' target="_blank" rel="noopener noreferrer"' : '';
// Mise en forme autorisée dans un titre : <span class="serif accent">, <b>, <i>, <em>, <br>. Le reste s'affiche tel quel.
const rich = s => esc(s).replace(/&lt;(\/?)(b|i|em|strong)&gt;/g, '<$1$2>').replace(/&lt;br\s*\/?&gt;/g, '<br>')
  .replace(/&lt;span class=&quot;([\w -]{0,40})&quot;&gt;/g, '<span class="$1">').replace(/&lt;\/span&gt;/g, '</span>');
// Titre : les mots courts à trait d'union (Wi-Fi) ne sont jamais coupés en fin de ligne
const ttl = s => esc(s).replace(/[A-Za-zÀ-ÿ0-9]+(?:-[A-Za-zÀ-ÿ0-9]+)+/g, w => w.length <= 12 ? `<span class="nw">${w}</span>` : w);
// Dans les textes : **gras** et [texte du lien](https://adresse)
const LINK_RE = /(\[[^\]]+\]\((?:https?:\/\/|mailto:|\/|#|img\/|docs\/)[^)\s]+\))/g;
const inline = t => String(t ?? '').split(LINK_RE).map(part => {
  const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
  return m ? `<a class="ulink" href="${safeUrl(m[2])}"${extAttrs(m[2])}>${esc(m[1])}</a>` : esc(part).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}).join('');
// Texte : ligne vide = nouveau paragraphe ; lignes « - … » = liste à puces ; lignes « 1. … » = liste numérotée
function para(t) {
  return String(t ?? '').split(/\n{2,}/).map(chunk => {
    let html = '', buf = [], kind = null, items = [];
    const flushP = () => { if (buf.length) { html += `<p>${buf.map(inline).join('<br>')}</p>`; buf = []; } };
    const flushL = () => { if (kind) { html += `<${kind} class="tlist">${items.map(i => `<li>${inline(i)}</li>`).join('')}</${kind}>`; kind = null; items = []; } };
    chunk.split('\n').forEach(l => {
      const ul = /^\s*[-•]\s+(.*)$/.exec(l), ol = /^\s*\d+[.)]\s+(.*)$/.exec(l);
      if (ul || ol) { flushP(); const k = ul ? 'ul' : 'ol'; if (kind && kind !== k) flushL(); kind = k; items.push((ul || ol)[1]); }
      else { flushL(); buf.push(l); }
    });
    flushP(); flushL(); return html;
  }).join('');
}
const chips = a => (a || []).flatMap(t => String(t).split(/\s+·\s+/)).map(s => s.trim()).filter(Boolean).map(s => `<span class="chip">${esc(s)}</span>`).join('');
// Un texte encore « À compléter » ou une case jamais remplie ne sont montrés qu'en mode admin
const isTodo = s => /^\s*à compléter/i.test(String(s ?? ''));
const isAdm = () => !!(window.ADMIN && window.ADMIN.on);
const isDraft = it => !it || (/^(title)?$/i.test(String(it.title ?? '').trim()) && !(it.blocks && it.blocks.length) && !it.image);
const shownItems = c => isAdm() ? c.items : c.items.filter(it => !isDraft(it));
const shownCats = () => CONFIG.categories.filter(c => shownItems(c).length);
const IMG = {};                          // images ajoutées en mode admin, pas encore publiées (aperçu)
const src = p => IMG[p] || safeUrl(p);

function indexItems() { CONFIG.categories.forEach(c => c.items.forEach((it, i) => { it._cat = c; it._id = `${c.id}-${i}`; it._n = String(i + 1).padStart(2, '0'); })); }
const findItem = id => CONFIG.categories.flatMap(c => c.items).find(i => i._id === id);

gsap.registerPlugin(ScrollTrigger);
history.scrollRestoration = 'manual';

/* ---------- Thème (appliqué dès le chargement par js/theme.js) ---------- */
const themeMeta = $('meta[name="theme-color"]');
const syncTheme = () => { if (themeMeta) themeMeta.content = root.classList.contains('light') ? '#f3ece3' : '#261b14'; };
syncTheme();
$('#theme').onclick = () => { root.classList.toggle('light'); syncTheme(); try { localStorage.setItem('theme-v2', root.classList.contains('light') ? 'light' : 'brown'); } catch (e) {} };

/* ---------- Rendu de l'accueil (rappelé après chaque modification en mode admin) ---------- */
function renderSite() {
  S = CONFIG.site;
  $('#intro-eyebrow').textContent = S.eyebrow || '';
  $('#intro-name').innerHTML = `${esc(S.firstName)}<br>${esc(S.lastName)}`;
  $('#intro-tag').innerHTML = esc(S.tagline || '').replace(' — ', ' <span class="accent">—</span> ');
  $('#intro-sub').textContent = S.sub || '';
  // Mots entre *astérisques* mis en valeur (la ponctuation collée au mot reste en dehors)
  $('#statement').innerHTML = (S.statement || '').split(' ').map(w => {
    const hl = /^\*(.+?)\*([.,;:!?…]*)$/.exec(w);
    return `<span class="w${hl ? ' accent serif' : ''}" style="opacity:${window.__scrollReady ? 1 : .15}">${hl ? esc(hl[1]) : esc(w)}</span>${hl && hl[2] ? `<span class="w" style="opacity:${window.__scrollReady ? 1 : .15}">${esc(hl[2])}</span>` : ''}`;
  }).join(' ');
  $('#mail-big').textContent = S.email; $('#mail-big').href = 'mailto:' + encodeURI(S.email || ''); fitMail();
  $('#contact-links').innerHTML = (S.links || []).filter(l => l && l.href).map(l => `<a class="btn" href="${safeUrl(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')
    + (S.email ? `<button class="btn" type="button" id="copy-mail">Copier l'adresse</button>` : '');
  checkLinks();
  $('#foot-l').textContent = S.footerLeft || ''; $('#foot-r').textContent = S.footerRight || '';
}
// Un lien vers un fichier du site qui n'existe pas (ex. cv.pdf jamais ajouté) n'est pas montré aux visiteurs
const linkState = new Map();
function checkLinks() {
  document.querySelectorAll('#contact-links a').forEach(a => {
    const h = a.getAttribute('href'); if (!h || /^(https?:|mailto:|tel:|#|data:)/i.test(h)) return;
    const apply = ok => { if (ok) return; if (isAdm()) { a.classList.add('dead'); a.title = 'Fichier introuvable sur le site : les visiteurs ne voient pas ce lien.'; } else a.remove(); };
    if (linkState.has(h)) return apply(linkState.get(h));
    fetch(h, { method: 'HEAD', cache: 'no-store' }).then(r => { linkState.set(h, r.ok); apply(r.ok); }).catch(() => {});
  });
}
document.addEventListener('click', e => {
  const b = e.target.closest('#copy-mail'); if (!b || !navigator.clipboard) return;
  navigator.clipboard.writeText(S.email).then(() => { b.textContent = 'Adresse copiée ✓'; setTimeout(() => { b.textContent = "Copier l'adresse"; }, 2200); }).catch(() => {});
});

// L'adresse e-mail tient toujours sur une ligne : sa taille suit la largeur de la page (max 88 px)
function fitMail() {
  const m = $('#mail-big'), box = m && m.parentElement; if (!m || !box) return;
  const w = box.clientWidth - parseFloat(getComputedStyle(box).paddingLeft) - parseFloat(getComputedStyle(box).paddingRight);
  m.style.fontSize = '100px';
  const fs = Math.min(88, Math.floor(100 * w * .82 / m.scrollWidth));
  m.style.fontSize = Math.max(18, fs) + 'px';
}
addEventListener('resize', () => fitMail());
document.fonts && document.fonts.ready.then(() => fitMail());

const media = (img, label, alt = '') => img ? `<img src="${src(img)}" alt="${esc(alt)}" loading="lazy" decoding="async" draggable="false">` : `<div class="media-ph"><span class="mono">${esc(label)}</span></div>`;

function renderContent() {
  indexItems();
  const adm = isAdm(), cats = adm ? CONFIG.categories : shownCats();
  const plural = (n, w) => `${n} ${w}${n > 1 ? 's' : ''}`;
  $('#tiles').innerHTML = cats.map(c => { const n = shownItems(c).length; return `
  <a href="#cat-${esc(c.id)}" data-scroll="#cat-${esc(c.id)}" class="tile reveal">
    <span></span>
    <div><h3 class="text-3xl font-medium tracking-tight">${esc(c.title)}</h3><p class="muted text-sm mt-1.5">${esc(c.sub)}</p></div>
    <span class="mono muted flex justify-between"><span>${plural(n, c.unit || 'projet')}</span><span class="go">→</span></span>
  </a>`; }).join('');
  $('#categories').innerHTML = cats.map(c => { const items = shownItems(c); return `
  <section id="cat-${esc(c.id)}" class="scroll-mt-24" aria-label="${esc(c.title)}">
    <div class="cat-head reveal">
      <h2 class="text-[clamp(2.6rem,7vw,6.2rem)] font-medium tracking-[-.055em] leading-[.9]">${esc(c.title)}</h2>
      <span class="mono muted text-right">${esc(c.sub)}<br><span class="accent">${plural(items.length, c.unit || 'projet')}</span></span>
    </div>
    <div class="pgrid">
      ${items.map((it, k) => `
      <a href="#/p/${it._id}" class="card pcard reveal${isDraft(it) ? ' is-draft' : ''}" data-id="${it._id}">
        <div class="card-media">${media(it.image, adm ? '+ Image' : c.title, it.title)}</div>
        <div class="pcard-body">
          <div class="flex justify-between items-baseline gap-4 mono muted"><span class="cnum">${String(k + 1).padStart(2, '0')}</span><span>${isDraft(it) ? 'Brouillon · masqué aux visiteurs' : esc(it.year || '')}</span></div>
          <h3 class="card-title"><span>${ttl(it.title)}</span><span class="arr">→</span></h3>
          ${it.text ? `<p class="pcard-desc">${esc(it.text)}</p>` : ''}
          ${it.tags && it.tags.length ? `<div class="pcard-tags">${chips(it.tags)}</div>` : ''}
        </div>
      </a>`).join('')}
      ${adm ? `<button class="card-add" type="button" data-add="${esc(c.id)}"><span>+</span>Ajouter une case</button>` : ''}
    </div>
  </section>`; }).join('');
  if (window.__scrollReady) { gsap.set('#tiles .reveal, #categories .reveal', { clearProps: 'opacity,transform' }); gsap.set('.card-media', { clearProps: 'clipPath' }); ScrollTrigger.refresh(); }
}

// Le contenu publié depuis le mode admin (content.json) remplace celui de CONFIG
function applyContent(d) {
  if (!d) return;
  if (d.site) CONFIG.site = d.site;
  if (d.categories) {
    d.categories = d.categories.filter(c => c.id !== 'veille');           // la veille a maintenant son propre onglet
    const def = CONFIG.categories, ids = new Set(d.categories.map(c => c.id));
    def.forEach((c, i) => { if (!ids.has(c.id)) d.categories.splice(Math.min(i, d.categories.length), 0, c); });
    CONFIG.categories = d.categories;
  }
  if (d.info) CONFIG.info = d.info;
  if (d.certs) CONFIG.certs = d.certs;
  if (d.veille) CONFIG.veille = d.veille;
  if (d.admin) CONFIG.admin = d.admin;
}
renderSite(); renderContent();
// Empreinte de la version publiée : sert à détecter un brouillon ou une publication basés sur une ancienne version
const textHash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0; return h.toString(36) + ':' + s.length; };
window.__PUBH = '';
const contentReady = fetch('content.json?v=' + Date.now(), { cache: 'no-store' })
  .then(r => r.ok ? r.text() : null)
  .then(txt => { if (!txt) return; window.__PUBH = textHash(txt); applyContent(JSON.parse(txt)); renderSite(); renderContent(); })
  .catch(() => {});

/* ---------- Pages ---------- */
const DEFAULT_BLOCKS = [{ label: 'Contexte' }, { label: 'Objectif' }, { label: 'Réalisation' }, { label: 'Résultat' }, { label: 'Compétences' }];
const fig = (u, cap) => `<figure><div class="zoomwrap" data-zoom tabindex="0" role="button" aria-label="Agrandir l'image"><img loading="lazy" decoding="async" src="${u}" alt="${esc(cap || '')}"></div>${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;
// Vidéo : lien YouTube ou Vimeo (conseillé), ou fichier vidéo (videos/presentation.mp4)
function videoHTML(u, cap) {
  if (!u) return `<div class="ph">Ajoute le lien de ta vidéo (YouTube non répertoriée conseillé)…</div>`;
  const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/), vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const frame = yt ? `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0" title="${esc(cap || 'Vidéo')}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`
              : vm ? `<iframe src="https://player.vimeo.com/video/${vm[1]}" title="${esc(cap || 'Vidéo')}" allow="fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>`
              : `<video src="${src(u)}" controls playsinline preload="metadata"></video>`;
  return `<figure><div class="video">${frame}</div>${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;
}
// Document : un PDF s'affiche dans la page, un PowerPoint se télécharge
function docHTML(b) {
  if (!b.doc) return `<div class="ph">Ajoute ton document (PDF conseillé : PowerPoint → Fichier → Exporter → PDF)…</div>`;
  const u = src(b.doc), pdf = /\.pdf($|[?#])/i.test(b.doc) || u.startsWith('data:application/pdf');
  return `${pdf ? `<div class="doc-frame"><iframe src="${u}#view=FitH" title="${esc(b.docLabel || 'Document')}" loading="lazy"></iframe></div>` : ''}
    <div class="flex flex-wrap gap-3 mt-4"><a class="btn" href="${u}" target="_blank" rel="noopener noreferrer">${esc(b.docLabel || 'Ouvrir le document')} ↗</a>${pdf ? '' : `<span class="mono muted self-c">Fichier à télécharger</span>`}</div>`;
}
// Un bloc a-t-il quelque chose à montrer aux visiteurs ?
const blockFilled = b => !!(b.video || b.image || b.doc || b.url || (b.list && b.list.length) || b.code || (b.text && !isTodo(b.text)));
function blockHTML(b) {
  if (!blockFilled(b) && !isAdm()) return '';                 // bloc vide ou « À compléter » : visible seulement en mode admin
  let body;
  if (b.video !== undefined) body = videoHTML(b.video, b.caption);
  else if (b.image) body = fig(src(b.image), b.caption);
  else if (b.doc !== undefined) body = docHTML(b);
  else if (b.url !== undefined) body = b.url ? `<a class="btn" href="${safeUrl(b.url)}" target="_blank" rel="noopener noreferrer">${esc(b.linkLabel || b.url)} ↗</a>` : `<div class="ph">Ajoute une adresse…</div>`;
  else if (b.list && b.list.length) body = `<div class="flex flex-wrap gap-2">${chips(b.list)}</div>`;
  else if (b.code !== undefined && b.code !== '') body = `<pre class="code" tabindex="0">${esc(b.code)}</pre>`;
  else if (b.text) body = para(b.text);
  else body = `<div class="ph">Écris ici…</div>`;
  return `<section class="sec${blockFilled(b) ? '' : ' is-todo'}"><h3 class="mono muted">${esc(b.label || '')}</h3><div class="sec-body">${body}</div></section>`;
}
// Navigation en bas de page : projet précédent et suivant, toutes catégories confondues
function projectNav(it) {
  const all = shownCats().flatMap(c => shownItems(c)), i = all.indexOf(it);
  if (i < 0 || all.length < 2) return '';
  const prev = all[(i - 1 + all.length) % all.length], next = all[(i + 1) % all.length];
  const a = (o, cls, lab) => `<a href="#/p/${o._id}" class="pnav-a ${cls}"><span class="mono muted">${lab}</span><span class="t">${ttl(o.title)}</span><span class="mono muted c">${esc(o._cat.title)}</span></a>`;
  return `<nav class="pnav sec" aria-label="Autres projets">${all.length > 2 ? a(prev, 'prev', '← Précédent') : '<span></span>'}${a(next, 'next', 'Suivant →')}</nav>`;
}
function projectHTML(it) {
  const c = it._cat, adm = isAdm();
  const rows = it.meta && it.meta.length ? it.meta : (adm ? [['Année', it.year || '—'], ['Rôle', '—'], ['Outils', '—']] : (it.year ? [['Année', it.year]] : []));
  const meta = rows.filter(r => r && (r[0] || r[1])).map(([k, v]) => `<div><span class="mono muted">${esc(k)}</span><b>${esc(v)}</b></div>`).join('');
  return `<article class="wrap">
    <a href="#/" class="back pg-anim">← Retour</a>
    <p class="mono muted mt-12 pg-anim">${esc(c.title)}</p>
    <h1 class="pg-title"><span class="mask"><span class="mask-in">${ttl(it.title)}</span></span></h1>
    ${it.text ? `<p class="pg-lead pg-anim">${esc(it.text)}</p>` : ''}
    ${meta ? `<div class="meta pg-anim">${meta}</div>` : ''}
    ${it.image || adm ? `<div class="pg-cover pg-anim"${it.image ? ` data-zoom tabindex="0" role="button" aria-label="Agrandir l'image"` : ''}>${media(it.image, '+ Image de couverture', it.title)}</div>` : ''}
    ${(it.blocks && it.blocks.length ? it.blocks : DEFAULT_BLOCKS).map(blockHTML).join('')}
    ${projectNav(it)}
  </article>`;
}
// Badge par défaut : le code entre parenthèses (AZ-900), sinon le premier mot sans la marque (CCNA)
const certCode = c => { const n = c.name || '?', m = n.match(/\(([^)]+)\)/); return (m ? m[1] : n.replace(/^(Cisco|Microsoft|Azure|AWS|Google|CompTIA)\s+/i, '').split(/\s+/)[0]).slice(0, 6); };
const CERT_ST = { 'Obtenu': 'good', 'En préparation': 'prep', 'Objectif': 'goal' };
function certsHTML() {
  const C = CONFIG.certs || { title: 'Certifications', items: [] };
  return `<div class="wrap">
    <a href="#/" class="back pg-anim">← Retour</a>
    <p class="mono muted mt-12 pg-anim">Certifications</p>
    <h1 class="pg-title"><span class="mask"><span class="mask-in">${ttl(C.title || 'Certifications')}</span></span></h1>
    ${C.intro ? `<p class="pg-lead pg-anim">${inline(C.intro)}</p>` : ''}
    <div class="cert-grid">${(C.items || []).map(c => `
      <article class="cert">
        <div class="cert-badge${c.image ? ' has-img' : ''}"${c.image ? ` data-zoom tabindex="0" role="button" aria-label="Agrandir l'attestation"` : ''}>${c.image ? `<img src="${src(c.image)}" alt="${esc((c.name || 'Certification').trim())}" loading="lazy">` : `<span class="${certCode(c).length > 3 ? 'sm' : ''}">${esc(certCode(c))}</span>`}</div>
        <div class="cert-body">
          <div class="flex justify-between gap-3 items-start"><h3>${esc((c.name || '').trim())}</h3>${c.status ? `<span class="cert-st st-${CERT_ST[c.status] || 'goal'}">${esc(c.status)}</span>` : ''}</div>
          <p class="muted cert-meta">${esc([c.issuer, c.date].filter(Boolean).join(' · '))}</p>
          ${c.text ? `<p class="cert-txt">${inline(c.text)}</p>` : ''}
          ${c.url ? `<a class="btn cert-link" href="${safeUrl(c.url)}" target="_blank" rel="noopener noreferrer">Voir la certification ↗</a>` : ''}
        </div>
      </article>`).join('')}</div>
  </div>`;
}
// Veille : chaque article reçoit une note sur 40. Seuls les articles au-dessus du seuil sont retenus.
const V_MAX = 40;
function vScore(a) { const n = Number(a.note); return a.note !== undefined && a.note !== '' && Number.isFinite(n) && n >= 0 && n <= V_MAX ? Math.round(n) : null; }
const vMax = () => V_MAX;
// Veille : une carte = un article, un clic ouvre sa fiche détaillée
const vReco = (s, V) => { const max = vMax(V), seuil = V.threshold ?? 20; return s === null ? ['À noter', 'mid'] : s >= .75 * max ? ['Retenu', 'ok'] : s > seuil ? ['À vérifier', 'mid'] : ['Écarté', 'no']; };
function vGroup(title, arr, max, seuil, adm, intro) {
  const list = arr.slice().sort((x, y) => (y.iso || '').localeCompare(x.iso || ''));
  const V = CONFIG.veille || {};
  return `<section class="sec v-group"><h3 class="mono muted">${esc(title)} <span class="v-count">${list.length}</span></h3><div class="sec-body">
    ${intro ? `<p class="v-gintro">${esc(intro)}</p>` : ''}
    ${list.length ? `<div class="v-grid">${list.map(a => { const r = vReco(a._s, V); return `
      <article class="v-card${a._s !== null && a._s <= seuil ? ' v-low' : ''}">
        <p class="mono muted v-top"><span>${esc(a.date || '')}</span><span class="v-score v-${r[1]}">${a._s === null ? 'À noter' : `${a._s}/${max}`}</span></p>
        <h4><button type="button" class="v-open" data-v="${a._i}">${esc(a.title || '')}</button></h4>
        <p class="v-meta">${a.cat ? `<span class="v-cat">${esc(a.cat)}</span>` : ''}<span>${esc(a.source || '')}</span></p>
        <div class="v-foot"><span class="v-more" aria-hidden="true">Voir le résumé →</span>${adm ? `<button type="button" class="v-rate${a._s === null ? ' is-todo' : ''}" data-v="${a._i}" data-rate="1">${a._s === null ? 'Noter' : 'Modifier la note'}</button>` : ''}</div>
      </article>`; }).join('')}</div>` : `<div class="ph">Aucun article dans cette rubrique.</div>`}
  </div></section>`;
}
const V_HINTS = {
  pertinence: ['Hors sujet', 'Lien faible', 'En lien', 'Au cœur du sujet'],
  date: ['3 ans ou plus', 'Environ 2 ans', 'Environ 1 an', "Moins d'un an"],
  auteur: ['Commercial ou anonyme', 'Peu connu', 'Média spécialisé', 'Organisme officiel']
};
let vDlg = null, vCur = -1;
function vDialogHTML(i) {
  const V = CONFIG.veille || {}, a = (V.articles || [])[i]; if (!a) return '';
  const s = vScore(a), max = V_MAX, seuil = V.threshold ?? 20, r = vReco(s, V), adm = isAdm();
  const kw = String(a.keywords || '').split(',').map(x => x.trim()).filter(Boolean);
  return `<div class="v-dlg-in">
    <div class="v-dlg-top">
      <div class="v-dlg-score v-${r[1]}"><b>${s === null ? '—' : s}<small>/${max}</small></b><span>${esc(r[0])}</span></div>
      <button type="button" class="v-dlg-x" data-vclose aria-label="Fermer">✕</button>
    </div>
    <p class="v-dlg-meta">${a.cat ? `<span class="v-cat">${esc(a.cat)}</span>` : ''}<span>${esc(a.date || '')}</span></p>
    <h2 id="v-dlg-title">${esc(a.title || '')}</h2>
    ${(a.points || []).length ? `<h3>Résumé</h3><ul class="v-pts">${a.points.map(x => `<li>${inline(x)}</li>`).join('')}</ul>` : ''}
    ${a.impact ? `<h3>Impact pour l'entreprise</h3><p>${inline(a.impact)}</p>` : ''}
    ${!adm && a.avis && !isTodo(a.avis) ? `<h3>Mon avis</h3><p class="v-dlg-avis">${inline(a.avis)}</p>` : ''}
    <h3>Source</h3>
    <dl class="v-dlg-src">
      <div><dt>Média</dt><dd>${esc(a.source || '—')}</dd></div>
      <div><dt>Auteur</dt><dd>${esc(a.author || a.source || '—')}</dd></div>
      <div><dt>Site</dt><dd>${esc(a.site || '—')}</dd></div>
      ${kw.length ? `<div><dt>Mots-clés</dt><dd class="v-kws">${kw.map(x => `<span>${esc(x)}</span>`).join('')}</dd></div>` : ''}
    </dl>
    ${a.url ? `<a class="btn v-dlg-link" href="${safeUrl(a.url)}" target="_blank" rel="noopener noreferrer">Lire l'article original ↗</a>` : ''}
    ${adm ? `<div class="v-rate-box" id="v-rate-box">
      <h3>Ma note</h3>
      <p class="v-gintro">Donne une note sur ${max} en pensant à la pertinence, à la date et à la fiabilité de l'auteur. Plus de ${seuil}/${max} : article retenu. ${seuil} ou moins : article écarté.</p>
      <label class="v-avis-lbl" for="v-note">Note sur ${max}</label>
      <div class="v-note-in">
        <input id="v-note" type="number" inputmode="numeric" min="0" max="${max}" step="1" value="${s === null ? '' : s}" placeholder="—" aria-describedby="v-note-st">
        <span class="v-note-max">/${max}</span>
        <span id="v-note-st" class="v-score v-${r[1]}">${s === null ? 'Pas encore noté' : r[0]}</span>
      </div>
      <input id="v-note-range" class="v-note-range" type="range" min="0" max="${max}" step="1" value="${s === null ? seuil : s}" aria-label="Note sur ${max}">
      <div class="v-note-scale" aria-hidden="true"><span>0</span><span>Écarté ≤ ${seuil}</span><span>${max}</span></div>
      <label class="v-avis-lbl" for="v-avis">Mon avis (une ou deux phrases)</label>
      <textarea id="v-avis" rows="4" placeholder="Ce que tu penses de cet article…">${esc(isTodo(a.avis) ? '' : a.avis || '')}</textarea>
      <p class="v-gintro">Tes changements s'affichent tout de suite. Pour les mettre en ligne, clique sur <b>Publier</b> dans la barre d'administration.</p>
    </div>` : ''}
  </div>`;
}
function vOpen(i, toRate) {
  if (!vDlg) {
    vDlg = document.createElement('dialog'); vDlg.className = 'v-dlg'; vDlg.setAttribute('aria-labelledby', 'v-dlg-title'); vDlg.setAttribute('data-lenis-prevent', '');
    document.body.append(vDlg);
    vDlg.addEventListener('click', e => {
      if (e.target === vDlg || e.target.closest('[data-vclose]')) return vDlg.close();
    });
    vDlg.addEventListener('input', e => {
      if ((e.target.id === 'v-note' || e.target.id === 'v-note-range') && isAdm()) return vSetNote(e.target);
      if (e.target.id !== 'v-avis' || !isAdm()) return;
      const a = CONFIG.veille.articles[vCur], t = e.target.value.trim();
      a.avis = t || 'À compléter : ton avis en une ou deux phrases.';
      window.ADMIN.changed && window.ADMIN.changed();
    });
    vDlg.addEventListener('close', () => { root.classList.remove('v-dlg-open'); const f = document.querySelector(`[data-v="${vCur}"]`); f && f.focus({ preventScroll: true }); });
  }
  vCur = i; vDlg.innerHTML = vDialogHTML(i); vDlg.scrollTop = 0;
  if (!vDlg.open) vDlg.showModal();
  root.classList.add('v-dlg-open');
  if (toRate) { const r = $('#v-rate-box', vDlg); r && r.scrollIntoView({ block: 'start' }); }
}
function vSetNote(el) {
  const a = CONFIG.veille.articles[vCur], V = CONFIG.veille, raw = String(el.value).trim(), num = $('#v-note', vDlg), rng = $('#v-note-range', vDlg);
  if (raw === '') delete a.note; else a.note = Math.max(0, Math.min(V_MAX, Math.round(+raw) || 0));
  if (el === rng) num.value = a.note; else if (a.note !== undefined) rng.value = a.note;
  const s = vScore(a), r = vReco(s, V), st = $('#v-note-st', vDlg), top = $('.v-dlg-score', vDlg);
  st.className = `v-score v-${r[1]}`; st.textContent = s === null ? 'Pas encore noté' : r[0];
  top.className = `v-dlg-score v-${r[1]}`; top.innerHTML = `<b>${s === null ? '—' : s}<small>/${V_MAX}</small></b><span>${esc(r[0])}</span>`;
  window.ADMIN && window.ADMIN.changed && window.ADMIN.changed();
}
document.addEventListener('click', e => {
  const b = e.target.closest('#page [data-v]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); vOpen(+b.dataset.v, !!b.dataset.rate);
}, true);
function veilleHTML() {
  const V = CONFIG.veille || { articles: [], sources: [] }, S = V.sources || [], seuil = V.threshold ?? 20, max = vMax(V);
  const all = (V.articles || []).map((a, i) => ({ ...a, _s: vScore(a), _i: i }));
  const pub = all.filter(a => a._s !== null && a._s > seuil), out = all.filter(a => a._s !== null && a._s <= seuil), todo = all.filter(a => a._s === null);
  const adm = window.ADMIN && window.ADMIN.on, shown = adm ? all : pub;
  const avg = pub.length ? pub.reduce((s, a) => s + a._s, 0) / pub.length : 0;
  const count = (arr, f) => Object.entries(arr.reduce((m, a) => { const k = f(a) || '—'; m[k] = (m[k] || 0) + 1; return m; }, {})).sort((x, y) => y[1] - x[1]);
  const bars = rows => { const m = Math.max(1, ...rows.map(r => r[1])); return rows.map(([k, v]) => `<div class="v-bar"><span>${esc(k)}</span><i><b style="width:${v / m * 100}%"></b></i><em>${v}</em></div>`).join(''); };
  const yearOf = a => (a.iso || '').slice(0, 4) || (a.date || '').slice(-4);
  const reco = s => s >= .75 * max ? ['Retenir', 'ok'] : s > seuil ? ['À vérifier', 'mid'] : ['Écarté', 'no'];
  const byDate = arr => arr.slice().sort((x, y) => (y.iso || '').localeCompare(x.iso || ''));
  const recent = byDate(pub).slice(0, 3), todoSorted = byDate(todo);
  const MOIS = { janvier: 'janv.', février: 'févr.', mars: 'mars', avril: 'avr.', mai: 'mai', juin: 'juin', juillet: 'juil.', août: 'août', septembre: 'sept.', octobre: 'oct.', novembre: 'nov.', décembre: 'déc.' };
  const fmtDay = a => { const m = (a.date || '').match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/); return m ? `<b>${esc(m[1])}</b><span>${esc(MOIS[m[2].toLowerCase()] || m[2])}</span><span>${esc(m[3])}</span>` : `<span>${esc(a.date || '')}</span>`; };
  const lastRow = (a, todoRow) => `<li class="v-last-row">
      <div class="v-last-date" aria-hidden="true">${fmtDay(a)}</div>
      <div class="v-last-body">
        <p class="v-last-meta">${a.cat ? `<span class="v-cat">${esc(a.cat)}</span>` : ''}<span>${esc(a.source || '')}</span><span class="sr-only">, ${esc(a.date || '')}</span></p>
        <h4><button type="button" class="v-last-open" data-v="${a._i}">${esc(a.title || '')}<span class="v-last-arr" aria-hidden="true"> →</span></button></h4>
      </div>
      <span class="v-score v-${todoRow ? 'mid' : reco(a._s)[1]}">${todoRow ? 'À noter' : `${a._s}/${max}`}</span>
    </li>`;
  return `<div class="wrap">
    <a href="#/" class="back pg-anim">← Retour</a>
    <p class="mono muted mt-12 pg-anim">Veille technologique</p>
    <h1 class="pg-title"><span class="mask"><span class="mask-in">${ttl(V.subject || 'Veille technologique')}</span></span></h1>
    ${V.intro ? `<p class="pg-lead pg-anim">${inline(V.intro)}</p>` : ''}
    <section class="sec"><h3 class="mono muted">Derniers articles</h3><div class="sec-body">
      ${adm && todoSorted.length ? `<div class="v-last v-last-todo">
        <p class="v-last-head"><b>${todoSorted.length} article${todoSorted.length > 1 ? 's' : ''} à noter</b><span>Visible seulement en mode admin · clique sur un titre pour le noter</span></p>
        <ul>${todoSorted.map(a => lastRow(a, true)).join('')}</ul></div>` : ''}
      <div class="v-last">
        <p class="v-last-head"><b>Derniers articles publiés</b><span>${recent.length ? `Mis à jour le ${esc(recent[0].date || '')}` : 'Aucun article publié pour l\'instant'}</span></p>
        ${recent.length ? `<ul>${recent.map(a => lastRow(a, false)).join('')}</ul>` : ''}
      </div>
    </div></section>
    <section class="sec"><h3 class="mono muted">Statistiques</h3><div class="sec-body">
      <div class="v-kpis">
        <div><b>${pub.length}</b><span>articles publiés</span></div>
        <div><b>${avg ? avg.toFixed(1).replace('.', ',') : '—'}<small>/${max}</small></b><span>score moyen</span></div>
        <div><b>${out.length}</b><span>écartés (≤ ${seuil}/${max})</span></div>
        <div><b>${new Set(pub.map(a => a.site || a.source)).size}</b><span>sources différentes</span></div>
      </div>
      <div class="v-charts">
        <div><p class="mono muted">Par catégorie</p>${bars(count(pub, a => a.cat))}</div>
        <div><p class="mono muted">Par année de parution</p>${bars(count(pub, yearOf).sort((x, y) => y[0].localeCompare(x[0])))}</div>
        <div><p class="mono muted">Par source</p>${bars(count(pub, a => a.source).slice(0, 6))}</div>
      </div>
      <p class="mono muted v-upd">Calculé automatiquement à partir des notes sur 40</p>
    </div></section>
    <section class="sec"><h3 class="mono muted">Méthodologie</h3><div class="sec-body">
      <div class="v-flow">${['Claude', 'GitHub', 'Moi : lecture et note', `Filtre > ${seuil}/${max}`, 'Vercel'].map(x => `<span>${esc(x)}</span>`).join('<i>→</i>')}</div>
      <ol class="v-steps">${(V.steps || []).map((s, i) => `<li><span class="mono">${String(i + 1).padStart(2, '0')}</span><div><h4>${esc(s.title || '')}</h4><p>${inline(s.text || '')}</p></div></li>`).join('')}</ol>
      <p class="v-grid-note">Barème : une note sur 40 par article, qui tient compte de la pertinence, de la date et de la fiabilité de l'auteur.</p>
    </div></section>
    ${adm ? `
    ${vGroup('À noter', todo, max, seuil, true, 'Clique sur « Noter » : une note sur 40 et ton avis. Ces fiches restent masquées tant qu\'elles ne sont pas notées.')}
    ${vGroup('Publiés', pub, max, seuil, true, `Notés à plus de ${seuil}/${max} : visibles par les visiteurs.`)}
    ${vGroup('Écartés', out, max, seuil, true, `Notés à ${seuil}/${max} ou moins : affichés à part, dans la section « Articles écartés ».`)}` : `
    ${vGroup('Articles retenus', pub, max, seuil, false, 'Clique sur un article pour lire son résumé, ma note détaillée et mon avis.')}
    ${out.length ? vGroup('Articles écartés', out, max, seuil, false, `Ces articles ont été lus et notés, mais ils n'atteignent pas ${seuil}/${max} : source peu fiable, sujet trop éloigné ou information trop ancienne. Je les garde visibles pour montrer ce que ma méthode filtre.`) : ''}`}
    <section class="sec v-tsec"><h3 class="mono muted">Tableau d'analyse des sources</h3><div class="sec-body">
      <p class="v-tintro">Chaque source reçoit une note sur ${max}. Seules celles à plus de ${seuil}/${max} sont retenues.</p>
      <div class="v-tbl-wrap"><table class="v-tbl">
        <thead><tr><th>N°</th><th>Titre</th><th>Auteur</th><th>Site</th><th>Date</th><th>Mots-clés</th><th>Type</th><th class="c">Note /40</th><th>Recommandation</th></tr></thead>
        <tbody>${all.filter(a => a._s !== null).sort((x, y) => (y.iso || '').localeCompare(x.iso || '')).map((a, i) => { const r = reco(a._s); return `<tr>
          <td class="c">${i + 1}</td>
          <td class="v-t">${a.url ? `<a href="${safeUrl(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.title || '')}</a>` : esc(a.title || '')}</td>
          <td>${esc(a.author || a.source || '')}</td><td class="v-site">${esc(a.site || '')}</td>
          <td class="nw">${a.iso ? a.iso.split('-').reverse().join('/') : esc(a.date || '')}</td>
          <td class="v-kw">${esc(a.keywords || '')}</td><td>${esc(a.type || a.cat || '')}</td>
          <td class="c"><span class="v-sbar"><i style="width:${a._s / max * 100}%"></i><b>${a._s}</b></span></td>
          <td><span class="v-score v-${r[1]}">${r[0]}</span></td></tr>`; }).join('')}</tbody>
      </table></div>
      <p class="mono muted v-upd">Faire défiler le tableau horizontalement sur téléphone · même contenu que le fichier Excel</p>
    </div></section>
    <section class="sec"><h3 class="mono muted">Mes sources</h3><div class="sec-body"><ul class="v-srcs">${S.map(s => `<li><a class="ulink" href="${safeUrl(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label || s.url)}</a></li>`).join('')}</ul>
      ${V.table ? `<div class="mt-8"><a class="btn" href="${src(V.table)}" download>Télécharger le tableau au format Excel ↓</a></div>` : ''}</div></section>
    ${V.doc || adm ? `<section class="sec"><h3 class="mono muted">Présentation</h3><div class="sec-body">${docHTML(V)}</div></section>` : ''}
  </div>`;
}
function legalHTML() {
  const mail = (CONFIG.site && CONFIG.site.email) || '', name = esc(`${CONFIG.site.firstName || ''} ${CONFIG.site.lastName || ''}`.trim());
  const sec = (h, body) => `<section class="sec in"><h3 class="mono muted">${h}</h3><div class="sec-body">${body}</div></section>`;
  const m = mail ? `<a class="ulink" href="mailto:${esc(encodeURI(mail))}">${esc(mail)}</a>` : '—';
  return `<div class="wrap">
    <a href="#/" class="back pg-anim">← Retour</a>
    <p class="mono muted mt-12 pg-anim">Informations légales</p>
    <h1 class="pg-title"><span class="mask"><span class="mask-in">Mentions légales</span></span></h1>
    <p class="pg-lead pg-anim">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).</p>
    ${sec('Éditeur du site', `<p>Ce site est le portfolio personnel de <b>${name}</b>, étudiant en BTS SIO option SISR. Il est édité à titre personnel et non professionnel.</p><p>Directeur de la publication : ${name}<br>Contact : ${m}</p>`)}
    ${sec('Hébergement', `<p><b>Vercel Inc.</b><br>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br><a class="ulink" href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a></p><p>Code source versionné sur GitHub (GitHub, Inc.). Nom de domaine géré via Cloudflare, Inc.</p>`)}
    ${sec('Propriété intellectuelle', `<p>Les textes, schémas et visuels de ce site sont la propriété de ${name}, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p><p>Les marques et logiciels cités (Cisco, Microsoft, Vercel, GitHub…) appartiennent à leurs propriétaires respectifs. Les fiches de veille sont des résumés rédigés pour ce site, avec un lien vers chaque source originale.</p><p>Les schémas réseau des projets en entreprise sont simplifiés : noms, adresses IP et ports sont fictifs ou indicatifs, afin de ne divulguer aucune information sensible.</p>`)}
    ${sec('Données personnelles et cookies', `<p>Ce site ne contient <b>aucun formulaire, aucun compte visiteur, aucune mesure d'audience et aucun cookie</b>. Les polices et les scripts sont hébergés sur le site lui-même : la consultation ne déclenche aucun appel à un service tiers.</p><p>Seule la préférence de thème (clair ou foncé) est enregistrée dans votre navigateur (stockage local), à votre demande. Elle n'est jamais transmise et peut être effacée à tout moment dans les réglages du navigateur.</p><p>Comme tout hébergeur, Vercel traite des données techniques de connexion (dont l'adresse IP) pour acheminer et sécuriser le site. Si une vidéo YouTube est intégrée, elle utilise le mode « confidentialité renforcée » (youtube-nocookie.com).</p><p>Conformément au RGPD, vous pouvez exercer vos droits d'accès, de rectification et d'effacement en écrivant à ${m}. Vous pouvez aussi adresser une réclamation à la <a class="ulink" href="https://www.cnil.fr" target="_blank" rel="noopener">CNIL</a>.</p>`)}
    ${sec('Liens externes', `<p>Ce site contient des liens vers d'autres sites (sources de veille, organismes). Leur contenu n'engage pas l'éditeur du portfolio.</p>`)}
    <p class="mono muted" style="font-size:11px;padding:30px 0 10px">Dernière mise à jour : 16 novembre 2026</p>
  </div>`;
}
const pageHTML = t => t === 'info' ? infoHTML() : t === 'certs' ? certsHTML() : t === 'veille' ? veilleHTML() : t === 'legal' ? legalHTML() : projectHTML(findItem(t));
function infoHTML() {
  const I = CONFIG.info || { headline: '', facts: [], blocks: [] };
  return `<div class="wrap">
    <a href="#/" class="back pg-anim">← Retour</a>
    <p class="mono muted mt-12 pg-anim">Info</p>
    <h1 class="pg-title info-title"><span class="mask"><span class="mask-in">${rich(I.headline)}</span></span></h1>
    <div class="meta pg-anim">${(I.facts || []).map(([k, v]) => `<div><span class="mono muted">${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>
    ${(I.blocks || []).map(blockHTML).join('')}
  </div>`;
}

/* ---------- Défilement fluide ---------- */
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
const scrollToSel = sel => { const el = $(sel); if (!el) return; lenis ? lenis.scrollTo(el, { offset: -80, duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) }) : el.scrollIntoView({ behavior: 'smooth' }); };
// Revient à l'accueil si besoin (depuis Info, Certifications ou un projet), puis exécute fn une fois la transition finie
function afterHome(fn) {
  if (current === 'home' && !busy) return fn();
  if (current !== 'home') { if (location.hash === '#/' || location.hash === '') go('home'); else location.hash = '#/'; }
  const t = setInterval(() => { if (current === 'home' && !busy) { clearInterval(t); setTimeout(fn, 60); } }, 50);
}
document.addEventListener('click', e => { const a = e.target.closest('[data-scroll]'); if (a) { e.preventDefault(); afterHome(() => scrollToSel(a.dataset.scroll)); } });

/* ---------- Navigation entre pages + rideau ---------- */
const page = $('#page'), curtain = $('#curtain'), curtainO = $('#curtain-o'), label = $('#curtain-label');
let current = 'home', busy = false, pending = null, io = null;

function animatePage() {
  gsap.fromTo('#page .mask-in', { yPercent: 105 }, { yPercent: 0, duration: 1.1, ease: 'power4.out' });
  gsap.fromTo('#page .pg-anim', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out', stagger: .05, delay: .08 });
  io && io.disconnect();
  io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { root: page, rootMargin: '0px 0px -10% 0px' });
  page.querySelectorAll('.sec, .cert').forEach(s => io.observe(s));
  page.querySelectorAll('.v-card').forEach((c, i) => gsap.fromTo(c, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out', delay: .25 + i * .06 }));
}
const BASE_TITLE = document.title;
const pageName = t => t === 'home' ? 'Accueil' : t === 'info' ? 'Info' : t === 'certs' ? 'Certifications' : t === 'veille' ? 'Veille' : t === 'legal' ? 'Mentions légales' : (findItem(t) || {}).title || '';
const progress = $('#progress i');
const setProgress = () => { const max = page.scrollHeight - page.clientHeight; if (progress) progress.style.transform = `scaleX(${max > 40 ? Math.min(1, page.scrollTop / max) : 0})`; };
page.addEventListener('scroll', setProgress, { passive: true });
function render(t) {
  if (t === 'home') { page.classList.remove('open'); page.innerHTML = ''; lenis && lenis.start(); }
  else { page.innerHTML = pageHTML(t); page.classList.add('open'); page.scrollTop = 0; lenis && lenis.stop(); }
  $('#home').style.visibility = t === 'home' ? '' : 'hidden';   // le décor de fond reste visible derrière les pages
  [['#nav-info', 'info'], ['#nav-certs', 'certs'], ['#nav-veille', 'veille']].forEach(([sel, k]) => {
    const a = $(sel); a.classList.toggle('active', t === k); if (t === k) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  page.classList.toggle('veille', t === 'veille'); root.classList.toggle('on-veille', t === 'veille'); root.classList.toggle('on-page', t !== 'home');
  document.title = t === 'home' ? BASE_TITLE : `${pageName(t)} — Tévin Bouvet`;
  setProgress();
  if (t !== 'home' && window.__scrollReady) page.focus({ preventScroll: true });   // le clavier et les lecteurs d'écran arrivent sur la nouvelle page
}
function go(t, instant) {
  if (t === current) return;
  if (busy) { pending = t; return; }
  current = t;
  if (instant) { render(t); if (t !== 'home') animatePage(); return; }
  busy = true; window.__navT = performance.now();
  label.textContent = pageName(t);
  curtain.classList.toggle('beige', t === 'veille');
  gsap.timeline({ onComplete: () => { busy = false; if (pending) { const p = pending; pending = null; go(p); } } })
    // Double rideau : orange d'abord, puis sombre par-dessus
    .set([curtainO, curtain], { display: 'flex', clipPath: 'inset(100% 0% 0% 0%)' })
    .set(label, { yPercent: 110 })
    .to(curtainO, { clipPath: 'inset(0% 0% 0% 0%)', duration: .45, ease: 'power3.inOut' })
    .to(curtain, { clipPath: 'inset(0% 0% 0% 0%)', duration: .5, ease: 'power3.inOut' }, '-=.38')
    .to(label, { yPercent: 0, duration: .38, ease: 'power3.out' }, '-=.2')
    .add(() => { try { render(t); } catch (err) { console.error('Affichage de la page impossible :', err); } })
    .to(label, { yPercent: -110, duration: .28, ease: 'power3.in' }, '+=.05')
    .to(curtain, { clipPath: 'inset(0% 0% 100% 0%)', duration: .55, ease: 'power3.inOut' }, '-=.05')
    .to(curtainO, { clipPath: 'inset(0% 0% 100% 0%)', duration: .55, ease: 'power3.inOut' }, '<.06')
    .add(() => { if (t !== 'home') animatePage(); }, '<.15')
    .set([curtainO, curtain], { display: 'none' });
}
// Le mode administration n'est téléchargé que lorsqu'on l'ouvre : les visiteurs ne chargent jamais ce code
let adminLoading = null;
function loadAdmin() {
  if (window.ADMIN) return Promise.resolve();
  return adminLoading || (adminLoading = new Promise((ok, ko) => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'css/admin.css'; document.head.append(l);
    const s = document.createElement('script'); s.src = 'js/admin.js'; s.onload = ok; s.onerror = () => { adminLoading = null; s.remove(); ko(new Error('Mode admin indisponible')); };
    document.body.append(s);
  }));
}
const openAdmin = () => loadAdmin().then(() => window.ADMIN.open()).catch(e => console.error(e));
$('#admin-btn').addEventListener('click', openAdmin);

function route(instant) {
  const h = location.hash;
  if (h === '#/work') {
    history.replaceState(null, '', '#/');
    afterHome(() => scrollToSel('#work'));
    return;
  }
  if (h === '#/admin') { history.replaceState(null, '', '#/'); openAdmin(); return go('home', instant); }
  if (h.startsWith('#/p/') && findItem(h.slice(4))) return go(h.slice(4), instant);
  if (h === '#/info') return go('info', instant);
  if (h === '#/certs') return go('certs', instant);
  if (h === '#/veille') return go('veille', instant);
  if (h === '#/mentions-legales') return go('legal', instant);
  go('home', instant);
}
addEventListener('hashchange', () => route());
// Clic sur Info / Certifications / Retour : on navigue directement (même si l'adresse est déjà la bonne)
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#/"]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  const h = a.getAttribute('href'); if (!/^#\/(info|certs|veille|mentions-legales|p\/.+)?$/.test(h)) return;
  e.preventDefault();
  if (location.hash !== h) history.pushState(null, '', h);
  route();
});
addEventListener('popstate', () => route());
// Sécurité : si une transition reste bloquée plus de 4 s, on libère la navigation
setInterval(() => { if (busy && performance.now() - (window.__navT || 0) > 4000) { busy = false; gsap.set([curtainO, curtain], { display: 'none' }); if (pending) { const p = pending; pending = null; go(p); } } }, 1000);
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!lb.hidden) return closeLb();
  if (vDlg && vDlg.open) return;                                           // la fiche de veille se ferme seule (Échap natif)
  if (document.querySelector('.adm-modal, .adm-drawer.open')) return;      // en mode admin, Échap ne quitte pas la page en cours d'édition
  if (current !== 'home') location.hash = '#/';
});

/* ---------- Agrandir une image (schémas, captures, attestations) ---------- */
const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('.lb-cap', lb);
let lbFrom = null;
function openLb(url, cap, from) {
  lbImg.src = url; lbImg.alt = cap || ''; lbCap.textContent = cap || ''; lbFrom = from || null;
  lb.hidden = false; requestAnimationFrame(() => lb.classList.add('on')); $('.lb-close', lb).focus({ preventScroll: true });
}
function closeLb() {
  lb.classList.remove('on'); setTimeout(() => { lb.hidden = true; lbImg.removeAttribute('src'); }, 260);
  if (lbFrom && lbFrom.focus) lbFrom.focus({ preventScroll: true });
}
const zoomFrom = el => { const img = el.tagName === 'IMG' ? el : $('img', el); if (!img) return; const f = el.closest('figure'), c = f && $('figcaption', f); openLb(img.currentSrc || img.src, (c && c.textContent) || img.alt, el); };
document.addEventListener('click', e => {
  if (!lb.hidden) { if (e.target === lb || e.target.closest('.lb-close') || e.target === lbImg) closeLb(); return; }
  if (isAdm()) return;                                                       // en mode admin, un clic sur la page ouvre l'éditeur
  const z = e.target.closest('[data-zoom]'); if (z) zoomFrom(z);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-zoom]') && !isAdm()) { e.preventDefault(); zoomFrom(e.target); }
  if (e.key === 'Tab' && !lb.hidden) { e.preventDefault(); $('.lb-close', lb).focus(); }   // le focus reste dans la fenêtre
});

/* ---------- Curseur : celui du système ---------- */
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  // Boutons et liens « magnétiques » : ils suivent légèrement la souris
  let mag = null;
  document.addEventListener('pointermove', e => {
    const el = root.classList.contains('adm-active') ? null : e.target.closest('.btn, .navlink, .back, .admin-link');
    if (el !== mag) { if (mag) gsap.to(mag, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1, .45)' }); mag = el; }
    if (el) { const r = el.getBoundingClientRect(), gx = gsap.getProperty(el, 'x'), gy = gsap.getProperty(el, 'y');
      gsap.to(el, { x: (e.clientX - (r.left - gx + r.width / 2)) * .28, y: (e.clientY - (r.top - gy + r.height / 2)) * .35, duration: .45, ease: 'power3.out' }); }
  });

}

/* ---------- Animations au scroll ---------- */
function initScroll() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.matchMedia().add({ desk: '(min-width: 768px)', mob: '(max-width: 767px)' }, ctx => {
    if (reduce) { gsap.set('#intro-sub', { opacity: 1 }); return; }
    gsap.set('#intro-name', { scale: ctx.conditions.desk ? .1 : .25 });
    // Le nom grandit dès les premiers tours de molette, puis s'efface
    gsap.timeline({ scrollTrigger: { trigger: '#intro', start: 'top top', end: 'bottom bottom', scrub: .5 }, defaults: { force3D: false } })
      .to('#intro-name', { scale: 1, ease: 'power2.out', duration: 1 }, 0)
      .to('.intro-fade', { opacity: 0, duration: .15 }, 0)
      .fromTo('#intro-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .3 }, .55)
      .to('#intro-name', { yPercent: -20, opacity: 0, ease: 'power2.in', duration: .45 }, 1.15)
      .to('#intro-sub', { opacity: 0, y: -16, duration: .35 }, 1.2);
  });

  gsap.to('#statement .w', { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: '#statement', start: 'top 80%', end: 'bottom 45%', scrub: true } });

  if (!reduce) {
    gsap.set('.reveal', { opacity: 0, y: 36 });
    ScrollTrigger.batch('.reveal', { start: 'top 90%', once: true,
      onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: .07, onComplete: () => gsap.set(els, { clearProps: 'transform,opacity' }) }) });
  }
  if (!reduce) {
    gsap.set('.card-media', { clipPath: 'inset(100% 0% 0% 0% round 18px)' });
    ScrollTrigger.batch('.card-media', { start: 'top 94%', once: true,
      onEnter: els => gsap.to(els, { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1.25, ease: 'power4.out', stagger: .09, onComplete: () => gsap.set(els, { clearProps: 'clipPath' }) }) });
  }
  window.__scrollReady = true;
}

/* ---------- Chargement : 0 → 100 % au centre ---------- */
window.scrollTo(0, 0);
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.set('#intro-name', { scale: innerWidth >= 768 ? .1 : .25 }); // le nom démarre petit

// Place la ligne de statut juste sous le nom (qui démarre petit)
function placeTag() {
  const n = $('#intro-name'), s = +gsap.getProperty(n, 'scale') || 1;
  $('#intro-tag').style.top = `calc(50% + ${n.offsetHeight * s / 2 + 20}px)`;
}
placeTag();
addEventListener('resize', () => { if (scrollY < 10) placeTag(); });
// Chargement puis ouverture directe sur l'accueil
let started = false;
function startPortfolio() {
  if (started) return; started = true;
  const ready = () => contentReady.finally(() => { initScroll(); route(true); if (current === 'home') lenis && lenis.start(); });
  let seen = false; try { seen = sessionStorage.getItem('tb-seen') === '1'; sessionStorage.setItem('tb-seen', '1'); } catch (e) {}
  // Déjà venu pendant cette session (rechargement, retour sur le site) ou animations réduites : ouverture immédiate
  if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.timeline().to('#loader', { opacity: 0, duration: .3, ease: 'power1.out' }).set('#loader', { display: 'none' }).add(ready);
    return;
  }
  const o = { v: 0 }, count = $('#count'), bar = $('#ld-bar');
  gsap.timeline()
  .fromTo('#ld-num', { yPercent: 105 }, { yPercent: 0, duration: .55, ease: 'power3.out' })
  .to(o, { v: 100, duration: 1.15, ease: 'sine.inOut', onUpdate: () => { const v = Math.round(o.v); if (count.textContent != v) count.textContent = v; bar.style.transform = `scaleX(${o.v / 100})`; } }, .1)
  .to('#ld-num', { yPercent: -105, duration: .45, ease: 'power2.in' }, '+=.08')
  .to('#loader-top, #loader-bot, #loader .bar', { opacity: 0, duration: .3 }, '<')
  .to('#loader', { clipPath: 'inset(0% 0% 100% 0%)', duration: .85, ease: 'power4.inOut' }, '-=.2')
  .from('#intro-name', { opacity: 0, y: 24, duration: .8, ease: 'power3.out' }, '-=.45')
  .set('#loader', { display: 'none' })
  .add(ready);
}
window.startPortfolio = startPortfolio;
startPortfolio();
