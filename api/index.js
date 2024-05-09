// index.js
console.log('Current directory:', process.cwd());

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gameRoutes from './routes/gameRoutes.js';
//import adminRoutes from './routes/adminRoutes.js';
import resourceDao from './DAO/resourceDao.js';
import zrrDao from './DAO/zrrDao.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3376;

// Créer une nouvelle ressource et zrr test
resourceDao.create('toto', [45.781987907026334, 4.865596890449525], 'VILLAGEOIS', 0, 0, 0, 0);
zrrDao.create([45.781987907026334, 4.865596890449525]);


// Middleware for serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Middleware pour le parsing du JSON
app.use(express.json());

// Routes
//app.use('/admin', adminRoutes); // Routes d'administration avec validation
app.use('/api', gameRoutes); // Routes de jeu avec validation

// Middleware pour gérer les erreurs 404
app.use((req, res) => {
	res.status(404).send("Sorry, Not found!");
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
