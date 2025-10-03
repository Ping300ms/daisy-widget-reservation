Utilisation de rollup pour le package final -> justif ?
Utilisation de embed plutot qu'un iframe -> justif ?
Je genere un js ET un css parce aue si j'integre le css dans le js il ne s'appliquera qu'au moment de l'exec du js donc on aura un widget moche pendant une fraction de seconde

Un envoi d'event en cas de reussite de paiement est interessant pour le site hote.
La communication avec le site hote se fait via un dispatch d'event.

Simulation du backend Daisy dans le fichier mockServer.ts


Les differents etats visuels sont geres par un seul composant (statusMessage) pour plus de coherence
Si un creneau est plein l'utilisateur ne peut plus le selectionner dans le menu deroulant


LANCEMENT DU PROJET
pour lancer le projet en environnement dev:
    npm run dev

pour build le projet:
    npm run build
    lancer test-widget.html dans le dossier demo