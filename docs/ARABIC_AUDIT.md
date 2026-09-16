# Audit — Traduction arabe (FR → AR) du site « Cabinet Lahmadi »

**Date :** 2026-09-16 · **Périmètre :** tout le site public + modèle de données + back-office
**Méthode :** relecture exhaustive de chaque fichier `src/`, `index.html`, base SQLite (`db.ts`).

> ✅ **Suivi — 2026-09-16 : l'intégralité de cet audit a été corrigée**
> (étapes A→F : bugs critiques, ~70 chaînes AR, 6 champs `*Ar`, admin bilingue,
> SEO/RTL, contenus). Vérifié : `npm run build` ✅, `tsc --noEmit` ✅ (0 erreur),
> serveur de dev ✅. Détail des changements : `git diff` sur la branche
> `arena/01a0aa8e-ramzi`.

---

## 0. Résumé exécutif

| Axe | État |
|---|---|
| Pages **Accueil, Cabinet, Expertises, Contact**, Nav, Footer | 🟢 ~90 % traduit (il reste des détails listés §2) |
| Page **Parcours** (`#/parcours`) | 🔴 **plante (écran blanc) dans les 2 langues** — crash, §1.1 |
| Page **Publications** (`#/publications`) | 🔴 **plante (écran blanc) dans les 2 langues** — crash, §1.1 |
| Page détail publication (`#/publication/:id`) | 🔴 **100 % en français**, ~30 chaînes, §2.6 |
| En-tête page Publications | 🔴 100 % en français, §2.5 |
| Traductions AR des listes (valeurs, expertises, parcours) | 🔴 **perdues au rechargement** (bug lecture SQLite), §1.2 |
| Back-office : saisie de l'arabe | 🔴 **impossible** — 1 seul champ AR sur ~60, §4 |
| Modèle de données : publications, galerie, clients | 🟠 champs `*Ar` manquants, §3 |
| SEO (`<title>`, meta, `lang`) | 🟠 français uniquement, §5 |
| Typographie arabe (espacement des lettres, flèches RTL) | 🟡 détails §6 |
| **Total estimé** | **~70 chaînes/détails + 3 bugs critiques + 6 champs manquants** |

> ⚠️ Les 3 bugs du §1 sont prioritaires : ils cassent des pages entières et
> détruisent des traductions — indépendamment du chantier de traduction.

---

## 1. Bugs critiques (à corriger avant/après tout)

### 1.1 🔴 Crash React : `lang` utilisé sans être défini → 2 pages en écran blanc

Dans `src/sections.tsx`, trois composants utilisent `lang === 'ar'` **sans** l'avoir
récupéré de `useContent()` → `ReferenceError: lang is not defined` → React
démonte toute la page (écran blanc), **en français comme en arabe**.

| Composant | Déclaration fautive | Usages de `lang` qui plantent | Pages impactées |
|---|---|---|---|
| `International` | ligne 685 : `const { content } = useContent();` | lignes 721, 725, 735, 744, 781 | `#/parcours` ⬜ |
| `Publications` | ligne 808 : `const { content } = useContent();` | ligne ~981 (alt lightbox) | `#/publications` ⬜ |
| `Clients` | ligne 999 : `const { content } = useContent();` | lignes ~1007, ~1011 | `#/publications` ⬜ |

**Correctif (1 mot par composant) :**
```tsx
const { content, lang } = useContent();
```

### 1.2 🔴 Perte des traductions arabes au rechargement (lecture SQLite)

`src/lib/db.ts`, fonction `readContent` (lignes 204-215) : les colonnes `*Ar`
sont bien **écrites** en base (`writeContent`, lignes 144-154) mais **ne sont pas
relues** :

