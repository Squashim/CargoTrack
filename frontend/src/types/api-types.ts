export interface ApiErrorResponse {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  errors?: Record<string, string[]>;
  Error?: string;
}

export interface ApiResponse<T = void> {
  data?: T;
  message?: string;
}
