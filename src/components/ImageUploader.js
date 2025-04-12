import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Paper, Typography, useTheme, Fade, Zoom } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MAX_FILES = 5;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

function ImageUploader({ onFilesUpload }) {
  const theme = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ALLOWED_TYPES,
    },
    maxFiles: MAX_FILES,
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      onFilesUpload(acceptedFiles);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: { xs: 2, sm: 4 },
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? theme.palette.primary.light + '15' : 'background.paper',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: theme.palette.primary.light + '15',
        },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <input {...getInputProps()} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {showSuccess ? (
          <Zoom in={showSuccess} timeout={500}>
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: { xs: 48, sm: 64 }, 
                  color: 'success.main',
                  mb: 2,
                  animation: 'bounce 1s ease infinite',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  },
                }} 
              />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Upload Successful! 🎉
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {uploadedFiles.length} image{uploadedFiles.length > 1 ? 's' : ''} uploaded
              </Typography>
            </Box>
          </Zoom>
        ) : (
          <Fade in={!showSuccess} timeout={500}>
            <Box>
              {isDragActive ? (
                <CloudUploadIcon sx={{ 
                  fontSize: { xs: 48, sm: 64 }, 
                  color: 'primary.main', 
                  mb: 2,
                  animation: 'float 2s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }} />
              ) : (
                <ImageIcon sx={{ 
                  fontSize: { xs: 48, sm: 64 }, 
                  color: 'primary.main', 
                  mb: 2,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                  },
                }} />
              )}
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }}>
                {isDragActive
                  ? 'Drop it like it\'s hot! 🔥'
                  : 'Drag & drop your images here'}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                or click to browse your files
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mt: 2,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Maximum {MAX_FILES} files | Supported formats: PNG, JPG, JPEG
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ 
                mt: 1, 
                fontStyle: 'italic',
                display: { xs: 'none', sm: 'block' }
              }}>
                Pro tip: The more images you upload, the more time you have to make coffee ☕
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </Paper>
  );
}

export default ImageUploader; 