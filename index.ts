import "cross-fetch/polyfill";

interface Options {
  baseUrl?: string;
  headers?: Record<string, string>;
}

interface RequestParams {
  method?: string;
  endpoint: string;
  data?: any;
  params?: Record<string, string | number>;
}

class PrintfulClient {
  token: string;
  options: Options;
  headers: Record<string, string>;

  constructor(token: string, options: Options = {}) {
    if (!token) throw new Error("No API key provided");

    const { headers } = options;

    this.token = token;
    this.options = {
      baseUrl: "https://api.printful.com",
      ...options,
    };

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  async request({ method, endpoint, data, params = {} }: RequestParams) {
    const { baseUrl } = this.options;
    const headers = this.headers;

    const queryString = Object.keys(params).length
      ? `?${Object.keys(params)
          .map(
            (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
          )
          .join("&")}`
      : "";

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

  get(endpoint: string, params?: Record<string, string | number>) {
    return this.request({ endpoint, params });
  }

  post(endpoint: string, data: any) {
    return this.request({ method: "POST", endpoint, data });
  }

  put(endpoint: string, data: any) {
    return this.request({ method: "PUT", endpoint, data });
  }

  delete(endpoint: string) {
    return this.request({ method: "DELETE", endpoint });
  }
}

async function request(
  endpoint: string,
  {
    token,
    ...rest
  }: {
    token: string;
    method?: string;
    data?: any;
    params?: Record<string, string | number>;
  }
) {
  const client = new PrintfulClient(token);

  return client.request({ endpoint, ...rest });
}

export { PrintfulClient, request };
