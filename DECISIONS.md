# Registre des décisions — Book développeur v1 (28 octobre 2026)

Ce registre consigne comment chaque décision ouverte du chapitre 21 a été tranchée dans le code.
Pour chaque ligne, la « proposition de départ » du book a été retenue, sauf mention contraire.
Ces choix restent à confirmer par Ivan : une décision changée se met à jour ici et dans le code.

- **Décidé le** : 28 octobre 2026
- **Auteur** : Claude, à valider par Ivan

## Décisions

| ID | Décision appliquée | Écrans | Vérification |
| --- | --- | --- | --- |
| D01 | Le compteur « Engagements » d'Aujourd'hui couvre les engagements liés aux identités : preuves des objectifs (habitudes d'entretien jusqu'au 28 octobre, voir plus bas), sans doublon. Les habitudes indépendantes, sans identité, sont comptées à part (« Habitudes du jour »). | Aujourd'hui, Identités, Revue | T09, T08 |
| D02 | Le calcul existant est conservé. Le reste à faire du trimestre est divisé par les semaines restantes, arrondi au supérieur. Pour une quantité, la cible de la semaine est figée au premier affichage de la semaine (collection `plans`) et recalculée le lundi suivant. Une correction passée ne modifie pas la cible déjà figée. | Identités, Revue | T13, T14 |
| D03 | Abandonner ou replanifier une étape n'efface pas le manquement des semaines où elle était prévue. Elle cesse de compter après la semaine de son abandon. | Identités, fiche preuve | T18, T20 |
| D04 | Aucun nouveau seuil n'est inventé. Les états d'engagement suivent F11 ; les états de résultat étaient « Atteint », « En cours » et « Non atteint » (trimestre fini), jusqu'au retrait des résultats le 28 octobre (voir plus bas). Les statuts trimestriels existants (dans les temps, à surveiller, en retard) portent sur le rythme des engagements. | Identités | T10, T11 |
| D05 | Une identité en pause ne crée aucune attente pour toute semaine qui chevauche une période de pause. Rien n'est supprimé ni décalé. Les pauses sont datées (`pauses`). | Identités | Lot B |
| D06 | Sans objet depuis le 28 octobre : une habitude n'est plus rattachée à une identité. Elle est soit un suivi indépendant, soit la preuve d'un objectif. Le champ `identityId` d'une ancienne habitude d'entretien reste stocké mais n'est plus lu. | Habitudes, Identités | Retrait des habitudes d'entretien |
| D07 | Un minimum ne compte pas comme cible atteinte : aucun taux de 50 % n'est inventé pour une habitude binaire. Il préserve la série et l'incrémente, avec un historique distinct (`mins`). En hebdomadaire, une semaine est continue si cibles + minimums atteignent le quota. | Habitudes, Aujourd'hui | T21, T24 |
| D08 | Au plus une cible par jour et par habitude. Une justification peut être ajoutée ou corrigée après coup, et la série est recalculée depuis les faits. | Habitudes | T24, T25 |
| D09 | Reprendre une tâche la déplace avec le même identifiant et garde sa date d'origine (`from`). Aucune copie. | Aujourd'hui | T03, T04 |
| D10 | Le fuseau du compte (Réglages, Europe/Paris par défaut) fixe la date métier. Un changement vaut pour l'avenir ; le passé n'est pas déplacé. | Réglages | T47 |
| D11 | Le rang League of Legends garde son ordre explicite (Fer IV = 0 … Challenger = 30). | Progrès | Lot F |
| D12 | L'automatisation existante de la publication est conservée. Revenir depuis « Publiée » ne défait rien automatiquement. | Studio | T37 |
| D13 | Le thème est toujours sombre, quel que soit le réglage du système. Il n'y avait pas de réglage de thème à migrer. Depuis la refonte « Voyageur », le fond est bleu nuit et l'accent bleu (voir plus bas). | Toutes | T52 |
| D14 | Le mode concentration est livré sans minuteur synchronisé : le minuteur reste sur l'appareil qui l'a lancé, une seule séance à la fois, et il ne valide jamais rien tout seul. Les rappels ne sont pas livrés. | Aujourd'hui | Refonte « Voyageur » |
| D15 | Règles par type de donnée. Les ajouts de quantité sont des incréments côté serveur et les validations d'habitude des ajouts ou retraits dans une liste : deux appareils ne s'écrasent pas. Les autres documents suivent « dernière écriture ». À l'import, la fusion garde la version actuelle (ou celle du fichier, au choix) sans créer de copie. | Toutes, Réglages | T39, T40, T44 |

## Couverture du book

