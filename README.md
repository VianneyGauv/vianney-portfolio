# Portfolio — Vianney Gauvrit

Site statique (HTML/CSS/JS, sans build), hébergé sur GitHub Pages.

```
index.html      contenu de la page
styles.css      design (thème clair/sombre)
script.js       animations + bouton de thème
assets/         photo, logo ISRP, CV en PDF
CNAME           nom de domaine personnalisé (vianney.gvrt.fr)
```

## Tester en local

```bash
python -m http.server 4173
```
puis ouvrir http://localhost:4173

## Mettre à jour

- **Texte** : tout est dans `index.html`, une section par bloc (`<!-- ===== EXPÉRIENCES ===== -->`, etc.).
- **CV** : remplacer `assets/CV-Vianney-Gauvrit.pdf` en gardant le même nom.
- **Photo** : remplacer `assets/vianney.jpg` (carrée, ~480 px).

Chaque `git push` sur `main` republie le site en 1 à 2 minutes.

## Mise en ligne avec GitHub Pages + nom de domaine

### 1. Publier le dépôt
```bash
git add .
git commit -m "Portfolio de Vianney"
git push -u origin main
```
Le dépôt doit être **public** (GitHub Pages gratuit).

### 2. Activer GitHub Pages
Sur GitHub : **Settings → Pages → Build and deployment**
- Source : **Deploy from a branch**
- Branch : **main** / **/ (root)** → Save

Le site est alors visible sur `https://vianneygauv.github.io/vianney-portfolio/`.

### 3. Configurer le DNS chez le registrar du domaine

**Option A — un sous-domaine** (ex. `vianney.gvrt.fr`), le plus simple :

| Type  | Nom       | Valeur                    |
|-------|-----------|---------------------------|
| CNAME | `vianney` | `vianneygauv.github.io.`  |

> **gvrt.fr (OVH)** : le domaine a un wildcard `*.gvrt.fr → home.gvrt.fr`. Il suffit d'ajouter
> l'enregistrement CNAME ci-dessus dans **OVH → Domaines → gvrt.fr → Zone DNS → Ajouter une entrée → CNAME**
> (sous-domaine `vianney`, cible `vianneygauv.github.io.` avec le point final). Un enregistrement
> explicite est prioritaire sur le wildcard, rien d'autre à toucher.

**Option B — le domaine nu** (ex. `gvrt.fr`) :

| Type  | Nom   | Valeur                    |
|-------|-------|---------------------------|
| A     | `@`   | `185.199.108.153`         |
| A     | `@`   | `185.199.109.153`         |
| A     | `@`   | `185.199.110.153`         |
| A     | `@`   | `185.199.111.153`         |
| AAAA  | `@`   | `2606:50c0:8000::153`     |
| AAAA  | `@`   | `2606:50c0:8001::153`     |
| AAAA  | `@`   | `2606:50c0:8002::153`     |
| AAAA  | `@`   | `2606:50c0:8003::153`     |
| CNAME | `www` | `vianneygauv.github.io.`  |

Supprimer les anciens enregistrements A / AAAA / CNAME qui pointeraient ailleurs pour ce même nom.

### 4. Déclarer le domaine dans GitHub
**Settings → Pages → Custom domain** : saisir le domaine → Save
(GitHub crée/valide le fichier `CNAME` à la racine du dépôt).
Attendre que le contrôle DNS passe au vert (quelques minutes à quelques heures), puis cocher **Enforce HTTPS**.

### 5. (Recommandé) Vérifier le domaine
Pour empêcher qu'un autre compte GitHub ne s'approprie le domaine :
compte **VianneyGauv** → **Settings → Pages → Add a domain**, puis ajouter chez le registrar le
enregistrement **TXT** indiqué (`_github-pages-challenge-VianneyGauv…`).

### Vérifier le DNS
```bash
nslookup vianney.gvrt.fr
```
