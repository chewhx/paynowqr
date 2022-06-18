import { crc16ccitt } from 'crc';
import DataObject from './DataObject';

export default class QrPaynow {
	private readonly _nodes: DataObject[];

	constructor(nodes: DataObject[]) {
		this._nodes = nodes.sort((a, b) => Number(a.id) - Number(b.id));
	}

	public getNodes() {
		return this._nodes;
	}

	public _getStringWithout63Checksum() {
		return this._nodes.reduce((acc, node) => acc + node.output(), '');
	}

	public output() {
		const _stringWithout63Checksum = this._getStringWithout63Checksum();

		const _crc = crc16ccitt(
			_stringWithout63Checksum + '63' /* ID */ + '04' /*Length*/
		)
			.toString(16)
			.toUpperCase();

		const checksum = new DataObject('63', _crc).output();

		return _stringWithout63Checksum + checksum;
	}
  
}
