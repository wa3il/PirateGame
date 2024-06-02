import gameController from '../../controllers/gameController.js';
import resourceDao from '../../DAO/resourceDao.js';
import zrrDao from "../../DAO/zrrDao.js";

describe("gameController", () => {

	let req, res;

	beforeEach(() => {
		req = {
			body: {},
			params: {}
		};
		res = {
			status: jasmine.createSpy().and.returnValue({
				json: jasmine.createSpy()
			}),
			json: jasmine.createSpy()
		};
	});

	describe("getResources", () => {
		it("should return all resources", async () => {
			spyOn(resourceDao, 'getAll').and.returnValue([{ id: '1', role: 'VILLAGEOIS' }]);

			await gameController.getResources(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith([{ id: '1', role: 'VILLAGEOIS' }]);
		});

		it("should handle errors", async () => {
			spyOn(resourceDao, 'getAll').and.throwError('Error');

			await gameController.getResources(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Error' });
		});
	});


	describe("getById", () => {
		it("should return resource by id", async () => {
			const resource = { id: '1', role: 'VILLAGEOIS' };
			spyOn(resourceDao, 'getById').and.returnValue(resource);
			req.params.id = resource.id;

			await gameController.getById(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(resource);
		});

		it("should handle errors", async () => {
			spyOn(resourceDao, 'getById').and.throwError('Error');
			req.params.id = '1';

			await gameController.getById(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Error' });
		});
	});

	describe("getTTL", () => {
		it("should get TTL and return 200", async () => {
			const ttl = 100;
			spyOn(resourceDao, 'getTTL').and.returnValue(ttl);

			await gameController.getTTL(req, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(ttl);
		});

		it("should handle errors", async () => {
			spyOn(resourceDao, 'getTTL').and.throwError('Error');

			await gameController.getTTL(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Error' });
		});
	});

	describe("operateResource", () => {
		it("should grab potion flask if nearby", async () => {
			const resource = { id: '1', role: 'VILLAGEOIS', position: [0, 0], potions: [] };
			spyOn(resourceDao, 'getById').and.returnValue(resource);
			spyOn(resourceDao, 'grabPotions').and.returnValue([{ id: 'potion1', ttl: 10 }]);

			req.params.id = '1';
			req.body.action = 'grab potion flask';

			await gameController.operateResource(req, res);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.status().json).toHaveBeenCalledWith([{ id: 'potion1', ttl: 10 }]);
		});

		it("should return 404 if no potion flask nearby", async () => {
			const resource = { id: '1', role: 'VILLAGEOIS', position: [0, 0], potions: [] };
			spyOn(resourceDao, 'getById').and.returnValue(resource);
			spyOn(resourceDao, 'grabPotions').and.returnValue([]);

			req.params.id = '1';
			req.body.action = 'grab potion flask';

			await gameController.operateResource(req, res);

			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'No potion flask nearby' });
		});

		it("should terminate pirate", async () => {
			const resource = { id: '1', role: 'PIRATE' };
			spyOn(resourceDao, 'getById').and.returnValue(resource);
			spyOn(resourceDao, 'terminate').and.returnValue(resource);

			req.params.id = '1';
			req.body.action = 'terminate pirate';

			await gameController.operateResource(req, res);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Pirate terminated' });
		});

		it("should turn villager into pirate", async () => {
			const resource = { id: '1', role: 'VILLAGEOIS' };
			spyOn(resourceDao, 'getById').and.returnValue(resource);
			spyOn(resourceDao, 'turnIntoPirate').and.returnValue({ ...resource, role: 'PIRATE', turned: true });

			req.params.id = '1';
			req.body.action = 'turn villager into pirate';

			await gameController.operateResource(req, res);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Villager turned into pirate' });
		});

		it("should return 400 for unknown action", async () => {
			const resource = { id: '1', role: 'VILLAGEOIS' };
			spyOn(resourceDao, 'getById').and.returnValue(resource);

			req.params.id = '1';
			req.body.action = 'unknown action';

			await gameController.operateResource(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Action not found' });
		});

		it("should handle errors", async () => {
			spyOn(resourceDao, 'getById').and.throwError('Error');
			req.params.id = '1';
			req.body.action = 'grab potion flask';

			await gameController.operateResource(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Error' });
		});
	});

	describe("getZrrLimits", () => {
		it("should return ZRR limits successfully", async () => {
			const zrrLimits = { xMin: 0, yMin: 0, xMax: 100, yMax: 100 };
			spyOn(zrrDao, 'get').and.returnValue(zrrLimits);

			await gameController.getZrrLimits(req, res);

			expect(zrrDao.get).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(zrrLimits);
		});

		it("should return 404 if no ZRR exists", async () => {
			spyOn(zrrDao, 'get').and.throwError(new Error('No Zrr exists'));

			await gameController.getZrrLimits(req, res);

			expect(zrrDao.get).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'No Zrr exists' });
		});

		it("should handle server errors", async () => {
			spyOn(zrrDao, 'get').and.throwError(new Error('Server error'));

			await gameController.getZrrLimits(req, res);

			expect(zrrDao.get).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Server error' });
		});
	});
});