```ts
// ligne 204-206 : labelAr et descriptionAr sélectionnés puis jetés !
const values = queryRows(db, 'SELECT id, label, labelAr, description, descriptionAr ...').map((r) => ({
  id: ..., label: ..., desc: ...,   // ← labelAr / descAr manquants
}));
// idem lignes 208-210 (practiceAreas : titleAr/descriptionAr perdus)
// idem lignes 212-214 (experiences : titleAr/orgAr/detailAr perdus)
```

**Conséquence :** dès le premier rechargement, `v.labelAr`, `area.titleAr`,
`exp.titleAr`… valent `undefined` → toute la version arabe des sections
« Valeurs / Expertises / Parcours » **retombe en français**, alors que les
traductions existent dans `DEFAULT_CONTENT`.

**Correctif :** mapper les colonnes `*Ar` dans les 3 `.map()`.

### 1.3 🔴 Code mort `content.phoneAr / content.emailAr` (erreur TypeScript)

`src/sections.tsx` lignes 129, 132, 135, 1086, 1091, 1099 : ces champs
**n'existent pas** dans le type `SiteContent` (`contentTypes.ts`). La branche
arabe ne peut jamais s'exécuter. Téléphone et e-mail sont universels → simplifier
en `content.phone` / `content.email` directs.

### 1.4 🟠 (Hors traduction mais destructeur) `db.ts:258` réinitialise la base

```ts
if (settings.heroLastName !== 'Lahmadi' || ... || publications.length > 0) {
  writeContent(db, DEFAULT_CONTENT); // ← efface TOUT, y compris réservations clients
```

Dès qu'une publication existe en base, le **prochain rechargement efface tout le
contenu** (publications, réservations, modifications admin). À supprimer ou
remplacer par une vraie migration versionnée. Signalé ici car il détruit aussi
les contenus arabes saisis.

---

## 2. Inventaire exhaustif — chaînes FR affichées en mode arabe (site public)

Légende : 🔴 bloquant/visible · 🟠 visible · 🟡 accessibilité/SEO/détail.
Traductions proposées dans la colonne de droite.

### 2.1 Hero — `src/sections.tsx` (lignes ~60-160)

