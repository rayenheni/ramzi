# Photos du Cabinet AJMI

La méthode recommandée est d'ajouter les photos depuis l'onglet **Galerie** de
l'administration (`#/admin`). Les images importées sont intégrées directement
dans la base SQLite et incluses dans les sauvegardes `.sqlite`.

## Import depuis l'administration

1. Ouvrez `#/admin` et connectez-vous.
2. Sélectionnez l'onglet **Galerie**.
3. Cliquez sur **Ajouter une photo à la galerie**.
4. Choisissez **Importer**, puis sélectionnez une image JPG, PNG ou WebP.
5. Ajoutez une légende et choisissez éventuellement **Grande vignette**.

Pour limiter la taille de la base, chaque image importée doit peser moins de
3,5 Mo. Une largeur de 1600 à 2000 pixels est généralement suffisante pour le
web.

## Fichiers statiques

Il reste possible de déposer des fichiers directement dans ce dossier et de
renseigner leur chemin dans l'administration, par exemple :

`/images/anouar-portrait.jpg`

Ces fichiers statiques ne sont pas inclus dans l'export `.sqlite`; ils doivent
être déployés avec le site.

Consultez `docs/BACKEND_SETUP.md` pour la sauvegarde et la restauration de la
base SQLite.