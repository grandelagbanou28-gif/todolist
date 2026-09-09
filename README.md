# Todo List

> **Démo en ligne (GitHub Pages) :** https://grandelagbanou28-gif.github.io/todolist/

Application todo list avec persistance **PostgreSQL** :
- Ajouter une tâche
- Afficher les tâches
- Marquer une tâche comme terminée
- Supprimer une tâche

## Organisation du projet

| Élément            | Fichier       | Qui       |
| ------------------ | ------------- | --------- |
| Interface (HTML)   | `public/index.html` | ✅ déjà en place |
| Styles (CSS)       | `public/style.css`  | ✅ déjà en place |
| Schéma de la base  | `schema.sql`        | ✅ déjà en place |
| JavaScript         | —                  | 🔵 géré par le collaborateur (**martinvonanon**) |

Le JavaScript (front et back) est géré par notre collaborateur **martinvonanon**. Ce dépôt contient uniquement l'HTML, le CSS et le SQL.

## Base de données

Le schéma PostgreSQL se trouve dans `schema.sql` :

```sql
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Exécute-le sur ta base (localement ou chez Neon/Supabase). Le collaborateur branchera ensuite l'API dessus.

## Démo en ligne

La version publiée sur GitHub Pages (https://grandelagbanou28-gif.github.io/todolist/) affiche l'interface. Les fonctionnalités dynamiques nécessitent le JavaScript géré par le collaborateur.