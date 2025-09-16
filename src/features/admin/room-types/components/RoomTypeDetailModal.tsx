'use client';

import React, { useState, useEffect } from 'react';
import {
  TbX,
  TbHome,
  TbUsers,
  TbRuler,
  TbCurrencyDollar,
  TbCalendar,
  TbPhoto,
  TbStarFilled,
  TbEye,
} from 'react-icons/tb';
import Image from 'next/image';
import { RoomType } from '@/features/admin/room-types/api/api';
import {
  RoomImage,
  fetchRoomImagesByRoomType,
  RoomImagesApi,
} from '@/features/admin/room-types/api/roomImagesApi';

interface RoomTypeDetailModalProps {
  roomType: RoomType;
  isOpen: boolean;
  onClose: () => void;
}

const RoomTypeDetailModal: React.FC<RoomTypeDetailModalProps> = ({
  roomType,
  isOpen,
  onClose,
}) => {
  const [roomImages, setRoomImages] = useState<RoomImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RoomImage | null>(null);

  useEffect(() => {
    if (isOpen && roomType.id) {
      loadRoomImages();
    }
  }, [isOpen, roomType.id]);

  const loadRoomImages = async () => {
    try {
      setLoadingImages(true);
      const images = await fetchRoomImagesByRoomType(roomType.id);
      setRoomImages(images);
    } catch (error) {
      console.error('Failed to load room images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <TbHome className='text-2xl text-blue-600' />
            <h2 className='text-2xl font-bold text-gray-900'>
              {roomType.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <TbX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Basic Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-blue-50 p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <TbRuler className='text-blue-600' />
                <span className='text-sm font-medium text-blue-800'>
                  Diện tích
                </span>
              </div>
              <p className='text-2xl font-bold text-blue-900'>
                {roomType.area} m²
              </p>
            </div>

            <div className='bg-green-50 p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <TbCurrencyDollar className='text-green-600' />
                <span className='text-sm font-medium text-green-800'>Giá</span>
              </div>
              <p className='text-2xl font-bold text-green-900'>
                {formatPrice(roomType.price)}
              </p>
            </div>

            <div className='bg-purple-50 p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <TbHome className='text-purple-600' />
                <span className='text-sm font-medium text-purple-800'>
                  Số lượng
                </span>
              </div>
              <p className='text-2xl font-bold text-purple-900'>
                {roomType.quantity}
              </p>
            </div>

            <div className='bg-orange-50 p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <TbUsers className='text-orange-600' />
                <span className='text-sm font-medium text-orange-800'>
                  Sức chứa
                </span>
              </div>
              <p className='text-2xl font-bold text-orange-900'>
                {roomType.adult}
                {roomType.children > 0 && `+${roomType.children}`}
              </p>
              <p className='text-xs text-orange-700 mt-1'>
                {roomType.adult} người lớn
                {roomType.children > 0 && `, ${roomType.children} trẻ em`}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>Mô tả</h3>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-700 leading-relaxed'>
                {roomType.description}
              </p>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Tiện nghi ({roomType.facilities.length})
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {roomType.facilities.map((facility) => (
                <div
                  key={facility.id}
                  className='bg-blue-50 border border-blue-200 p-3 rounded-lg'
                >
                  <h4 className='font-medium text-blue-900'>
                    {facility.content}
                  </h4>
                  <p className='text-sm text-blue-700 mt-1'>
                    {facility.description}
                  </p>
                </div>
              ))}
            </div>
            {roomType.facilities.length === 0 && (
              <p className='text-gray-500 italic'>
                Chưa có tiện nghi nào được thêm
              </p>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Không gian ({roomType.features.length})
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {roomType.features.map((feature) => (
                <div
                  key={feature.id}
                  className='bg-green-50 border border-green-200 p-3 rounded-lg'
                >
                  <h4 className='font-medium text-green-900'>
                    {feature.content}
                  </h4>
                  <p className='text-sm text-green-700'>{feature.name}</p>
                </div>
              ))}
            </div>
            {roomType.features.length === 0 && (
              <p className='text-gray-500 italic'>
                Chưa có không gian nào được thêm
              </p>
            )}
          </div>

          {/* Images */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <TbPhoto className='text-purple-600' />
              Hình ảnh ({roomImages.length})
            </h3>
            {loadingImages && (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                <span className='ml-2 text-gray-600'>Đang tải hình ảnh...</span>
              </div>
            )}

            {!loadingImages && roomImages.length > 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {roomImages.map((image) => (
                  <div
                    key={image.id}
                    className='group relative bg-gray-100 rounded-lg overflow-hidden aspect-video cursor-pointer'
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={RoomImagesApi.getImageUrl(image.path)}
                      alt={`Room image ${image.id}`}
                      width={300}
                      height={200}
                      className='w-full h-full object-cover transition-transform group-hover:scale-105'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/rooms/placeholder.png';
                      }}
                    />

                    {/* Thumbnail Badge */}
                    {image.is_thumbnail && (
                      <div className='absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1'>
                        <TbStarFilled size={12} />
                        Đại diện
                      </div>
                    )}

                    {/* View Overlay */}
                    <div className='absolute inset-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                        <div className='bg-white text-gray-700 rounded-full p-2'>
                          <TbEye size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2'>
                      <p className='text-white text-xs truncate'>
                        {image.path.split('/').pop()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loadingImages && roomImages.length === 0 && (
              <div className='text-center py-8 text-gray-500'>
                <TbPhoto className='mx-auto h-12 w-12 text-gray-300 mb-2' />
                <p>Chưa có hình ảnh nào</p>
              </div>
            )}
          </div>

          {/* Rooms */}
          {roomType.rooms?.length > 0 && (
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Danh sách phòng ({roomType.rooms.length})
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {roomType.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-lg text-center ${
                      room.is_active
                        ? 'bg-green-100 border border-green-300'
                        : 'bg-red-100 border border-red-300'
                    }`}
                  >
                    <p className='font-medium text-gray-900'>
                      {room.room_number}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        room.is_active ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {room.is_active ? 'Hoạt động' : 'Không hoạt động'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className='border-t border-gray-200 pt-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Thông tin hệ thống
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <TbCalendar className='text-gray-400' />
                <span>Tạo lúc: {formatDate(roomType.created_at)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <TbCalendar className='text-gray-400' />
                <span>Cập nhật lúc: {formatDate(roomType.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end p-6 border-t border-gray-200'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4'>
          <div className='relative max-w-5xl max-h-full'>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors z-10'
            >
              <TbX size={20} />
            </button>

            <Image
              src={RoomImagesApi.getImageUrl(selectedImage.path)}
              alt={`Room image ${selectedImage.id}`}
              width={800}
              height={600}
              className='max-w-full max-h-full object-contain rounded-lg'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/rooms/placeholder.png';
              }}
            />

            {/* Image Info */}
            <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-medium mb-1'>
                    {selectedImage.path.split('/').pop()}
                  </h3>
                  <p className='text-sm opacity-75'>
                    Tạo:{' '}
                    {new Date(selectedImage.created_at).toLocaleDateString(
                      'vi-VN',
                    )}
                  </p>
                </div>
                {selectedImage.is_thumbnail && (
                  <div className='flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded-full text-xs'>
                    <TbStarFilled size={12} />
                    Ảnh đại diện
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTypeDetailModal;
