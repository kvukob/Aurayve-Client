// Generic type for the API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Generic type for the hub API response
export interface HubResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


