import "cross-fetch/polyfill";

interface PrintfulClientOptions {
  headers?: any;
}

export class PrintfulClient {
  constructor(
    private token: string,
    private readonly options: PrintfulClientOptions = {}
  ) {
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

  async request<T>({
    method,
    endpoint,
    data,
    params = {},
  }: {
    method: any;
    endpoint: string;
    data?: T;
    params?: any;
  }): Promise<T> {
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

  get<ResponseBody>(endpoint: string, params?: any): Promise<ResponseBody> {
    return this.request({ endpoint, params });
  }

  post<RequestBody, ResponseBody>(
    endpoint: string,
    data: RequestBody
  ): Promise<ResponseBody> {
    return this.request<RequestBody>({ method: "POST", endpoint, data });
  }

  put<ResponseBody, RequestBody>(endpoint: string, data: ResponseBody) {
    return this.request<RequestBody>({ method: "PUT", endpoint, data });
  }

  delete<ResponseBody>(endpoint: string) {
    return this.request<ResponseBody>({ method: "DELETE", endpoint });
  }
}

export async function request<T>(
  endpoint: string,
  { token, ...rest }: PrintfulClientOptions
) {
  const client = new PrintfulClient(token);

  return client.request<T>({ endpoint, ...rest });
}
