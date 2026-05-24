type ApiResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  timestamp: string;
  data: T;
};

type FieldErrors = Record<string, string[]>;

type ApiErrorResponse = {
  success: false;
  code: number;
  message: string;
  errors?: string | FieldErrors;
  timestamp: string;
  data: unknown;
};

export type { ApiResponse, ApiErrorResponse, FieldErrors };
