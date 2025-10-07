# Daisy – Widget de réservation
### Choix

Le widget est intégré comme un script embarqué, accompagné d’un fichier CSS séparé. Ce mode est très simple d'utilisation pour l’hôte (un simple \<script\> et un \<link\> suffisent), il ne casse pas le SEO (contrairement à un iframe qui peut être mal configuré), et il permet une meilleure continuité visuelle avec le site. Le CSS est externalisé pour éviter un “flash” de widget non stylé à l’exécution du JavaScript.

### Gestion de la personnalisation

Le widget utilise un système de variables CSS (--daisy-*) pour sa personnalisation.
Ces variables vont pouvoir gérer:

| Syntax         | Description                |
|----------------|----------------------------|
| --daisy-bg     | Couleur de fond      | 
| --daisy-text   | Couleur du texte     | 
| --daisy-accent | Couleur d'accent (boutons et prix) | 
| --daisy-radius | Border-radius              | 
| --daiys-font   | Police du texte            | 
| --daisy-input  | Couleur de fond des inputs | 

### Communication avec le site hôte

Le widget envoie des retours vers le site hôte grâce à des callbacks fournis lors de l’initialisation:
```js
(DaisyWidget.init(selector, onSuccess, onError))
```
Par exemple, après un paiement réussi, l’hôte peut afficher une confirmation personnalisée ou encore rediriger vers une autre page. En cas d’échec, l’hôte peut être notifié de la même manière.

### API / Données

L’API est simulée dans mockServer.ts pour représenter le backend Daisy.

Le schéma de données couvre les besoins fonctionnels du parcours de réservation :

Workshop : décrit un atelier
```js
type Workshop = {
  id: string;
  title: string;
  description: string;
  price: number;
  slots: Slot[];
};
```
Slot : représente un créneau horaire, avec un identifiant, une date, une capacité totale et le nombre déjà réservé. Ce découpage permet de gérer facilement la disponibilité et d’éviter les sur-réservations.
```js
type Slot = {
    id: string;
    date: string;
    capacity: number;
    booked: number;
};
```
BookingUser : regroupe les informations personnelles nécessaires à une réservation (nom, prénom, email, téléphone). Le fait de l’isoler dans un type dédié permet de le réutiliser dans d’autres contextes (profil utilisateur, gestion CRM, etc.).
```js
type BookingUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
```
Booking : enregistrement effectif d’une réservation. Il associe un slot, un utilisateur et un statut. Le statut peut être pending (si on voulait simuler une réservation en cours), confirmed (si le paiement a réussi) ou failed (si le paiement ou la validation échoue).
```js
type Booking = {
  id: string;
  slotId: string;
  user: BookingUser;
  status: "pending" | "confirmed" | "failed";
};
```
Les clés API (par exemple "demo-123") permettent de simuler que chaque site hôte est lié à un atelier particulier. Cela permet à daisy de par exemple savoir à quel atelier enlever des créneaux.
```html
 <div id="daisy-widget" data-api-key="demo-123"/>
```
### Expérience utilisateur

Le parcours utilisateur est guidé par états successifs :

- Affichage de l’atelier et de ses créneaux disponibles.

- Sélection du créneau via un menu déroulant. Les créneaux complets sont désactivés pour éviter toute erreur.

- Formulaire de réservation (nom, prénom, email, téléphone).

- Simulation du paiement par carte.

- Affichage du résultat via un composant StatusMessage, qui assure une cohérence visuelle et fonctionnelle pour tous les cas (loading, succès, erreur, créneau complet).

### Lancement du projet
Pour installer les packages :
```
npm install
```
En développement :
```
npm run dev
```
Pour construire le bundle :
```
npm run build
```

Puis ouvrir demo/test-widget.html, qui intègre directement le script et le CSS générés dans /public.