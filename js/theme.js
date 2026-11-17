/* Applique le thème choisi avant l'affichage de la page (évite un flash de couleur) */
try { if (localStorage.getItem('theme-v2') === 'light') document.documentElement.classList.add('light'); } catch (e) {}
