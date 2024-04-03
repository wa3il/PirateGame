// GameResource.js

const mongoose = require('mongoose');

const gameResourceSchema = new mongoose.Schema({
	id: { type: String, required: true },
	position: { type: [Number], required: true }, // Format: [latitude, longitude]
	role: { type: String, required: true }, // villageois, pirate, fiole
	fioleInfo: {
		nombreFioles: { type: Number },
		ttl: { type: Number }, // Temps de Totale Létalité en secondes
	},
});

const GameResource = mongoose.model('GameResource', gameResourceSchema);

module.exports = GameResource;
