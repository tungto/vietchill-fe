'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/Upload';
import CommonModal from '@/features/common/Modal';
import useRoomTable from '@/features/hooks/useRoomTable';
import RoomUpdateForm from './RoomUpdateForm';
import { Room } from './type';

export default function RoomTable({ rooms }: { rooms: Room[] }) {
  const {
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
  } = useRoomTable({ rooms });

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          mt: 2,
          maxHeight: '80vh', // You can adjust this height based on your requirements
          overflowY: 'auto',
        }}
      >
        <Table size='medium'>
          <TableHead
            sx={{
              backgroundColor: '#f5f5f5',
              position: 'sticky',
              top: 0, // Ensures the header sticks to the top of the scrollable container
              zIndex: 1, // Ensures the header is above the table body while scrolling
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Area (m²)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localRooms.map((room) => (
              <TableRow key={room.id} hover>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.room_number}</TableCell>
                <TableCell>{room.room_type.name}</TableCell>
                <TableCell>{room.room_type.price.toLocaleString()}₫</TableCell>
                <TableCell>{room.room_type.area}</TableCell>
                <TableCell>
                  <Chip
                    label={room.is_active ? 'Active' : 'Inactive'}
                    onClick={() =>
                      handleUpdateRoomStatus(room.id, {
                        is_active: !room.is_active,
                      })
                    }
                    color={room.is_active ? 'success' : 'error'}
                    variant='outlined'
                    clickable
                    size='small'
                  />
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title='Edit'>
                    <IconButton
                      onClick={() => handleUpdate(room.id)}
                      color='primary'
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Delete'>
                    <IconButton
                      onClick={() => handleDelete(room.id)}
                      color='error'
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='View Image'>
                    <IconButton
                      onClick={() => handleViewImage(room.id)}
                      color='secondary'
                    >
                      <ImageIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Upload Image'>
                    <IconButton
                      onClick={() => handleUploadImage(room.id)}
                      sx={{ color: 'green' }}
                    >
                      <UploadIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Modal for updating room */}
      <CommonModal
        open={open}
        onClose={() => setOpen(false)}
        title='Update Room'
        description='Edit the room details below'
      >
        {selectedRoomId && (
          <RoomUpdateForm
            room={localRooms.find((room) => room.id === selectedRoomId)!}
          />
        )}
      </CommonModal>
    </>
  );
}
