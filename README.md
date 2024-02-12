# Manga Reader Application

# Table des matières

1. [Introduction](#introduction)
2. [Comment lancer l'application](#comment-lancer-lapplication)
3. [Fonctionnalités](#fonctionnalités)
   1. [API_V1 (Rust, Abdoulaye Dia)](#api_v1-rust-abdoulaye-dia)
   2. [APP (React, Typescript, Vitejs, Tout le monde)](#app-react-typescript-vitejs-tout-le-monde)
   3. [PhpMyAdmin](#phpmyadmin)
   4. [MySQL](#mysql)
   5. [Redis (Cristian URSU, Abdoulaye Dia)](#redis-cristian-ursu-abdoulaye-dia)

Manga Reader est une application de lecture de manga qui utilise Vitejs, React, et Typescript. Elle est constituée de plusieurs services qui sont gérés via Docker Compose. Les services sont les suivants : Redis, MySQL, PhpMyAdmin, API_V1 (Rust), et APP (React, Typescript, Vitejs).

### Demo

![Demo](./assets/demo.gif)

[introduction]: #introduction

## Comment lancer l'application

1. Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.
2. Clonez ce repository sur votre machine.
3. Ouvrez le terminal et accédez au dossier où le repository a été cloné.
4. Tapez la commande `docker-compose up` pour lancer les différents services.
5. Accédez à l'application en ouvrant votre navigateur et en tapant l'adresse `http://localhost:5173`.
6. Liste des ports utilisés par les différents services :
   - API_V1 : 5172
   - APP : 5173
   - PhpMyAdmin : 5171
   - MySQL : 3306
   - Redis : 6379

[introduction]: #introduction

## Fonctionnalités

[fonctionnalités]: #api_v1-rust-abdoulaye-dia

### API_V1 (Rust, Abdoulaye Dia)

- Service API RESTful permettant la récupération de données relatives aux mangas
- Stockage de données via la base de données MySQL
- Utilisation du cache Redis pour une amélioration des performances

[fonctionnalités]: #app-react-typescript-vitejs-tout-le-monde

### APP (React, Typescript, Vitejs, Tout le monde)

- Interface utilisateur pour la lecture de mangas
- Recherche de mangas via l'API_V1
- Affichage de la liste de mangas disponibles
- Affichage des détails d'un manga sélectionné
- Affichage des chapitres disponibles pour un manga sélectionné (en cours de développement)
- Lecture d'un chapitre sélectionné (en cours de développement)
- Stockage des chapitres lus via la base de données MySQL (en cours de développement)
- Authentification firebase

[fonctionnalités]: #phpmyadmin

### PhpMyAdmin

- Interface graphique pour la gestion de la base de données MySQL

[fonctionnalités]: #mysql

### MySQL

- Base de données pour le stockage de données relatives aux mangas et aux chapitres

[fonctionnalités]: #redis-cristian-ursu-abdoulaye-dia

### Redis (Cristian URSU, Abdoulaye Dia)

- Cache pour améliorer les performances de l'API_V1

## Troubleshooting

- Si vous avez des problèmes pour lancer l'application, assurez-vous que les ports utilisés par les différents services ne sont pas déjà utilisés par d'autres services.
- Vérifiez que vous disposez bien des variables d'environements appropriées pour lancer l'application.
- Tentez de lancer le projet manuellement en suivant les étapes suivantes:
  - installer les dépendances du services app via la commande `npm ci` dans le dossier `app`
  - installer les dépendances du services api_v1 via la commande `cargo build` dans le dossier `api_v1` (il faut avoir installé Rust sur votre machine)
  - lancer le service redis via la commande `docker run --name redis -p 6379:6379 -d redis`
  - lancer le service mysql via la commande `docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql`
  - lancer le service phpmyadmin via la commande `docker run --name phpmyadmin -p 5171:80 --link mysql:db -d phpmyadmin/phpmyadmin`
  - lancer le service api_v1 via la commande `cargo run` dans le dossier `api_v1`
  - lancer le service app via la commande `npm run dev` dans le dossier `app`
  - accéder à l'application via l'adresse `http://localhost:5173`
