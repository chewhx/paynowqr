# @chewhx/paynowqr

Generate Singapore PayNow QR Code for business use.

This package is written in Typescript, bootstraped with [tsdx](https://tsdx.io/).

## Installation

```bash
$ npm install @chewhx/paynowqr
```

## Issues and Requests

Please drop me a message at hello@chewhx.com or open an issue in this repository.

## Usage

### Javascript

```javascript
import { paynowSgUen } from '@chewhx/paynowqr';

const code = paynowSgUen({
	uen: '201403121W',
	amount: 1.99,
	isEditable: false,
	expiry: '20221231',
	transactionReference: 'TQINV-10001',
	company: 'ACME Pte Ltd.',
});

// Output UTF-8 data string
const qrDataString = qr.qrDataString();

// Output Base64 image string which represents QR Code of the data string
const qrImageString = qr.qrBase64Image();
```

### Typescript

```typescript
import { paynowSgUen, TOption } from '@chewhx/paynowqr';

export interface TOptions {
	uen: string;
	amount: number;
	isEditable: boolean;
	expiry?: string;
	transactionReference?: string;
	company?: string;
}

const code = paynowSgUen({
	uen: '201403121W',
	amount: 1.99,
	isEditable: false,
	expiry: '20221231',
	transactionReference: 'TQINV-10001',
	company: 'ACME Pte Ltd.',
}: TOption);

// Output UTF-8 data string
const qrDataString : string = qr.qrDataString();

// Output Base64 image string which represents QR Code of the data string
const qrImageString : Promise<string> = await qr.qrBase64Image();
```

## Links

- 🐙 [GitHub](https://github.com/chewhx)
- 🖥️ [Website](https://www.chewhx.com)

## References

- Original code adapted from: https://github.com/ThunderQuoteTeam/PaynowQR
- Singapore PayNow Merchant Data Specifications:
  - http://www.playgrow.sg/TEST/PayNowQR/
  - https://github.com/ThunderQuoteTeam/PaynowQR/blob/production/src/paynowqr.js
- EMV® QR Code Specification for Payment Systems (EMV QRCPS) Merchant-Presented Mode: https://www.emvco.com/wp-content/uploads/documents/EMVCo-Merchant-Presented-QR-Specification-v1.1.pdf

See also:

- https://github.com/jtaych/PayNow-QR-Javascript
- https://github.com/mindmedia/paynow.py
