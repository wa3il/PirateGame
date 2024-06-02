// index.js
console.log('Current directory:', process.cwd());

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gameRoutes from './routes/gameRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import resourceDao from './DAO/resourceDao.js';
import zrrDao from './DAO/zrrDao.js';
//import axios from 'axios';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3376;

// Swagger documentation
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: "The Pirate's Curse",
			version: '1.0.0',
		},
		tags: [
			{
				name: "Ressource Géolocalisée",
				description: "Operations related to geolocated resources"
			},
			{
				name: "ZRR",
				description: "Operations related to ZRR"
			}
		],
	},
	
	apis: ['./controllers/*.js'], // path to the API files
};
  
const specs = swaggerJsdoc(options);

// Save Swagger documentation to a .json file
fs.writeFileSync('api.json', JSON.stringify(specs, null, 2));
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// crééer un admin test avec axios
// axios.post(`http://localhost:8080/users_war_exploder/users`, {
// 	header: {
// 		'Content-Type': 'application/json',	
// 		'Origin' : 'http://localhost:8080',
// 		'Accept': 'application/json'
// 	},
// 	data: {
// 		"login": "admin",
// 		"password": "admin",
// 		"role": "ADMIN"
// 	}
// });



// Configuration CORS
const corsOptions = {
	origin: '*', // Permettre toutes les origines. Vous pouvez restreindre cela pour plus de sécurité.
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
};

app.use(cors(corsOptions));

// Créer une nouvelle ressource et zrr test
resourceDao.create('toto', [4.5, 4],'VILLAGEOIS',0, false, [], false, false);
zrrDao.create({ x: 0, y: 0}, { x: 50, y: 50 });

// Middleware for serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
	// Vérifier si le chemin demandé est la racine
	if (req.path === '/') {
		// Si le chemin est la racine, rediriger vers la page d'accueil (index.html ou autre fichier selon votre configuration)
		res.redirect('/static/index.html'); // Assurez-vous d'ajuster le chemin selon votre structure de fichiers
	} else {
		// Si le chemin n'est pas la racine, passer au middleware suivant
		next();
	}
});

// Middleware pour le parsing du JSON
app.use(express.json());

// Routes
app.use('/admin', adminRoutes); // Routes d'administration avec validation
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
