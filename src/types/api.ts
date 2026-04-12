type ApiResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  timestamp: string;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  code: number;
  message: string;
  timestamp: string;
  data: unknown;
};

export type { ApiResponse, ApiErrorResponse };
