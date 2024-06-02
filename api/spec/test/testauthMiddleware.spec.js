import validateUser from '../../middlewares/authMiddleware.js';
import axios from 'axios';

describe('authMiddleware', () => {
	let req, res, next;

	beforeEach(() => {
		req = {
			headers: {
				authorization: 'Bearer validtoken',
				origin: 'http://example.com'
			}
		};
		res = {
			status: jasmine.createSpy('status').and.returnValue({ json: jasmine.createSpy('json') }),
		};
		next = jasmine.createSpy('next');
	});

	it('should call next() if token is valid', async () => {
		spyOn(axios, 'get').and.returnValue(Promise.resolve({ status: 200 }));

		await validateUser(req, res, next);

		expect(next).toHaveBeenCalled();
	});

	it('should return 401 if token is invalid', async () => {
		spyOn(axios, 'get').and.returnValue(Promise.resolve({ status: 401 }));

		await validateUser(req, res, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.status().json).toHaveBeenCalledWith({ message: 'Unauthorized' });
	});

	it('should return 401 if no token is provided', async () => {
		req.headers.authorization = '';

		await validateUser(req, res, next);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.status().json).toHaveBeenCalledWith({ message: 'Unauthorized' });
	});
});
