export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  path: string;
  timestamp: string;

  data: T; // Hacemos que la data sea el T esperado para que TypeScript nos ayude

  meta?: {
    pagination?: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    filters?: Record<string, unknown>;
    [key: string]: unknown;
  };

  message?: string;
  errorCode?: string;
  errors?: { field: string; message: string; code?: string }[];
}
