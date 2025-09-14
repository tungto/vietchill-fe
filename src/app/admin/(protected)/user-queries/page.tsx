'use client';

import React, { useState, useEffect } from 'react';
import { queriesApi, Query, QueryStatistics } from '@/lib/api/admin/queriesApi';
import {
  TbMail,
  TbMailOpened,
  TbTrash,
  TbEye,
  TbSearch,
  TbFilter,
  TbRefresh,
  TbCheck,
  TbX,
} from 'react-icons/tb';

interface Pagination {
  total: number;
  current_page: number;
  limit: number;
  last_page: number;
}

export default function UserQueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [statistics, setStatistics] = useState<QueryStatistics>({
    total_queries: 0,
    unread_queries: 0,
    read_queries: 0,
    today_queries: 0,
  });
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    current_page: 1,
    limit: 20,
    last_page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [selectedQueries, setSelectedQueries] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState<boolean | undefined>(undefined);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  const loadQueries = async (page = 1) => {
    setLoading(true);
    try {
      const filters = {
        page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        is_read: filterRead,
      };

      const response = await queriesApi.getQueries(filters);
      setQueries(response.data);
      setStatistics(response.statistics);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to load queries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueries();
  }, [searchTerm, filterRead]);

  const handleMarkAsRead = async (queryId: number, isRead: boolean) => {
    try {
      await queriesApi.updateQueryStatus(queryId, isRead);
      await loadQueries(pagination.current_page);
    } catch (error) {
      console.error('Failed to update query status:', error);
    }
  };

  const handleBulkMarkAsRead = async (isRead: boolean) => {
    if (selectedQueries.length === 0) return;

    try {
      await queriesApi.updateMultipleQueryStatus(selectedQueries, isRead);
      setSelectedQueries([]);
      await loadQueries(pagination.current_page);
    } catch (error) {
      console.error('Failed to update multiple queries status:', error);
    }
  };

  const handleDeleteQuery = async (queryId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) return;

    try {
      await queriesApi.deleteQuery(queryId);
      await loadQueries(pagination.current_page);
    } catch (error) {
      console.error('Failed to delete query:', error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedQueries.length === 0) return;
    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa ${selectedQueries.length} tin nhắn đã chọn?`,
      )
    )
      return;

    try {
      await queriesApi.deleteMultipleQueries(selectedQueries);
      setSelectedQueries([]);
      await loadQueries(pagination.current_page);
    } catch (error) {
      console.error('Failed to delete multiple queries:', error);
    }
  };

  const toggleQuerySelection = (queryId: number) => {
    setSelectedQueries((prev) =>
      prev.includes(queryId)
        ? prev.filter((id) => id !== queryId)
        : [...prev, queryId],
    );
  };

  const toggleSelectAll = () => {
    setSelectedQueries(
      selectedQueries.length === queries.length ? [] : queries.map((q) => q.id),
    );
  };

  const getCategoryBadge = (category?: string) => {
    if (!category) return null;

    const colors = {
      booking: 'bg-blue-100 text-blue-800',
      facilities: 'bg-green-100 text-green-800',
      support: 'bg-yellow-100 text-yellow-800',
      feedback: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800',
    };

    const names = {
      booking: 'Đặt phòng',
      facilities: 'Tiện nghi',
      support: 'Hỗ trợ',
      feedback: 'Phản hồi',
      other: 'Khác',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[category as keyof typeof colors] || colors.other
        }`}
      >
        {names[category as keyof typeof names] || category}
      </span>
    );
  };

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Tin nhắn khách hàng
          </h1>
          <p className='text-gray-600'>
            Quản lý và phản hồi tin nhắn từ khách hàng
          </p>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Tổng tin nhắn
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {statistics.total_queries}
                </p>
              </div>
              <TbMail className='h-8 w-8 text-blue-600' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Chưa đọc</p>
                <p className='text-2xl font-bold text-red-600'>
                  {statistics.unread_queries}
                </p>
              </div>
              <TbMailOpened className='h-8 w-8 text-red-600' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Đã đọc</p>
                <p className='text-2xl font-bold text-green-600'>
                  {statistics.read_queries}
                </p>
              </div>
              <TbCheck className='h-8 w-8 text-green-600' />
            </div>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Hôm nay</p>
                <p className='text-2xl font-bold text-purple-600'>
                  {statistics.today_queries}
                </p>
              </div>
              <TbMail className='h-8 w-8 text-purple-600' />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className='bg-white p-4 rounded-lg shadow-sm border mb-6'>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <div className='flex flex-col sm:flex-row gap-4 flex-1'>
              {/* Search */}
              <div className='relative flex-1 max-w-md'>
                <TbSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <input
                  type='text'
                  placeholder='Tìm kiếm theo tên, email, chủ đề...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              {/* Filter */}
              <select
                value={filterRead === undefined ? '' : filterRead.toString()}
                onChange={(e) =>
                  setFilterRead(
                    e.target.value === ''
                      ? undefined
                      : e.target.value === 'true',
                  )
                }
                className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Tất cả</option>
                <option value='false'>Chưa đọc</option>
                <option value='true'>Đã đọc</option>
              </select>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={() => loadQueries(pagination.current_page)}
                className='flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                <TbRefresh className='h-4 w-4' />
                Làm mới
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedQueries.length > 0 && (
            <div className='mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-blue-800'>
                  Đã chọn {selectedQueries.length} tin nhắn
                </span>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleBulkMarkAsRead(true)}
                    className='flex items-center gap-1 px-3 py-1 text-sm text-green-700 bg-green-100 rounded hover:bg-green-200'
                  >
                    <TbCheck className='h-4 w-4' />
                    Đánh dấu đã đọc
                  </button>
                  <button
                    onClick={() => handleBulkMarkAsRead(false)}
                    className='flex items-center gap-1 px-3 py-1 text-sm text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200'
                  >
                    <TbMail className='h-4 w-4' />
                    Đánh dấu chưa đọc
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className='flex items-center gap-1 px-3 py-1 text-sm text-red-700 bg-red-100 rounded hover:bg-red-200'
                  >
                    <TbTrash className='h-4 w-4' />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Queries Table */}
        <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
          {loading ? (
            <div className='p-8 text-center'>
              <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <p className='mt-2 text-gray-600'>Đang tải...</p>
            </div>
          ) : queries.length === 0 ? (
            <div className='p-8 text-center'>
              <TbMail className='mx-auto h-12 w-12 text-gray-400' />
              <h3 className='mt-2 text-sm font-medium text-gray-900'>
                Không có tin nhắn
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Chưa có tin nhắn nào từ khách hàng.
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left'>
                      <input
                        type='checkbox'
                        checked={
                          selectedQueries.length === queries.length &&
                          queries.length > 0
                        }
                        onChange={toggleSelectAll}
                        className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                      />
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Khách hàng
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Chủ đề & Danh mục
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Thời gian
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Trạng thái
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {queries.map((query) => (
                    <tr
                      key={query.id}
                      className={`hover:bg-gray-50 ${
                        !query.is_read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <input
                          type='checkbox'
                          checked={selectedQueries.includes(query.id)}
                          onChange={() => toggleQuerySelection(query.id)}
                          className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm font-medium text-gray-900'>
                              {query.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {query.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm text-gray-900 font-medium mb-1'>
                          {query.subject}
                        </div>
                        {getCategoryBadge(query.category)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {new Date(query.created_at).toLocaleString('vi-VN')}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            query.is_read
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {query.is_read ? 'Đã đọc' : 'Chưa đọc'}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => setSelectedQuery(query)}
                            className='text-blue-600 hover:text-blue-900'
                            title='Xem chi tiết'
                          >
                            <TbEye className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() =>
                              handleMarkAsRead(query.id, !query.is_read)
                            }
                            className={`${
                              query.is_read
                                ? 'text-yellow-600 hover:text-yellow-900'
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            title={
                              query.is_read
                                ? 'Đánh dấu chưa đọc'
                                : 'Đánh dấu đã đọc'
                            }
                          >
                            {query.is_read ? (
                              <TbMail className='h-4 w-4' />
                            ) : (
                              <TbCheck className='h-4 w-4' />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteQuery(query.id)}
                            className='text-red-600 hover:text-red-900'
                            title='Xóa'
                          >
                            <TbTrash className='h-4 w-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className='bg-white px-4 py-3 border-t border-gray-200 sm:px-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 flex justify-between sm:hidden'>
                  <button
                    onClick={() => loadQueries(pagination.current_page - 1)}
                    disabled={pagination.current_page <= 1}
                    className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Trước
                  </button>
                  <button
                    onClick={() => loadQueries(pagination.current_page + 1)}
                    disabled={pagination.current_page >= pagination.last_page}
                    className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Sau
                  </button>
                </div>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div>
                    <p className='text-sm text-gray-700'>
                      Hiển thị{' '}
                      <span className='font-medium'>
                        {(pagination.current_page - 1) * pagination.limit + 1}
                      </span>{' '}
                      đến{' '}
                      <span className='font-medium'>
                        {Math.min(
                          pagination.current_page * pagination.limit,
                          pagination.total,
                        )}
                      </span>{' '}
                      trong tổng số{' '}
                      <span className='font-medium'>{pagination.total}</span>{' '}
                      kết quả
                    </p>
                  </div>
                  <div>
                    <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
                      <button
                        onClick={() => loadQueries(pagination.current_page - 1)}
                        disabled={pagination.current_page <= 1}
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Trước
                      </button>
                      {Array.from(
                        { length: Math.min(5, pagination.last_page) },
                        (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => loadQueries(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === pagination.current_page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        },
                      )}
                      <button
                        onClick={() => loadQueries(pagination.current_page + 1)}
                        disabled={
                          pagination.current_page >= pagination.last_page
                        }
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        Sau
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Query Detail Modal */}
        {selectedQuery && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
            <div className='relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Chi tiết tin nhắn
                </h3>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <TbX className='h-6 w-6' />
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Khách hàng
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedQuery.name}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedQuery.email}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Chủ đề
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedQuery.subject}
                  </p>
                </div>

                {selectedQuery.category && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Danh mục
                    </label>
                    <div className='mt-1'>
                      {getCategoryBadge(selectedQuery.category)}
                    </div>
                  </div>
                )}

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Nội dung
                  </label>
                  <div className='mt-1 p-3 bg-gray-50 rounded-md'>
                    <p className='text-sm text-gray-900 whitespace-pre-wrap'>
                      {selectedQuery.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Thời gian gửi
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {new Date(selectedQuery.created_at).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedQuery.id, !selectedQuery.is_read);
                    setSelectedQuery(null);
                  }}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    selectedQuery.is_read
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {selectedQuery.is_read
                    ? 'Đánh dấu chưa đọc'
                    : 'Đánh dấu đã đọc'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