- **Réalisé** : F01–F06, F09–F37, F40–F44 et U01–U18, U21. Le détail par lot se trouve dans l'historique Git (« Lot A » à « Lot I »).
- **Retiré à la demande d'Ivan (28 octobre)** :
  - F07, les habitudes d'entretien. Une habitude n'est plus rattachée à une identité ; elle reste un suivi indépendant, ou devient la preuve d'un objectif.
  - F08, la lecture des résultats.
    - Le bloc « Résultat attendu » de la fiche objectif (critère de réussite et mesure) et la partie « Mes résultats » des identités ne sont plus affichés.
    - Les données déjà saisies restent stockées et peuvent être réaffichées.
    - Les indicateurs (Elo, rang, poids) gardent leur cible et leur courbe dans Progrès.
- **Partiel** :
  - F38 et F39 : les écritures concurrentes de quantités et de validations fusionnent. Les autres documents (textes, réglages) suivent « dernière écriture » et n'ont pas d'écran de résolution de conflit (T41).
  - F40 : la file hors connexion est celle de Firestore. Elle survit au redémarrage, et la déconnexion avertit s'il reste des envois en attente.
- **Réalisé en première livraison** : U19, mode concentration. « Commencer » ouvre la vue de l'action avec sa cible, un minuteur facultatif (libre, 25, 45 ou 60 minutes), un lien utile et « Terminer ».
  - **Bilan de la séance** : le temps passé (prérempli par le minuteur, modifiable), puis ce que demande l'élément lié.
    - Une quantité : des mots ou des heures, préremplies avec le temps passé si l'unité est l'heure.
    - Une étape, ou une habitude (minimum ou cible).
    - Un indicateur : Elo gagné ou perdu, une division de plus ou de moins au rang LoL, une variation de poids.
  - **Lien** : une tâche, une priorité de la semaine ou une action Studio peut être liée à une preuve ou à un indicateur. Une preuve ou une habitude choisie comme priorité est déjà son propre lien.
  - **Pas encore** : met la séance en pause sans rien valider.
  - **Trace** : le temps passé et le résumé restent sur la priorité du jour. La Revue additionne les priorités accomplies et le temps noté de la semaine.
- **Non réalisé** (lot complémentaire, chapitre 17) : U20, rappels.
- **Limites connues** :
  - les semaines supprimées avant cette version ne sont pas reconstituables (F31) ;
  - la sauvegarde d'avant import est téléchargée en fichier et gardée sur l'appareil qui a lancé l'import.

## Direction artistique « Voyageur » (28 octobre 2026)

Les maquettes ordinateur et téléphone fournies par Ivan remplacent les jetons proposés en U08 et U09 :

