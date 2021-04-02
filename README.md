# Openclassrooms - Project 6 - SoPeckoro
***
### Présentation
Dans le cadre d'un projet de developpement backend, je dois développer la partie backend du MVP d'une application web d'avis de sauces. La partie front a déjà été développée.

L'application permet aux utilisateurs d'ajouter des sauces et donne la possibilité de les "liker" ou "disliker".

**Les fonctionnalités de l'application** :
- S'inscrire
- consulter les sauces ajoutées par les utilisateurs
- Ajouter des sauces
- Modifier ou supprimer des sauces (uniquement celles créées par l'utilisateur)
- Liker ou disliker les sauces

**Exigences concernant la sécurité** :
- l’API doit respecter le RGPD et les standards OWASP
- le mot de passe des utilisateurs doit être chiffré
- 2 types de droits administrateur à la base de données doivent être définis:
    - un accès pour supprimer ou modifier des tables
    - et un accès pour éditer le contenu de la base de données 
- la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine
- l’authentification est renforcée sur les routes requises
- les mots de passe sont stockés de manière sécurisée ;
- les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.


### Installation

**Partie Frontend :**
Cloner la partie frontend depuis ce lien : <https://github.com/OpenClassrooms-Student-Center/dwj-projet6>

Depuis le terminal, accéder au dossier `frontend`, puis
```
npm install
ng serve
```
puis se rendre à l'adresse `http://localhost:4200`


**Partie Backend :**
Cloner la partie backend depuis ce lien : <https://github.com/TomBigsby/P6-SoPeckoro>

Il faut ensuite créer un fichier `.env` dans le répertoire `backend` et copier le texte présent dans le fichier `env.txt` envoyé avec les livrables. Enregistrer le fichier.

Depuis le terminal, accéder au dossier `backend`, puis
```
npm install
nodemon server
```

Vous devriez pouvoir vous connecter à MongoDB et utiliser l'application pour pouvoir la tester.


### A Savoir

**Versions utilisées :** 
- node.js v14.15
- Angular 7.0.7


**Page d'inscription :**
Par mesure de sécurité, les champs requièrent une adresse email valide et un mot de passe sécurisé.
La compléxité du mot de passe nécessite une majuscule, une minuscule, de 7 à 15 caractères et au moins un caractère spécial suivants : ! @ # $ % ^ & *
Pour le MVP, je ne fais aucune modification sur le Frontend mais à terme ces specificités devront être indiqué sur la page d'inscription.