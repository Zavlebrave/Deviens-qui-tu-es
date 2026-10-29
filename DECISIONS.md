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
| D08 | Au plus une cible par jour et par habitude. La série est recalculée depuis les faits. Les justifications d'absence sont retirées depuis le 29 octobre (voir plus bas) : un jour prévu manqué interrompt la série. | Habitudes | T24, T25 |
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

## Habitudes : un geste, quantités et tableau compact (28 octobre 2026)

- **Type de suivi**, réglé dans la fiche de chaque habitude :
  - **Fait / pas fait** : un appui sur la case la coche, un second l'enlève, sans menu.
  - **Minimum et cible** : la case ouvre le choix entre cible, minimum et pas fait (D07 inchangé).
  - **Quantité** : une cible par jour, une unité et un minimum facultatif. La case ouvre la saisie de ce qui a été fait, avec un aperçu en direct et des raccourcis « Minimum » et « Cible ».
- **Règles d'une quantité** :
  - À la cible ou au-delà, l'habitude est validée. Au-delà, elle s'affiche en turquoise au lieu du vert.
  - Entre le minimum et la cible, elle compte comme minimum et garde la série (D07).
  - Sans minimum réglé, toute quantité sous la cible compte comme minimum. Avec un minimum, une quantité plus petite est notée mais ne compte pas.
  - La quantité est enregistrée par jour dans le journal du mois (`vals.<jour>.<habitude>`) et se synchronise comme les cases.
  - Si la cible est modifiée après coup, les jours déjà saisis gardent leur état.
- **Tableau de la semaine** : une ligne par habitude, une colonne par jour, puis le compte de la semaine (« 3/5 »), en vert quand le quota est atteint et en turquoise au-delà.
  - Un jour non prévu n'est qu'un point.
  - Un jour à venir n'est pas cliquable.
  - Une quantité s'affiche dans sa case (1 500 devient « 1,5k »).
  - Sur ordinateur, une ligne par habitude. Sur téléphone, le nom au-dessus et les 7 cases en dessous.
  - La ligne Sommeil n'apparaît que si la semaine en contient.
  - Une légende en couleurs remplace la légende en texte.
  - La Revue reprend ce tableau, en lecture seule.
- **« Gérer »** : la liste des habitudes, avec leurs séries et leurs taux sur 30 jours, quitte la page Habitudes.
  - Elle est remplacée par une page « Mes habitudes ». Elle liste toutes les habitudes, avec leur fréquence et leur type de suivi.
  - On y crée une habitude, et on y ouvre chaque fiche. La série et le taux sur 30 jours restent dans la fiche.
- **Aujourd'hui** : une habitude à quantité affiche « 35/20 » à côté de sa case. Cocher la case enregistre la cible, et la décocher efface la quantité. La fin d'une séance de concentration liée à une telle habitude demande la quantité.

## Type de preuve « Habitude » retiré (28 octobre 2026)

- **Deux types de preuve** : « Comment la mesurer ? » ne propose plus que Quantité et Étape. Une nouvelle preuve est une Quantité par défaut.
- **Les habitudes se suivent à part**, dans l'onglet Habitudes. Elles ne sont plus liées à une identité ni à un objectif, et ne comptent pas dans le taux d'engagements.
  - La fiche d'une habitude perd son champ « Objectif ».
  - Une habitude reste possible comme priorité du jour.
- **Données existantes** : au premier chargement, chaque preuve « Habitude » est supprimée, et son habitude reste, avec son historique, ses séries et ses justifications.
  - Une priorité du jour qui visait une de ces preuves vise désormais l'habitude.
  - Dans les données du 26 octobre, cela concerne Séance d'entraînement, Séance Technique, Séance Full Cardio et Coucher 22H30, toutes de Champion.
  - Les objectifs Compétition, Préparation physique et Forme physique se retrouvent sans preuve : Champion n'a plus d'engagement tant qu'on ne leur en ajoute pas.
  - Le taux des semaines passées est recalculé sans ces preuves, sauf pour les semaines déjà figées par la revue.
- **Modèles d'objectif** : un ancien élément de type Habitude n'est plus recréé quand on applique le modèle.
- **Revue** : en retard sur le trimestre, « Mets l'accent sur » ne cite que des preuves, jamais des habitudes.

