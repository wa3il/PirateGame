import { defineStore } from 'pinia';

export const useMapStore = defineStore('mapStore', {
	state: () => ({
		// Données géolocalisées mockées
		locations: [
			{ id: 1, name: 'Nautibus', lat: 45.78207, lng: 4.86559 },
		]
	}),
	actions: {
		addLocation(location) {
			this.locations.push(location);
		},
		updateLocation(id, updatedLocation) {
			const index = this.locations.findIndex(location => location.id === id);
			if (index !== -1) {
				this.locations[index] = updatedLocation;
			}
		},
		removeLocation(id) {
			this.locations = this.locations.filter(location => location.id !== id);
		}
	}
});
