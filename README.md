# Todo List

Application todo list avec persistance **PostgreSQL** :
- Ajouter une tâche
- Afficher les tâches
- Marquer une tâche comme terminée
- Supprimer une tâche

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

## API

| Méthode | Route           | Description                         |
| ------- | --------------- | ----------------------------------- |
| GET     | `/api/todos`    | Liste toutes les tâches             |
| POST    | `/api/todos`    | Ajoute une tâche (`{ "title": "..." }`) |
| PATCH   | `/api/todos/:id`| Modifie `completed` et/ou `title`   |
| DELETE  | `/api/todos/:id`| Supprime une tâche                  |