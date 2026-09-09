# Todo List

> **Démo en ligne (GitHub Pages) :** https://grandelagbanou28-gif.github.io/todolist/

Application todo list avec persistance **PostgreSQL** :
- Ajouter une tâche
- Afficher les tâches
- Marquer une tâche comme terminée
- Supprimer une tâche

Sur GitHub Pages, l'application fonctionne en **mode démo** (données stockées dans le navigateur via `localStorage`). Branché à PostgreSQL, elle passe en mode serveur complet.

## Stack

- Front : HTML / CSS / JavaScript (dossier `public/`)
- Back : Node.js + Express + `pg`
- Base : PostgreSQL

## Installation

```bash
npm install
```

## Configuration de la base

1. Copie `.env.example` vers `.env` et renseigne `DATABASE_URL` :

```env
DATABASE_URL=postgres://postgres:monmotdepasse@localhost:5432/todolist
DB_SSL=false
PORT=3000
```

Pour une base distante (Neon, Supabase) mets la chaîne `?sslmode=require` fournie et `DB_SSL=true`.

2. Crée la table :

```bash
npm run init-db
```

## Lancer l'application

```bash
npm start
```

Puis ouvre http://localhost:3000 dans ton navigateur.

## Démo en ligne

La version publiée sur GitHub Pages (https://grandelagbanou28-gif.github.io/todolist/) sert le front en mode démo : les tâches sont sauvegardées dans le navigateur. Pour utiliser PostgreSQL, lance l'application localement avec `npm start`.

## API

| Méthode | Route           | Description                         |
| ------- | --------------- | ----------------------------------- |
| GET     | `/api/todos`    | Liste toutes les tâches             |
| POST    | `/api/todos`    | Ajoute une tâche (`{ "title": "..." }`) |
| PATCH   | `/api/todos/:id`| Modifie `completed` et/ou `title`   |
| DELETE  | `/api/todos/:id`| Supprime une tâche                  |