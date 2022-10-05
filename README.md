# printful-request

Simple Node.js request wrapper for Printful, with authorization management. **Not to be used client-side**.

**VERSION 2.0 USERS:** You will want to use Printful API Tokens, and **NOT** API KEYS. [Read migration guide](https://help.printful.com/hc/en-us/articles/4632388335260-What-should-I-know-about-API-key-to-API-token-migration).

## Quickstart

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.get("orders").then(({ result }) => console.log(result));

// Or with a simple request

request("orders", {
  token: "PRINTFUL_API_TOKEN",
  params: { limit: 1 },
}).then(({ result }) => console.log(result));
```

## Examples

Refer to the [Printful API Documentation](https://www.printful.com/docs) for possible URLs. This library acts as a small layer for parsing JSON, and passing API keys as authorization headers.

### `GET`

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.get("orders").then(({ result }) => console.log(result));

// or using request

request("orders", { token: "PRINTFUL_API_TOKEN" }).then(({ result }) =>
  console.log(result)
);
```

### `GET` with params

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful
  .get("orders", { limit: 5, offset: 10 })
  .then(({ result }) => console.log(result));

// or using request

request("orders", {
  token: "PRINTFUL_API_TOKEN",
  params: { limit: 5, offset: 10 },
}).then(({ result }) => console.log(result));
```

### `POST`

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful
  .get("orders/estimate-costs", {
    recipient: { name: "..." },
    items: [{ id: "..." }],
  })
  .then(({ result }) => console.log(result));

// or using request

request("orders/estimate-costs", {
  token: "PRINTFUL_API_TOKEN",
  params: { recipient: { name: "..." }, items: [{ id: "..." }] },
}).then(({ result }) => console.log(result));
```

### `PUT`

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful
  .get("orders/{id}", {
    id: "...",
    confirm: true,
  })
  .then(({ result }) => console.log(result));

// or using request

request("orders/{id}", {
  token: "PRINTFUL_API_TOKEN",
  params: { id: "...", confirm: true },
}).then(({ result }) => console.log(result));
```

### `DELETE`

```js
const { PrintfulClient, request } = require("printful-request");

const printful = new PrintfulClient("PRINTFUL_API_TOKEN");

printful.delete("orders/{id}").then(({ result }) => console.log(result));

// or using request

request("orders/{id}", {
  token: "PRINTFUL_API_TOKEN",
  method: "DELETE",
}).then(({ result }) => console.log(result));
```
