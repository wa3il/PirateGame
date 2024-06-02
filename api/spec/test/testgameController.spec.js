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
});
