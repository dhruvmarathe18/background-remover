import React, { useState } from 'react';
import { Box, Button, Grid, CircularProgress, Typography, Alert, Paper, Chip, Fade, Zoom } from '@mui/material';
import axios from 'axios';
import JSZip from 'jszip';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const API_URL = 'http://localhost:5000';

function ImageProcessor({ files, onProcessedImages }) {
  const [processedImages, setProcessedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showProcessing, setShowProcessing] = useState(false);

  const processImages = async () => {
    setLoading(true);
    setError(null);
    setShowProcessing(true);
    const results = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_URL}/remove-background`, formData, {
          responseType: 'blob'
        });

        results.push({
          original: file,
          processed: new Blob([response.data], { type: 'image/png' }),
          name: file.name,
        });
      }

      setProcessedImages(results);
      onProcessedImages(results);
    } catch (err) {
      setError('Error processing images. Please make sure the backend server is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setTimeout(() => setShowProcessing(false), 1000);
    }
  };

  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(image.processed);
    link.download = `${image.name.split('.')[0]}_nobg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    
    for (const image of processedImages) {
      const arrayBuffer = await image.processed.arrayBuffer();
      zip.file(`${image.name.split('.')[0]}_nobg.png`, arrayBuffer);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'background_removed_images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button
        variant="contained"
        onClick={processImages}
        disabled={loading}
        sx={{ 
          mb: 3,
          py: 1.5,
          px: 4,
          fontSize: { xs: '0.9rem', sm: '1.1rem' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={24} sx={{ color: 'white' }} />
            <Typography>
              Removing backgrounds... (Time to grab a coffee ☕)
            </Typography>
          </Box>
        ) : (
          'Remove Backgrounds'
        )}
      </Button>

      {showProcessing && (
        <Fade in={showProcessing} timeout={500}>
          <Paper elevation={0} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
            <AutoFixHighIcon 
              sx={{ 
                fontSize: { xs: 48, sm: 64 },
                color: 'primary.main',
                mb: 2,
                animation: 'magic 2s ease-in-out infinite',
                '@keyframes magic': {
                  '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
                  '50%': { transform: 'scale(1.1) rotate(10deg)' },
                },
              }} 
            />
            <Typography variant="h6" gutterBottom>
              Working magic on your images... ✨
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we remove those pesky backgrounds
            </Typography>
          </Paper>
        </Fade>
      )}

      {processedImages.length > 0 && !showProcessing && (
        <>
          <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Results ({processedImages.length} image{processedImages.length > 1 ? 's' : ''})
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Because who needs backgrounds anyway? 🤷‍♂️
            </Typography>
            {processedImages.length > 1 && (
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={downloadAll}
                sx={{ mb: 2, width: { xs: '100%', sm: 'auto' } }}
              >
                Download All as ZIP
              </Button>
            )}
          </Paper>

          <Grid container spacing={3}>
            {processedImages.map((image, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Zoom in={!showProcessing} timeout={500 + index * 100}>
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" noWrap sx={{ maxWidth: '70%' }}>
                        {image.name}
                      </Typography>
                      <Chip 
                        label="Background Removed" 
                        color="success" 
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2,
                      mb: 2,
                      overflowX: 'auto',
                      '&::-webkit-scrollbar': {
                        height: 8,
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: 4,
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: 4,
                      },
                    }}>
                      <Box sx={{ minWidth: { xs: 150, sm: 200 } }}>
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                          Original
                        </Typography>
                        <img
                          src={URL.createObjectURL(image.original)}
                          alt={`Original ${image.name}`}
                          style={{ 
                            maxWidth: '100%', 
                            height: 'auto',
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                      <Box sx={{ minWidth: { xs: 150, sm: 200 } }}>
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                          Result
                        </Typography>
                        <img
                          src={URL.createObjectURL(image.processed)}
                          alt={`Processed ${image.name}`}
                          style={{ 
                            maxWidth: '100%', 
                            height: 'auto',
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadImage(image)}
                      fullWidth
                    >
                      Download Result
                    </Button>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default ImageProcessor; 