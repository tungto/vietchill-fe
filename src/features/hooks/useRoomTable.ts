import { RoomsApi } from '@/lib/api/admin/roomsApi';
import React, { useState } from 'react';
import { Room } from '../admin/rooms/type';

const useRoomTable = ({ rooms }: { rooms: Room[] }) => {
  const client = new RoomsApi();
  const [localRooms, setLocalRooms] = useState(rooms);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    setErrorMessage(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await client.deleteRoom(id);
      setLocalRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    } catch (error) {
      console.error('Failed to delete room:', error);
      setErrorMessage('Failed to delete room. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateRoomStatus = async (
    id: number,
    data: Partial<{ is_active: boolean }>,
  ) => {
    try {
      await client.updateRoom(id, { is_active: data.is_active });
      setLocalRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === id ? { ...room, is_active: data.is_active! } : room,
        ),
      );
    } catch (error) {
      console.error('Failed to update room status:', error);
      setErrorMessage('Failed to update room status. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleUpdate = async (id: number) => {
    setSelectedRoomId(id);
    setOpen(true);
  };

  const handleViewImage = (id: number) => {
    console.log(`View image for room ${id}`);
    // Implement image viewer logic here
  };

  const handleUploadImage = (id: number) => {
    console.log(`Upload image for room ${id}`);
    // Implement file picker or modal logic here
  };

  return {
    localRooms,
    errorMessage,
    openSnackbar,
    open,
    selectedRoomId,
    setSelectedRoomId,
    setOpen,
    handleCloseSnackbar,
    handleDelete,
    handleUpdateRoomStatus,
    handleViewImage,
    handleUploadImage,
    handleUpdate,
  };
};

export default useRoomTable;
