import Zrr from '../../models/Zrr.js';
describe('Zrr', () => {
	it('should create an instance with point1 and point2', () => {
		const point1 = { x: 0, y: 0 };
		const point2 = { x: 10, y: 10 };
		const zrr = new Zrr(point1, point2);

		expect(zrr.point1).toEqual(point1);
		expect(zrr.point2).toEqual(point2);
	});
});
