/* Portfolio de Tévin Bouvet — mode administration (chargé à la demande) */
(() => {
  const ADMIN = window.ADMIN = { on: false, cfg: null, dirty: 0 };
  const PENDING = {};                                    // images à envoyer : chemin -> base64
  const KEY = 'tb-admin', DRAFT = 'tb-draft';
  const store = { get(k) { try { return JSON.parse(localStorage.getItem(k) || sessionStorage.getItem(k)); } catch (e) { return null; } },
                  set(k, v, keep = true) { try { (keep ? localStorage : sessionStorage).setItem(k, JSON.stringify(v)); } catch (e) {} },
                  del(k) { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch (e) {} } };

  /* ---------- Petits outils d'interface ---------- */
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v; else if (k.startsWith('on')) el[k] = v; else if (k === 'value') el.value = v ?? ''; else if (v !== false && v != null) el.setAttribute(k, v);
    }
    kids.flat().forEach(c => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  }
  const field = (label, input, hint) => h('div', { class: 'adm-f' }, h('label', {}, label), input, hint ? h('div', { class: 'hint' }, hint) : null);
  const txt = (obj, key, ph = '', type = 'text') => h('input', { type, value: obj[key] ?? '', placeholder: ph, oninput: e => { obj[key] = e.target.value; changed(); } });
  const area = (obj, key, ph = '', rows = 4) => h('textarea', { rows, placeholder: ph, oninput: e => { obj[key] = e.target.value; changed(); } }, obj[key] ?? '');
  function toast(msg, ms = 3200) { const t = h('div', { class: 'adm-toast adm' }, msg); document.body.append(t); setTimeout(() => t.remove(), ms); }
  const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'image';

  /* ---------- Modifications : rendu en direct + brouillon local ---------- */
  let raf = 0;
  function changed() {
    ADMIN.dirty++; store.set(DRAFT, { base: window.__PUBH, at: Date.now(), data: exportContent() });
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      renderSite(); renderContent(); updateBar();
      if (typeof current !== 'undefined' && current !== 'home' && (current === 'info' || current === 'certs' || current === 'veille' || findItem(current))) {
        page.innerHTML = pageHTML(current);
        page.querySelectorAll('.sec, .cert').forEach(s => s.classList.add('in'));
      }
    });
  }
  function exportContent() {
    return JSON.parse(JSON.stringify({ site: CONFIG.site, categories: CONFIG.categories, info: CONFIG.info, certs: CONFIG.certs, veille: CONFIG.veille, admin: CONFIG.admin }, (k, v) => k.startsWith('_') ? undefined : v));
  }

  /* ---------- Images : redimensionnées dans le navigateur avant l'envoi ---------- */
  async function addImage(file) {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    let url = c.toDataURL('image/webp', 0.85), ext = 'webp';
    if (!url.startsWith('data:image/webp')) { url = c.toDataURL('image/jpeg', 0.86); ext = 'jpg'; }
    const path = `img/uploads/${Date.now().toString(36)}-${slug(file.name.replace(/\.[^.]+$/, ''))}.${ext}`;
    IMG[path] = url; PENDING[path] = url.split(',')[1];
    return path;
  }
  function imageInput(obj, key, label = 'Image') {
    const pv = h('div', { class: 'pv' }), path = h('input', { type: 'text', placeholder: 'img/mon-image.jpg ou https://…', value: obj[key] || '' });
    const show = () => { pv.style.backgroundImage = obj[key] ? `url("${src(obj[key])}")` : ''; path.value = obj[key] || ''; };
    const file = h('input', { type: 'file', accept: 'image/*', onchange: async e => { const f = e.target.files[0]; if (!f) return; obj[key] = await addImage(f); show(); changed(); } });
    path.oninput = () => { obj[key] = path.value.trim() || undefined; show(); changed(); };
    show();
    return field(label, h('div', {},
      h('div', { class: 'adm-img' }, pv, h('div', { class: 'adm-row', style: 'flex-wrap:wrap' },
        h('button', { class: 'adm-btn', onclick: () => file.click() }, 'Choisir une image'),
        h('button', { class: 'adm-btn', onclick: () => { delete obj[key]; show(); changed(); } }, 'Retirer'), file)),
      h('div', { style: 'margin-top:8px' }, path)));
  }

  // Document (PDF, PowerPoint) : envoyé tel quel dans docs/ au moment de publier
  function docInput(b) {
    const path = h('input', { type: 'text', placeholder: 'docs/ma-presentation.pdf ou https://…', value: b.doc || '' }), info = h('div', { class: 'muted', style: 'font-size:12px;margin-top:6px' });
    const file = h('input', { type: 'file', accept: '.pdf,.ppt,.pptx,application/pdf', onchange: e => {
      const f = e.target.files[0]; if (!f) return;
      if (f.size > 20e6) { info.textContent = 'Fichier trop lourd (20 Mo maximum). Exporte-le en PDF ou compresse les images.'; return; }
      const r = new FileReader(); r.onload = () => {
        const p = `docs/${Date.now().toString(36)}-${slug(f.name.replace(/\.[^.]+$/, ''))}.${(f.name.split('.').pop() || 'pdf').toLowerCase()}`;
        IMG[p] = r.result; PENDING[p] = String(r.result).split(',')[1]; b.doc = p; path.value = p;
        info.textContent = `${f.name} (${(f.size / 1e6).toFixed(1)} Mo) sera publié avec le site.`; changed();
      }; r.readAsDataURL(f);
    } });
    path.oninput = () => { b.doc = path.value.trim(); changed(); };
    return h('div', {},
      field('Fichier', h('div', {}, h('div', { class: 'adm-row', style: 'flex-wrap:wrap' }, h('button', { class: 'adm-btn', onclick: () => file.click() }, 'Choisir un fichier'), file), h('div', { style: 'margin-top:8px' }, path), info),
        'Un PDF s\'affiche directement dans la page. Un PowerPoint (.pptx) se télécharge seulement : exporte-le plutôt en PDF.'),
      field('Texte du bouton', txt(b, 'docLabel', 'Ma présentation (PDF)')));
  }

  /* ---------- Listes éditables (liens, infos, blocs) ---------- */
  function listEditor(arr, make, addLabel, addFn) {
    const box = h('div');
    const draw = () => {
      box.replaceChildren(...arr.map((item, i) => make(item, i, {
        up: () => { if (i > 0) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; changed(); draw(); } },
        down: () => { if (i < arr.length - 1) { [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; changed(); draw(); } },
        del: () => { arr.splice(i, 1); changed(); draw(); }, redraw: draw
      })), h('button', { class: 'adm-btn', onclick: () => { arr.push(addFn()); changed(); draw(); } }, '+ ' + addLabel));
    };
    draw(); return box;
  }
  const tools = t => [h('button', { class: 'adm-ico', title: 'Monter', onclick: t.up }, '↑'), h('button', { class: 'adm-ico', title: 'Descendre', onclick: t.down }, '↓'), h('button', { class: 'adm-ico', title: 'Supprimer', onclick: t.del }, '✕')];
  const TYPES = { text: 'Texte', image: 'Image', video: 'Vidéo', list: 'Liste de mots-clés', code: 'Code / commandes', link: 'Lien (bouton)', doc: 'Document (PDF / PowerPoint)' };
  const typeOf = b => b.doc !== undefined ? 'doc' : b.video !== undefined ? 'video' : b.image !== undefined ? 'image' : b.list !== undefined ? 'list' : b.code !== undefined ? 'code' : b.url !== undefined ? 'link' : 'text';
  function blocksEditor(arr) {
    return listEditor(arr, (b, i, t) => {
      const type = typeOf(b), body = [];
      if (type === 'text') body.push(field('Texte', area(b, 'text', 'Ton texte. Ligne vide = nouveau paragraphe. Lien : [texte](https://…)', 6)));
      if (type === 'image') { body.push(imageInput(b, 'image')); body.push(field('Légende', txt(b, 'caption', 'Ex. : schéma de l\'architecture'))); }
      if (type === 'video') { body.push(field('Lien de la vidéo', txt(b, 'video', 'https://youtu.be/… ou videos/presentation.mp4'), 'Conseillé : YouTube en « non répertoriée ». Un fichier .mp4 doit être placé dans le dépôt GitHub.')); body.push(field('Légende', txt(b, 'caption'))); }
      if (type === 'list') body.push(field('Mots-clés (séparés par des virgules)', h('input', { type: 'text', value: (b.list || []).join(', '), oninput: e => { b.list = e.target.value.split(',').map(s => s.trim()).filter(Boolean); changed(); } })));
      if (type === 'code') body.push(field('Code', area(b, 'code', 'Get-VM | Move-VM …', 5)));
      if (type === 'doc') body.push(docInput(b));
      if (type === 'link') { body.push(field('Texte du bouton', txt(b, 'linkLabel', 'Voir la documentation'))); body.push(field('Adresse', txt(b, 'url', 'https://…', 'url'))); }
      const sel = h('select', { onchange: e => { const keep = b.label; for (const k of Object.keys(b)) delete b[k]; b.label = keep; const v = e.target.value;
        if (v === 'image') b.image = ''; if (v === 'video') b.video = ''; if (v === 'list') b.list = []; if (v === 'code') b.code = ''; if (v === 'link') { b.url = ''; b.linkLabel = ''; } if (v === 'text') b.text = ''; if (v === 'doc') { b.doc = ''; b.docLabel = 'Ma présentation (PDF)'; } changed(); t.redraw(); } },
        ...Object.entries(TYPES).map(([k, l]) => h('option', { value: k, selected: k === type ? 'selected' : false }, l)));
      return h('div', { class: 'adm-block' }, h('div', { class: 'adm-row' }, txt(b, 'label', 'Titre du bloc (ex. Contexte)'), ...tools(t)), field('Type', sel), ...body);
    }, 'Ajouter un bloc', () => ({ label: 'Nouveau bloc', text: '' }));
  }
  const pairsEditor = (arr, k1 = 'Intitulé', k2 = 'Valeur') => listEditor(arr, (p, i, t) => h('div', { class: 'adm-row', style: 'margin-bottom:8px' },
    h('input', { type: 'text', placeholder: k1, value: p[0], oninput: e => { p[0] = e.target.value; changed(); } }),
    h('input', { type: 'text', placeholder: k2, value: p[1], oninput: e => { p[1] = e.target.value; changed(); } }), ...tools(t)), 'Ajouter une ligne', () => ['', '']);

  /* ---------- Tiroir d'édition ---------- */
  const drawer = h('aside', { class: 'adm adm-drawer', 'data-lenis-prevent': '' });
  function openDrawer(title, kicker, ...content) {
    drawer.replaceChildren(h('div', { class: 'adm-head' }, h('span', { class: 'mono muted' }, kicker), h('button', { class: 'adm-x', onclick: closeDrawer }, '✕')), h('h2', {}, title), ...content);
    drawer.classList.add('open'); drawer.scrollTop = 0; root.classList.add('adm-drawer-open');
  }
  function closeDrawer() { drawer.classList.remove('open'); root.classList.remove('adm-drawer-open'); }

  function editItem(id) {
    const it = findItem(id); if (!it) return;
    const c = it._cat, idx = c.items.indexOf(it);
    const move = d => { const j = idx + d; if (j < 0 || j >= c.items.length) return; [c.items[idx], c.items[j]] = [c.items[j], c.items[idx]]; changed(); requestAnimationFrame(() => editItem(`${c.id}-${j}`)); };
    if (!it.blocks || !it.blocks.length) it.blocks = [{ label: 'Contexte', text: '' }, { label: 'Objectif', text: '' }, { label: 'Réalisation', text: '' }, { label: 'Résultat', text: '' }];
    if (!it.meta) it.meta = [['Année', it.year || ''], ['Rôle', ''], ['Outils', '']];
    openDrawer(it.title || 'Case', c.title,
      field('Titre', txt(it, 'title', 'Ex. : Migration de VM sur ESXi')),
      field('Texte court (sous le titre)', area(it, 'text', 'Une ou deux phrases', 3)),
      imageInput(it, 'image', 'Image de la case et de couverture'),
      h('div', { class: 'adm-row' }, field('Année', txt(it, 'year', '2026')),
        field('Mots-clés', h('input', { type: 'text', value: (it.tags || []).join(', '), placeholder: 'ESXi, VLAN', oninput: e => { it.tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean); changed(); } }))),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Infos en tête de page'), pairsEditor(it.meta)),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Contenu de la page'), blocksEditor(it.blocks)),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Case'), h('div', { class: 'adm-row', style: 'flex-wrap:wrap' },
        h('button', { class: 'adm-btn', onclick: () => move(-1) }, '← Avancer'), h('button', { class: 'adm-btn', onclick: () => move(1) }, 'Reculer →'),
        h('button', { class: 'adm-btn', onclick: () => { location.hash = `#/p/${it._id}`; } }, 'Voir la page'),
        h('button', { class: 'adm-btn danger', onclick: () => { if (confirm('Supprimer cette case ?')) { c.items.splice(idx, 1); changed(); closeDrawer(); } } }, 'Supprimer la case'))));
  }
  function editSite() {
    const s = CONFIG.site; s.links = s.links || [];
    openDrawer('Réglages du site', 'Général',
      h('div', { class: 'adm-row' }, field('Prénom', txt(s, 'firstName')), field('Nom', txt(s, 'lastName'))),
      field('Statut (sous ton nom)', txt(s, 'tagline', 'BTS SIO SISR — Alternant chez OPmobility')),
      field('Sous-titre', txt(s, 'sub')),
      field('Phrase d\'accroche', area(s, 'statement', '', 3), 'Entoure un mot d\'*étoiles* pour le mettre en orange.'),
      field('Email', txt(s, 'email', 'toi@exemple.com')),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Liens de contact'), listEditor(s.links, (l, i, t) => h('div', { class: 'adm-row', style: 'margin-bottom:8px' },
        h('input', { type: 'text', placeholder: 'LinkedIn', value: l.label, oninput: e => { l.label = e.target.value; changed(); } }),
        h('input', { type: 'text', placeholder: 'https://…', value: l.href, oninput: e => { l.href = e.target.value; changed(); } }), ...tools(t)), 'Ajouter un lien', () => ({ label: '', href: '' }))),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Catégories'), listEditor(CONFIG.categories, (c, i, t) => h('div', { class: 'adm-block' },
        h('div', { class: 'adm-row' }, h('input', { type: 'text', placeholder: 'Titre', value: c.title, oninput: e => { c.title = e.target.value; changed(); } }), ...tools(t)),
        h('div', { class: 'adm-row' }, h('input', { type: 'text', placeholder: 'Sous-titre', value: c.sub, oninput: e => { c.sub = e.target.value; changed(); } }),
          h('select', { onchange: e => { c.cols = +e.target.value; changed(); } }, h('option', { value: 3, selected: c.cols !== 4 ? 'selected' : false }, '3 colonnes'), h('option', { value: 4, selected: c.cols === 4 ? 'selected' : false }, '4 colonnes')))),
        'Ajouter une catégorie', () => ({ id: 'cat' + Date.now().toString(36), num: '', title: 'Nouvelle catégorie', sub: '', items: [{ title: 'Title', text: '' }] }))),
      h('div', { class: 'adm-row adm-sec' }, field('Pied de page (gauche)', txt(s, 'footerLeft')), field('Pied de page (droite)', txt(s, 'footerRight'))),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Sécurité'), h('div', { class: 'adm-row', style: 'flex-wrap:wrap' }, h('button', { class: 'adm-btn', onclick: changeCodeModal }, 'Changer le code'), h('button', { class: 'adm-btn danger', onclick: logout }, 'Déconnecter GitHub de cet appareil'))));
  }
  function editInfo() {
    const I = CONFIG.info; I.facts = I.facts || []; I.blocks = I.blocks || [];
    openDrawer('Page Info', 'À propos',
      field('Titre de la page', area(I, 'headline', '', 2), 'Tu peux garder les balises <span class="serif accent">…</span> pour l\'italique orange.'),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Infos clés'), pairsEditor(I.facts)),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Contenu'), blocksEditor(I.blocks)),
      h('button', { class: 'adm-btn', style: 'margin-top:12px', onclick: () => { location.hash = '#/info'; } }, 'Voir la page Info'));
  }

  function editVeille() {
    CONFIG.veille = CONFIG.veille || {}; const V = CONFIG.veille; V.articles = V.articles || []; V.sources = V.sources || [];
    if (V.doc === undefined) V.doc = '';
    openDrawer('Veille', 'Page beige',
      field('Sujet', txt(V, 'subject', "L'intelligence artificielle en entreprise")),
      field('Introduction', area(V, 'intro', 'Ce que tu suis et pourquoi', 3)),
      h('div', { class: 'adm-row' }, ...V_CRIT.map(([k, l]) => field(`Poids ${l}`, h('input', { type: 'number', min: 0, max: 10, value: (V.weights || {})[k] ?? '', oninput: e => { V.weights = V.weights || {}; V.weights[k] = parseInt(e.target.value, 10) || 0; changed(); } }))),
        field('Seuil de publication', h('input', { type: 'number', min: 0, max: 40, value: V.threshold ?? 20, oninput: e => { V.threshold = parseInt(e.target.value, 10) || 0; changed(); } }))),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Méthodologie (étapes)'), listEditor(V.steps = V.steps || [], (s, i, t) => h('div', { class: 'adm-block' },
        h('div', { class: 'adm-row' }, txt(s, 'title', "Titre de l'étape"), ...tools(t)), field('Texte', area(s, 'text', 'Ce qui se passe à cette étape', 3))), 'Ajouter une étape', () => ({ title: '', text: '' }))),
      field('Tableau des sources (Excel)', txt(V, 'table', 'docs/veille-sources.xlsx'), 'Fichier placé dans le dépôt GitHub. Laisse vide pour masquer le bouton.'),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Articles (le plus récent en premier)'), listEditor(V.articles, (a, i, t) => h('div', { class: 'adm-block' },
        h('div', { class: 'adm-row' }, txt(a, 'title', "Titre de l'article"), ...tools(t)),
        h('div', { class: 'adm-row' }, field('Date', txt(a, 'date', 'Novembre 2026')), field('Catégorie', txt(a, 'cat', 'Cybersécurité'))),
        h('div', { class: 'adm-row' }, field('Source', txt(a, 'source', 'ANSSI')), field('Lien', txt(a, 'url', 'https://…', 'url'))),
        field('En bref (un point par ligne, 3 maximum)', h('textarea', { rows: 4, oninput: e => { a.points = e.target.value.split('\n').map(s => s.trim()).filter(Boolean); changed(); } }, (a.points || []).join('\n'))),
        field('Impact entreprise', area(a, 'impact', 'Ce que ça change pour un service informatique', 2)),
        field('Mon avis', area(a, 'avis', 'Ton opinion en une ou deux phrases', 2)),
        h('div', { class: 'adm-row' }, ...V_CRIT.map(([k, l]) => field(`${l} (1 à 4)`, h('input', { type: 'number', min: 1, max: 4, step: 1, value: (a.notes || {})[k] ?? '', oninput: e => { a.notes = a.notes || {}; const v = Math.max(1, Math.min(4, parseInt(e.target.value, 10) || 0)); if (e.target.value === '') delete a.notes[k]; else a.notes[k] = v; changed(); } })))),
        h('div', { class: 'adm-row' }, field('Date ISO (tri)', txt(a, 'iso', '2026-11-12')), field('Site', txt(a, 'site', 'cyber.gouv.fr'))),
        h('div', { class: 'adm-row' }, field('Auteur', txt(a, 'author', 'ANSSI')), field('Mots-clés', txt(a, 'keywords', 'IA, sécurité')))),
        'Ajouter un article', () => ({ date: '', iso: '', cat: '', title: '', source: '', url: '', points: [], impact: '', avis: '', notes: {} }))),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Mes sources'), listEditor(V.sources, (s, i, t) => h('div', { class: 'adm-row', style: 'margin-bottom:8px' },
        h('input', { type: 'text', placeholder: 'Nom de la source', value: s.label || '', oninput: e => { s.label = e.target.value; changed(); } }),
        h('input', { type: 'text', placeholder: 'https://…', value: s.url || '', oninput: e => { s.url = e.target.value; changed(); } }), ...tools(t)), 'Ajouter une source', () => ({ label: '', url: '' }))),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Présentation'), docInput(V)));
  }
  function editCerts() {
    CONFIG.certs = CONFIG.certs || { title: 'Certifications', intro: '', items: [] };
    const C = CONFIG.certs; C.items = C.items || [];
    openDrawer('Certifications', 'Page marron',
      field('Titre de la page', txt(C, 'title', 'Certifications')),
      field('Introduction', area(C, 'intro', '', 3)),
      h('div', { class: 'adm-sec' }, h('h3', {}, 'Certifications'), listEditor(C.items, (c, i, t) => h('div', { class: 'adm-block' },
        h('div', { class: 'adm-row' }, txt(c, 'name', 'Ex. : Cisco CCNA'), ...tools(t)),
        h('div', { class: 'adm-row' }, field('Organisme', txt(c, 'issuer', 'Cisco')), field('Date', txt(c, 'date', 'Juin 2026'))),
        field('Statut', h('select', { onchange: e => { c.status = e.target.value; changed(); } }, ...['Obtenu', 'En préparation', 'Objectif'].map(st => h('option', { value: st, selected: c.status === st ? 'selected' : false }, st)))),
        imageInput(c, 'image', 'Badge ou logo'),
        field('Description', area(c, 'text', 'Ce que couvre la certification, ton score…', 3)),
        field('Lien de vérification', txt(c, 'url', 'https://www.credly.com/…', 'url'), 'Lien Credly ou page officielle : un recruteur peut vérifier.')),
        'Ajouter une certification', () => ({ name: 'Nouvelle certification', issuer: '', date: '', status: 'Objectif', text: '' }))),
      h('button', { class: 'adm-btn', style: 'margin-top:12px', onclick: () => { location.hash = '#/certs'; } }, 'Voir la page'));
  }

  /* ---------- Barre d'administration ---------- */
  const bar = h('div', { class: 'adm adm-bar' });
  function updateBar() {
    const n = ADMIN.dirty;
    bar.replaceChildren(h('span', { class: 'st' }, h('i'), n ? `${n} modification${n > 1 ? 's' : ''} non publiée${n > 1 ? 's' : ''}` : 'Mode édition'),
      h('button', { onclick: editSite }, 'Site'), h('button', { onclick: editInfo }, 'Page Info'), h('button', { onclick: editCerts }, 'Certifications'),
      h('button', { onclick: exportFile }, 'Exporter'),
      h('button', { class: 'pub', onclick: publish }, 'Publier'), h('button', { onclick: quit }, 'Quitter'));
  }
  function exportFile() {
    const a = h('a', { href: URL.createObjectURL(new Blob([JSON.stringify(exportContent(), null, 2)], { type: 'application/json' })), download: 'content.json' });
    a.click(); toast('content.json téléchargé (sauvegarde).');
  }

  /* ---------- Publication sur GitHub (un seul commit : contenu + images) ---------- */
  async function api(path, opt = {}) {
    const { owner, repo, token } = ADMIN.cfg;
    const r = await fetch(`https://api.github.com/repos/${owner}/${repo}${path}`, { ...opt, headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`${r.status} — ${j.message || 'erreur GitHub'}`);
    return j;
  }
  const b64 = str => { const bytes = new TextEncoder().encode(str); let bin = ''; bytes.forEach(b => bin += String.fromCharCode(b)); return btoa(bin); };
  let busy = false;
  async function publish() {
    if (busy) return;
    if (!ADMIN.cfg) { busy = true; const ok = await githubModal(); busy = false; if (!ok) return; }
    busy = true; toast('Publication en cours…', 2500);
    try {
      // Sécurité : on refuse de publier si la version en ligne a changé depuis l'ouverture de la page
      const branch0 = ADMIN.cfg.branch || 'main';
      const cur = await api(`/contents/content.json?ref=${branch0}`).catch(() => null);
      if (cur && cur.content) {
        const bytes = Uint8Array.from(atob(cur.content.replace(/\n/g, '')), c => c.charCodeAt(0)), online = new TextDecoder().decode(bytes);
        if (window.__PUBH && textHash(online) !== window.__PUBH) throw new Error("le site a été mis à jour depuis l'ouverture de cette page. Rien n'a été écrasé : recharge la page (Ctrl+F5), puis refais tes modifications.");
      }
      const data = exportContent(), json = JSON.stringify(data, null, 2);
      const files = [{ path: 'content.json', content: b64(json) }, ...Object.entries(PENDING).filter(([p]) => json.includes(p)).map(([path, content]) => ({ path, content }))];
      const branch = ADMIN.cfg.branch || 'main';
      const ref = await api(`/git/ref/heads/${branch}`), base = ref.object.sha, commit = await api(`/git/commits/${base}`);
      const tree = [];
      for (const f of files) { const blob = await api('/git/blobs', { method: 'POST', body: JSON.stringify({ content: f.content, encoding: 'base64' }) }); tree.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha }); }
      const t = await api('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: commit.tree.sha, tree }) });
      const c = await api('/git/commits', { method: 'POST', body: JSON.stringify({ message: `Mise à jour du portfolio (mode admin, ${new Date().toLocaleString('fr-FR')})`, tree: t.sha, parents: [base] }) });
      await api(`/git/refs/heads/${branch}`, { method: 'PATCH', body: JSON.stringify({ sha: c.sha }) });
      Object.keys(PENDING).forEach(k => delete PENDING[k]); ADMIN.dirty = 0; store.del(DRAFT); window.__PUBH = textHash(json); updateBar();
      toast('Publié. Le site sera à jour dans environ 30 secondes.', 5000);
    } catch (e) { toast('Échec de la publication : ' + e.message, 7000); }
    busy = false;
  }

  /* ---------- Accès par code ----------
     Le code n'est PAS écrit dans le site : seule son empreinte PBKDF2 (600 000 itérations) l'est.
     Pour changer de code, demande une nouvelle empreinte (salt + hash) et remplace ADMIN_AUTH. */
  const ADMIN_AUTH = { salt: '189f3ae62c69e9a3c3d8cbacee9f55d6', hash: 'bae31d8068b210e20d777a7cc7594d2a1c99a1e9d226cd9110942a5ca4fee173', iter: 600000 };
  // Un code changé depuis le mode admin est publié dans content.json et remplace celui-ci
  const auth = () => (CONFIG.admin && CONFIG.admin.hash) ? CONFIG.admin : ADMIN_AUTH;
  const te = new TextEncoder();
  const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  const unhex = s => new Uint8Array(s.match(/../g).map(x => parseInt(x, 16)));
  async function baseKey(code) { return crypto.subtle.importKey('raw', te.encode(code), 'PBKDF2', false, ['deriveBits', 'deriveKey']); }
  async function checkCode(code) {
    const A = auth(), bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unhex(A.salt), iterations: A.iter, hash: 'SHA-256' }, await baseKey(code), 256);
    return hex(bits) === A.hash;
  }
  // Le jeton GitHub est chiffré (AES-GCM) avec une clé tirée du code, puis gardé sur cet appareil
  async function aesKey(code) { return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: te.encode(auth().salt + ':token'), iterations: auth().iter, hash: 'SHA-256' }, await baseKey(code), { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']); }
  async function sealToken(cfg, code) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await aesKey(code), te.encode(cfg.token));
    return { owner: cfg.owner, repo: cfg.repo, branch: cfg.branch, iv: hex(iv), ct: hex(ct) };
  }
  async function openToken(box, code) {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unhex(box.iv) }, await aesKey(code), unhex(box.ct));
    return { owner: box.owner, repo: box.repo, branch: box.branch, token: new TextDecoder().decode(pt) };
  }
  const TOKEN_BOX = 'tb-admin-token', UNLOCK = 'tb-unlocked';
  let CODE = null;                                        // gardé en mémoire le temps de la session uniquement

  function codeModal() {
    const err = h('div', { class: 'adm-err' });
    const input = h('input', { type: 'password', placeholder: '••••••••••', autocomplete: 'current-password' });
    // Après chaque erreur, l'attente double (1 s, 2 s, 4 s… jusqu'à 60 s) avant de pouvoir réessayer
    const FAILS = 'tb-fails', fails = () => store.get(FAILS) || { n: 0, until: 0 };
    let tick = null;
    const wait = () => {
      clearInterval(tick);
      const left = () => Math.ceil((fails().until - Date.now()) / 1000);
      if (left() <= 0) { btn.disabled = false; btn.textContent = 'Entrer'; return false; }
      btn.disabled = true;
      const show = () => { const s = left(); if (s <= 0) { clearInterval(tick); btn.disabled = false; btn.textContent = 'Entrer'; } else { btn.textContent = `Réessaie dans ${s} s`; } };
      show(); tick = setInterval(show, 500); return true;
    };
    const go = async () => {
      if (btn.disabled || !input.value) return;
      err.textContent = ''; btn.disabled = true; btn.textContent = 'Vérification…';
      const ok = await checkCode(input.value).catch(() => false);
      if (!ok) {
        const f = fails(); f.n++; f.until = Date.now() + Math.min(60000, 1000 * 2 ** (f.n - 1)); store.set(FAILS, f);
        err.textContent = f.n >= 3 ? `Code incorrect (${f.n} essais).` : 'Code incorrect.'; input.select(); wait(); return;
      }
      store.del(FAILS);
      CODE = input.value; try { sessionStorage.setItem(UNLOCK, '1'); } catch (e) {}
      const box = store.get(TOKEN_BOX);
      if (box) { try { ADMIN.cfg = await openToken(box, CODE); } catch (e) { ADMIN.cfg = null; } }
      modal.remove(); enable(); toast('Mode édition activé. Clique sur une case pour la modifier.');
    };
    input.onkeydown = e => { if (e.key === 'Enter') go(); };
    const btn = h('button', { class: 'adm-btn acc', onclick: go }, 'Entrer');
    const modal = h('div', { class: 'adm adm-modal' }, h('div', { class: 'adm-card' },
      h('div', { class: 'adm-head' }, h('span', { class: 'mono muted' }, 'Administration'), h('button', { class: 'adm-x', onclick: () => modal.remove() }, '✕')),
      h('h2', { style: 'font-size:26px;font-weight:500;letter-spacing:-.03em;margin:6px 0 18px' }, 'Code d\'accès'),
      field('Code', input), err, h('div', { style: 'margin-top:10px' }, btn)));
    document.body.append(modal); setTimeout(() => input.focus(), 50); wait();
  }

  function changeCodeModal() {
    const a = h('input', { type: 'password', autocomplete: 'new-password', placeholder: '12 caractères minimum' }), b = h('input', { type: 'password', autocomplete: 'new-password' }), err = h('div', { class: 'adm-err' });
    const modal = h('div', { class: 'adm adm-modal' }, h('div', { class: 'adm-card' },
      h('div', { class: 'adm-head' }, h('span', { class: 'mono muted' }, 'Sécurité'), h('button', { class: 'adm-x', onclick: () => modal.remove() }, '✕')),
      h('h2', { style: 'font-size:26px;font-weight:500;letter-spacing:-.03em;margin:6px 0 10px' }, 'Changer le code'),
      h('p', { class: 'muted', style: 'font-size:14px;margin-bottom:16px' }, 'Le nouveau code devient actif en ligne quand tu cliques sur « Publier ». Seule son empreinte chiffrée est enregistrée.'),
      field('Nouveau code', a), field('Confirmer', b), err,
      h('button', { class: 'adm-btn acc', style: 'margin-top:10px', onclick: async e => {
        const v = a.value;
        if (v.length < 12) { err.textContent = 'Au moins 12 caractères.'; return; }
        if (v !== b.value) { err.textContent = 'Les deux codes ne sont pas identiques.'; return; }
        if (!/[a-z]/.test(v) || !/[A-Z]/.test(v) || !/[0-9]/.test(v)) { err.textContent = 'Mélange majuscules, minuscules et chiffres.'; return; }
        e.target.disabled = true; e.target.textContent = 'Calcul…';
        const salt = hex(crypto.getRandomValues(new Uint8Array(16))), iter = 600000;
        const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unhex(salt), iterations: iter, hash: 'SHA-256' }, await baseKey(v), 256);
        CONFIG.admin = { salt, hash: hex(bits), iter }; CODE = v;
        if (ADMIN.cfg) store.set(TOKEN_BOX, await sealToken(ADMIN.cfg, v));    // le jeton GitHub est rechiffré avec le nouveau code
        modal.remove(); changed(); toast('Nouveau code prêt. Clique sur « Publier » pour l\'activer en ligne.', 6000);
      } }, 'Enregistrer le nouveau code')));
    document.body.append(modal); setTimeout(() => a.focus(), 50);
  }

  // Demandé une seule fois par appareil, au premier « Publier »
  function githubModal() {
    return new Promise(resolve => {
      const f = { owner: '', repo: 'portfolio', branch: 'main', token: '' }, err = h('div', { class: 'adm-err' });
      const close = ok => { modal.remove(); resolve(ok); };
      const modal = h('div', { class: 'adm adm-modal' }, h('div', { class: 'adm-card' },
        h('div', { class: 'adm-head' }, h('span', { class: 'mono muted' }, 'Publication · une seule fois'), h('button', { class: 'adm-x', onclick: () => close(false) }, '✕')),
        h('h2', { style: 'font-size:26px;font-weight:500;letter-spacing:-.03em;margin:6px 0 10px' }, 'Relier GitHub'),
        h('p', { class: 'muted', style: 'font-size:14px;margin-bottom:16px' }, 'Pour publier, le site a besoin d\'un jeton GitHub. Il sera chiffré avec ton code et gardé sur cet appareil.'),
        h('div', { class: 'adm-row' }, field('Compte GitHub', txt(f, 'owner', 'tevinbouvet')), field('Dépôt', txt(f, 'repo', 'portfolio'))),
        field('Jeton d\'accès GitHub', txt(f, 'token', 'github_pat_…', 'password'), 'Jeton « fine-grained » limité au dépôt, permission Contents : Read and write.'),
        err,
        h('button', { class: 'adm-btn acc', style: 'margin-top:10px', onclick: async e => {
          err.textContent = ''; e.target.disabled = true;
          try {
            ADMIN.cfg = { owner: f.owner.trim(), repo: f.repo.trim(), branch: 'main', token: f.token.trim() };
            const r = await api('');
            if (!r.permissions || !r.permissions.push) throw new Error('ce jeton ne peut pas écrire dans ce dépôt');
            ADMIN.cfg.branch = r.default_branch || 'main';
            if (CODE) store.set(TOKEN_BOX, await sealToken(ADMIN.cfg, CODE));
            close(true);
          } catch (x) { ADMIN.cfg = null; err.textContent = 'Connexion impossible : ' + x.message; e.target.disabled = false; }
        } }, 'Relier et publier')));
      document.body.append(modal);
    });
  }

  async function enable() {
    await contentReady;                                   // on part toujours de la version publiée
    ADMIN.on = true; root.classList.add('adm-active');
    const draft = store.get(DRAFT);
    if (draft) {
      // Un brouillon n'est proposé que s'il a été fait à partir de la version actuellement en ligne
      if (!draft.data || !draft.base || draft.base !== window.__PUBH) { store.del(DRAFT); setTimeout(() => toast('Ancien brouillon supprimé : le site a été mis à jour depuis.', 5000), 400); }
      else if (JSON.stringify(draft.data) !== JSON.stringify(exportContent()) && confirm('Un brouillon non publié a été trouvé sur cet appareil. Le reprendre ?')) { applyContent(draft.data); ADMIN.dirty = 1; renderSite(); }
    }
    document.body.append(bar, drawer); updateBar(); renderSite(); renderContent();
  }
  function quit() {
    if (ADMIN.dirty && !confirm('Des modifications ne sont pas publiées. Quitter quand même ? (Le brouillon reste enregistré sur cet appareil.)')) return;
    ADMIN.on = false; CODE = null; ADMIN.cfg = null; root.classList.remove('adm-active'); closeDrawer(); bar.remove(); renderContent();
  }
  function logout() { store.del(TOKEN_BOX); ADMIN.cfg = null; toast('GitHub déconnecté de cet appareil.'); }
  ADMIN.open = () => { if (ADMIN.on) return; if (CODE) { enable(); return; } codeModal(); };
  // Verrouillage automatique : après 20 minutes sans activité, la session admin se ferme (le brouillon reste sur l'appareil)
  const IDLE_MS = 20 * 60 * 1000; let lastSeen = Date.now();
  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => addEventListener(ev, () => { lastSeen = Date.now(); }, { passive: true, capture: true }));
  setInterval(() => {
    if (!ADMIN.on || Date.now() - lastSeen < IDLE_MS) return;
    ADMIN.on = false; CODE = null; ADMIN.cfg = null; root.classList.remove('adm-active'); closeDrawer(); bar.remove(); document.querySelectorAll('.adm-modal').forEach(m => m.remove());
    renderSite(); renderContent(); if (current !== 'home') { page.innerHTML = pageHTML(current); animatePage(); }
    toast('Session admin verrouillée après 20 minutes sans activité. Ton brouillon est conservé sur cet appareil.', 9000);
  }, 15000);
  ADMIN.logout = logout;
  ADMIN.changed = changed;                                 // utilisé par la fiche de notation de la veille

  // En mode édition, un clic sur une case ouvre l'éditeur au lieu de la page
  document.addEventListener('click', e => {
    if (!ADMIN.on) return;
    const add = e.target.closest('[data-add]');
    if (add) { const c = CONFIG.categories.find(c => c.id === add.dataset.add); c.items.push({ title: 'Title', text: 'Écris ce que tu veux ici.' }); changed(); requestAnimationFrame(() => editItem(`${c.id}-${c.items.length - 1}`)); return; }
    if (e.target.closest('#page .cert') && !e.target.closest('a')) { editCerts(); return; }
    if (e.target.closest('#page.veille') && !e.target.closest('a, button, iframe')) { editVeille(); return; }
    if (e.target.closest('#page') && !e.target.closest('a, button, iframe, video') && findItem(current)) { editItem(current); return; }
    const card = e.target.closest('#categories .card[data-id]');
    if (card) { e.preventDefault(); e.stopPropagation(); editItem(card.dataset.id); }
  }, true);
  addEventListener('beforeunload', e => { if (ADMIN.on && ADMIN.dirty) { e.preventDefault(); e.returnValue = ''; } });
})();
