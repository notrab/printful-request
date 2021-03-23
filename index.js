require("cross-fetch/polyfill");

class PrintfulClient {
  constructor(apiKey, options = {}) {
    if (!apiKey) throw new Error("No API key provided");

    const { headers } = options;

    this.apiKey = apiKey;

    this.options = {
      baseUrl: "https://api.printful.com",
      ...options,
    };

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      ...headers,
    };
  }

  async request({ method, endpoint, data, params = {} }) {
    const { baseUrl } = this.options;
    const headers = this.headers;
    
    const queryString = Object.keys(params).length
      ? `?${Object.keys(params)
          .map(
            (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
          )
          .join('&')}`
      : '';

    const url = `${baseUrl}/${endpoint}${queryString}`;

    const response = await fetch(url, {
      headers,
      ...(method && { method }),
      ...(data && { body: JSON.stringify(data) }),
    });

    const json = await response.json();

    if (!response.ok) throw json;

    return json;
  }

  get(endpoint, params) {
    return this.request({ endpoint, params });
  }

  post(endpoint, data) {
    return this.request({ method: "POST", endpoint, data });
  }

  put(endpoint, data) {
    return this.request({ method: "PUT", endpoint, data });
  }

  delete(endpoint) {
    return this.request({ method: "DELETE", endpoint });
  }
}

async function request(endpoint, { apiKey, ...rest }) {
  const client = new PrintfulClient(apiKey);

  return client.request({ endpoint, ...rest });
}

module.exports = {
  PrintfulClient,
  request,
};
