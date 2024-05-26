import Resource from '../models/Resource.js';

let resources = [];
let ttl = 0;

const resourceDao = {
	// Créer une nouvelle ressource
	create: (id, position, role, ttl, taken ,potionsList = [], terminated, turned) => {
		// Créez une nouvelle instance de Resource en fonction du rôle
		id = String(id);
		let newResource;
		if (role === 'VILLAGEOIS') {
			newResource = new Resource(id, position, role, null, null, { potions: potionsList }, terminated, turned);
		} else if (role === 'PIRATE') {
			newResource = new Resource(id, position, role, null, null, { potions: potionsList }, terminated, turned);
		} else if (role === 'FIOLE') {
			newResource = new Resource(id, position, role, ttl, false, null, false, false);
		}
		// Ajoutez la nouvelle ressource au tableau de ressources
		resources.push(newResource);
		return newResource;
	},

	// Read all resources
	getAll: () => {
		console.log(resources);
		return resources;
	},

	// Read a specific resource by ID

	getById: (id) => {
		let resource = resources.find(resource => resource.id === id);
		console.log(resource);
		return resource ? resource : null;
	},

	// Update a resource
	update: (id, newData) => {
		const resource = resources.find(resource => resource.id === id);
		if (resource) {
			Object.assign(resource, newData);
			return resource;
		}
		return null;
	},

	//set TTL initial pour les ressources
	setTTL: (n) => {
		ttl = n;
		//pour les ressources existantes de type fiole, mettre à jour le TTL
		resources.filter(resource => resource.role === 'fiole').forEach(resource => resource.ttl = ttl);
	},

	//Update position
	updatePosition: (id, position) => {
		const resource = resources.find(resource => resource.id === id);
		if (resource) {
			resource.position = position;
			return resource;
		}
		return null;
	},

	//get all potions of a player
	getPotions: (id) => {
		const resource = resources.find(resource => resource.id === id);
		if (resource && (resource.role === 'villageois' || resource.role === 'pirate')) {
			return resource.potions;
		}
		else {
			throw new Error('Resource not a player');
		}
	},

	//get potions not taken
	getPotionsNotTaken: () => {
		return resources.filter(resource => resource.role === 'fiole' && !resource.taken);
	},

	//grab potions
	grabPotions: (idPlayer , distance) => {
		//ressource Not fiole
		const player = resources.find(resource => resource.id === idPlayer && resource.role !== 'fiole');
		if (player) {
			const nearbyPotions = resources.filter(resource => resource.role === 'fiole' &&  !resource.taken && Math.sqrt(Math.pow(player.position[0] - resource.position[0], 2) + Math.pow(player.position[1] - resource.position[1], 2)) < distance);
			if (nearbyPotions.length > 0) {
				nearbyPotions.forEach(potion => {
					potion.taken = true;
					player.potions.push(potion);
				});
				return nearbyPotions;
			} else {
				return [];
			}
		} else {
			throw new Error('Player not found');
		}
	},

	//terminate a pirate
	terminate: (id) => {
		const resource = resources.find(resource => resource.id === id);
		if (resource && resource.role === 'pirate') {
			resource.terminated = true;
			//on va vérifier si le pirate est a supprrimer
			//resource.delete(id);
		}
		else {
			throw new Error('Resource not a pirate');
		}
	},

	//turn a villager into a pirate
	turnIntoPirate: (id) => {
		const resource = resources.find(resource => resource.id === id);
		if (resource && resource.role === 'villageois') {
			resource.role = 'pirate';
			resource.turned = true;
			return resource;
		}
		else {
			throw new Error('Resource not a villager');
		}
	},

	// Réinitialiser l'état des fioles prises par un joueur
	resetTakenFioles: () => {
		resources.filter(resource => resource.role === 'fiole' && resource.taken).forEach(fiole => {
			fiole.taken = false;
		});
	},
	

	//Update les fioles 
	updatePotions:() =>
		//toutes les ressources de type fiole et toutes les resources villageois et pirates ont les fioles taken auront ttl -1 
		//on commence par les villageios et pirates .potions 
		resources.filter(resource => resource.role !== 'fiole').forEach(resource => {
			resource.potions.forEach(potion => {
				potion.ttl--;
				if (potion.ttl === 0) {
					resource.potions.splice(resource.potions.indexOf(potion), 1);
				}
			});
		}).filter(resource => resource.role === 'fiole' && resource.taken).forEach(fiole => {
			fiole.ttl--;
			if (fiole.ttl === 0) {
				fiole.delete(fiole.id);
			}
		}),


	// Delete a resource
	delete: (id) => {
		const index = resources.findIndex(resource => resource.id === id);
		if (index !== -1) {
			const deletedResource = resources[index];
			resources.splice(index, 1);
			return deletedResource;
		}
		return null;
	}
};

export default resourceDao