## Justifications retirées, « À améliorer » par catégorie, Repartir de zéro (29 octobre 2026)

- **Justifications retirées** : plus de liste « À justifier », de motif (maladie, travail) ni de série gelée.
  - Un jour prévu non fait reste marqué ✕ « manqué » dans le tableau, dans la Revue et dans Aujourd'hui (« Non réalisé »).
  - Un manqué interrompt la série.
  - La pastille « N à justifier » d'Aujourd'hui disparaît.
  - Les anciennes justifications ne sont plus lues ; la remise à zéro les efface.
- **« À améliorer » par catégorie** : le retard sur le trimestre tient en une ligne. Les pistes sont ensuite regroupées en lignes repliées :
  - preuves à rattraper (ou à reprendre la semaine suivante) ;
  - étapes à finir (ou à replanifier) ;
  - habitudes à tenir.

  Chaque ligne affiche son compte et ses noms. La déplier montre le détail de chaque piste avec « + Priorité ». L'état replié ou déplié est mémorisé sur l'appareil.
- **« Ce qui a coincé » structuré de la même façon** (29 octobre) : mêmes catégories, dans le même ordre que « À améliorer ».
  - Les catégories sont : preuves en retard, étapes pas encore faites, habitudes manquées.
  - Chaque ligne repliée affiche un titre court, les noms concernés et son compte. Le détail apparaît au dépliage.
  - Le trimestre est séparé : le constat (« 6 pts de retard », avec le fait et l'attendu) va dans « Ce qui a coincé », l'action (« mets l'accent sur… ») dans « À améliorer ».
  - Les en-têtes précisent la période : « à ce jour » et « d'ici dimanche » en cours de semaine ; « sur la semaine » et « pour la semaine N » pour une semaine finie.
- **Repartir de zéro** (Réglages) : une confirmation indique la date de départ (aujourd'hui), ce qui est gardé et ce qui est remis à zéro. L'app enregistre ensuite une sauvegarde complète : un fichier JSON, et une copie sur l'appareil, restaurable depuis « Tes données ». Puis elle remet à zéro tout ce qui a été saisi avant aujourd'hui.
  - **Remis à zéro** : cases d'habitudes et quantités, tâches et matins des jours précédents, revues et semaines sauvegardées, cibles hebdomadaires figées, anciennes justifications.
  - **Preuves** : quantités à 0, étapes décochées, historique de replanification effacé ; titres, cibles et semaines prévues gardés.
  - **Indicateurs** : seule la dernière mesure reste, datée du jour de départ.
  - **Gardés** : identités, objectifs, preuves et cibles, habitudes et leurs réglages, Studio, banque d'idées, modèles et réglages. Ce qui a été saisi le jour même est gardé aussi.
  - **Date de départ** : enregistrée dans les réglages. Avant elle, aucune habitude n'est attendue ni manquée. Le rythme attendu des preuves démarre ce jour-là, sans retard au départ, et les semaines précédentes ne sont pas sauvegardées automatiquement.
  - La remise à zéro est un bouton plutôt qu'une action automatique : elle part du compte connecté sur ton appareil, au moment choisi, avec la sauvegarde téléchargée sur cet appareil.

## Échéances des preuves et Revue par jour (29 octobre 2026)

- **Échéance d'une preuve**, de la plus forte à la plus faible :
  1. la date choisie dans sa fiche (Quantité : champ « Échéance ») ou sa semaine prévue (Étape) ;
  2. sinon, pour un objectif lié à une vidéo, la fin de la phase du rétroplanning qui correspond à son nom :
     - script, intro, plan → fin du plan et script ;
     - montage → fin du montage ;
     - titre, miniature → titre et miniature ;
     - voix → enregistrement ;
     - recherche, problématiques → recherche ;
     - angle, promesse → angle ;
     - publication → date de publication.
  3. sinon la fin du trimestre (Quantité). Une étape sans semaine ni rétroplanning reste « À planifier ».
- **Calculs** :
  - Le rythme attendu et l'objectif par semaine d'une quantité visent son échéance. Une échéance cette semaine fait de tout le reste l'objectif de la semaine.
  - Échéance passée sans avoir fini : tout le reste est attendu, et l'objectif de chaque semaine suivante est tout le reste.
  - Une étape sans semaine prend celle de son échéance du rétroplanning (« Prévue sem. 46 (rétroplanning) »).
  - Changer l'échéance recalcule l'objectif figé de la semaine en cours pour cette preuve.
  - Le rythme attendu d'une semaine commence au premier jour suivi (date de départ ou de création). Un départ un jeudi n'attend donc pas 4 jours sur 7 dès le premier jour.
- **Affichage** :
  - La fiche d'une Quantité indique la date retenue et sa source.
  - La fiche d'une Étape propose « Selon le rétroplanning : semaine N ».
  - Identités affiche l'échéance d'une quantité quand ce n'est pas la fin du trimestre.
- **Revue, regroupée par jour** à l'intérieur de chaque catégorie dépliée :
  - **Habitudes** : un sous-titre par jour (« Lundi 26 », « Hier · mercredi 28 », « Aujourd'hui · jeudi 29 »). Les habitudes concernées sont en pastilles : manquées ce jour-là dans « Ce qui a coincé », encore prévues dans « À améliorer ». Une habitude « X fois par semaine » est sous « Cette semaine ».
  - **Preuves et étapes**, côté « Ce qui a coincé » : regroupées par échéance (« Échéance passée · mardi 27 », « Échéance · samedi 31 »). Les échéances au-delà de dimanche sont réunies sous « Échéance plus tard », avec la date sous chaque preuve.
  - **Preuves et étapes**, côté « À améliorer » : regroupées par date avant laquelle agir (« En retard · échéance mardi 27 », « Avant samedi 31 », « Avant dimanche 1 »). La quantité par jour est calculée jusqu'à cette date, et une échéance plus lointaine est rappelée sous la preuve.
  - En retard sur le trimestre, « mets l'accent sur » cite d'abord les preuves à l'échéance la plus proche.

## Revue en synthèse, alertes, engagements planifiés ; couleur et ordre des habitudes (29 octobre 2026)

- **Revue en synthèse** : chaque bloc se lit en deux à quatre phrases simples, calculées depuis les faits. Le détail est replié sous « Voir le détail », par catégorie (trimestre, preuves, étapes, habitudes, concentration), avec « + Priorité » côté « À améliorer ». La lecture par jour et les catégories dépliables sont retirées.
  - **Ce qui a bien marché** :
    - les taux d'engagements et d'habitudes, seulement s'ils atteignent au moins 50 % ;
    - les objectifs où des preuves ont avancé ;
    - l'avance sur le trimestre, la meilleure série, le temps concentré ;
    - « Bravo ! » à 80 % ou plus.
  - **Ce qui a coincé** : le retard du trimestre en points, le nombre d'engagements en retard et leurs objectifs principaux, le nombre de jours d'habitude manqués avec les deux habitudes les plus manquées.
  - **À améliorer** :
    - l'accent pour le trimestre, s'il ne répète pas une preuve déjà citée ;
    - ce qu'il reste à faire d'ici dimanche, ou à viser la semaine suivante ;
    - les étapes à finir ;
    - les habitudes à ne plus rater.
- **Engagements planifiés seulement** :
  - Une preuve Quantité d'un objectif lié à une vidéo ne devient un engagement qu'à partir du début de sa phase dans le rétroplanning.
  - Si la vidéo n'a pas encore de date de publication, ses preuves ne sont pas engagées : Identités affiche « Pas encore planifiée : vidéo sans date ».
  - Une preuve dont la phase n'a pas commencé affiche « À partir du … (rétroplanning) ».
- **Alertes** : un bloc en tête de la Revue, affiché seulement s'il y a une alerte. Toucher une alerte ouvre la vidéo ou la preuve.
  - Une vidéo en retard dans le Studio (sur la semaine en cours).
  - Un engagement à moins de 50 % deux semaines de suite. Ce sont les deux dernières semaines finies ; pour une semaine passée, cette semaine et la précédente. Rattraper une des deux semaines fait disparaître l'alerte.
- **Habitudes** :
  - La couleur du pictogramme se choisit dans la fiche (12 couleurs).
  - Dans « Gérer », une poignée ⋮⋮ permet de glisser une habitude pour changer sa place, à la souris ou au doigt, ou avec les flèches haut et bas au clavier.
  - L'ordre est enregistré et suivi partout : tableau, Aujourd'hui, Revue.

## Objectifs pas encore démarrés, quota hebdo au départ (29 octobre 2026)

- **Démarrage d'un objectif**, dans sa fiche : « Dès maintenant » (ou selon le rétroplanning de sa vidéo), « À planifier », ou « À partir de la semaine N ».
  - Un objectif à planifier ne compte nulle part : ni dans les engagements de la semaine, ni dans la Revue, ni dans le calcul du trimestre. Identités affiche « À planifier : objectif pas encore démarré ».
  - Une semaine de début fait commencer ses quantités ce lundi-là.
  - Dans le détail de « Ce qui a coincé », le bouton « Pas encore prévu » sur une preuve passe son objectif à planifier, avec « Annuler ».
  - Changer le démarrage recalcule l'objectif figé de la semaine en cours pour ces preuves.
- **Trimestre : seuls les engagements en cours comptent.**
  - L'avance ou le retard en points et la courbe ne font la moyenne que des preuves déjà commencées au jour considéré. Ce sont les quantités dont la période a commencé, et les étapes prévues ou déjà faites.
  - Une étape n'est attendue qu'une fois sa semaine prévue passée : elle ne crée pas de retard avant son échéance.
- **« X fois par semaine » au départ** : quand le suivi commence en cours de semaine (création de l'habitude ou date de départ), le quota de cette semaine est ramené aux jours suivis. 5 fois par semaine avec un départ un jeudi donne 3 cette semaine-là. Ce quota s'applique au tableau, à Aujourd'hui, à la série, au taux et à la Revue.

## Lancement d'une identité, bonus, chiffres des habitudes (29 octobre 2026)

- **Lancement**, dans la fiche d'une identité : « Dès maintenant », un lundi prévu (« Le lundi 2 nov. »), ou « À lancer moi-même ». Le bouton « Lancer maintenant » lance l'identité le jour même.
  - Avant le lancement, aucune preuve de l'identité n'est attendue : ni engagements de la semaine, ni Revue, ni calcul du trimestre.
  - Une étape prévue avant le lancement passe à la semaine du lancement.
  - Le démarrage de l'objectif s'ajoute à celui de l'identité : la date la plus tardive l'emporte, et « à planifier » l'emporte sur tout.
- **Bonus** : ce qui est fait avant le lancement compte en bonus. Il avance l'objectif du trimestre et réduit les objectifs des semaines suivantes.
  - Identités affiche « 1 en bonus » sur la preuve.
  - La Revue dit « Semaine de lancement pour « Boxe amateur » : rien n'est attendu, tout compte en bonus », puis « En bonus : 1 séance pour… », avec une catégorie « Bonus avant lancement » dans le détail.
- **Signalé** :
  - Identités : badge « Lancement le 2 nov. » ou « À lancer », et un bandeau avec « Lancer maintenant ».
  - Aujourd'hui et Revue : « Lancement le 2 nov. » à la place du taux.
- **Première semaine partielle** (lancement, départ ou phase qui commence en cours de semaine) : l'objectif de la semaine d'une quantité est ramené aux jours restants.
- **Habitudes, chiffres compréhensibles** :
  - Le grand chiffre devient « Habitudes tenues cette semaine », avec « 4 faites sur 9 prévues jusqu'ici ».
  - Une habitude « X fois par semaine » ne compte, dans la semaine en cours, que lorsqu'elle est faite. Elle n'abaisse donc pas le taux avant dimanche.
  - La courbe est expliquée sous elle (« jour par jour, la part des habitudes prévues que tu as faites »).
  - Glisser sur la courbe affiche « Habitudes tenues ce jour-là » et « jeudi 29 octobre : 1 faite sur 3 prévues ».
  - Un jour compte les habitudes prévues ce jour-là ; une « X fois par semaine » n'y compte que si elle est faite ce jour-là.
- **Unités** : une unité saisie au pluriel passe au singulier pour 1 (« 1 séance », « 1 mot »).
- **Identités s'ouvre toujours sur la semaine en cours** depuis le menu, avec les objectifs de la semaine (« 0 / 3 »). La vue Trimestre (« 0 / 21 »), ouverte par « Détail » sur la carte du trimestre ou par le sélecteur, ne sert que le temps de la consulter. Elle n'est plus mémorisée, ni entre deux onglets, ni à la réouverture de l'app.

## Recette

- **Joués et réussis** dans un navigateur Chromium automatisé : T01–T06, T08–T14, T17–T21, T23–T36, T38–T40, T43–T46, T49 et T52. Le parcours en ligne (T38–T40, T43–T46) a été joué contre un Firebase simulé : hors connexion, erreur puis Réessayer, ajouts concurrents, import, sauvegarde et restauration.
- **Pas joués comme scénarios dédiés** : T07, T15, T16, T22, T37, T41, T42, T47, T48, T50, T51 et T53–T56.
  - T47 et T48 reposent sur le calcul de la date dans le fuseau du compte.
  - T41 attend l'écran de conflit, qui n'est pas livré (voir F38 et F39).
- **Lancement d'une identité, bonus, chiffres des habitudes** : 40 vérifications automatisées (20 sur ordinateur, 20 sur téléphone), toutes réussies.
- **Objectifs pas encore démarrés, quota hebdo au départ** : 26 vérifications automatisées (13 sur ordinateur, 13 sur téléphone), toutes réussies.
- **Revue en synthèse, alertes, engagements planifiés, couleur et ordre des habitudes** : 48 vérifications automatisées (24 sur ordinateur, 24 sur téléphone), toutes réussies. Elles couvrent le glisser à la souris et le déplacement au clavier.
- **Échéances des preuves et Revue par jour** : 40 vérifications automatisées (20 sur ordinateur, 20 sur téléphone), toutes réussies. Elles couvrent les échéances du rétroplanning et choisies, l'objectif et le rythme jusqu'à l'échéance, l'échéance dépassée, le départ en milieu de semaine, les fiches, les sous-titres par jour et par échéance, et Identités.
- **« Ce qui a coincé » et « À améliorer » en parallèle** : 20 vérifications automatisées (10 sur ordinateur, 10 sur téléphone), toutes réussies.
- **Justifications retirées, « À améliorer » par catégorie, Repartir de zéro** : 28 vérifications automatisées, toutes réussies. Elles couvrent le manqué toujours marqué, la série interrompue, les catégories repliées et « + Priorité ». Pour la remise à zéro : configuration gardée, saisies du jour gardées, preuves à zéro, dernière mesure, absence de retard au départ, sauvegarde, puis restauration complète.
- **Type de preuve « Habitude » retiré** : 17 vérifications automatisées (migration avec historique intact, priorité du jour convertie, fiches, « Gérer », modèles, Identités), toutes réussies. Le parcours en ligne simulé confirme la suppression côté serveur (22 → 18 preuves).
- **Habitudes en un geste, quantités et tableau compact** : 82 vérifications automatisées (41 sur ordinateur, 41 sur téléphone), plus 5 vérifications contre le Firebase simulé (quantité envoyée, modifiée, effacée, reçue d'un autre appareil). Toutes réussies.
- **Aujourd'hui, Revue et habitudes sans identité** : 28 vérifications automatisées, toutes réussies.
- **Identités et pictogrammes** : 22 vérifications automatisées, toutes réussies.
- **Résultats retirés et banque d'idées** : 27 vérifications automatisées, toutes réussies.
- **Priorité liée et semaines sauvegardées** : 32 vérifications automatisées, toutes réussies (quantité, Elo gagné ou perdu, division LoL, habitude au minimum, Pas encore, Rouvrir, Revue, clôture et Réglages, téléphone).
- **Refonte « Voyageur »** : 40 vérifications automatisées, toutes réussies.
  - Navigation ; Commencer, minuteur, durée prévue, Fermer puis Reprendre ; retour arrière ; Terminer avec confirmation ; saisie de la quantité réelle.
  - Minimum puis cible ; état du matin ; cartes repliables ; jour passé ; clavier.
  - Absence de défilement horizontal sur téléphone, sur les sept écrans.
