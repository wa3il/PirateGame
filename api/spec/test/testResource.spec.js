import Resource from '../../models/Resource.js';

describe('Resource', () => {
	it('should create an instance with all properties', () => {
		const resource = new Resource(1, [0, 0], 'VILLAGEOIS', 100, false, [], true, false);

		expect(resource.id).toBe(1);
		expect(resource.position).toEqual([0, 0]);
		expect(resource.role).toBe('VILLAGEOIS');
		expect(resource.ttl).toBe(100);
		expect(resource.taken).toBe(false);
		expect(resource.potions).toEqual([]);
		expect(resource.terminated).toBe(true);
		expect(resource.turned).toBe(false);
	});
});
