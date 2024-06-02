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
});
