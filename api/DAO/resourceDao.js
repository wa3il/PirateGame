import Resource from '../models/Resource.js';

let resources = [];

const resourceDao = {
	// Create a new resource
	create: (id, position, role, ttl, potions, terminated, turned) => {
		const newResource = new Resource(id, position, role, ttl, potions, terminated, turned);
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