import { apiClient } from '@/features/shared/api/apiClient';

export interface Query {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface QueryFilters {
  limit?: number;
  page?: number;
  is_read?: boolean;
  search?: string;
}

export interface QueryStatistics {
  total_queries: number;
  unread_queries: number;
  read_queries: number;
  today_queries: number;
}

export class QueriesApi {
  // Get all queries with filters
  async getQueries(filters: QueryFilters = {}): Promise<{
    data: Query[];
    statistics: QueryStatistics;
    pagination: {
      total: number;
      current_page: number;
      limit: number;
      last_page: number;
    };
  }> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const response = await apiClient.get(
        `/admin/queries?${params.toString()}`,
      );
      return {
        data: response.data.data || [],
        statistics: response.data.statistics || {
          total_queries: 0,
          unread_queries: 0,
          read_queries: 0,
          today_queries: 0,
        },
        pagination: response.data.pagination || {
          total: 0,
          current_page: 0,
          limit: 0,
          last_page: 0,
        },
      };
    } catch (error) {
      console.error('Failed to fetch queries:', error);
      return {
        data: [],
        statistics: {
          total_queries: 0,
          unread_queries: 0,
          read_queries: 0,
          today_queries: 0,
        },
        pagination: {
          total: 0,
          current_page: 0,
          limit: 0,
          last_page: 0,
        },
      };
    }
  }

  // Get query by ID
  async getQuery(id: number): Promise<Query | null> {
    try {
      const response = await apiClient.get(`/admin/queries/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch query ${id}:`, error);
      return null;
    }
  }

  // Update query read status
  async updateQueryStatus(id: number, isRead: boolean): Promise<Query | null> {
    try {
      const response = await apiClient.put(`/admin/queries/${id}/status`, {
        is_read: isRead,
      });
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update query ${id} status:`, error);
      throw error;
    }
  }

  // Update multiple queries read status
  async updateMultipleQueryStatus(
    queryIds: number[],
    isRead: boolean,
  ): Promise<boolean> {
    try {
      await apiClient.put('/admin/queries/status', {
        query_ids: queryIds,
        is_read: isRead,
      });
      return true;
    } catch (error) {
      console.error('Failed to update multiple queries status:', error);
      throw error;
    }
  }

  // Delete query
  async deleteQuery(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/admin/queries/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete query ${id}:`, error);
      throw error;
    }
  }

  // Delete multiple queries
  async deleteMultipleQueries(queryIds: number[]): Promise<boolean> {
    try {
      await apiClient.delete('/admin/queries', {
        data: { query_ids: queryIds },
      });
      return true;
    } catch (error) {
      console.error('Failed to delete multiple queries:', error);
      throw error;
    }
  }
}

export const queriesApi = new QueriesApi();
