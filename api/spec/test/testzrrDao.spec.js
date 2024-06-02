import zrrDao from '../../DAO/zrrDao.js';

describe('zrrDao', () => {
	const point1 = { x: 0, y: 0 };
	const point2 = { x: 10, y: 10 };

	beforeEach(() => {
		zrrDao.create(point1, point2);
	});

	it('should create a Zrr with correct limits', () => {
		const limits = zrrDao.getLimits();

		expect(limits.limiteNO).toEqual({ x: 0, y: 0 });
		expect(limits.limiteNE).toEqual({ x: 10, y: 0 });
		expect(limits.limiteSE).toEqual({ x: 10, y: 10 });
		expect(limits.limiteSO).toEqual({ x: 0, y: 10 });
	});

	it('should update a Zrr', () => {
		const newPoint1 = { x: 5, y: 5 };
		const newPoint2 = { x: 15, y: 15 };
		const updatedZrr = zrrDao.update(newPoint1, newPoint2);

		expect(updatedZrr.point1).toEqual(newPoint1);
		expect(updatedZrr.point2).toEqual(newPoint2);
	});

	it('should get the current Zrr', () => {
		const zrr = zrrDao.get();

		expect(zrr.point1).toEqual(point1);
		expect(zrr.point2).toEqual(point2);
	});

	it('should determine if a position is in the Zrr', () => {
		expect(zrrDao.isInZrr([5, 5])).toBe(true);
		expect(zrrDao.isInZrr([15, 15])).toBe(false);
	});
});
