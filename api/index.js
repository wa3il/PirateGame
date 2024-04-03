import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Obtenir le chemin absolu du répertoire 'public'
const publicPath = path.resolve('public');

// Middleware pour servir des fichiers statiques depuis le dossier public
app.use(express.static(publicPath));

// Redirection de la requête à la racine vers index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
	res.status(404).send("Sorry, can't find that!");
	next();
});

// Démarrer le serveur
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
