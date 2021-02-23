# printful-request

Simple Node.js request wrapper for Printful, with authorization management. **Not to be used client-side**.

## Quickstart

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_KEY");

printful.get("orders").then(({ result }) => console.log(result));

// Or with a simple request

request("orders", { token: "PRINTFUL_API_KEY", limit: 1 }).then(({ result }) =>
  console.log(result)
);
```
