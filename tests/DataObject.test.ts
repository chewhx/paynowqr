import DataObject from '../src/classes/DataObject';

describe('DataObject - test', () => {
	it('should be defined', () => {
		expect(DataObject).toBeDefined();
	});

	it('should take string value', () => {
		const id = '01';
		const value = '00';
		const object = new DataObject(id, value);
		expect(object).toBeDefined();
		expect(object.getValue()).toBe(value);
		expect(object.getId()).toBe(id);
		expect(object.output()).toBe('010200');
	});

	it('should take boolean but return string value', () => {
		const id = '01';
		const value = false;
		const object = new DataObject(id, value);
		expect(object).toBeDefined();
		expect(object.getValue()).toBe('0');
		expect(object.getId()).toBe(id);
		expect(object.output()).toBe('01010');
	});

	it('should take an array of unsorted DataObject and return correct value and length', () => {
		const do3 = new DataObject('03', '20991231');
		const do1 = new DataObject('01', 'SG.PAYNOW');
		const do2 = new DataObject('02', 'UEN123123');

		const object = new DataObject('26', [do3, do2, do1]);

		const expected = '0109SG.PAYNOW0209UEN123123030820991231';

		expect(object).toBeDefined();
		expect(object.getValue()).toBe(expected);
		expect(object.getId()).toBe('26');
		expect(object.output()).toBe(
			'26' + expected.length.toString().padStart(2, '0') + expected
		);
		expect(object.getValueLength()).toBe(
			expected.length.toString().padStart(2, '0')
		);
	});

	it('should take an array of sorted DataObject and return correct value and length', () => {
		const do1 = new DataObject('01', 'SG.PAYNOW');
		const do2 = new DataObject('02', 'UEN123123');
		const do3 = new DataObject('03', '20991231');

		const object = new DataObject('26', [do1, do2, do3]);

		const expected = '0109SG.PAYNOW0209UEN123123030820991231';

		expect(object).toBeDefined();
		expect(object.getValue()).toBe(expected);
		expect(object.getId()).toBe('26');
		expect(object.output()).toBe(
			'26' + expected.length.toString().padStart(2, '0') + expected
		);
		expect(object.getValueLength()).toBe(
			expected.length.toString().padStart(2, '0')
		);
	});
});
