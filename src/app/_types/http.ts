export interface APIErrorResponse<T = any> {
  status: number;
  data: {
    code: number;
    data: T;
    message: string;
  };
}

export interface APIResponse<T> {
  code: number;
  data: T | null;
  message: string;
}
