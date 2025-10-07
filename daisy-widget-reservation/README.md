# Daisy – Widget de réservation
### Choix

Le widget est intégré comme un script embarqué, accompagné d’un fichier CSS séparé. Ce mode est très simple d'utilisation pour l’hôte (un simple \<script\> et un \<link\> suffisent), il ne casse pas le SEO (contrairement à un iframe qui peut être mal configuré), et il permet une meilleure continuité visuelle avec le site. L'intégration direct en JS permet également l'utilisation de callbacks.
Cependant on perd les avantages de l'isolation complète des iframes, notamment la simplicité de mise à jour ou l'indépendance du style.
Le CSS est externalisé par logique de séparation (le balisage doit être séparé du style qui doit etre séparé du code).

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

La gestion du style se fait via des variables CSS pour permettre à l'utilisateur de gérer le style depuis le CSS et donc de rester dans une logique de séparation.
Il peut néanmoins exister des conflits de style.

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
```ts
type Workshop = {
  id: string;
  title: string;
  description: string;
  price: number;
  slots: Slot[];
};
```
Slot : représente un créneau horaire, avec un identifiant, une date, une capacité totale et le nombre déjà réservé. Ce découpage permet de gérer facilement la disponibilité et d’éviter les sur-réservations.
```ts
type Slot = {
    id: string;
    date: string;
    capacity: number;
    booked: number;
};
```
BookingUser : regroupe les informations personnelles nécessaires à une réservation (nom, prénom, email, téléphone). Le fait de l’isoler dans un type dédié permet de le réutiliser dans d’autres contextes (profil utilisateur, gestion CRM, etc.).
```ts
type BookingUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
```
Booking : enregistrement effectif d’une réservation. Il associe un slot et un utilisateur.
```ts
type Booking = {
  id: string;
  slotId: string;
  user: BookingUser;
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

### Intégration à une page
Une fois le widget build on peut l'intégrer à une page de la manière suivante:


Import du script du widget:
```html
<script src="../public/daisy-widget-reservation.js"></script>
```
Import du style du widget:
```html
<link rel="stylesheet" href="../public/daisy-widget-reservation.css" />
```
Déclaration du widget:
```html
<div id="daisy-widget"></div>
```
Initialisation du widget:
```html
<script>
    DaisyWidget.init({apiKey: "demo-123",
                      onSuccess: () => {alert("✅ Réservation confirmée ! Vous recevrez un email de confirmation sous peu.")}}
    );
</script>
```

Le widget peut être initalisé avec plusieurs paramètres:

| Paramètre | Description                                                                       |
|-----------|-----------------------------------------------------------------------------------|
| apiKey    | Clé d'API de workshop                                                             | 
| selector  | Sélecteur de la balise sue laquel le widget sera monté (par défaut #daisy-widget) | 
| onSucces  | Callback appelé si la réservation réussie                                         | 
| onError   | Callback appelé si la réservation échoue                                          |