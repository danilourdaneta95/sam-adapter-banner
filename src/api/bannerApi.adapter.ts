import axios from "axios";

export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
}
export class BannerApiAdapter implements HttpAdapter {

    private readonly axios = axios;

    async get<T>(url: string): Promise<T> {
        const { data } = await this.axios.get<T>(url);
        return data;
    }
    
    async post<T>(url: string, data: any): Promise<T>{
        const result = await this.axios.post<T>(url, data);
        return result.data;
    }
}