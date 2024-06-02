import resourceDao from '../../DAO/ResourceDao.js';

describe('resourceDao', () => {
	beforeEach(() => {
		resourceDao.deleteAll();
	});

	it('should create a new resource', () => {
		resourceDao.create('1', [0, 0], 'VILLAGEOIS', 100, false, [], true, false);
		const fetchedResource = resourceDao.getById('1');

		expect(fetchedResource.id).toBe('1');
		expect(fetchedResource.position).toEqual([0, 0]);
		expect(fetchedResource.role).toBe('VILLAGEOIS');
	});

	it('should get all resources', () => {
		resourceDao.create('1', [0, 0], 'VILLAGEOIS', 100, false, [], true, false);
		const resources = resourceDao.getAll();

		expect(resources.length).toBe(1);
	});

	it('should update a resource', () => {
		resourceDao.create('1', [0, 0], 'VILLAGEOIS', 100, false, [], true, false);
		const newData = { position: [1, 1] };
		const updatedResource = resourceDao.update('1', newData);

		expect(updatedResource.position).toEqual([1, 1]);
	});

	it('should delete a resource', () => {
		resourceDao.create('1', [0, 0], 'VILLAGEOIS', 100, false, [], true, false);
		resourceDao.delete('1');
		const resource = resourceDao.getById('1');

		expect(resource).toBeNull();
	});
});
