import Resource from '../models/Resource.js';

let resources = [];
let ttl = 0;

const resourceDao = {
	// Créer une nouvelle ressource
    create: (id, position, role, ttl, numberOfPotions, terminated, turned) => {
        // Créez une nouvelle instance de Resource en fonction du rôle
        let newResource;
        if (role === 'villageois') {
            newResource = new Resource(id, position, role, null, { numberOfFioles: numberOfPotions }, terminated, turned);
        } else if (role === 'pirate') {
            newResource = new Resource(id, position, role, null, { numberOfFioles: numberOfPotions }, terminated, turned);
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

	//set TTL initial
	setTTL: (id , ttl) => {
		const resource = resources.find(resource => resource.id === id);
		if (resource.role === 'fiole') {
			resource.ttl = ttl;
			this.ttl = ttl;
			return resource;
		}
		else {
			throw new Error('This resource is not a potion');
		}
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