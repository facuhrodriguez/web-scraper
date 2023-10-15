import { IHTTPClient } from '@/domain/models/gateways/httpClients';
import axios, { AxiosRequestConfig } from 'axios';

export class AxiosAdapter implements IHTTPClient<AxiosRequestConfig> {
  async get<TResponse>(url: string, config?: AxiosRequestConfig<unknown>): Promise<TResponse> {
    const response = await axios.get<TResponse>(url, config);
    return response.data;
  }
  async post<TResponse>(
    url: string,
    data?: AxiosRequestConfig<unknown>,
    config?: AxiosRequestConfig<unknown>,
  ): Promise<TResponse> {
    const response = await axios.post<TResponse>(url, data, config);
    return response.data;
  }
  async put<TResponse>(
    url: string,
    data?: AxiosRequestConfig<unknown>,
    config?: AxiosRequestConfig<unknown>,
  ): Promise<TResponse> {
    const response = await axios.put<TResponse>(url, data, config);
    return response.data;
  }
  async patch<TResponse>(
    url: string,
    data?: AxiosRequestConfig<unknown>,
    config?: AxiosRequestConfig<unknown>,
  ): Promise<TResponse> {
    const response = await axios.patch<TResponse>(url, data, config);
    return response.data;
  }
  async delete<TResponse>(url: string, config?: AxiosRequestConfig<unknown>): Promise<TResponse> {
    const response = await axios.delete<TResponse>(url, config);
    return response.data;
  }
}