- **Couleurs** : fond bleu nuit `#0D1117`, cartes `#151A22`, accent bleu `#4562F2` à la place du violet. Le texte blanc sur le bouton bleu atteint 4,9:1 et le texte discret 5,2:1 sur les cartes. Le vert, l'orange et le rouge gardent leur sens de statut (U10).
- **Police** : Outfit pour les titres et le texte, à la place de Quicksand.
- **Image** : « Le Voyageur contemplant une mer de nuages » (Caspar David Friedrich, 1818, domaine public) en fond du haut des pages, et en logo. L'image vient des maquettes ; une version en meilleure définition peut la remplacer dans `assets/`.
- **Navigation** : cinq entrées sur ordinateur comme sur téléphone (Aujourd'hui, Identités, Habitudes, Studio, Bilan). Bilan regroupe Revue et Progrès. Le rond du compte ouvre les Réglages.
- **Semaines sauvegardées** : la liste est dans les Réglages et contient aussi la semaine qui vient d'être clôturée. La Revue y renvoie, et la clôture le rappelle avec un bouton « Voir ».
- **Aujourd'hui** : cartes Ma priorité, Mon état du matin, Mes habitudes, Mes tâches, Studio, Mes 3 priorités de la semaine et Engagements tenus. Pour une habitude avec version minimale, la barre montre deux paliers (minimum, puis cible) et non un pourcentage (D07).

## Aujourd'hui et Revue en tableau de bord (28 octobre 2026)

- **Aujourd'hui** :
  - La carte « Mon trimestre » montre la progression des engagements du trimestre, son écart au rythme attendu (avance ou retard en points) et sa courbe (réel en trait plein, attendu en pointillés). Elle indique aussi la semaine du trimestre et les vidéos publiées dans l'année. « Détail » ouvre Identités en vue Trimestre.
  - L'état du matin tient dans une bande sous le titre.
  - « Engagements tenus », une fois déplié, ne montre plus que le taux de la semaine de chaque identité ; toucher une identité l'ouvre dans Identités.
- **Revue**, en résumé : 4 chiffres clés (engagements, habitudes, tâches, priorités du jour) et la courbe de la semaine, puis trois blocs calculés depuis les faits.
  - **Ce qui a bien marché** : cibles atteintes, preuves en avance sur le rythme, habitudes tenues tous les jours prévus avec leur série, temps de travail concentré, avance sur le trimestre.
  - **Ce qui a coincé** : preuves en retard sur le rythme attendu à ce jour, ou non atteintes pour une semaine finie ; étapes en retard ; habitudes manquées sans motif.
  - **À améliorer** : des pistes ajustées à l'avance ou au retard. En cours de semaine, ce qui reste à faire d'ici dimanche, ramené par jour. Pour une semaine finie, la cible de la semaine suivante (rattrapage inclus) et une marche de progression pour les habitudes. En retard sur le trimestre, les preuves sur lesquelles mettre l'accent. « + Priorité » ajoute une piste aux 3 priorités de la semaine suivante.
  - Viennent ensuite la grille des habitudes indépendantes sur 7 jours, le taux de chaque identité, le sommeil, l'énergie et l'humeur, puis le bilan : 3 priorités, notes repliées et clôture.
  - Les engagements détaillés, les quantités à ajouter et les étapes Studio franchies ne sont plus dans la Revue.
- **Limite** : une habitude « X fois par semaine » n'est jugée qu'en fin de semaine, comme ailleurs dans l'app.

## Identités et pictogrammes (28 octobre 2026)

- **Identités repliables** : chaque identité est une carte qui se replie. Repliée, elle montre son pictogramme, son nom, sa phrase et le taux de la semaine (« 2 / 4 tenus »). « Tout déplier » et « Tout replier » agissent sur toutes. L'état est mémorisé sur l'appareil.
- **Objectifs** : chacun se replie aussi. Ses liens (« + Preuve », « Modifier l'objectif », « Fiche vidéo ») sont regroupés en bas.
- **Preuves compactes** : une ligne par preuve sur ordinateur (nom, détail, barre, valeur, contrôles), deux sur téléphone.
- **Étapes hors période** : en vue Semaine, les étapes à planifier, prévues plus tard ou déjà faites sont rangées dans « Autres étapes », replié par défaut. En vue Trimestre, les étapes faites sont rangées de la même façon.
- **Pictogrammes** : 65 pictogrammes au trait, dans le style des maquettes, colorés par l'identité sur une pastille teintée, répartis en 5 thèmes. Les emojis déjà enregistrés s'affichent avec leur équivalent (🥊 → gant, 🎬 → clap, 📚 → livre) sans modifier les données ; un emoji sans équivalent reste affiché tel quel.

## Banque d'idées (28 octobre 2026)

- **Filtres** : catégorie, statut, tier, idée déjà retenue ou non, et tri (score, tier, A → Z, plus récentes). Les filtres actifs sont mis en évidence, et « Réinitialiser » remet tout.
- **Catégories et statuts réglables** depuis la banque, la fiche d'une idée ou les Réglages : ajouter, renommer, supprimer.
  - Un renommage s'applique à toutes les idées concernées ; renommer vers une valeur existante fusionne les deux.
  - Une suppression laisse les idées sans catégorie ou sans statut, sans les effacer.
- **Sujets retenus** : « Retenir » transforme une idée en sujet du Studio (étape « Idée »), relié à l'idée, qui reste dans la banque avec la mention « Sujet retenu ». « + Nouveau sujet » reste disponible même quand la liste est vide.

## Recette

- **Joués et réussis** dans un navigateur Chromium automatisé : T01–T06, T08–T14, T17–T21, T23–T36, T38–T40, T43–T46, T49 et T52. Le parcours en ligne (T38–T40, T43–T46) a été joué contre un Firebase simulé : hors connexion, erreur puis Réessayer, ajouts concurrents, import, sauvegarde et restauration.
- **Pas joués comme scénarios dédiés** : T07, T15, T16, T22, T37, T41, T42, T47, T48, T50, T51 et T53–T56.
  - T47 et T48 reposent sur le calcul de la date dans le fuseau du compte.
  - T41 attend l'écran de conflit, qui n'est pas livré (voir F38 et F39).
- **Aujourd'hui, Revue et habitudes sans identité** : 28 vérifications automatisées, toutes réussies.
- **Identités et pictogrammes** : 22 vérifications automatisées, toutes réussies.
- **Résultats retirés et banque d'idées** : 27 vérifications automatisées, toutes réussies.
- **Priorité liée et semaines sauvegardées** : 32 vérifications automatisées, toutes réussies (quantité, Elo gagné ou perdu, division LoL, habitude au minimum, Pas encore, Rouvrir, Revue, clôture et Réglages, téléphone).
- **Refonte « Voyageur »** : 40 vérifications automatisées, toutes réussies.
  - Navigation ; Commencer, minuteur, durée prévue, Fermer puis Reprendre ; retour arrière ; Terminer avec confirmation ; saisie de la quantité réelle.
  - Minimum puis cible ; état du matin ; cartes repliables ; jour passé ; clavier.
  - Absence de défilement horizontal sur téléphone, sur les sept écrans.
