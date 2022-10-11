import "cross-fetch/polyfill";
interface PrintfulClientOptions {
    headers?: any;
    baseUrl?: string;
}
export declare class PrintfulClient {
    private readonly options;
    private headers;
    constructor(token: string, options?: PrintfulClientOptions);
    request<RequestBody, ResponseBody>({ method, endpoint, data, params, }: {
        method?: "GET" | "POST" | "PUT" | "DELETE";
        endpoint: string;
        data?: RequestBody;
        params?: {
            [key: string]: string;
        };
    }): Promise<ResponseBody>;
    get<ResponseBody>(endpoint: string, params?: any): Promise<ResponseBody>;
    post<RequestBody, ResponseBody>(endpoint: string, data: RequestBody): Promise<ResponseBody>;
    put<RequestBody, ResponseBody>(endpoint: string, data: RequestBody): Promise<ResponseBody>;
    delete<RequestBody, ResponseBody>(endpoint: string): Promise<ResponseBody>;
}
export declare function request<RequestBody, ResponseBody>(endpoint: string, { token, ...rest }: {
    token: string;
} & PrintfulClientOptions): Promise<ResponseBody>;
export {};
