const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initDb() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  try {
    await pool.query(sql);
    console.log('Base de données initialisée : table "todos" prête.');
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base :', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDb();