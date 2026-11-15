(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // ---- Apparition progressive au défilement ----
  var items = document.querySelectorAll('.reveal');
  // petit décalage en cascade pour les éléments d'un même bloc
  var groups = new Map();
  items.forEach(function (el) {
    var parent = el.parentElement;
    var i = groups.get(parent) || 0;
    el.style.setProperty('--d', Math.min(i * 0.06, 0.36) + 's');
    groups.set(parent, i + 1);
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Thème clair / sombre ----
  var btn = document.getElementById('theme');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function current() {
    return root.dataset.theme || (mq.matches ? 'dark' : 'light');
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Année du pied de page ----
  var y = document.getElementById('annee');
  if (y) y.textContent = new Date().getFullYear();
})();