| # | Ligne | Français affiché (même en mode AR) | Traduction proposée |
|---|---|---|---|
| H1 🔴 | 93 | Badge `Maître` | `الأستاذ` |
| H2 🔴 | 116 | Titre carte `Informations` | `معلومات الاتصال` |
| H3 🟠 | 64 | Badge `20+ ans` | `20+ سنة` |
| H4 🟠 | 68 | Badge `2005 — CAPA` | `2005 — الكفاءة` |
| H5 🟠 | 72 | Badge `Master + DEA` | `ماجستير + دراسات معمقة` |
| H6 🟡 | 86, 105 | Alt images `…Avocat près la Cour d'Appel` | `…محام لدى التعقيب` (voir aussi §7 : « Cour d'Appel » est obsolète, le cabinet est « près la Cour de cassation ») |
| H7 🟡 | 87 | Label `Portrait officiel — Me …` | `صورة رسمية — الأستاذ …` |

### 2.2 Section About — `src/sections.tsx` (~218-237)

| # | Ligne | Français | Arabe proposé |
|---|---|---|---|
| A1 🟠 | 219 | Label image `En intervention — conférence` | `أثناء مداخلة — مؤتمر` |
| A2 🟡 | 218, 237 | Alt `…en intervention lors d'une conférence` | `…أثناء مداخلة في مؤتمر` |

### 2.3 Section Experience — `src/sections.tsx`

| # | Ligne | Français | Arabe proposé |
|---|---|---|---|
| E1 🟡 | 524 | Filigrane décoratif `DROIT` | `قانون` (ou `الحقوق`) — à basculer selon `lang` |

### 2.4 Galerie internationale — `src/sections.tsx` (~690-781) (+ crash §1.1)

| # | Ligne | Français | Arabe proposé |
|---|---|---|---|
| G1 🔴 | 691 | Filtre `Toutes les photos` | `جميع الصور` |
| G2 🔴 | 692 | Filtre `Moscou & Roscongress` | `موسكو وروس كونغرس` |
| G3 🔴 | 693 | Filtre `Tribunaux & Exercice du Droit` | `المحاكم وممارسة القانون` |
| G4 🔴 | 694 | Filtre `Conférences & Diplomatie` | `المؤتمرات والدبلوماسية` |
| G5 🟠 | — | Légendes `img.alt` (3 photos par défaut en FR) | nécessite le champ `altAr` manquant (§3) |

### 2.5 Section + page Publications — `src/sections.tsx` (~815-997), `src/pages/PublicationsPage.tsx`

| # | Fichier:ligne | Français | Arabe proposé |
|---|---|---|---|
| P1 🔴 | PublicationsPage:10 | Eyebrow `Travaux & Distinctions` | `الأعمال والتكريمات` |
| P2 🔴 | PublicationsPage:11-12 | Titre `Publications / & contributions` | `المنشورات / والمساهمات` |
| P3 🔴 | PublicationsPage:14-16 | Description de secours (fallback) en FR | `مؤلفات، مقالات، جوائز ودراسات تحمل صوت المكتب في قضايا القانون والمجتمع.` |
| P4 🔴 | sections:830 | Eyebrow `Travaux & Distinctions` (section) | `الأعمال والتكريمات` |
| P5 🔴 | sections:835-839 | Titre `Publications / & contributions` | `المنشورات / والمساهمات` |
| P6 🟠 | sections:842-844 | Fallback `Ouvrages juridiques, articles de doctrine…` | `مؤلفات قانونية، مقالات فقهية، جوائز ومساهمات علمية في خدمة القانون والسياسات العمومية.` |
| P7 🟠 | sections:865 | `🔍 Agrandi la couverture` (⚠️ coquille : « Agrandi » → « Agrandir ») | `🔍 تكبير الغلاف` |
| P8 🟠 | sections:~898-906 | Badges `ISBN :` / `Prix :` | `ردمك :` (ou conserver `ISBN`) / `الثمن :` |
| P9 🔴 | sections:917 | Bouton `Voir la fiche & Réserver` | `عرض البطاقة والحجز` |
| P10 🔴 | sections:966 | Lien `Consulter →` (⚠️ en RTL la flèche doit être `←`) | `اطّلع ←` |
| P11 🟠 | — | `pub.type`, `pub.meta`, `pub.description` affichés bruts | nécessitent `typeAr/metaAr/descriptionAr` (§3) |

### 2.6 Page détail publication — `src/pages/PublicationDetailPage.tsx` (🔴 0 % traduit)

Le composant n'utilise **jamais** `lang` (ligne 8 : `const { content, setContent }`).
~30 chaînes à brancher sur `lang === 'ar'` :

| # | Ligne | Français | Arabe proposé |
|---|---|---|---|
| D1 | 74 | `Retour à toutes les publications` | `العودة إلى جميع المنشورات` |
| D2 | 84 | `Demande de réservation enregistrée avec succès !` | `تم تسجيل طلب الحجز بنجاح!` |
| D3 | 87 | `Votre demande de réservation n° … a bien été transmise au cabinet. Notre équipe vous contactera…` | `تم إرسال طلب الحجز رقم … للمؤلف «…» إلى المكتب بنجاح. سيتصل بكم فريقنا قريبا على الهاتف المذكور لتأكيد التسليم.` |
| D4 | 93 | `Fermer ce message` | `إغلاق هذه الرسالة` |
| D5 | 112 | Label `Couverture de la publication` | `غلاف المنشور` |
| D6 | 117 | `🔍 Agrandir la couverture` | `🔍 تكبير الغلاف` |
| D7 | 131 | `Disponibilité & Commande` | `التوفر والطلب` |
| D8 | 141 | `Réservez un exemplaire… Remise en main propre ou livraison sur toute la Tunisie.` | `احجزوا نسخة مباشرة لدى المكتب. التسليم يدا بيد أو التوصيل إلى كامل تراب الجمهورية.` |
| D9 | 149 | `Réserver / Commander un exemplaire` | `حجز / طلب نسخة` |
| D10 | 183/189 | `ISBN :` / `Prix :` | `ردمك :` / `الثمن :` |
| D11 | 194 | `Auteur : Me …` | `المؤلف : الأستاذ …` |
| D12 | 203 | `Présentation & Résumé` | `التقديم والملخص` |
| D13 | 215 | `Extrait & Contenu de l'ouvrage` | `مقتطف ومحتوى المؤلف` |
| D14 | 226-227 | `Vous souhaitez vous procurer cet ouvrage ? / Contactez directement…` | `ترغبون في اقتناء هذا المؤلف؟ / اتصلوا مباشرة بمكتب المحاماة أو احجزوا عبر الإنترنت.` |
| D15 | 234 | `Commander un exemplaire` | `طلب نسخة` |
| D16 | 247 | Alt `Couverture officielle : … — Maître …` | `الغلاف الرسمي : … — الأستاذ …` |
| D17 | 266 | Titre modale `Réservation d'ouvrage` | `حجز مؤلف` |
| D18 | 281 | `Nom et Prénom *` + placeholder `Ex: Maitre Karim Ben Salem` | `الاسم واللقب *` + `مثال: الأستاذ كريم بن سالم` |
| D19 | 296 | `Téléphone *` | `الهاتف *` |
| D20 | 310 | `Nombre d'exemplaires` | `عدد النسخ` |
| D21 | 325 | `Adresse e-mail` | `البريد الإلكتروني` |
| D22 | 338 | `Adresse de livraison / Ville *` + `Ex: Rue Farhat Hached, Sousse` | `عنوان التسليم / المدينة *` + `مثال: شارع فرحات حشاد، سوسة` |
| D23 | 352 | `Remarques ou instructions` + placeholder dédicace… | `ملاحظات أو تعليمات` + `هل ترغبون في إهداء أو توصيل سريع؟` |
| D24 | 369 | `Annuler` | `إلغاء` |
| D25 | 376 | `Confirmé la réservation` (⚠️ coquille : → `Confirmer`) | `تأكيد الحجز` |
| D26 | — | `publication.type / meta / description / fullContent` bruts | nécessitent les champs `*Ar` (§3) |

### 2.7 Section Clients — `src/sections.tsx` (~999-1040) (+ crash §1.1)

| # | Détail | Arabe proposé |
|---|---|---|
| C1 🟠 | 4 noms clients par défaut en FR (`Entreprises & PME`, `Particuliers & Familles`, `Associations & ONG`, `Institutionnels & Collectivités`) | nécessite le champ `nameAr` (§3) → `الشركات والمؤسسات الصغرى والمتوسطة`، `الأفراد والعائلات`، `الجمعيات والمنظمات`، `المؤسسات والجماعات المحلية` |

### 2.8 Formulaire de contact — `src/sections.tsx` (~1155-1200)

| # | Ligne | Français | Arabe proposé |
|---|---|---|---|
| F1 🔴 | ~1178 | Label `Téléphone` (seul label non traduit du formulaire) | `الهاتف` |
| F2 🟡 | ~1175 | Label `Email` | universel, OK — mais pour cohérence avec la carte contact (`البريد الإلكتروني`) : `البريد الإلكتروني` |
| F3 🟡 | — | Placeholder `votre@email.com` | neutre, OK (ou `nom@exemple.com`) |

### 2.9 Lightbox (visionneuse plein écran) — `src/components/shared.tsx`

Utilisée partout (portrait, galerie, couvertures) :

| # | Ligne | Français | Arabe proposé |
|---|---|---|---|
| L1 🟠 | 110 | Compteur `Photo X / Y` | `صورة X / Y` |
| L2 🟡 | 116 | Tooltip `Fermer (Échap)` | `إغلاق (Esc)` |
| L3 🟡 | 128 | Tooltip `Photo précédente (Flèche Gauche)` | `الصورة السابقة (السهم الأيسر)` — en RTL, inverser les boutons ◀/▶ |
| L4 🟡 | 144 | Tooltip `Photo suivante (Flèche Droite)` | `الصورة التالية (السهم الأيمن)` — idem |

Note : `ImageLightbox` ne consomme pas `useContent()` ; il faut lui passer `lang`
ou le lire via le hook.

### 2.10 Navigation — `src/layout/Nav.tsx`

| # | Ligne | Détail |
|---|---|---|
| N1 🟡 | 119 | `aria-label="Menu"` (lecteurs d'écran) → `القائمة` en mode AR. Le reste de la Nav est bien traduit. |

### 2.11 ✅ Bien traduits (rien à faire)

Hero (titres, CTA, paragraphes), About (textes), TeamSection, Practice (+teaser),
Experience (sauf filigrane), MediationSection, Contact (sauf F1/F2), Footer,
Cabinet/Expertises/Parcours/Contact pages headers, `PAGES` FR/AR, bascule FR⇄AR,
`document.dir = rtl`, polices arabes (Amiri/Tajawal/Cairo) chargées.

---

## 3. Modèle de données — champs arabes manquants (`src/lib/contentTypes.ts`)

Même avec un correct §2, ces contenus **ne peuvent pas** exister en arabe :

| Type | Champs FR existants | Champs `*Ar` manquants |
|---|---|---|
| `PublicationItem` | `type`, `meta`, `description`, `fullContent` | `typeAr?`, `metaAr?`, `descriptionAr?`, `fullContentAr?` (seul `titleAr` existe) |
| `GalleryImage` | `alt` | `altAr?` |
| `ClientItem` | `name` | `nameAr?` |

À répercuter dans : schéma SQLite + `writeContent`/`readContent` (`db.ts`),
`DEFAULT_CONTENT`, affichages (`sections.tsx`, `PublicationDetailPage.tsx`),
formulaires admin (`tabs.tsx`).

---

## 4. Back-office — l'arabe n'est pas saisissable 🔴

- **`src/admin/tabs.tsx` (~860 lignes) : 1 seul champ AR** (`pub.titleAr`, lignes
  576-577). Tous les autres `*Ar` du modèle (marque, hero, about, valeurs,
  expertises, parcours, intros, contact, footer…) **n'ont aucun input** :
  l'admin ne peut ni les voir ni les modifier.
- Tout nouvel élément créé (valeur, expertise, expérience, client, photo)
  naît **sans version arabe** → s'affiche en français en mode AR, sans recours.
- `AdminApp.tsx`, `ui.tsx`, `auth.tsx` : interface 100 % française (choix
  acceptable pour un back-office, mais les **données** AR doivent être éditables).
- Recommandation : champs bilingues FR/AR côte à côte (ou onglets FR | AR) dans
  les 8 onglets + `dir="rtl" lang="ar"` sur les inputs arabes.

---

## 5. SEO / document — `index.html`, `src/App.tsx`

| # | Détail |
|---|---|
| S1 🟠 | `<title>` statique FR : `Cabinet d'Avocat Ajmi — Maître Mohamed Anouar Ajmi` (⚠️ en plus : nom « Ajmi » obsolète, le site est au nom de **Lahmadi**). Prévoir un titre dynamique selon `lang` : `مكتب المحاماة الحمادي — الأستاذ رمزي الحمادي`. |
| S2 🟠 | `<meta name="description">` statique FR → version AR : `مكتب المحاماة الحمادي — الأستاذ رمزي الحمادي، محام لدى التعقيب. قانون الشركات، القانون الجزائي الخاص، النزاعات والوساطة.` |
| S3 🟡 | `<html lang="fr">` initial : OK car `content.tsx` le commute dynamiquement (`lang`/`dir` + persistance `ajmi-lang`). |

---

## 6. Typographie & sens de lecture (détails RTL)

| # | Détail |
|---|---|
| R1 🟠 | **`letter-spacing` sur l'arabe** : les classes `tracking-[0.2em/0.25em/0.3em]` + `uppercase` sont appliquées aux libellés arabes (eyebrows, badges…). En arabe, l'espacement des lettres **casse les ligatures** et nuit à la lisibilité. Recommandation : `rtl:tracking-normal` (ou `tracking-normal` quand `lang==='ar'`) sur tous les textes arabes. Fichiers concernés : `sections.tsx`, `Nav.tsx`, `Footer.tsx`, `shared.tsx` (motif global). |
| R2 🟡 | Flèches directionnelles : `Consulter →` (§2.5 P10), icônes `ArrowUpRight` avec `group-hover:translate-x-1` (sens inversé en RTL), `ChevronLeft/Right` de la lightbox, `ArrowLeft` du lien retour (devrait être `ArrowRight` en AR, `PublicationDetailPage.tsx:72`). La Nav gère déjà le cas (`Nav.tsx:~100`) — généraliser ce motif. |
| R3 🟡 | `footerTagline`/`brandName.toLowerCase()` (`Footer.tsx:33`) : sans effet sur l'arabe (pas de casse) — OK, rien à faire. |
| R4 🟡 | Marquee clients (`index.css`) : `translateX(-50%)` identique en RTL — acceptable, harmonisation optionnelle. |
| R5 🟡 | `heroSubtitle` contient `\n` mais le `<p>` (sections:41) n'a pas `whitespace-pre-line` → le retour à la ligne est ignoré dans les 2 langues. |

---

## 7. Incohérences de contenu relevées (hors traduction pure)

1. **« Cour d'Appel » vs « Cour de cassation »** : `index.html` (titre + meta) et
   les alt du Hero (`sections.tsx:86,105`) mentionnent encore « Cour d'Appel » /
   « Mohamed Anouar Ajmi », alors que tout le site est passé à « Maître Ramzi
   Lahmadi, Avocat près la Cour de cassation ». À aligner (FR + AR).
2. **Coquille** `sections.tsx:865` : `Agrandi la couverture` → `Agrandir`.
3. **Coquille** `PublicationDetailPage.tsx:376` : `Confirmé la réservation` → `Confirmer`.
4. **Données par défaut** : `publications: []`, `publicationsIntro: ''` — la page
   Publications repose donc sur les fallbacks FR (§2.5 P3/P6) ; prévoir des
   contenus AR par défaut si des publications sont ajoutées.

---

## 8. Plan de correction proposé

| Étape | Contenu | Charge estimée |
|---|---|---|
| **A. Critique** | §1.1 (3× `lang`), §1.2 (lecture `*Ar` SQLite), §1.3 (`phoneAr/emailAr`), §1.4 (garde-fou migration) | ~0,5 j |
| **B. Site public** | §2.1→§2.10 : brancher ~70 chaînes sur `lang` + traductions proposées ci-dessus | ~1 j |
| **C. Modèle + base** | §3 : 6 champs `*Ar` (types, SQLite, defaults, affichages) | ~0,5 j |
| **D. Admin bilingue** | §4 : inputs AR dans les 8 onglets | ~1 j |
| **E. SEO + RTL** | §5 (title/meta dynamiques) + §6 R1/R2 | ~0,5 j |
| **F. Contenus** | §7 : aligner Cour de cassation, coquilles, contenus AR par défaut | ~0,5 j |

Vérification : `npm run build`, parcours FR/AR des 6 pages + 1 fiche publication,
rechargement (persistance SQLite), création d'un élément en admin et contrôle
de son affichage AR.
