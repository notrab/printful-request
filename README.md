# printful-request

Simple Node.js request wrapper for Printful, with authorization management. **Not to be used client-side**.

## Quickstart

```js
const { PrintfulClient, request } = require('printful-request');

const printful = new PrintfulClient('PRINTFUL_API_KEY');

printful.get('store').then(({ result }) => console.log(result));

// Or with a simple request

request('store', { token: 'PRINTFUL_API_KEY' }).then(({ result }) =>
  console.log(result)
);
```
