import { apiClient } from './apiClient';

export interface QueryCategory {
  id: string;
  name: string;
  description: string;
}

export interface CreateQueryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface QueryResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  created_at: string;
}

export class UserQueriesApi {
  // Submit a new query (public access)
  async submitQuery(queryData: CreateQueryData): Promise<QueryResponse | null> {
    try {
      const response = await apiClient.post('/contact', queryData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to submit query:', error);
      throw error;
    }
  }
}

export const userQueriesApi = new UserQueriesApi();
