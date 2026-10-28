# Deviens qui tu es

Ton espace de travail : identités et preuves hebdomadaires, habitudes, revue de la semaine et studio YouTube de Zav le brave.
L'app s'installe sur ton téléphone et ton ordinateur. Tes données sont synchronisées par Firebase et restent disponibles hors connexion.

## Comment c'est construit

| Élément | Rôle |
| --- | --- |
| `index.html` | L'application entière |
| `firebase-config.js` | Les identifiants de ton projet Firebase (non secrets) |
| `firestore.rules` | La règle de sécurité : chaque compte ne voit que ses propres données |
| `manifest.webmanifest`, icônes | L'installation sur l'écran d'accueil |
| `sw.js` | Le fonctionnement hors connexion |

Tes données sont stockées dans Firebase sous `users/<ton identifiant>/…`. Elles ne sont jamais dans ce dépôt.

## Mise en place (une seule fois)

### 1. Firebase (10 minutes)
1. Va sur https://console.firebase.google.com → **Ajouter un projet** → nomme-le `deviens-qui-tu-es` → Google Analytics : désactivé.
2. **Authentication** → Commencer → **E-mail/Mot de passe** → Activer → Enregistrer.
3. **Firestore Database** → Créer une base de données → emplacement `europe-west9 (Paris)` → **mode production**.
4. Firestore → onglet **Règles** → remplace tout par le contenu de `firestore.rules` → **Publier**.
5. ⚙️ Paramètres du projet → **Vos applications** → icône Web `</>` → nom `Deviens` → Enregistrer.
   Copie l'objet `firebaseConfig` affiché et colle ses valeurs dans `firebase-config.js`.

### 2. GitHub (5 minutes)
1. Crée un dépôt `deviens-qui-tu-es` (public : le code est visible, tes données non).
2. Envoie-y ces fichiers.
3. Dépôt → **Settings → Pages** → Source : *Deploy from a branch* → `main` / `(root)` → Save.
   L'app est en ligne à `https://<ton-pseudo>.github.io/deviens-qui-tu-es/` après une minute environ.
4. Firebase → Authentication → **Paramètres → Domaines autorisés** → ajoute `<ton-pseudo>.github.io`.

### 3. Premier lancement
1. Ouvre l'adresse de l'app → **Créer mon compte** avec ton e-mail et un mot de passe.
2. Récupère tes données : dans l'ancienne version (claude.ai), **Réglages → Exporter**. Puis, dans la nouvelle, **Réglages → Importer un fichier**.
3. Facultatif : Firebase → Authentication → Paramètres → **Actions des utilisateurs** → décoche la création de comptes, pour que personne d'autre ne puisse s'inscrire.

### 4. Installer l'app
- **iPhone** : ouvre l'adresse dans Safari → Partager → **Sur l'écran d'accueil**.
- **Android** : Chrome → menu ⋮ → **Installer l'application**.
- **Ordinateur** : Chrome ou Edge → icône **Installer** dans la barre d'adresse.

## Cahier des charges
Les évolutions du « Book développeur v1 » sont appliquées. Les décisions prises pour les points ouverts (D01 à D15), la couverture des exigences et les limites connues sont consignées dans `DECISIONS.md`.

## Faire évoluer l'app
- Demande la modification à Claude dans une session Claude Code avec ce dépôt attaché. Claude modifie `index.html` et pousse le changement sur GitHub.
- GitHub Pages republie l'app tout seul en une minute environ. Tes appareils prennent la nouvelle version à la prochaine ouverture.
- Tes données ne bougent pas : elles sont dans Firebase, pas dans le code.
- Tu peux aussi modifier un fichier directement sur github.com (bouton ✏️).

## Coût
L'offre gratuite de Firebase (plan Spark) couvre largement un usage personnel : 50 000 lectures et 20 000 écritures par jour. GitHub Pages est gratuit pour un dépôt public.
