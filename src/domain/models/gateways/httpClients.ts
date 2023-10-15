export const HTTP_CLIENT = 'HTTP_CLIENT';

export interface IHTTPClient<T> {
  get<TResponse>(url: string, config?: T): Promise<TResponse>;
  post<TResponse>(url: string, data?: T, config?: T): Promise<TResponse>;
  put<TResponse>(url: string, data?: T, config?: T): Promise<TResponse>;
  patch<TResponse>(url: string, data?: T, config?: T): Promise<TResponse>;
  delete<TResponse>(url: string, config?: T): Promise<TResponse>;
}
