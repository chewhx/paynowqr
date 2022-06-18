import dayjs from 'dayjs';
import { toDataURL } from 'qrcode';
import DataObject from '../classes/DataObject';
import QrPaynow from '../classes/QrPaynow';

export interface TOptions {
	uen: string;
	amount: number;
	isEditable: boolean;
	expiry?: string;
	transactionReference?: string;
	company?: string;
}

export default function paynowSgUen(opts: TOptions) {
	const dataobjects = [
		new DataObject('00', '01'),
		// ID 00: Payload Format Indicator (Fixed to '01')

		new DataObject('01', '12'),
		// ID 01: Point of Initiation Method 11: static, 12: dynamic

		new DataObject('26', [
			// ID 26: Merchant Account Info Template

			new DataObject('00', 'SG.PAYNOW'),
			// Network Global Identifier: SG.PAYNOW

			new DataObject('01', '2'),
			// 0 for mobile, 2 for UEN. 1 is not used.

			new DataObject('02', opts.uen),
			// PayNow UEN (Company Unique Entity Number)

			new DataObject('03', opts.isEditable),
			// 1 = Payment amount is editable, 0 = Not Editable

			new DataObject(
				'04',
				opts.expiry ||
					dayjs()
						.add(5, 'year')
						.format('YYYYMMDD')
			),
			// Expiry date (YYYYMMDD)
		]),

		new DataObject('52', '0000'),
		// ID 52: Merchant Category Code (not used)

		new DataObject('53', '702'),
		// ID 53: Currency. SGD is 702

		new DataObject('54', String(opts.amount || 0)),
		// ID 54: Transaction Amount

		new DataObject('58', 'SG'),
		// ID 58: 2-letter Country Code (SG)

		new DataObject('59', opts.company || ''),
		// ID 59: Company Name

		new DataObject('60', 'Singapore'),
		// ID 60: Merchant City
	];

	if (opts.transactionReference) {
		dataobjects.push(
			new DataObject('62', [
				// ID 62: Additional data fields

				new DataObject('01', opts.transactionReference || ''),
				// ID 01: Bill Number
			])
		);
	}

	const qrpaynow = new QrPaynow(dataobjects);

	return {
		qrDataString: (): string => qrpaynow.output(),
		qrBase64Image: (): Promise<string> => toDataURL(qrpaynow.output()),
	};
}
