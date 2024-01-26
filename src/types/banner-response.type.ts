export class BannerResponse<T> {
  statusCode: number;
  body?: T;
  message?: string;
}
