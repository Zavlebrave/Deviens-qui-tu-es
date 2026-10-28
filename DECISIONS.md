# Registre des décisions — Book développeur v1 (28 octobre 2026)

Ce registre consigne comment chaque décision ouverte du chapitre 21 a été tranchée dans le code.
Pour chaque ligne, la « proposition de départ » du book a été retenue, sauf mention contraire.
Ces choix restent à confirmer par Ivan : une décision changée se met à jour ici et dans le code.

- **Décidé le** : 28 octobre 2026
- **Auteur** : Claude, à valider par Ivan

## Décisions

| ID | Décision appliquée | Écrans | Vérification |
| --- | --- | --- | --- |
| D01 | Le compteur « Engagements » d'Aujourd'hui couvre les engagements liés aux identités : preuves des objectifs et habitudes d'entretien, sans doublon. Les habitudes indépendantes, sans identité, sont comptées à part (« Habitudes du jour »). | Aujourd'hui, Identités, Revue | T09, T08 |
| D02 | Le calcul existant est conservé. Le reste à faire du trimestre est divisé par les semaines restantes, arrondi au supérieur. Pour une quantité, la cible de la semaine est figée au premier affichage de la semaine (collection `plans`) et recalculée le lundi suivant. Une correction passée ne modifie pas la cible déjà figée. | Identités, Revue | T13, T14 |
| D03 | Abandonner ou replanifier une étape n'efface pas le manquement des semaines où elle était prévue. Elle cesse de compter après la semaine de son abandon. | Identités, fiche preuve | T18, T20 |
| D04 | Aucun nouveau seuil n'est inventé. Les états d'engagement suivent F11 ; les états de résultat sont « Atteint », « En cours » et « Non atteint » (trimestre fini). Les statuts trimestriels existants (dans les temps, à surveiller, en retard) portent sur le rythme des engagements. | Identités | T10, T11 |
| D05 | Une identité en pause ne crée aucune attente pour toute semaine qui chevauche une période de pause. Rien n'est supprimé ni décalé. Les pauses sont datées (`pauses`). | Identités | Lot B |
| D06 | Une habitude rattachée à une identité compte à partir de la date de son rattachement (`identitySince`), sans recalcul des semaines antérieures. Les taux affichés sont recalculés depuis les faits ; aucun ancien score versionné n'est conservé, à part l'instantané de la revue. | Habitudes, Identités | T07 |
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

- **Réalisé** : F01–F37, F40–F44 et U01–U18, U21. Le détail par lot se trouve dans l'historique Git (« Lot A » à « Lot I »).
- **Partiel** :
  - F38 et F39 : les écritures concurrentes de quantités et de validations fusionnent. Les autres documents (textes, réglages) suivent « dernière écriture » et n'ont pas d'écran de résolution de conflit (T41).
  - F40 : la file hors connexion est celle de Firestore. Elle survit au redémarrage, et la déconnexion avertit s'il reste des envois en attente.
- **Réalisé en première livraison** : U19, mode concentration. « Commencer » ouvre la vue de l'action avec sa cible, un minuteur facultatif (libre, 25, 45 ou 60 minutes), un lien utile et « Terminer ». À la fin, tu confirmes le résultat ou tu saisis la quantité réelle.
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
- **Aujourd'hui** : cartes Ma priorité, Mon état du matin, Mes habitudes, Mes tâches, Studio, Mes 3 priorités de la semaine et Engagements tenus. Pour une habitude avec version minimale, la barre montre deux paliers (minimum, puis cible) et non un pourcentage (D07).

## Recette

- **Joués et réussis** dans un navigateur Chromium automatisé : T01–T06, T08–T14, T17–T21, T23–T36, T38–T40, T43–T46, T49 et T52. Le parcours en ligne (T38–T40, T43–T46) a été joué contre un Firebase simulé : hors connexion, erreur puis Réessayer, ajouts concurrents, import, sauvegarde et restauration.
- **Pas joués comme scénarios dédiés** : T07, T15, T16, T22, T37, T41, T42, T47, T48, T50, T51 et T53–T56.
  - T47 et T48 reposent sur le calcul de la date dans le fuseau du compte.
  - T41 attend l'écran de conflit, qui n'est pas livré (voir F38 et F39).
- **Refonte « Voyageur »** : 40 vérifications automatisées, toutes réussies.
  - Navigation ; Commencer, minuteur, durée prévue, Fermer puis Reprendre ; retour arrière ; Terminer avec confirmation ; saisie de la quantité réelle.
  - Minimum puis cible ; état du matin ; cartes repliables ; jour passé ; clavier.
  - Absence de défilement horizontal sur téléphone, sur les sept écrans.
