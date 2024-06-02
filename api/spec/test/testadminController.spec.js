import adminController from '../../controllers/adminController.js';
import zrrDao from '../../DAO/zrrDao.js';
import resourceDao from '../../DAO/resourceDao.js';

describe("adminController", () => {
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

	describe("setZrrLimits", () => {
		it("should set ZRR limits and return 201", async () => {
			req.body = {
				point1: { x: 0, y: 0 },
				point2: { x: 10, y: 10 }
			};

			await adminController.setZrrLimits(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.status().json).toHaveBeenCalledWith(jasmine.any(Object));
		});

		it("should handle errors", async () => {
			spyOn(zrrDao, 'create').and.throwError('Error');

			await adminController.setZrrLimits(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Error' });
		});
	});

	describe("setTTL", () => {
		it("should set TTL and return 204", async () => {
			req.body = { ttl: 10 };

			await adminController.setTTL(req, res);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.status().json).not.toHaveBeenCalled();
		});

		it("should handle errors", async () => {
			req.body = { ttl: null };

			await adminController.setTTL(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'TTL is not set or not a number' });
		});
	});

	describe("triggerPotion", () => {
		it("should create a potion resource and return 201", async () => {
			zrrDao.zrr = true;
			zrrDao.limiteNE = { x: 10, y: 10 };
			zrrDao.limiteNO = { x: 0, y: 0 };
			zrrDao.limiteSE = { x: 10, y: 10 };
			resourceDao.ttl = 10;
			const resource = { id: 1, role: 'fiole', position: [5, 5] };
			spyOn(resourceDao, 'create').and.returnValue(resource);

			await adminController.triggerPotion(req, res);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.status().json).toHaveBeenCalledWith(resource);
		});

		it("should return 500 if no ZRR exists", async () => {
			zrrDao.zrr = false;

			await adminController.triggerPotion(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'No Zrr exists' });
		});

		it("should return 500 if TTL is not set", async () => {
			zrrDao.zrr = true;
			zrrDao.limiteNE = { x: 10, y: 10 };
			zrrDao.limiteNO = { x: 0, y: 0 };
			zrrDao.limiteSE = { x: 10, y: 10 };
			resourceDao.ttl = 0;

			await adminController.triggerPotion(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'TTL is not set yet' });
		});

		it("should handle other errors", async () => {
			zrrDao.zrr = true;
			zrrDao.limiteNE = { x: 10, y: 10 };
			zrrDao.limiteNO = { x: 0, y: 0 };
			zrrDao.limiteSE = { x: 10, y: 10 };
			resourceDao.ttl = 10;
			spyOn(resourceDao, 'create').and.throwError('Error');

			await adminController.triggerPotion(req, res);

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith({ message: 'Error' });
		});
	});
});
