import DataObject from '../src/classes/DataObject';
import QrPaynow from '../src/classes/QrPaynow';
import { crc16ccitt } from 'crc';

describe('QrPaynow - test', () => {
	it('should be defined', () => {
		expect(QrPaynow).toBeDefined();
	});

	it('should take an array of unsorted DataObject and return correct value and length', () => {
		const do26do3 = new DataObject('03', '20991231');
		const do26do1 = new DataObject('01', 'SG.PAYNOW');
		const do26do2 = new DataObject('02', 'UEN123123');

		const do26 = new DataObject('26', [do26do3, do26do1, do26do2]);
		const do0 = new DataObject('0', '00');
		const do1 = new DataObject('01', '12');
		const do2 = new DataObject('02', false);

		const qrpaynow = new QrPaynow([do26, do1, do0, do2]);

		// const expected = '000200010212020100109SG.PAYNOW0209UEN123123030820991231';

		const _stringWithout63Checksum = qrpaynow._getStringWithout63Checksum();

		const _checksum = crc16ccitt(_stringWithout63Checksum + '6304')
			.toString(16)
			.toUpperCase();

		const expected = _stringWithout63Checksum + '6304' + _checksum;

		expect(qrpaynow).toBeDefined();
		expect(qrpaynow.output()).toBe(expected);
	});
});
