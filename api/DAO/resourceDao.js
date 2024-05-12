import Resource from '../models/Resource.js';

let resources = [];
let potions = [];
let ttl = 0;

const resourceDao = {
	// Créer une nouvelle ressource
	create: (id, position, role, ttl, potionsList = [], terminated, turned) => {
		// Créez une nouvelle instance de Resource en fonction du rôle
		let newResource;
		if (role === 'villageois') {
			newResource = new Resource(id, position, role, null, { potions: potionsList }, terminated, turned);
		} else if (role === 'pirate') {
			newResource = new Resource(id, position, role, null, { potions: potionsList }, terminated, turned);
		} else if (role === 'fiole') {
			newResource = new Resource(id, position, role, ttl);
		}
		// Ajoutez la nouvelle ressource au tableau de ressources
		resources.push(newResource);
		return newResource;
	},

	// Read all resources
	getAll: () => {
		return resources;
	},

	// Read a specific resource by ID
	getById: (id) => {
		return resources.find(resource => resource.id === id);
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

	//grab potions
	grabPotions: (idPlayer , distance) => {
		//ressource Not fiole
		const player = resources.find(resource => resource.id === idPlayer && resource.role !== 'fiole');
		if (player) {
			const nearbyPotions = resources.filter(resource => resource.role === 'fiole' && Math.sqrt(Math.pow(player.position[0] - resource.position[0], 2) + Math.pow(player.position[1] - resource.position[1], 2)) < distance);
			if (nearbyPotions.length > 0) {
				nearbyPotions.forEach(potion => {
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
		}
		else {
			throw new Error('Resource not a villager');
		}
	},
	
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