// ZRR.js

const mongoose = require('mongoose');

const zrrSchema = new mongoose.Schema({
	limiteNO: { type: [Number], required: true }, // Format: [latitude, longitude]
	limiteNE: { type: [Number], required: true }, // Format: [latitude, longitude]
	limiteSE: { type: [Number], required: true }, // Format: [latitude, longitude]
	limiteSO: { type: [Number], required: true }, // Format: [latitude, longitude]
});

const ZRR = mongoose.model('ZRR', zrrSchema);

module.exports = ZRR;
