import React, { useEffect } from 'react';
import useGetUserGallery from '../hooks/useGetUserGallery'; // Ajusta la ruta según tu estructura de carpetas
import { Box } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ImageViewer from './ImageViewer';
import { useState } from 'react';

const ImageGallery = ({ token, username }) => {
  const { userGallery, userVideos, isLoading, error } = useGetUserGallery({ token, username });
  const [imgClickedPath, setImgClickedPath] = useState(null)
  const [videoClickedPath, setVideoClickedPath] = useState(null)

  // Puedes mostrar un mensaje de carga o un error si es necesario
  if (isLoading) return <div>Cargando...</div>;
  if (userGallery.length === 0 && userVideos.length === 0 && !isLoading) return <div>No hay imágenes ni videos disponibles</div>;
  if (error) return <div>Error: {error}</div>;

  const handleImageClicked = (event) => {
    if (event) {
      setImgClickedPath(event.target.src);
      setVideoClickedPath(null);
    }
  }

  const handleVideoClicked = (videoUrl) => {
    setVideoClickedPath(videoUrl);
    setImgClickedPath(null);
  }

  const handleViewerClose = (path) => {
    setImgClickedPath(path);
    if (!path) {
      setVideoClickedPath(null);
    }
  }

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(164px, 1fr))', gap: '10px' }}>
        {userGallery.map((image, index) => (
          <img
            onClick={(event) => handleImageClicked(event)}
            key={index}
            src={image}
            alt={`Imagen ${index + 1}`}
            onError={(e) => (e.target.src = "https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible")}
            loading="lazy"
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
        {userVideos.map((video, index) => (
          <Box key={`video-${index}`} sx={{ position: 'relative' }}>
            <video
              controls
              preload="metadata"
              src={video}
              onClick={() => handleVideoClicked(video)}
              style={{ width: '100%', height: 'auto', borderRadius: 8, background: '#000', cursor: 'pointer', display: 'block' }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <PlayCircleIcon
                sx={{
                  fontSize: 48,
                  color: 'rgba(255, 255, 255, 0.9)',
                  filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))'
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      <ImageViewer image={imgClickedPath} video={videoClickedPath} setImgClickedPath={handleViewerClose} />
    </>
  );
};

export default ImageGallery;
