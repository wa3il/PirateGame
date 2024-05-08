// index.js
console.log('Current directory:', process.cwd());

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gameRoutes from './routes/gameRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3376;

// Middleware pour servir des fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour le parsing du JSON
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes); // Routes d'administration avec validation
app.use('/api/game', gameRoutes); // Routes de jeu avec validation

// Middleware pour gérer les erreurs 404
app.use((req, res) => {
	res.status(404).send("Sorry, can't find that!");
});

// Middleware pour gérer les erreurs
app.use((err, req, res) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});

// Démarrer le serveur
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
