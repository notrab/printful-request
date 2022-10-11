import "cross-fetch/polyfill";

interface PrintfulClientOptions {
  headers?: any;
  baseUrl?: string;
}

export class PrintfulClient {
  private token: string;
  private readonly options: PrintfulClientOptions;
  private headers: any;

  constructor(token: string, options: PrintfulClientOptions = {}) {
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

  async request<RequestBody, ResponseBody>({
    method,
    endpoint,
    data,
    params = {},
  }: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: string;
    data?: RequestBody;
    params?: any;
  }): Promise<ResponseBody> {
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
    return this.request<ResponseBody, ResponseBody>({ endpoint, params });
  }

  post<RequestBody, ResponseBody>(
    endpoint: string,
    data: RequestBody
  ): Promise<ResponseBody> {
    return this.request<ResponseBody, ResponseBody>({
      method: "POST",
      endpoint,
      data,
    });
  }

  put<ResponseBody, RequestBody>(
    endpoint: string,
    data: RequestBody
  ): Promise<ResponseBody> {
    return this.request<ResponseBody, ResponseBody>({
      method: "PUT",
      endpoint,
      data,
    });
  }

  delete<ResponseBody, RequestBody>(endpoint: string): Promise<ResponseBody> {
    return this.request<RequestBody, ResponseBody>({
      method: "DELETE",
      endpoint,
    });
  }
}

export async function request<RequestBody, ResponseBody>(
  endpoint: string,
  { token, ...rest }: PrintfulClientOptions
) {
  const client = new PrintfulClient(token);

  return client.request<RequestBody, ResponseBody>({ endpoint, ...rest });
}
