import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';
import ImageUploader from './components/ImageUploader';
import ImageProcessor from './components/ImageProcessor';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF',
    },
    secondary: {
      main: '#FF6584',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);

  const handleFilesUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleProcessedImages = (images) => {
    setProcessedImages(images);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Paper elevation={0} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
            <Typography variant="h1" component="h1" gutterBottom>
              ✂️ Background Remover
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Because who needs backgrounds anyway? 🤷‍♂️
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Made with ❤️ by Srushti Tambe | 
              <Typography component="span" sx={{ fontStyle: 'italic' }}>
                {" "}The developer who spends more time removing backgrounds than writing actual code
              </Typography>
            </Typography>
          </Paper>
          
          <ImageUploader onFilesUpload={handleFilesUpload} />
          {uploadedFiles.length > 0 && (
            <ImageProcessor
              files={uploadedFiles}
              onProcessedImages={handleProcessedImages}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 