const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};

export const fetchApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}; 