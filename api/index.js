// index.js

import express from 'express';
import path from 'path';
import gameRoutes from './routes/gameRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();
const port = 3376;

// Middleware pour servir des fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour le parsing du JSON
app.use(express.json());

// Routes
app.use('/api', gameRoutes);
app.use('/admin', adminRoutes);

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
