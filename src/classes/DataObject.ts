export default class DataObject {
	public readonly id: string;
	public readonly value: string | boolean | DataObject[];

	constructor(id: string, value: string | boolean | DataObject[]) {
		this.id = id.padStart(2, '0');
		if (Array.isArray(value)) {
			this.value = value.sort((a, b) => Number(a.id) - Number(b.id));
		} else {
			this.value = value;
		}
	}

	public getId(): string {
		return this.id;
	}

	public getValue(): string {
		if (Array.isArray(this.value)) {
			return this.value.reduce((acc, each) => acc + each.output(), '');
		}
		if (typeof this.value === 'boolean') {
			return Number(this.value).toString();
		}
		return this.value;
	}

	public getValueLength(): string {
		if (typeof this.value === 'boolean') {
			return '01';
		}
		if (Array.isArray(this.value)) {
			const totalEachNodeLength = this.value.reduce(
				(acc, each) => acc + each.output(),
				''
			);
			return totalEachNodeLength.length.toString().padStart(2, '0');
		}
		return this.value.length.toString().padStart(2, '0');
	}

	public output(): string {
		return this.getId() + this.getValueLength() + this.getValue();
	}
}
