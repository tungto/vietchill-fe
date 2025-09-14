'use client';

import { useRef } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StayInspired = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Đã đăng ký nhận bản tin với email: ${emailRef.current?.value}`);
  };

  return (
    <Box
      sx={{
        bgcolor: '#121828', // màu nền tối như hình
        borderRadius: 3,
        py: 8,
        px: { xs: 4, sm: 10, md: 25 },
        textAlign: 'center',
        maxWidth: 1200,
        mx: 'auto',
        color: '#cfd8dc', // màu chữ nhạt
      }}
    >
      <Typography
        variant='h4'
        component='h2'
        sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}
      >
        Giữ lấy cảm hứng
      </Typography>

      <Typography
        variant='body2'
        sx={{ color: '#7b8794', maxWidth: 600, mx: 'auto', mb: 3 }}
      >
        Đăng ký nhận bản tin của chúng tôi để là người đầu tiên khám phá các
        điểm đến mới, ưu đãi độc quyền và cảm hứng du lịch.
      </Typography>

      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{
          display: 'inline-flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          mb: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField
          inputRef={emailRef}
          placeholder='Email của bạn'
          variant='outlined'
          size='small'
          sx={{
            bgcolor: '#1c2235',
            borderRadius: 1,
            input: { color: '#fff' },
            flexGrow: 1,
          }}
        />

        <Button
          variant='contained'
          sx={{
            bgcolor: '#000',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 3,
            '&:hover': { bgcolor: '#333' },
          }}
          endIcon={<ArrowForwardIcon />}
          onClick={handleSubmit}
        >
          Đăng ký
        </Button>
      </Box>

      <Typography
        variant='caption'
        sx={{ color: '#5a6476', fontSize: 12, display: 'block' }}
      >
        Bằng cách đăng ký, bạn đồng ý với{' '}
        <Link href='#' underline='hover' color='#7b8794'>
          Chính sách bảo mật
        </Link>{' '}
        và nhận các bản cập nhật.
      </Typography>
    </Box>
  );
};

export default StayInspired;
