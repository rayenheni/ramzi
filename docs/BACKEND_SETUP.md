# Administration et base SQLite

Le site fonctionne sans Supabase, Firebase, API externe ou variables
d'environnement. Le contenu est enregistré dans une vraie base **SQLite**
exécutée dans le navigateur grâce à `sql.js` (SQLite compilé en WebAssembly).

## Fonctionnement

- Le moteur SQLite et son fichier WebAssembly sont intégrés au build.
- La base contient des tables dédiées : paramètres, valeurs, expertises,
  expériences, galerie, publications, clients et administrateur.
- Le fichier binaire SQLite est conservé dans IndexedDB par le navigateur.
- Les images importées sont converties en données embarquées puis enregistrées
  dans la base, ce qui permet de conserver contenu et galerie ensemble.
- Chaque modification de l'administration est enregistrée automatiquement.

## Accès à l'administration

1. Ouvrez `#/admin` à la fin de l'adresse du site.
2. Utilisez le mot de passe initial `Ajmi2025!`.
3. Allez immédiatement dans l'onglet **Sécurité** pour le remplacer.

Le mot de passe est haché avec SHA-256 avant d'être enregistré dans la table
`admin`. La session se ferme lorsque le navigateur est fermé ou lorsque vous
cliquez sur **Déconnexion**.

## Sauvegarder la base

Dans la barre supérieure de l'administration :

- **Exporter .sqlite** télécharge la base complète et portable, y compris les
  images importées et le mot de passe administrateur haché.
- **Importer .sqlite** restaure une sauvegarde complète.
- **Exporter JSON** crée une sauvegarde lisible du contenu uniquement.
- **Importer JSON** restaure le contenu, sans modifier le mot de passe.

Effectuez régulièrement un export `.sqlite` et conservez-le dans un espace de
sauvegarde sécurisé.

## Limite importante

Cette application est livrée comme un site statique. La base SQLite est donc
locale au navigateur et à l'appareil utilisés. Elle ne se synchronise pas
automatiquement entre deux ordinateurs. Pour déplacer l'administration vers
un autre appareil, exportez le fichier `.sqlite`, puis importez-le sur le nouvel
appareil.

Pour une base SQLite centralisée accessible par plusieurs administrateurs en
même temps, il faudrait déployer un serveur applicatif séparé (Node, PHP ou
Python) et le laisser fonctionner en permanence. Ce serveur n'est pas inclus
dans un hébergement statique.

## Déploiement

Aucune configuration supplémentaire n'est requise :

1. Exécutez `npm run build`.
2. Déployez `dist/index.html` et le dossier `dist/images/`.
3. Ouvrez le site une première fois : la base est créée automatiquement avec
   le contenu initial.

## Pages publiques

Le site est organisé en plusieurs pages internes :

- `#/` : accueil
- `#/cabinet` : présentation du cabinet
- `#/expertises` : domaines d'intervention
- `#/parcours` : expériences et galerie internationale
- `#/publications` : publications et partenaires
- `#/contact` : coordonnées et formulaire
- `#/admin` : administration
