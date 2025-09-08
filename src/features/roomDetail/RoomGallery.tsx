'use client';
import { ImageItem } from '@/types/vietstay/room';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  images: ImageItem[];
  title?: string;
};

export default function RoomGallery({ images, title }: Props) {
  const [selected, setSelected] = useState<ImageItem>(images[0]);

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2'>
          <div className='rounded-xl overflow-hidden shadow-lg'>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${selected.path}`}
              alt={title ?? 'Room image'}
              width={1200}
              height={700}
              className='w-full h-[420px] object-cover'
              priority
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelected(img)}
                className={`rounded-lg cursor-pointer overflow-hidden transform transition-shadow duration-150 focus:outline-none ${
                  img.id === selected.id ? 'ring-4 ring-orange-400' : 'shadow'
                }`}
                aria-label={`Select image ${img.id}`}
              >
                <Image
                  quality={0}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${img.path}`}
                  alt={`thumb-${img.id}`}
                  width={400}
                  height={300}
                  className='w-full h-28 object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
